import{_ as j}from"./whisper-Vl-V0ytb.js";import{_ as D,a as R}from"./post-item.vue_vue_type_style_index_0_lang-hfTPUkT_.js";import{_ as q}from"./post-skeleton-zm5tFcFD.js";import{_ as E}from"./main-nav.vue_vue_type_style_index_0_lang-9UCTRVDk.js";import{u as G}from"./vuex-qScXS-uk.js";import{b as J}from"./vue-router-4Hko0_3l.js";import{W as L}from"./v3-infinite-loading-9ocfqcSa.js";import{U as Z,u as K,f as Q,_ as X}from"./index-8lD1klqH.js";import{d as Y,H as t,b as ee,f as n,k as a,w as u,v as d,Z as h,e as o,bf as f,F as b,x as $,j as z,t as oe}from"./@vue-Hd4uXz5f.js";import{F as se,G as te,a as ne,J as ae,k as ie,H as le}from"./naive-ui-h5SFsZhx.js";import"./content-fOn-h7ea.js";import"./@vicons-V6UxFD2Y.js";import"./paopao-video-player-iTSRV7j7.js";import"./copy-to-clipboard-l6UqHK6O.js";import"./@babel-5-cIlDoe.js";import"./toggle-selection-fekekO1r.js";import"./vooks-v147mXjr.js";import"./evtd-9ZCiDXyn.js";import"./axios-kMxbiGYq.js";import"./moment-jIwEdMgI.js";/* empty css               */import"./seemly-hKSMrbh9.js";import"./vueuc-xP2DxDTa.js";import"./@css-render-oW_PeE7K.js";import"./vdirs-gz97tqc5.js";import"./@juggle--NVrOerG.js";import"./css-render-Adblu2bf.js";import"./@emotion-vV6BesBt.js";import"./lodash-es-KEIJqYRD.js";import"./treemate-hmrDCADh.js";import"./async-validator-BHjhHa7C.js";import"./date-fns-E8ESfRGG.js";const re={key:0,class:"skeleton-wrap"},_e={key:1},ue={key:0,class:"empty-wrap"},ce={key:1},me={key:2},pe={class:"load-more-wrap"},de={class:"load-more-spinner"},fe=Y({__name:"Collection",setup(ve){const v=G(),A=J(),B=se(),c=t(!1),_=t(!1),s=t([]),l=t(+A.query.p||1),w=t(20),m=t(0),g=t(!1),k=t({id:0,avatar:"",username:"",nickname:"",is_admin:!1,is_friend:!0,is_following:!1,created_on:0,follows:0,followings:0,status:1}),y=e=>{k.value=e,g.value=!0},I=()=>{g.value=!1},x=e=>{B.success({title:"提示",content:"确定"+(e.user.is_following?"取消关注":"关注")+"该用户吗？",positiveText:"确定",negativeText:"取消",onPositiveClick:()=>{e.user.is_following?K({user_id:e.user.id}).then(r=>{window.$message.success("操作成功"),C(e.user_id,!1)}).catch(r=>{}):Q({user_id:e.user.id}).then(r=>{window.$message.success("关注成功"),C(e.user_id,!0)}).catch(r=>{})}})};function C(e,r){for(let p in s.value)s.value[p].user_id==e&&(s.value[p].user.is_following=r)}const F=()=>{c.value=!0,Z({page:l.value,page_size:w.value}).then(e=>{c.value=!1,e.list.length===0&&(_.value=!0),l.value>1?s.value=s.value.concat(e.list):(s.value=e.list,window.scrollTo(0,0)),m.value=Math.ceil(e.pager.total_rows/w.value)}).catch(e=>{c.value=!1,l.value>1&&l.value--})},M=()=>{l.value<m.value||m.value==0?(_.value=!1,l.value++,F()):_.value=!0};return ee(()=>{F()}),(e,r)=>{const p=E,O=q,P=ae,H=D,S=le,N=R,T=j,U=te,V=ie,W=ne;return o(),n("div",null,[a(p,{title:"收藏"}),a(U,{class:"main-content-wrap",bordered:""},{default:u(()=>[c.value&&s.value.length===0?(o(),n("div",re,[a(O,{num:w.value},null,8,["num"])])):(o(),n("div",_e,[s.value.length===0?(o(),n("div",ue,[a(P,{size:"large",description:"暂无数据"})])):h("",!0),f(v).state.desktopModelShow?(o(),n("div",ce,[(o(!0),n(b,null,$(s.value,i=>(o(),d(S,{key:i.id},{default:u(()=>[a(H,{post:i,isOwner:f(v).state.userInfo.id==i.user_id,addFollowAction:!0,onSendWhisper:y,onHandleFollowAction:x},null,8,["post","isOwner"])]),_:2},1024))),128))])):(o(),n("div",me,[(o(!0),n(b,null,$(s.value,i=>(o(),d(S,{key:i.id},{default:u(()=>[a(N,{post:i,isOwner:f(v).state.userInfo.id==i.user_id,addFollowAction:!0,onSendWhisper:y,onHandleFollowAction:x},null,8,["post","isOwner"])]),_:2},1024))),128))]))])),a(T,{show:g.value,user:k.value,onSuccess:I},null,8,["show","user"])]),_:1}),m.value>0?(o(),d(W,{key:0,justify:"center"},{default:u(()=>[a(f(L),{class:"load-more",slots:{complete:"没有更多收藏了",error:"加载出错"},onInfinite:M},{spinner:u(()=>[z("div",pe,[_.value?h("",!0):(o(),d(V,{key:0,size:14})),z("span",de,oe(_.value?"没有更多收藏了":"加载更多"),1)])]),_:1})]),_:1})):h("",!0)])}}}),Ze=X(fe,[["__scopeId","data-v-735372fb"]]);export{Ze as default};
