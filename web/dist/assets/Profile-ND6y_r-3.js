import{_ as ze}from"./whisper-Vl-V0ytb.js";import{_ as Me,a as $e}from"./post-item.vue_vue_type_style_index_0_lang-hfTPUkT_.js";import{_ as qe}from"./post-skeleton-zm5tFcFD.js";import{_ as xe}from"./main-nav.vue_vue_type_style_index_0_lang-9UCTRVDk.js";import{d as Se,H as r,c as Ce,b as Le,E as Ne,r as Ue,f as i,k as u,bf as o,v as h,w as _,Z as f,e as a,j as m,t as O,A as E,y as ue,F as b,x as I,h as ie}from"./@vue-Hd4uXz5f.js";import{u as De}from"./vuex-qScXS-uk.js";import{b as He,u as Be}from"./vue-router-4Hko0_3l.js";import{e as L,L as Ve,u as je,f as Re,_ as We}from"./index-8lD1klqH.js";import{p as G}from"./count-GnrfahME.js";import{W as Ee}from"./v3-infinite-loading-9ocfqcSa.js";import{k as Ge,a as Je}from"./@vicons-V6UxFD2Y.js";import{F as Qe,G as Ze,a as Ke,j as re,o as Xe,M as Ye,e as et,P as tt,f as at,g as st,J as lt,k as ot,H as nt}from"./naive-ui-h5SFsZhx.js";import"./content-fOn-h7ea.js";import"./paopao-video-player-iTSRV7j7.js";import"./copy-to-clipboard-l6UqHK6O.js";import"./@babel-5-cIlDoe.js";import"./toggle-selection-fekekO1r.js";import"./vooks-v147mXjr.js";import"./evtd-9ZCiDXyn.js";import"./axios-kMxbiGYq.js";import"./moment-jIwEdMgI.js";/* empty css               */import"./seemly-hKSMrbh9.js";import"./vueuc-xP2DxDTa.js";import"./@css-render-oW_PeE7K.js";import"./vdirs-gz97tqc5.js";import"./@juggle--NVrOerG.js";import"./css-render-Adblu2bf.js";import"./@emotion-vV6BesBt.js";import"./lodash-es-KEIJqYRD.js";import"./treemate-hmrDCADh.js";import"./async-validator-BHjhHa7C.js";import"./date-fns-E8ESfRGG.js";const ut={class:"profile-baseinfo"},it={class:"avatar"},rt={class:"base-info"},ct={class:"username"},_t={class:"userinfo"},vt={class:"info-item"},dt={class:"info-item"},mt={class:"userinfo"},ft={class:"info-item"},pt={class:"info-item"},ht={class:"info-item"},gt={class:"user-opts"},wt={key:0,class:"skeleton-wrap"},kt={key:1},yt={key:0,class:"empty-wrap"},bt={key:1},It={key:0},Pt={key:1},Ot={key:2},Tt={key:3},At={key:4},Ft={key:2},zt={key:0},Mt={key:1},$t={key:2},qt={key:3},xt={key:4},St={class:"load-more-wrap"},Ct={class:"load-more-spinner"},Lt=Se({__name:"Profile",setup(Nt){const n=De(),T=He(),ce=Be(),_e=Qe(),d=r(!1),P=r(!1),l=r([]),A=r([]),F=r([]),z=r([]),M=r([]),$=r([]),p=r("post"),J=r(+T.query.p||1),Q=r(1),Z=r(1),K=r(1),X=r(1),s=r(+T.query.p||1),g=r(20),v=r(0),Y=r(0),ee=r(0),te=r(0),ae=r(0),se=r(0),U=r(!1),le=r({id:0,avatar:"",username:"",nickname:"",is_admin:!1,is_friend:!0,is_following:!1,created_on:0,follows:0,followings:0,status:1}),ve=e=>()=>ie(re,null,{default:()=>ie(e)}),de=Ce(()=>[{label:"设置",key:"setting",icon:ve(Je)}]),me=e=>{switch(e){case"setting":ce.push({name:"setting",query:{t:new Date().getTime()}});break}},w=e=>{le.value=e,U.value=!0},fe=()=>{U.value=!1},k=e=>{_e.success({title:"提示",content:"确定"+(e.user.is_following?"取消关注 @":"关注 @")+e.user.username+" 吗？",positiveText:"确定",negativeText:"取消",onPositiveClick:()=>{e.user.is_following?je({user_id:e.user.id}).then(c=>{window.$message.success("操作成功"),oe(e.user_id,!1)}).catch(c=>{}):Re({user_id:e.user.id}).then(c=>{window.$message.success("关注成功"),oe(e.user_id,!0)}).catch(c=>{})}})};function oe(e,c){q(A.value,e,c),q(F.value,e,c),q(z.value,e,c),q(M.value,e,c),q($.value,e,c)}function q(e,c,W){if(e&&e.length>0)for(let N in e)e[N].user_id==c&&(e[N].user.is_following=W)}const D=()=>{switch(p.value){case"post":H();break;case"comment":B();break;case"highlight":V();break;case"media":j();break;case"star":R();break}},H=()=>{d.value=!0,L({username:n.state.userInfo.username,style:"post",page:s.value,page_size:g.value}).then(e=>{d.value=!1,e.list.length===0&&(P.value=!0),s.value>1?l.value=l.value.concat(e.list):(l.value=e.list||[],window.scrollTo(0,0)),v.value=Math.ceil(e.pager.total_rows/g.value),A.value=l.value,Y.value=v.value}).catch(e=>{l.value=[],s.value>1&&s.value--,d.value=!1})},B=()=>{d.value=!0,L({username:n.state.userInfo.username,style:"comment",page:s.value,page_size:g.value}).then(e=>{d.value=!1,e.list.length===0&&(P.value=!0),s.value>1?l.value=l.value.concat(e.list):(l.value=e.list||[],window.scrollTo(0,0)),v.value=Math.ceil(e.pager.total_rows/g.value),F.value=l.value,ee.value=v.value}).catch(e=>{l.value=[],s.value>1&&s.value--,d.value=!1})},V=()=>{d.value=!0,L({username:n.state.userInfo.username,style:"highlight",page:s.value,page_size:g.value}).then(e=>{d.value=!1,e.list.length===0&&(P.value=!0),s.value>1?l.value=l.value.concat(e.list):(l.value=e.list||[],window.scrollTo(0,0)),v.value=Math.ceil(e.pager.total_rows/g.value),z.value=l.value,te.value=v.value}).catch(e=>{l.value=[],s.value>1&&s.value--,d.value=!1})},j=()=>{d.value=!0,L({username:n.state.userInfo.username,style:"media",page:s.value,page_size:g.value}).then(e=>{d.value=!1,e.list.length===0&&(P.value=!0),s.value>1?l.value=l.value.concat(e.list):(l.value=e.list||[],window.scrollTo(0,0)),v.value=Math.ceil(e.pager.total_rows/g.value),M.value=l.value,ae.value=v.value}).catch(e=>{l.value=[],s.value>1&&s.value--,d.value=!1})},R=()=>{d.value=!0,L({username:n.state.userInfo.username,style:"star",page:s.value,page_size:g.value}).then(e=>{d.value=!1,e.list.length===0&&(P.value=!0),s.value>1?l.value=l.value.concat(e.list):(l.value=e.list||[],window.scrollTo(0,0)),v.value=Math.ceil(e.pager.total_rows/g.value),$.value=l.value,se.value=v.value}).catch(e=>{l.value=[],s.value>1&&s.value--,d.value=!1})},pe=e=>{switch(p.value=e,p.value){case"post":l.value=A.value,s.value=J.value,v.value=Y.value,H();break;case"comment":l.value=F.value,s.value=Q.value,v.value=ee.value,B();break;case"highlight":l.value=z.value,s.value=Z.value,v.value=te.value,V();break;case"media":l.value=M.value,s.value=K.value,v.value=ae.value,j();break;case"star":l.value=$.value,s.value=X.value,v.value=se.value,R();break}},he=()=>{switch(p.value){case"post":J.value=s.value,H();break;case"comment":Q.value=s.value,B();break;case"highlight":Z.value=s.value,V();break;case"media":K.value=s.value,j();break;case"star":X.value=s.value,R();break}},ge=()=>{s.value<v.value||v.value==0?(P.value=!1,s.value++,he()):P.value=!0};return Le(()=>{D()}),Ne(()=>({path:T.path,query:T.query,refresh:n.state.refresh}),(e,c)=>{if(e.refresh!==c.refresh){s.value=+T.query.p||1,setTimeout(()=>{D()},0);return}c.path!=="/post"&&e.path==="/profile"&&(s.value=+T.query.p||1,setTimeout(()=>{D()},0))}),(e,c)=>{const W=xe,N=Xe,we=Ye,ne=Ue("router-link"),ke=et,ye=tt,x=at,be=st,Ie=qe,Pe=lt,S=Me,y=nt,C=$e,Oe=ze,Te=Ze,Ae=ot,Fe=Ke;return a(),i("div",null,[u(W,{title:"主页"}),o(n).state.userInfo.id>0?(a(),h(Te,{key:0,class:"main-content-wrap profile-wrap",bordered:""},{default:_(()=>[m("div",ut,[m("div",it,[u(N,{size:72,src:o(n).state.userInfo.avatar},null,8,["src"])]),m("div",rt,[m("div",ct,[m("strong",null,O(o(n).state.userInfo.nickname),1),m("span",null," @"+O(o(n).state.userInfo.username),1),o(n).state.userInfo.is_admin?(a(),h(we,{key:0,class:"top-tag",type:"error",size:"small",round:""},{default:_(()=>[E(" 管理员 ")]),_:1})):f("",!0)]),m("div",_t,[m("span",vt,"UID. "+O(o(n).state.userInfo.id),1),m("span",dt,O(o(Ve)(o(n).state.userInfo.created_on))+" 加入",1)]),m("div",mt,[m("span",ft,[u(ne,{onClick:c[0]||(c[0]=ue(()=>{},["stop"])),class:"following-link",to:{name:"following",query:{s:o(n).state.userInfo.username,n:o(n).state.userInfo.nickname,t:"follows"}}},{default:_(()=>[E(" 关注  "+O(o(G)(o(n).state.userInfo.follows)),1)]),_:1},8,["to"])]),m("span",pt,[u(ne,{onClick:c[1]||(c[1]=ue(()=>{},["stop"])),class:"following-link",to:{name:"following",query:{s:o(n).state.userInfo.username,n:o(n).state.userInfo.nickname,t:"followings"}}},{default:_(()=>[E(" 粉丝  "+O(o(G)(o(n).state.userInfo.followings)),1)]),_:1},8,["to"])]),m("span",ht," 泡泡  "+O(o(G)(o(n).state.userInfo.tweets_count)),1)])]),m("div",gt,[u(ye,{placement:"bottom-end",trigger:"click",size:"small",options:de.value,onSelect:me},{default:_(()=>[u(ke,{quaternary:"",circle:""},{icon:_(()=>[u(o(re),null,{default:_(()=>[u(o(Ge))]),_:1})]),_:1})]),_:1},8,["options"])])]),u(be,{class:"profile-tabs-wrap",type:"line",animated:"","onUpdate:value":pe},{default:_(()=>[u(x,{name:"post",tab:"泡泡"}),u(x,{name:"comment",tab:"评论"}),u(x,{name:"highlight",tab:"亮点"}),u(x,{name:"media",tab:"图文"}),u(x,{name:"star",tab:"喜欢"})]),_:1}),d.value&&l.value.length===0?(a(),i("div",wt,[u(Ie,{num:g.value},null,8,["num"])])):(a(),i("div",kt,[l.value.length===0?(a(),i("div",yt,[u(Pe,{size:"large",description:"暂无数据"})])):f("",!0),o(n).state.desktopModelShow?(a(),i("div",bt,[p.value==="post"?(a(),i("div",It,[(a(!0),i(b,null,I(A.value,t=>(a(),h(y,{key:t.id},{default:_(()=>[u(S,{post:t,isOwner:o(n).state.userInfo.id==t.user_id,addFollowAction:!0,onSendWhisper:w,onHandleFollowAction:k},null,8,["post","isOwner"])]),_:2},1024))),128))])):f("",!0),p.value==="comment"?(a(),i("div",Pt,[(a(!0),i(b,null,I(F.value,t=>(a(),h(y,{key:t.id},{default:_(()=>[u(S,{post:t,isOwner:o(n).state.userInfo.id==t.user_id,addFollowAction:!0,onSendWhisper:w,onHandleFollowAction:k},null,8,["post","isOwner"])]),_:2},1024))),128))])):f("",!0),p.value==="highlight"?(a(),i("div",Ot,[(a(!0),i(b,null,I(z.value,t=>(a(),h(y,{key:t.id},{default:_(()=>[u(S,{post:t,isOwner:o(n).state.userInfo.id==t.user_id,addFollowAction:!0,onSendWhisper:w,onHandleFollowAction:k},null,8,["post","isOwner"])]),_:2},1024))),128))])):f("",!0),p.value==="media"?(a(),i("div",Tt,[(a(!0),i(b,null,I(M.value,t=>(a(),h(y,{key:t.id},{default:_(()=>[u(S,{post:t,isOwner:o(n).state.userInfo.id==t.user_id,addFollowAction:!0,onSendWhisper:w,onHandleFollowAction:k},null,8,["post","isOwner"])]),_:2},1024))),128))])):f("",!0),p.value==="star"?(a(),i("div",At,[(a(!0),i(b,null,I($.value,t=>(a(),h(y,{key:t.id},{default:_(()=>[u(S,{post:t,isOwner:o(n).state.userInfo.id==t.user_id,addFollowAction:!0,onSendWhisper:w,onHandleFollowAction:k},null,8,["post","isOwner"])]),_:2},1024))),128))])):f("",!0)])):(a(),i("div",Ft,[p.value==="post"?(a(),i("div",zt,[(a(!0),i(b,null,I(A.value,t=>(a(),h(y,{key:t.id},{default:_(()=>[u(C,{post:t,isOwner:o(n).state.userInfo.id==t.user_id,addFollowAction:!0,onSendWhisper:w,onHandleFollowAction:k},null,8,["post","isOwner"])]),_:2},1024))),128))])):f("",!0),p.value==="comment"?(a(),i("div",Mt,[(a(!0),i(b,null,I(F.value,t=>(a(),h(y,{key:t.id},{default:_(()=>[u(C,{post:t,isOwner:o(n).state.userInfo.id==t.user_id,addFollowAction:!0,onSendWhisper:w,onHandleFollowAction:k},null,8,["post","isOwner"])]),_:2},1024))),128))])):f("",!0),p.value==="highlight"?(a(),i("div",$t,[(a(!0),i(b,null,I(z.value,t=>(a(),h(y,{key:t.id},{default:_(()=>[u(C,{post:t,isOwner:o(n).state.userInfo.id==t.user_id,addFollowAction:!0,onSendWhisper:w,onHandleFollowAction:k},null,8,["post","isOwner"])]),_:2},1024))),128))])):f("",!0),p.value==="media"?(a(),i("div",qt,[(a(!0),i(b,null,I(M.value,t=>(a(),h(y,{key:t.id},{default:_(()=>[u(C,{post:t,isOwner:o(n).state.userInfo.id==t.user_id,addFollowAction:!0,onSendWhisper:w,onHandleFollowAction:k},null,8,["post","isOwner"])]),_:2},1024))),128))])):f("",!0),p.value==="star"?(a(),i("div",xt,[(a(!0),i(b,null,I($.value,t=>(a(),h(y,{key:t.id},{default:_(()=>[u(C,{post:t,isOwner:o(n).state.userInfo.id==t.user_id,addFollowAction:!0,onSendWhisper:w,onHandleFollowAction:k},null,8,["post","isOwner"])]),_:2},1024))),128))])):f("",!0)]))])),u(Oe,{show:U.value,user:le.value,onSuccess:fe},null,8,["show","user"])]),_:1})):f("",!0),v.value>0?(a(),h(Fe,{key:1,justify:"center"},{default:_(()=>[u(o(Ee),{class:"load-more",slots:{complete:"没有更多泡泡了",error:"加载出错"},onInfinite:c[2]||(c[2]=t=>ge())},{spinner:_(()=>[m("div",St,[P.value?f("",!0):(a(),h(Ae,{key:0,size:14})),m("span",Ct,O(P.value?"没有更多泡泡了":"加载更多"),1)])]),_:1})]),_:1})):f("",!0)])}}}),ha=We(Lt,[["__scopeId","data-v-106c824e"]]);export{ha as default};
