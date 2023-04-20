// Copyright 2022 ROC. All rights reserved.
// Use of this source code is governed by a MIT style
// license that can be found in the LICENSE file.

package web

import (
	"image"
	"strings"
	"time"

	"github.com/alimy/mir/v3"
	"github.com/disintegration/imaging"
	"github.com/gin-gonic/gin"
	"github.com/gofrs/uuid"
	api "github.com/rocboss/paopao-ce/auto/api/v1"
	"github.com/rocboss/paopao-ce/internal/conf"
	"github.com/rocboss/paopao-ce/internal/core"
	"github.com/rocboss/paopao-ce/internal/model/web"
	"github.com/rocboss/paopao-ce/internal/servants/base"
	"github.com/rocboss/paopao-ce/internal/servants/chain"
	"github.com/rocboss/paopao-ce/pkg/convert"
	"github.com/rocboss/paopao-ce/pkg/utils"
	"github.com/rocboss/paopao-ce/pkg/xerror"
	"github.com/sirupsen/logrus"
)

var (
	_ api.Priv        = (*privSrv)(nil)
	_ api.PrivBinding = (*privBinding)(nil)
	_ api.PrivRender  = (*privRender)(nil)

	_uploadAttachmentTypeMap = map[string]core.AttachmentType{
		"public/image":  core.AttachmentTypeImage,
		"public/avatar": core.AttachmentTypeImage,
		"public/video":  core.AttachmentTypeVideo,
		"attachment":    core.AttachmentTypeOther,
	}
)

type privSrv struct {
	api.UnimplementedPrivServant
	*base.DaoServant

	oss core.ObjectStorageService
}

type privBinding struct {
	*api.UnimplementedPrivBinding
}

type privRender struct {
	*api.UnimplementedPrivRender
}

func (b *privBinding) BindUploadAttachment(c *gin.Context) (_ *web.UploadAttachmentReq, xerr mir.Error) {
	UserId, exist := base.UserIdFrom(c)
	if !exist {
		return nil, xerror.UnauthorizedAuthNotExist
	}

	uploadType := c.Request.FormValue("type")
	file, fileHeader, err := c.Request.FormFile("file")
	if err != nil {
		return nil, _errFileUploadFailed
	}
	defer func() {
		if xerr != nil {
			file.Close()
		}
	}()

	if err := fileCheck(uploadType, fileHeader.Size); err != nil {
		return nil, err
	}

	contentType := fileHeader.Header.Get("Content-Type")
	fileExt, xerr := getFileExt(contentType)
	if xerr != nil {
		return nil, xerr
	}

	return &web.UploadAttachmentReq{
		SimpleInfo: web.SimpleInfo{
			Uid: UserId,
		},
		UploadType:  uploadType,
		ContentType: contentType,
		File:        file,
		FileSize:    fileHeader.Size,
		FileExt:     fileExt,
	}, nil
}

func (b *privBinding) BindDownloadAttachmentPrecheck(c *gin.Context) (*web.DownloadAttachmentPrecheckReq, mir.Error) {
	user, exist := base.UserFrom(c)
	if !exist {
		return nil, xerror.UnauthorizedAuthNotExist
	}
	return &web.DownloadAttachmentPrecheckReq{
		BaseInfo: web.BaseInfo{
			User: user,
		},
		ContentID: convert.StrTo(c.Query("id")).MustInt64(),
	}, nil
}

func (b *privBinding) BindDownloadAttachment(c *gin.Context) (*web.DownloadAttachmentReq, mir.Error) {
	user, exist := base.UserFrom(c)
	if !exist {
		return nil, xerror.UnauthorizedAuthNotExist
	}
	return &web.DownloadAttachmentReq{
		BaseInfo: web.BaseInfo{
			User: user,
		},
		ContentID: convert.StrTo(c.Query("id")).MustInt64(),
	}, nil
}

func (s *privBinding) BindCreateTweet(c *gin.Context) (*web.CreateTweetReq, mir.Error) {
	v := &web.CreateTweetReq{}
	err := s.BindAny(c, v)
	v.ClientIP = c.ClientIP()
	return v, err
}

func (s *privBinding) BindCreateCommentReply(c *gin.Context) (*web.CreateCommentReplyReq, mir.Error) {
	v := &web.CreateCommentReplyReq{}
	err := s.BindAny(c, v)
	v.ClientIP = c.ClientIP()
	return v, err
}

func (s *privBinding) BindCreateComment(c *gin.Context) (*web.CreateCommentReq, mir.Error) {
	v := &web.CreateCommentReq{}
	err := s.BindAny(c, v)
	v.ClientIP = c.ClientIP()
	return v, err
}

func (s *privSrv) Chain() gin.HandlersChain {
	return gin.HandlersChain{chain.JWT(), chain.Priv()}
}

func (s *privSrv) UnfollowTopic(req *web.UnfollowTopicReq) mir.Error {
	if err := s.Ds.UnfollowTopic(req.Uid, req.TopicId); err != nil {
		logrus.Errorf("user(%d) unfollow topic(%d) failed: %s", req.Uid, req.TopicId, err)
		return _errUnfollowTopicFailed
	}
	return nil
}

func (s *privSrv) FollowTopic(req *web.FollowTopicReq) mir.Error {
	if err := s.Ds.FollowTopic(req.Uid, req.TopicId); err != nil {
		logrus.Errorf("user(%d) follow topic(%d) failed: %s", req.Uid, req.TopicId, err)
		return _errFollowTopicFailed
	}
	return nil
}

func (s *privSrv) StickTopic(req *web.StickTopicReq) (*web.StickTopicResp, mir.Error) {
	status, err := s.Ds.StickTopic(req.Uid, req.TopicId)
	if err != nil {
		logrus.Errorf("user(%d) stick topic(%d) failed: %s", req.Uid, req.TopicId, err)
		return nil, _errStickTopicFailed
	}
	return &web.StickTopicResp{
		StickStatus: status,
	}, nil
}

func (s *privSrv) UploadAttachment(req *web.UploadAttachmentReq) (*web.UploadAttachmentResp, mir.Error) {
	defer req.File.Close()

	// 生成随机路径
	randomPath := uuid.Must(uuid.NewV4()).String()
	ossSavePath := req.UploadType + "/" + generatePath(randomPath[:8]) + "/" + randomPath[9:] + req.FileExt
	objectUrl, err := s.oss.PutObject(ossSavePath, req.File, req.FileSize, req.ContentType, false)
	if err != nil {
		logrus.Errorf("oss.putObject err: %s", err)
		return nil, _errFileUploadFailed
	}

	// 构造附件Model
	attachment := &core.Attachment{
		UserID:   req.Uid,
		FileSize: req.FileSize,
		Content:  objectUrl,
		Type:     _uploadAttachmentTypeMap[req.UploadType],
	}
	if attachment.Type == core.AttachmentTypeImage {
		var src image.Image
		src, err = imaging.Decode(req.File)
		if err == nil {
			attachment.ImgWidth, attachment.ImgHeight = getImageSize(src.Bounds())
		}
	}
	attachment, err = s.Ds.CreateAttachment(attachment)
	if err != nil {
		logrus.Errorf("Ds.CreateAttachment err: %s", err)
		return nil, _errFileUploadFailed
	}

	return &web.UploadAttachmentResp{
		UserID:    req.Uid,
		FileSize:  req.FileSize,
		ImgWidth:  attachment.ImgWidth,
		ImgHeight: attachment.ImgHeight,
		Type:      attachment.Type,
		Content:   attachment.Content,
	}, nil
}

func (s *privSrv) DownloadAttachmentPrecheck(req *web.DownloadAttachmentPrecheckReq) (*web.DownloadAttachmentPrecheckResp, mir.Error) {
	content, err := s.Ds.GetPostContentByID(req.ContentID)
	if err != nil {
		logrus.Errorf("Ds.GetPostContentByID err: %s", err)
		return nil, _errInvalidDownloadReq
	}
	resp := &web.DownloadAttachmentPrecheckResp{Paid: true}
	if content.Type == core.ContentTypeChargeAttachment {
		tweet, err := s.GetTweetBy(content.PostID)
		if err != nil {
			logrus.Errorf("get tweet err: %v", err)
			return nil, _errInvalidDownloadReq
		}
		// 发布者或管理员免费下载
		if tweet.UserID == req.User.ID || req.User.IsAdmin {
			return resp, nil
		}
		// 检测是否有购买记录
		resp.Paid = s.checkPostAttachmentIsPaid(req.ContentID, req.User.ID)
	}
	return resp, nil
}

func (s *privSrv) DownloadAttachment(req *web.DownloadAttachmentReq) (*web.DownloadAttachmentResp, mir.Error) {
	content, err := s.Ds.GetPostContentByID(req.ContentID)
	if err != nil {
		logrus.Errorf("s.GetPostContentByID err: %v", err)
		return nil, _errInvalidDownloadReq
	}
	// 收费附件
	if content.Type == core.ContentTypeChargeAttachment {
		post, err := s.GetTweetBy(content.PostID)
		if err != nil {
			logrus.Errorf("s.GetTweetBy err: %v", err)
			return nil, xerror.ServerError
		}
		paidFlag := false
		// 发布者或管理员免费下载 或者 检测是否有购买记录
		if post.UserID == req.User.ID || req.User.IsAdmin || s.checkPostAttachmentIsPaid(post.ID, req.User.ID) {
			paidFlag = true
		}
		// 未购买，则尝试购买
		if !paidFlag {
			err := s.buyPostAttachment(&core.Post{
				Model: &core.Model{
					ID: post.ID,
				},
				UserID:          post.UserID,
				AttachmentPrice: post.AttachmentPrice,
			}, req.User)
			if err != nil {
				return nil, err
			}
		}
	}
	// 签发附件下载链接
	objectKey := s.oss.ObjectKey(content.Content)
	signedURL, err := s.oss.SignURL(objectKey, 60)
	if err != nil {
		logrus.Errorf("client.SignURL err: %v", err)
		return nil, _errDownloadReqError
	}
	return &web.DownloadAttachmentResp{
		SignedURL: signedURL,
	}, nil
}

func (s *privSrv) CreateTweet(req *web.CreateTweetReq) (_ *web.CreateTweetResp, xerr mir.Error) {
	var mediaContents []string
	defer func() {
		if xerr != nil {
			deleteOssObjects(s.oss, mediaContents)
		}
	}()

	contents, err := persistMediaContents(s.oss, req.Contents)
	if err != nil {
		return nil, _errCreatePostFailed
	}
	mediaContents = contents
	tags := tagsFrom(req.Tags)
	post := &core.Post{
		UserID:          req.User.ID,
		Tags:            strings.Join(tags, ","),
		IP:              req.ClientIP,
		IPLoc:           utils.GetIPLoc(req.ClientIP),
		AttachmentPrice: req.AttachmentPrice,
		Visibility:      req.Visibility,
	}
	post, err = s.Ds.CreatePost(post)
	if err != nil {
		logrus.Errorf("Ds.CreatePost err: %s", err)
		return nil, _errCreatePostFailed
	}

	// 创建推文内容
	for _, item := range req.Contents {
		if err := item.Check(s.Ds); err != nil {
			// 属性非法
			logrus.Infof("contents check err: %s", err)
			continue
		}
		if item.Type == core.ContentTypeAttachment && req.AttachmentPrice > 0 {
			item.Type = core.ContentTypeChargeAttachment
		}
		postContent := &core.PostContent{
			PostID:  post.ID,
			UserID:  req.User.ID,
			Content: item.Content,
			Type:    item.Type,
			Sort:    item.Sort,
		}
		if _, err = s.Ds.CreatePostContent(postContent); err != nil {
			logrus.Infof("Ds.CreatePostContent err: %s", err)
			return nil, _errCreateCommentFailed
		}
	}

	// 私密推文不创建标签与用户提醒
	if post.Visibility != core.PostVisitPrivate {
		// 创建标签
		for _, t := range tags {
			tag := &core.Tag{
				UserID: req.User.ID,
				Tag:    t,
			}
			s.Ds.CreateTag(tag)
		}

		// 创建用户消息提醒
		for _, u := range req.Users {
			user, err := s.Ds.GetUserByUsername(u)
			if err != nil || user.ID == req.User.ID {
				continue
			}

			// 创建消息提醒
			// TODO: 优化消息提醒处理机制
			go s.Ds.CreateMessage(&core.Message{
				SenderUserID:   req.User.ID,
				ReceiverUserID: user.ID,
				Type:           core.MsgTypePost,
				Brief:          "在新发布的泡泡动态中@了你",
				PostID:         post.ID,
			})
		}
	}
	// 推送Search
	s.PushPostToSearch(post)
	formatedPosts, err := s.Ds.RevampPosts([]*core.PostFormated{post.Format()})
	if err != nil {
		logrus.Infof("Ds.RevampPosts err: %s", err)
		return nil, _errCreatePostFailed
	}
	return (*web.CreateTweetResp)(formatedPosts[0]), nil
}

func (s *privSrv) DeleteTweet(req *web.DeleteTweetReq) mir.Error {
	if req.User == nil {
		return _errNoPermission
	}
	post, err := s.Ds.GetPostByID(req.ID)
	if err != nil {
		logrus.Errorf("Ds.GetPostByID err: %s", err)
		return _errGetPostFailed
	}
	if post.UserID != req.User.ID && !req.User.IsAdmin {
		return _errNoPermission
	}
	mediaContents, err := s.Ds.DeletePost(post)
	if err != nil {
		logrus.Errorf("Ds.DeletePost delete post failed: %s", err)
		return _errDeletePostFailed
	}
	// 删除推文的媒体内容
	deleteOssObjects(s.oss, mediaContents)
	// 删除索引
	s.DeleteSearchPost(post)
	if err != nil {
		logrus.Errorf("s.DeleteSearchPost failed: %s", err)
		return _errDeletePostFailed
	}
	return nil
}

func (s *privSrv) DeleteCommentReply(req *web.DeleteCommentReplyReq) mir.Error {
	reply, err := s.Ds.GetCommentReplyByID(req.ID)
	if err != nil {
		logrus.Errorf("Ds.GetCommentReplyByID err: %s", err)
		return _errGetReplyFailed
	}
	if req.User.ID != reply.UserID && !req.User.IsAdmin {
		return _errNoPermission
	}
	// 执行删除
	err = s.deletePostCommentReply(reply)
	if err != nil {
		logrus.Errorf("s.deletePostCommentReply err: %s", err)
		return _errDeleteCommentFailed
	}
	return nil
}

func (s *privSrv) CreateCommentReply(req *web.CreateCommentReplyReq) (*web.CreateCommentReplyResp, mir.Error) {
	var (
		post     *core.Post
		comment  *core.Comment
		atUserID int64
		err      error
	)

	if post, comment, atUserID, err = s.createPostPreHandler(req.CommentID, req.Uid, req.AtUserID); err != nil {
		return nil, _errCreateReplyFailed
	}

	// 创建评论
	reply := &core.CommentReply{
		CommentID: req.CommentID,
		UserID:    req.Uid,
		Content:   req.Content,
		AtUserID:  atUserID,
		IP:        req.ClientIP,
		IPLoc:     utils.GetIPLoc(req.ClientIP),
	}

	reply, err = s.Ds.CreateCommentReply(reply)
	if err != nil {
		return nil, _errCreateReplyFailed
	}

	// 更新Post回复数
	post.CommentCount++
	post.LatestRepliedOn = time.Now().Unix()
	s.Ds.UpdatePost(post)

	// 更新索引
	s.PushPostToSearch(post)

	// 创建用户消息提醒
	commentMaster, err := s.Ds.GetUserByID(comment.UserID)
	if err == nil && commentMaster.ID != req.Uid {
		go s.Ds.CreateMessage(&core.Message{
			SenderUserID:   req.Uid,
			ReceiverUserID: commentMaster.ID,
			Type:           core.MsgTypeReply,
			Brief:          "在泡泡评论下回复了你",
			PostID:         post.ID,
			CommentID:      comment.ID,
			ReplyID:        reply.ID,
		})
	}
	postMaster, err := s.Ds.GetUserByID(post.UserID)
	if err == nil && postMaster.ID != req.Uid && commentMaster.ID != postMaster.ID {
		go s.Ds.CreateMessage(&core.Message{
			SenderUserID:   req.Uid,
			ReceiverUserID: postMaster.ID,
			Type:           core.MsgTypeReply,
			Brief:          "在泡泡评论下发布了新回复",
			PostID:         post.ID,
			CommentID:      comment.ID,
			ReplyID:        reply.ID,
		})
	}
	if atUserID > 0 {
		user, err := s.Ds.GetUserByID(atUserID)
		if err == nil && user.ID != req.Uid && commentMaster.ID != user.ID && postMaster.ID != user.ID {
			// 创建消息提醒
			go s.Ds.CreateMessage(&core.Message{
				SenderUserID:   req.Uid,
				ReceiverUserID: user.ID,
				Type:           core.MsgTypeReply,
				Brief:          "在泡泡评论的回复中@了你",
				PostID:         post.ID,
				CommentID:      comment.ID,
				ReplyID:        reply.ID,
			})
		}
	}
	return (*web.CreateCommentReplyResp)(reply), nil
}

func (s *privSrv) DeleteComment(req *web.DeleteCommentReq) mir.Error {
	comment, err := s.Ds.GetCommentByID(req.ID)
	if err != nil {
		logrus.Errorf("Ds.GetCommentByID err: %v\n", err)
		return _errGetCommentFailed
	}
	if req.User.ID != comment.UserID && !req.User.IsAdmin {
		return _errNoPermission
	}
	// 加载post
	post, err := s.Ds.GetPostByID(comment.PostID)
	if err != nil {
		return _errDeleteCommentFailed
	}
	// 更新post回复数
	post.CommentCount--
	if err := s.Ds.UpdatePost(post); err != nil {
		logrus.Errorf("Ds.UpdatePost err: %s", err)
		return _errDeleteCommentFailed
	}
	// TODO: 优化删除逻辑，事务化删除comment
	if err := s.Ds.DeleteComment(comment); err != nil {
		logrus.Errorf("Ds.DeleteComment err: %s", err)
		return _errDeleteCommentFailed
	}
	return nil
}

func (s *privSrv) CreateComment(req *web.CreateCommentReq) (_ *web.CreateCommentResp, xerr mir.Error) {
	var (
		mediaContents []string
		err           error
	)
	defer func() {
		if xerr != nil {
			deleteOssObjects(s.oss, mediaContents)
		}
	}()

	if mediaContents, err = persistMediaContents(s.oss, req.Contents); err != nil {
		return nil, xerror.ServerError
	}

	// 加载Post
	post, err := s.Ds.GetPostByID(req.PostID)
	if err != nil {
		logrus.Errorf("Ds.GetPostByID err:%s", err)
		return nil, xerror.ServerError
	}
	if post.CommentCount >= conf.AppSetting.MaxCommentCount {
		return nil, _errMaxCommentCount
	}
	comment := &core.Comment{
		PostID: post.ID,
		UserID: req.Uid,
		IP:     req.ClientIP,
		IPLoc:  utils.GetIPLoc(req.ClientIP),
	}
	comment, err = s.Ds.CreateComment(comment)
	if err != nil {
		logrus.Errorf("Ds.CreateComment err:%s", err)
		return nil, _errCreateCommentFailed
	}

	for _, item := range req.Contents {
		// 检查附件是否是本站资源
		if item.Type == core.ContentTypeImage || item.Type == core.ContentTypeVideo || item.Type == core.ContentTypeAttachment {
			if err := s.Ds.CheckAttachment(item.Content); err != nil {
				continue
			}
		}
		postContent := &core.CommentContent{
			CommentID: comment.ID,
			UserID:    req.Uid,
			Content:   item.Content,
			Type:      item.Type,
			Sort:      item.Sort,
		}
		s.Ds.CreateCommentContent(postContent)
	}

	// 更新Post回复数
	post.CommentCount++
	post.LatestRepliedOn = time.Now().Unix()
	s.Ds.UpdatePost(post)

	// 更新索引
	s.PushPostToSearch(post)

	// 创建用户消息提醒
	postMaster, err := s.Ds.GetUserByID(post.UserID)
	if err == nil && postMaster.ID != req.Uid {
		go s.Ds.CreateMessage(&core.Message{
			SenderUserID:   req.Uid,
			ReceiverUserID: postMaster.ID,
			Type:           core.MsgtypeComment,
			Brief:          "在泡泡中评论了你",
			PostID:         post.ID,
			CommentID:      comment.ID,
		})
	}
	for _, u := range req.Users {
		user, err := s.Ds.GetUserByUsername(u)
		if err != nil || user.ID == req.Uid || user.ID == postMaster.ID {
			continue
		}

		// 创建消息提醒
		go s.Ds.CreateMessage(&core.Message{
			SenderUserID:   req.Uid,
			ReceiverUserID: user.ID,
			Type:           core.MsgtypeComment,
			Brief:          "在泡泡评论中@了你",
			PostID:         post.ID,
			CommentID:      comment.ID,
		})
	}

	return (*web.CreateCommentResp)(comment), nil
}

func (s *privSrv) CollectionTweet(req *web.CollectionTweetReq) (*web.CollectionTweetResp, mir.Error) {
	status := false
	collection, err := s.Ds.GetUserPostCollection(req.ID, req.Uid)
	if err != nil {
		// 创建Star
		if _, xerr := s.createPostCollection(req.ID, req.Uid); xerr != nil {
			return nil, xerr
		}
		status = true
	} else {
		// 取消Star
		if xerr := s.deletePostCollection(collection); xerr != nil {
			return nil, xerr
		}
	}
	return &web.CollectionTweetResp{
		Status: status,
	}, nil
}

func (s *privSrv) StarTweet(req *web.StarTweetReq) (*web.StarTweetResp, mir.Error) {
	status := false
	star, err := s.Ds.GetUserPostStar(req.ID, req.Uid)
	if err != nil {
		// 创建Star
		if _, xerr := s.createPostStar(req.ID, req.Uid); xerr != nil {
			return nil, xerr
		}
		status = true
	} else {
		// 取消Star
		if xerr := s.deletePostStar(star); xerr != nil {
			return nil, xerr
		}
	}
	return &web.StarTweetResp{
		Status: status,
	}, nil
}

func (s *privSrv) VisibleTweet(req *web.VisibleTweetReq) (*web.VisibleTweetResp, mir.Error) {
	if req.Visibility >= core.PostVisitInvalid {
		return nil, xerror.InvalidParams
	}
	post, err := s.Ds.GetPostByID(req.ID)
	if err != nil {
		return nil, _errVisblePostFailed
	}
	if xerr := checkPermision(req.User, post.UserID); xerr != nil {
		return nil, xerr
	}
	if err = s.Ds.VisiblePost(post, req.Visibility); err != nil {
		logrus.Warnf("s.Ds.VisiblePost: %s", err)
		return nil, _errVisblePostFailed
	}

	// 推送Search
	post.Visibility = req.Visibility
	s.PushPostToSearch(post)

	return &web.VisibleTweetResp{
		Visibility: req.Visibility,
	}, nil
}

func (s *privSrv) StickTweet(req *web.StickTweetReq) (*web.StickTweetResp, mir.Error) {
	post, err := s.Ds.GetPostByID(req.ID)
	if err != nil {
		logrus.Errorf("Ds.GetPostByID err: %v\n", err)
		return nil, _errStickPostFailed
	}
	if !req.User.IsAdmin {
		return nil, _errNoPermission
	}
	newStatus := 1 - post.IsTop
	if err = s.Ds.StickPost(post); err != nil {
		return nil, _errStickPostFailed
	}
	return &web.StickTweetResp{
		StickStatus: newStatus,
	}, nil
}

func (s *privSrv) LockTweet(req *web.LockTweetReq) (*web.LockTweetResp, mir.Error) {
	post, err := s.Ds.GetPostByID(req.ID)
	if err != nil {
		return nil, _errLockPostFailed
	}
	if post.UserID != req.User.ID && !req.User.IsAdmin {
		return nil, _errNoPermission
	}
	newStatus := 1 - post.IsLock
	if err := s.Ds.LockPost(post); err != nil {
		return nil, _errLockPostFailed
	}
	return &web.LockTweetResp{
		LockStatus: newStatus,
	}, nil
}

func (s *privSrv) deletePostCommentReply(reply *core.CommentReply) error {
	err := s.Ds.DeleteCommentReply(reply)
	if err != nil {
		return err
	}
	// 加载Comment
	comment, err := s.Ds.GetCommentByID(reply.CommentID)
	if err != nil {
		return err
	}
	// 加载comment的post
	post, err := s.Ds.GetPostByID(comment.PostID)
	if err != nil {
		return err
	}
	// 更新Post回复数
	post.CommentCount--
	post.LatestRepliedOn = time.Now().Unix()
	s.Ds.UpdatePost(post)
	// 更新索引
	s.PushPostToSearch(post)
	return nil
}

func (s *privSrv) createPostPreHandler(commentID int64, userID, atUserID int64) (*core.Post, *core.Comment, int64,
	error) {
	// 加载Comment
	comment, err := s.Ds.GetCommentByID(commentID)
	if err != nil {
		return nil, nil, atUserID, err
	}

	// 加载comment的post
	post, err := s.Ds.GetPostByID(comment.PostID)
	if err != nil {
		return nil, nil, atUserID, err
	}

	if post.CommentCount >= conf.AppSetting.MaxCommentCount {
		return nil, nil, atUserID, _errMaxCommentCount
	}

	if userID == atUserID {
		atUserID = 0
	}

	if atUserID > 0 {
		// 检测目前用户是否存在
		users, _ := s.Ds.GetUsersByIDs([]int64{atUserID})
		if len(users) == 0 {
			atUserID = 0
		}
	}

	return post, comment, atUserID, nil
}

func (s *privSrv) createPostStar(postID, userID int64) (*core.PostStar, mir.Error) {
	// 加载Post
	post, err := s.Ds.GetPostByID(postID)
	if err != nil {
		return nil, xerror.ServerError
	}

	// 私密post不可操作
	if post.Visibility == core.PostVisitPrivate {
		return nil, _errNoPermission
	}

	star, err := s.Ds.CreatePostStar(postID, userID)
	if err != nil {
		return nil, xerror.ServerError
	}

	// 更新Post点赞数
	post.UpvoteCount++
	s.Ds.UpdatePost(post)

	// 更新索引
	s.PushPostToSearch(post)

	return star, nil
}

func (s *privSrv) deletePostStar(star *core.PostStar) mir.Error {
	err := s.Ds.DeletePostStar(star)
	if err != nil {
		return xerror.ServerError
	}
	// 加载Post
	post, err := s.Ds.GetPostByID(star.PostID)
	if err != nil {
		return xerror.ServerError
	}

	// 私密post不可操作
	if post.Visibility == core.PostVisitPrivate {
		return _errNoPermission
	}

	// 更新Post点赞数
	post.UpvoteCount--
	s.Ds.UpdatePost(post)

	// 更新索引
	s.PushPostToSearch(post)

	return nil
}

func (s *privSrv) createPostCollection(postID, userID int64) (*core.PostCollection, mir.Error) {
	// 加载Post
	post, err := s.Ds.GetPostByID(postID)
	if err != nil {
		return nil, xerror.ServerError
	}

	// 私密post不可操作
	if post.Visibility == core.PostVisitPrivate {
		return nil, _errNoPermission
	}

	collection, err := s.Ds.CreatePostCollection(postID, userID)
	if err != nil {
		return nil, xerror.ServerError
	}

	// 更新Post点赞数
	post.CollectionCount++
	s.Ds.UpdatePost(post)

	// 更新索引
	s.PushPostToSearch(post)

	return collection, nil
}

func (s *privSrv) deletePostCollection(collection *core.PostCollection) mir.Error {
	err := s.Ds.DeletePostCollection(collection)
	if err != nil {
		return xerror.ServerError
	}
	// 加载Post
	post, err := s.Ds.GetPostByID(collection.PostID)
	if err != nil {
		return xerror.ServerError
	}

	// 私密post不可操作
	if post.Visibility == core.PostVisitPrivate {
		return _errNoPermission
	}

	// 更新Post点赞数
	post.CollectionCount--
	s.Ds.UpdatePost(post)

	// 更新索引
	s.PushPostToSearch(post)

	return nil
}

func (s *privSrv) checkPostAttachmentIsPaid(postID, userID int64) bool {
	bill, err := s.Ds.GetPostAttatchmentBill(postID, userID)
	return err == nil && bill.Model != nil && bill.ID > 0
}

func (s *privSrv) buyPostAttachment(post *core.Post, user *core.User) mir.Error {
	if user.Balance < post.AttachmentPrice {
		return _errInsuffientDownloadMoney
	}
	// 执行购买
	if err := s.Ds.HandlePostAttachmentBought(post, user); err != nil {
		logrus.Errorf("Ds.HandlePostAttachmentBought err: %s", err)
		return xerror.ServerError
	}
	return nil
}

func newPrivSrv(s *base.DaoServant, oss core.ObjectStorageService) api.Priv {
	return &privSrv{
		DaoServant: s,
		oss:        oss,
	}
}

func newPrivBinding() api.PrivBinding {
	return &privBinding{
		UnimplementedPrivBinding: &api.UnimplementedPrivBinding{
			BindAny: base.NewBindAnyFn(),
		},
	}
}

func newPrivRender() api.PrivRender {
	return &privRender{
		UnimplementedPrivRender: &api.UnimplementedPrivRender{
			RenderAny: base.RenderAny,
		},
	}
}
