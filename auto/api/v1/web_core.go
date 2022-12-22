// Code generated by go-mir. DO NOT EDIT.

package v1

import (
	"net/http"

	"github.com/alimy/mir/v3"
	"github.com/gin-gonic/gin"
	"github.com/rocboss/paopao-ce/internal/dao/jinzhu/dbr"
)

type LoginReq struct {
	BaseInfo  `json:"-"`
	AgentInfo AgentInfo `json:"agent_info"`
	Name      string    `json:"name"`
	Passwd    string    `json:"passwd"`
}

type AgentInfo struct {
	Platform  string `json:"platform"`
	UserAgent string `json:"user_agent"`
}

type BaseInfo struct {
	User *dbr.User
}

type LoginResp struct {
	UserInfo
	ServerInfo ServerInfo `json:"server_info"`
	JwtToken   string     `json:"jwt_token"`
}

type ServerInfo struct {
	ApiVer string `json:"api_ver"`
}

type UserInfo struct {
	Name string `json:"name"`
}

type WebCore interface {
	// Chain provide handlers chain for gin
	Chain() gin.HandlersChain

	Logout() mir.Error
	Login(*LoginReq) (*LoginResp, mir.Error)
	Articles() mir.Error
	Index() mir.Error

	mustEmbedUnimplementedWebCoreServant()
}

type WebCoreBinding interface {
	BindLogin(*gin.Context) (*LoginReq, mir.Error)

	mustEmbedUnimplementedWebCoreBinding()
}

type WebCoreRender interface {
	RenderLogout(*gin.Context, mir.Error)
	RenderLogin(*gin.Context, *LoginResp, mir.Error)
	RenderArticles(*gin.Context, mir.Error)
	RenderIndex(*gin.Context, mir.Error)

	mustEmbedUnimplementedWebCoreRender()
}

// RegisterWebCoreServant register WebCore servant to gin
func RegisterWebCoreServant(e *gin.Engine, s WebCore, b WebCoreBinding, r WebCoreRender) {
	router := e.Group("v1")
	// use chain for router
	middlewares := s.Chain()
	router.Use(middlewares...)

	// register routes info to router
	router.Handle("POST", "/user/logout/", func(c *gin.Context) {
		select {
		case <-c.Request.Context().Done():
			return
		default:
		}

		r.RenderLogout(c, s.Logout())
	})

	router.Handle("POST", "/user/login/", func(c *gin.Context) {
		select {
		case <-c.Request.Context().Done():
			return
		default:
		}

		req, err := b.BindLogin(c)
		if err != nil {
			r.RenderLogin(c, nil, err)
			return
		}
		resp, err := s.Login(req)
		r.RenderLogin(c, resp, err)
	})

	{
		h := func(c *gin.Context) {
			select {
			case <-c.Request.Context().Done():
				return
			default:
			}

			r.RenderArticles(c, s.Articles())
		}
		router.Handle("GET", "/articles/:category/", h)
		router.Handle("HEAD", "/articles/:category/", h)
	}

	router.Handle("GET", "/index/", func(c *gin.Context) {
		select {
		case <-c.Request.Context().Done():
			return
		default:
		}

		r.RenderIndex(c, s.Index())
	})

}

// UnimplementedWebCoreServant can be embedded to have forward compatible implementations.
type UnimplementedWebCoreServant struct {
}

func (UnimplementedWebCoreServant) Chain() gin.HandlersChain {
	return nil
}

func (UnimplementedWebCoreServant) Logout() mir.Error {
	return mir.Errorln(http.StatusNotImplemented, http.StatusText(http.StatusNotImplemented))
}

func (UnimplementedWebCoreServant) Login(req *LoginReq) (*LoginResp, mir.Error) {
	return nil, mir.Errorln(http.StatusNotImplemented, http.StatusText(http.StatusNotImplemented))
}

func (UnimplementedWebCoreServant) Articles() mir.Error {
	return mir.Errorln(http.StatusNotImplemented, http.StatusText(http.StatusNotImplemented))
}

func (UnimplementedWebCoreServant) Index() mir.Error {
	return mir.Errorln(http.StatusNotImplemented, http.StatusText(http.StatusNotImplemented))
}

func (UnimplementedWebCoreServant) mustEmbedUnimplementedWebCoreServant() {}

// UnimplementedWebCoreRender can be embedded to have forward compatible implementations.
type UnimplementedWebCoreRender struct {
	RenderAny func(*gin.Context, any, mir.Error)
}

func (r *UnimplementedWebCoreRender) RenderLogout(c *gin.Context, err mir.Error) {
	r.RenderAny(c, nil, err)
}

func (r *UnimplementedWebCoreRender) RenderLogin(c *gin.Context, data *LoginResp, err mir.Error) {
	r.RenderAny(c, data, err)
}

func (r *UnimplementedWebCoreRender) RenderArticles(c *gin.Context, err mir.Error) {
	r.RenderAny(c, nil, err)
}

func (r *UnimplementedWebCoreRender) RenderIndex(c *gin.Context, err mir.Error) {
	r.RenderAny(c, nil, err)
}

func (r *UnimplementedWebCoreRender) mustEmbedUnimplementedWebCoreRender() {}

// UnimplementedWebCoreBinding can be embedded to have forward compatible implementations.
type UnimplementedWebCoreBinding struct {
	BindAny func(*gin.Context, any) mir.Error
}

func (b *UnimplementedWebCoreBinding) BindLogin(c *gin.Context) (*LoginReq, mir.Error) {
	obj := new(LoginReq)
	err := b.BindAny(c, obj)
	return obj, err
}

func (b *UnimplementedWebCoreBinding) mustEmbedUnimplementedWebCoreBinding() {}
