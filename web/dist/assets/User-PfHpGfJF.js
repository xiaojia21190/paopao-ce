import{_ as Re,a as Ve}from"./post-item.vue_vue_type_style_index_0_lang-hfTPUkT_.js";import{_ as je}from"./post-skeleton-zm5tFcFD.js";import{_ as Ee}from"./whisper-Vl-V0ytb.js";import{_ as Ge}from"./main-nav.vue_vue_type_style_index_0_lang-9UCTRVDk.js";import{d as Je,H as i,S as Qe,c as Ze,b as Ke,E as Xe,r as Ye,f as u,k as o,w as c,v as g,Z as m,e as t,j as w,t as A,bf as r,A as B,y as me,F,x as T,h as fe}from"./@vue-Hd4uXz5f.js";import{u as ea}from"./vuex-qScXS-uk.js";import{b as aa,u as ta}from"./vue-router-4Hko0_3l.js";import{M as sa,L as la,e as H,h as na,u as pe,f as he,N as oa,_ as ua}from"./index-8lD1klqH.js";import{W as ia}from"./whisper-add-friend-PONlu7DH.js";import{p as ce}from"./count-GnrfahME.js";import{W as ra}from"./v3-infinite-loading-9ocfqcSa.js";import{k as ca,a as va,r as _a,G as ge,s as da,t as ma,J as fa,R as pa}from"./@vicons-V6UxFD2Y.js";import{F as ha,G as ga,a as wa,j as we,o as ka,M as ya,e as ba,P as Pa,f as Oa,g as Fa,k as Ta,J as Ia,H as Aa}from"./naive-ui-h5SFsZhx.js";import"./content-fOn-h7ea.js";import"./paopao-video-player-iTSRV7j7.js";import"./copy-to-clipboard-l6UqHK6O.js";import"./@babel-5-cIlDoe.js";import"./toggle-selection-fekekO1r.js";import"./vooks-v147mXjr.js";import"./evtd-9ZCiDXyn.js";import"./axios-kMxbiGYq.js";import"./moment-jIwEdMgI.js";/* empty css               */import"./seemly-hKSMrbh9.js";import"./vueuc-xP2DxDTa.js";import"./@css-render-oW_PeE7K.js";import"./vdirs-gz97tqc5.js";import"./@juggle--NVrOerG.js";import"./css-render-Adblu2bf.js";import"./@emotion-vV6BesBt.js";import"./lodash-es-KEIJqYRD.js";import"./treemate-hmrDCADh.js";import"./async-validator-BHjhHa7C.js";import"./date-fns-E8ESfRGG.js";const xa={key:0,class:"profile-baseinfo"},$a={class:"avatar"},za={class:"base-info"},Sa={class:"username"},qa={class:"userinfo"},Ma={class:"info-item"},Ua={class:"info-item"},Ca={class:"userinfo"},Wa={class:"info-item"},La={class:"info-item"},Na={class:"info-item"},Da={key:0,class:"user-opts"},Ba={key:0,class:"skeleton-wrap"},Ha={key:1},Ra={key:0,class:"empty-wrap"},Va={key:1},ja={key:0},Ea={key:1},Ga={key:2},Ja={key:3},Qa={key:4},Za={key:2},Ka={key:0},Xa={key:1},Ya={key:2},et={key:3},at={key:4},tt={class:"load-more-wrap"},st={class:"load-more-spinner"},lt=Je({__name:"User",setup(nt){const R=ha(),v=ea(),$=aa(),ke=ta(),f=i(!1),y=i(!1),a=Qe({id:0,avatar:"",username:"",nickname:"",is_admin:!1,is_friend:!0,is_following:!1,created_on:0,follows:0,followings:0,tweets_count:0,status:1}),p=i(!1),V=i(!1),G=i(!1),l=i([]),z=i([]),S=i([]),q=i([]),M=i([]),U=i([]),x=i($.query.s||""),n=i(+$.query.p||1),h=i("post"),J=i(+$.query.p||1),Q=i(1),Z=i(1),K=i(1),X=i(1),k=i(20),d=i(0),Y=i(0),ee=i(0),ae=i(0),te=i(0),se=i(0),b=e=>{a.id=e.id,a.username=e.username,a.nickname=e.nickname,a.avatar=e.avatar,V.value=!0},P=e=>{R.success({title:"提示",content:"确定"+(e.user.is_following?"取消关注 @":"关注 @")+e.user.username+" 吗？",positiveText:"确定",negativeText:"取消",onPositiveClick:()=>{e.user.is_following?pe({user_id:e.user.id}).then(_=>{window.$message.success("操作成功"),ve(e.user_id,!1)}).catch(_=>{}):he({user_id:e.user.id}).then(_=>{window.$message.success("关注成功"),ve(e.user_id,!0)}).catch(_=>{})}})};function ve(e,_){C(z,e,_),C(S,e,_),C(q,e,_),C(M,e,_),C(U,e,_)}function C(e,_,ie){if(e.value&&e.value.length>0)for(let E in e.value)e.value[E].user_id==_&&(e.value[E].user.is_following=ie)}const ye=()=>{y.value=!1,l.value=[],z.value=[],S.value=[],q.value=[],M.value=[],U.value=[],h.value="post",n.value=1,J.value=1,Q.value=1,Z.value=1,K.value=1,X.value=1,d.value=0,Y.value=0,ee.value=0,ae.value=0,te.value=0,se.value=0},be=()=>{switch(h.value){case"post":j();break;case"comment":le();break;case"highlight":ne();break;case"media":oe();break;case"star":ue();break}},j=()=>{f.value=!0,H({username:x.value,style:"post",page:n.value,page_size:k.value}).then(e=>{f.value=!1,e.list.length===0&&(y.value=!0),n.value>1?l.value=l.value.concat(e.list):(l.value=e.list||[],window.scrollTo(0,0)),d.value=Math.ceil(e.pager.total_rows/k.value),z.value=l.value,Y.value=d.value}).catch(e=>{l.value=[],n.value>1&&n.value--,f.value=!1})},le=()=>{f.value=!0,H({username:x.value,style:"comment",page:n.value,page_size:k.value}).then(e=>{f.value=!1,e.list.length===0&&(y.value=!0),n.value>1?l.value=l.value.concat(e.list):(l.value=e.list||[],window.scrollTo(0,0)),d.value=Math.ceil(e.pager.total_rows/k.value),S.value=l.value,ee.value=d.value}).catch(e=>{l.value=[],n.value>1&&n.value--,f.value=!1})},ne=()=>{f.value=!0,H({username:x.value,style:"highlight",page:n.value,page_size:k.value}).then(e=>{f.value=!1,e.list.length===0&&(y.value=!0),n.value>1?l.value=l.value.concat(e.list):(l.value=e.list||[],window.scrollTo(0,0)),d.value=Math.ceil(e.pager.total_rows/k.value),q.value=l.value,ae.value=d.value}).catch(e=>{l.value=[],n.value>1&&n.value--,f.value=!1})},oe=()=>{f.value=!0,H({username:x.value,style:"media",page:n.value,page_size:k.value}).then(e=>{f.value=!1,e.list.length===0&&(y.value=!0),n.value>1?l.value=l.value.concat(e.list):(l.value=e.list||[],window.scrollTo(0,0)),d.value=Math.ceil(e.pager.total_rows/k.value),M.value=l.value,te.value=d.value}).catch(e=>{l.value=[],n.value>1&&n.value--,f.value=!1})},ue=()=>{f.value=!0,H({username:x.value,style:"star",page:n.value,page_size:k.value}).then(e=>{f.value=!1,e.list.length===0&&(y.value=!0),n.value>1?l.value=l.value.concat(e.list):(l.value=e.list||[],window.scrollTo(0,0)),d.value=Math.ceil(e.pager.total_rows/k.value),U.value=l.value,se.value=d.value}).catch(e=>{l.value=[],n.value>1&&n.value--,f.value=!1})},Pe=e=>{switch(h.value=e,h.value){case"post":l.value=z.value,n.value=J.value,d.value=Y.value,j();break;case"comment":l.value=S.value,n.value=Q.value,d.value=ee.value,le();break;case"highlight":l.value=q.value,n.value=Z.value,d.value=ae.value,ne();break;case"media":l.value=M.value,n.value=K.value,d.value=te.value,oe();break;case"star":l.value=U.value,n.value=X.value,d.value=se.value,ue();break}},W=()=>{p.value=!0,sa({username:x.value}).then(e=>{p.value=!1,a.id=e.id,a.avatar=e.avatar,a.username=e.username,a.nickname=e.nickname,a.is_admin=e.is_admin,a.is_friend=e.is_friend,a.created_on=e.created_on,a.is_following=e.is_following,a.follows=e.follows,a.followings=e.followings,a.status=e.status,e.tweets_count&&(a.tweets_count=e.tweets_count),be()}).catch(e=>{p.value=!1,console.log(e)})},Oe=()=>{switch(h.value){case"post":J.value=n.value,j();break;case"comment":Q.value=n.value,le();break;case"highlight":Z.value=n.value,ne();break;case"media":K.value=n.value,oe();break;case"star":X.value=n.value,ue();break}},Fe=()=>{V.value=!0},Te=()=>{G.value=!0},Ie=()=>{V.value=!1},Ae=()=>{G.value=!1},I=e=>()=>fe(we,null,{default:()=>fe(e)}),xe=Ze(()=>{if(v.state.userInfo.username==a.username)return[{label:"设置",key:"setting",icon:I(va)}];let e=[{label:"私信",key:"whisper",icon:I(_a)}];return v.state.userInfo.is_admin&&(a.status===1?e.push({label:"禁言",key:"banned",icon:I(ge)}):e.push({label:"解封",key:"deblocking",icon:I(ge)})),a.is_following?e.push({label:"取消关注",key:"unfollow",icon:I(da)}):e.push({label:"关注",key:"follow",icon:I(ma)}),v.state.profile.useFriendship&&(a.is_friend?e.push({label:"删除好友",key:"delete",icon:I(fa)}):e.push({label:"添加朋友",key:"requesting",icon:I(pa)})),e}),$e=e=>{switch(e){case"whisper":Fe();break;case"delete":ze();break;case"requesting":Te();break;case"follow":case"unfollow":Se();break;case"banned":case"deblocking":qe();break;case"setting":ke.push({name:"setting",query:{t:new Date().getTime()}});break}},ze=()=>{R.warning({title:"删除好友",content:"将好友 “"+a.nickname+"” 删除，将同时删除 点赞/收藏 列表中关于该朋友的 “好友可见” 推文",positiveText:"确定",negativeText:"取消",onPositiveClick:()=>{p.value=!0,na({user_id:a.id}).then(e=>{p.value=!1,a.is_friend=!1,j()}).catch(e=>{p.value=!1,console.log(e)})}})},Se=()=>{R.success({title:"提示",content:"确定"+(a.is_following?"取消关注 @":"关注 @")+a.username+" 吗？",positiveText:"确定",negativeText:"取消",onPositiveClick:()=>{p.value=!0,a.is_following?pe({user_id:a.id}).then(e=>{p.value=!1,window.$message.success("操作成功"),W()}).catch(e=>{p.value=!1,console.log(e)}):he({user_id:a.id}).then(e=>{p.value=!1,window.$message.success("操作成功"),W()}).catch(e=>{p.value=!1,console.log(e)})}})},qe=()=>{R.warning({title:"警告",content:"确定对该用户进行"+(a.status===1?"禁言":"解封")+"处理吗？",positiveText:"确定",negativeText:"取消",onPositiveClick:()=>{p.value=!0,oa({id:a.id,status:a.status===1?2:1}).then(e=>{p.value=!1,a.status===1?window.$message.success("禁言成功"):window.$message.success("解封成功"),W()}).catch(e=>{p.value=!1,console.log(e)})}})},Me=()=>{n.value<d.value||d.value==0?(y.value=!1,n.value++,Oe()):y.value=!0};return Ke(()=>{W()}),Xe(()=>({path:$.path,query:$.query}),(e,_)=>{_.path==="/u"&&e.path==="/u"&&(x.value=$.query.s||"",ye(),W())}),(e,_)=>{const ie=Ge,E=ka,re=ya,_e=Ye("router-link"),Ue=ba,Ce=Pa,We=Ee,L=Oa,Le=Fa,de=Ta,Ne=je,De=Ia,N=Re,O=Aa,D=Ve,Be=ga,He=wa;return t(),u("div",null,[o(ie,{title:"用户详情"}),o(Be,{class:"main-content-wrap profile-wrap",bordered:""},{default:c(()=>[o(de,{show:p.value},{default:c(()=>[a.id>0?(t(),u("div",xa,[w("div",$a,[o(E,{size:72,src:a.avatar},null,8,["src"])]),w("div",za,[w("div",Sa,[w("strong",null,A(a.nickname),1),w("span",null," @"+A(a.username),1),r(v).state.profile.useFriendship&&r(v).state.userInfo.id>0&&r(v).state.userInfo.username!=a.username&&a.is_friend?(t(),g(re,{key:0,class:"top-tag",type:"info",size:"small",round:""},{default:c(()=>[B(" 好友 ")]),_:1})):m("",!0),r(v).state.userInfo.id>0&&r(v).state.userInfo.username!=a.username&&a.is_following?(t(),g(re,{key:1,class:"top-tag",type:"success",size:"small",round:""},{default:c(()=>[B(" 已关注 ")]),_:1})):m("",!0),a.is_admin?(t(),g(re,{key:2,class:"top-tag",type:"error",size:"small",round:""},{default:c(()=>[B(" 管理员 ")]),_:1})):m("",!0)]),w("div",qa,[w("span",Ma,"UID. "+A(a.id),1),w("span",Ua,A(r(la)(a.created_on))+" 加入",1)]),w("div",Ca,[w("span",Wa,[o(_e,{onClick:_[0]||(_[0]=me(()=>{},["stop"])),class:"following-link",to:{name:"following",query:{s:a.username,n:a.nickname,t:"follows"}}},{default:c(()=>[B(" 关注  "+A(r(ce)(a.follows)),1)]),_:1},8,["to"])]),w("span",La,[o(_e,{onClick:_[1]||(_[1]=me(()=>{},["stop"])),class:"following-link",to:{name:"following",query:{s:a.username,n:a.nickname,t:"followings"}}},{default:c(()=>[B(" 粉丝  "+A(r(ce)(a.followings)),1)]),_:1},8,["to"])]),w("span",Na," 泡泡  "+A(r(ce)(a.tweets_count||0)),1)])]),r(v).state.userInfo.id>0?(t(),u("div",Da,[o(Ce,{placement:"bottom-end",trigger:"click",size:"small",options:xe.value,onSelect:$e},{default:c(()=>[o(Ue,{quaternary:"",circle:""},{icon:c(()=>[o(r(we),null,{default:c(()=>[o(r(ca))]),_:1})]),_:1})]),_:1},8,["options"])])):m("",!0)])):m("",!0),o(We,{show:V.value,user:a,onSuccess:Ie},null,8,["show","user"]),o(ia,{show:G.value,user:a,onSuccess:Ae},null,8,["show","user"]),p.value?m("",!0):(t(),g(Le,{key:1,class:"profile-tabs-wrap",type:"line",animated:"",value:h.value,"onUpdate:value":Pe},{default:c(()=>[o(L,{name:"post",tab:"泡泡"}),o(L,{name:"comment",tab:"评论"}),o(L,{name:"highlight",tab:"亮点"}),o(L,{name:"media",tab:"图文"}),o(L,{name:"star",tab:"喜欢"})]),_:1},8,["value"]))]),_:1},8,["show"]),f.value&&l.value.length===0?(t(),u("div",Ba,[o(Ne,{num:k.value},null,8,["num"])])):(t(),u("div",Ha,[l.value.length===0?(t(),u("div",Ra,[o(De,{size:"large",description:"暂无数据"})])):m("",!0),r(v).state.desktopModelShow?(t(),u("div",Va,[h.value==="post"?(t(),u("div",ja,[(t(!0),u(F,null,T(z.value,s=>(t(),g(O,{key:s.id},{default:c(()=>[o(N,{post:s,isOwner:r(v).state.userInfo.id==s.user_id,addFollowAction:!0,onSendWhisper:b,onHandleFollowAction:P},null,8,["post","isOwner"])]),_:2},1024))),128))])):m("",!0),h.value==="comment"?(t(),u("div",Ea,[(t(!0),u(F,null,T(S.value,s=>(t(),g(O,{key:s.id},{default:c(()=>[o(N,{post:s,isOwner:r(v).state.userInfo.id==s.user_id,addFollowAction:!0,onSendWhisper:b,onHandleFollowAction:P},null,8,["post","isOwner"])]),_:2},1024))),128))])):m("",!0),h.value==="highlight"?(t(),u("div",Ga,[(t(!0),u(F,null,T(q.value,s=>(t(),g(O,{key:s.id},{default:c(()=>[o(N,{post:s,isOwner:r(v).state.userInfo.id==s.user_id,addFollowAction:!0,onSendWhisper:b,onHandleFollowAction:P},null,8,["post","isOwner"])]),_:2},1024))),128))])):m("",!0),h.value==="media"?(t(),u("div",Ja,[(t(!0),u(F,null,T(M.value,s=>(t(),g(O,{key:s.id},{default:c(()=>[o(N,{post:s,isOwner:r(v).state.userInfo.id==s.user_id,addFollowAction:!0,onSendWhisper:b,onHandleFollowAction:P},null,8,["post","isOwner"])]),_:2},1024))),128))])):m("",!0),h.value==="star"?(t(),u("div",Qa,[(t(!0),u(F,null,T(U.value,s=>(t(),g(O,{key:s.id},{default:c(()=>[o(N,{post:s,isOwner:r(v).state.userInfo.id==s.user_id,addFollowAction:!0,onSendWhisper:b,onHandleFollowAction:P},null,8,["post","isOwner"])]),_:2},1024))),128))])):m("",!0)])):(t(),u("div",Za,[h.value==="post"?(t(),u("div",Ka,[(t(!0),u(F,null,T(z.value,s=>(t(),g(O,{key:s.id},{default:c(()=>[o(D,{post:s,isOwner:r(v).state.userInfo.id==s.user_id,addFollowAction:!0,onSendWhisper:b,onHandleFollowAction:P},null,8,["post","isOwner"])]),_:2},1024))),128))])):m("",!0),h.value==="comment"?(t(),u("div",Xa,[(t(!0),u(F,null,T(S.value,s=>(t(),g(O,{key:s.id},{default:c(()=>[o(D,{post:s,isOwner:r(v).state.userInfo.id==s.user_id,addFollowAction:!0,onSendWhisper:b,onHandleFollowAction:P},null,8,["post","isOwner"])]),_:2},1024))),128))])):m("",!0),h.value==="highlight"?(t(),u("div",Ya,[(t(!0),u(F,null,T(q.value,s=>(t(),g(O,{key:s.id},{default:c(()=>[o(D,{post:s,isOwner:r(v).state.userInfo.id==s.user_id,addFollowAction:!0,onSendWhisper:b,onHandleFollowAction:P},null,8,["post","isOwner"])]),_:2},1024))),128))])):m("",!0),h.value==="media"?(t(),u("div",et,[(t(!0),u(F,null,T(M.value,s=>(t(),g(O,{key:s.id},{default:c(()=>[o(D,{post:s,isOwner:r(v).state.userInfo.id==s.user_id,addFollowAction:!0,onSendWhisper:b,onHandleFollowAction:P},null,8,["post","isOwner"])]),_:2},1024))),128))])):m("",!0),h.value==="star"?(t(),u("div",at,[(t(!0),u(F,null,T(U.value,s=>(t(),g(O,{key:s.id},{default:c(()=>[o(D,{post:s,isOwner:r(v).state.userInfo.id==s.user_id,addFollowAction:!0,onSendWhisper:b,onHandleFollowAction:P},null,8,["post","isOwner"])]),_:2},1024))),128))])):m("",!0)]))]))]),_:1}),d.value>0?(t(),g(He,{key:0,justify:"center"},{default:c(()=>[o(r(ra),{class:"load-more",slots:{complete:"没有更多泡泡了",error:"加载出错"},onInfinite:_[2]||(_[2]=s=>Me())},{spinner:c(()=>[w("div",tt,[y.value?m("",!0):(t(),g(de,{key:0,size:14})),w("span",st,A(y.value?"没有更多泡泡了":"加载更多"),1)])]),_:1})]),_:1})):m("",!0)])}}}),Dt=ua(lt,[["__scopeId","data-v-00ab4b4e"]]);export{Dt as default};
