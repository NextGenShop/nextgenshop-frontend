(this["webpackJsonpnextgenshop-frontend"]=this["webpackJsonpnextgenshop-frontend"]||[]).push([[0],{171:function(e,t){},173:function(e,t){},239:function(e){e.exports=JSON.parse("{}")},240:function(e,t,A){},241:function(e,t,A){"use strict";A.r(t);var n={};A.r(n),A.d(n,"GET_BASKET",(function(){return N})),A.d(n,"UPDATE_BASKET",(function(){return D})),A.d(n,"DELETE_BASKET",(function(){return G}));var r={};A.r(r),A.d(r,"updateBasket",(function(){return P})),A.d(r,"getBasket",(function(){return q})),A.d(r,"deleteBasket",(function(){return W})),A.d(r,"clearErrors",(function(){return Y}));var a={};A.r(a),A.d(a,"GET_PRODUCTS",(function(){return ue}));var c={};A.r(c),A.d(c,"getProducts",(function(){return de})),A.d(c,"clearErrors",(function(){return pe}));var o={};A.r(o),A.d(o,"getSpeechToTextToken",(function(){return Pe})),A.d(o,"getTextToSpeechToken",(function(){return qe}));var s={};A.r(s),A.d(s,"GET_USER",(function(){return Qe})),A.d(s,"LOGIN",(function(){return Ze})),A.d(s,"LOGOUT",(function(){return $e})),A.d(s,"REGISTER",(function(){return et}));var i={};A.r(i),A.d(i,"getUser",(function(){return nt})),A.d(i,"login",(function(){return rt})),A.d(i,"logout",(function(){return at})),A.d(i,"register",(function(){return ct})),A.d(i,"clearErrors",(function(){return ot}));var u=A(0),l=A.n(u),d=A(12),p=A.n(d),h=A(47),j=A(15),b=A(19),m=A(289),f=A(71),x=A(310),O=A(305),g=A(132),v=A.n(g),T=A(291),S=A(293),y=A(294),E=A(296),C=A(295),k=A(316),I=A(297),U="data:image/png;base64,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",w=A(18),V=A(11),N="basket/GET_BASKET",D="basket/UPDATE_BASKET",G="basket/DELETE_BASKET",L={items:[],totalPrice:0,shopper:0};function B(e){var t=e.auth.token;return t?{authorization:"Token ".concat(t)}:null}var R="/basket",P=function(e,t){return function(A,n){A({type:"API",name:D,url:"".concat(R,"/").concat(e),requestData:{method:"PUT",headers:B(n()),data:t}})}},q=function(e){return function(t,A){t({type:"API",name:N,url:"".concat(R,"/").concat(e),requestData:{method:"GET",headers:B(A())}})}},W=function(e){return function(t,A){t({type:"API",name:G,url:"".concat(R,"/").concat(e),requestData:{method:"DELETE",headers:B(A())}})}},Y=function(){return function(e){e({type:"".concat(D,"_CLEARERR")}),e({type:"".concat(N,"_CLEARERR")}),e({type:"".concat(G,"_CLEARERR")})}},F=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:L,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"".concat(N,"_SUCCESS"):case"".concat(D,"_SUCCESS"):return Object(V.a)(Object(V.a)({},e),{},{items:t.response.items,totalPrice:t.response.totalPrice,shopper:t.response.shopper});case"".concat(G,"_SUCCESS"):return L;default:return e}},J=A(141),X=A(127),K=A(2),H=Object(m.a)((function(e){return{list:{height:"29vh",overflowY:"scroll"},price:{color:e.palette.primary.dark,fontWeight:600,marginRight:e.spacing(2)},total:{fontWeight:"bold"}}}));var z=Object(w.connect)((function(e){return{basket:e.basket}}),(function(e){return{dispatchGetBasket:function(t){return e(r.getBasket(t))},dispatchUpdateBasket:function(t,A){return e(r.updateBasket(t,A))}}}))((function(e){var t=e.shopperId,A=e.dispatchUpdateBasket,n=e.dispatchGetBasket,r=e.basket,a=H();l.a.useEffect((function(){n()}),[n]);var c=function(e){var n=function(e,t){var A=t.items.map((function(t){return t.product.productId===e?t.quantity<=1?null:Object(V.a)(Object(V.a)({},t),{},{quantity:t.quantity-1}):t}));return{items:A=A.filter((function(e){return null!==e}))}}(e,r);A(t,n)};return Object(K.jsxs)(l.a.Fragment,{children:[Object(K.jsx)(T.a,{className:a.list,children:r&&r.items&&r.items.length>0?r.items.map((function(e){return Object(K.jsxs)(S.a,{children:[Object(K.jsx)(y.a,{children:Object(K.jsx)(k.a,{src:U})}),Object(K.jsx)(C.a,{primary:e.product.name,secondary:"Qty: "+e.quantity}),Object(K.jsxs)(E.a,{children:[Object(K.jsxs)(f.a,{className:a.price,display:"inline",children:["\xa3",(e.product.price*e.quantity).toFixed(2)]}),Object(K.jsx)(I.a,{edge:"end","aria-label":"delete",onClick:function(){return c(e.product.productId)},children:Object(K.jsx)(v.a,{})})]})]},e.product.productId)})):Object(K.jsx)(f.a,{variant:"subtitle2",children:"Your shopping basket is empty."})}),Object(K.jsxs)(f.a,{className:a.total,variant:"h6",component:"div",children:["Total:"," ",Object(K.jsxs)(f.a,{variant:"h6",display:"inline",children:["\xa3 ",r&&r.totalPrice?r.totalPrice.toFixed(2):0]})]})]})})),M=A(143),_=A(133),Q=A.n(_),Z=Object(m.a)((function(e){return{paper:{display:"flex",color:e.palette.text.secondary,background:"#eeeeee",height:"75vh",alignItems:"center",justifyContent:"center"}}}));function $(e){e.items;var t=Z();return Object(K.jsx)(M.a,{className:t.paper,children:Object(K.jsx)(Q.a,{})})}var ee=A(306),te=A(308),Ae=A(307),ne=A(304),re=A(299),ae=A(300),ce=A(303),oe=A(298),se=A(301),ie=A(302),ue="product/GET_PRODUCTS",le={products:[]},de=function(e,t,A){return function(n,r){var a={};e&&(a.query=e),t&&(a.retailer=t),A&&(a.limit=A),n({type:"API",name:ue,url:"/product",requestData:{method:"GET",headers:B(r()),params:a}})}},pe=function(){return function(e){e({type:"".concat(ue,"_CLEARERR")})}},he=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:le,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"".concat(ue,"_SUCCESS"):return Object(V.a)(Object(V.a)({},e),{},{products:t.response});default:return e}},je=Object(m.a)((function(e){return{root:{height:"29vh",overflowY:"scroll"},tooltip:{backgroundColor:"#f5f5f9",color:"rgba(0, 0, 0, 0.87)",maxWidth:300,border:"1px solid #dadde9"},card:{display:"flex"},details:{display:"flex",flexDirection:"column"},content:{flex:"1 0 auto"},buttons:{display:"flex",alignItems:"center",paddingLeft:e.spacing(1),paddingBottom:e.spacing(1)},media:{width:80},productText:{fontWeight:"bold",fontSize:"13px"},smallText:{fontSize:"12px"},mb:{marginBottom:e.spacing(2)}}}));var be=Object(w.connect)((function(e){return{products:e.product.products,basket:e.basket}}),(function(e){return{dispatchGetProducts:function(t,A,n){return e(c.getProducts(t,A,n))},dispatchUpdateBasket:function(t,A){return e(r.updateBasket(t,A))}}}))((function(e){var t=e.searchQuery,A=e.retailer,n=e.limit,r=e.tableView,a=e.products,c=e.shopperId,o=e.dispatchGetProducts,s=e.dispatchUpdateBasket,i=e.basket,u=je();l.a.useEffect((function(){o(t,A,n)}),[o,n,A,t]);var d=function(e){var t=function(e,t){var A=t.items.find((function(t){return t.product.productId===e.productId}));return{items:A?t.items.map((function(e){return e.product.productId===A.product.productId?Object(V.a)(Object(V.a)({},e),{},{quantity:e.quantity+1}):e})):[].concat(Object(J.a)(t.items),[{product:e,quantity:1}])}}(e,i);s(c,t)};return r?Object(K.jsx)(oe.a,{className:u.root,children:Object(K.jsx)(re.a,{size:"small","aria-label":"product catalog table",children:Object(K.jsx)(ae.a,{children:a.map((function(e){return Object(K.jsxs)(se.a,{children:[Object(K.jsx)(ie.a,{title:Object(K.jsx)("img",{alt:"product",className:u.media,src:U}),children:Object(K.jsx)(ce.a,{component:"th",scope:"row",children:e.name})}),Object(K.jsxs)(ce.a,{align:"right",children:["\xa3 ",e.price.toFixed(2)]}),Object(K.jsx)(ce.a,{align:"right",children:Object(K.jsx)(ne.a,{variant:"contained",size:"small",color:"primary",onClick:function(){return d(e)},children:"Add to basket"})})]},e.productId)}))})})}):Object(K.jsx)(O.a,{container:!0,spacing:2,className:u.root,children:a.map((function(e){return Object(K.jsx)(O.a,{item:!0,md:4,children:Object(K.jsxs)(ee.a,{className:u.card,children:[Object(K.jsxs)("div",{className:u.details,children:[Object(K.jsxs)(Ae.a,{className:u.content,children:[Object(K.jsx)(f.a,{className:u.productText,gutterBottom:!0,variant:"subtitle2",children:e.name}),Object(K.jsxs)(f.a,{className:u.smallText,display:"inline",variant:"body2",color:"textSecondary",component:"p",children:["Price:"," "]}),Object(K.jsxs)(f.a,{className:u.smallText,display:"inline",variant:"body2",color:"primary",component:"p",children:["\xa3 ",e.price.toFixed(2)]}),Object(K.jsx)("br",{}),Object(K.jsxs)(f.a,{className:u.smallText,display:"inline",variant:"body2",color:"textSecondary",component:"p",children:["Retailer:"," "]}),Object(K.jsx)(f.a,{className:u.smallText,display:"inline",variant:"body2",color:"primary",component:"p",children:e.retailer})]}),Object(K.jsx)("div",{className:u.buttons,children:Object(K.jsx)(ne.a,{variant:"contained",size:"small",color:"primary",onClick:function(){return d(e)},children:"Add to basket"})})]}),Object(K.jsx)(te.a,{className:u.media,image:U})]})},e.productId)}))})})),me=A(314),fe=A(309),xe=A(135),Oe=A.n(xe),ge=Object(m.a)((function(e){return{mb:{marginBottom:e.spacing(2)}}}));function ve(e){var t=e.value,A=e.onChange,n=ge();return Object(K.jsx)(me.a,{className:n.mb,id:"search",label:"Search for a product",fullWidth:!0,value:t,onChange:A,InputProps:{startAdornment:Object(K.jsx)(fe.a,{position:"start",children:Object(K.jsx)(Oe.a,{})})}})}var Te=A(58),Se=Object(m.a)((function(e){return{root:{paddingTop:e.spacing(2),paddingBottom:e.spacing(2)},media:{height:0,paddingTop:"56.25%"},mr:{marginRight:e.spacing(1)},mt:{marginTop:e.spacing(3)},divider:{marginTop:e.spacing(2),marginBottom:e.spacing(2)}}}));function ye(){var e=Se(),t=l.a.useState(""),A=Object(b.a)(t,2),n=A[0],r=A[1],a=Te[0].name;return Object(K.jsxs)(x.a,{maxWidth:"xl",className:e.root,children:[Object(K.jsxs)(O.a,{container:!0,spacing:3,children:[Object(K.jsxs)(O.a,{item:!0,md:6,children:[Object(K.jsx)(f.a,{variant:"subtitle1",display:"inline",className:e.mr,children:"Video Call"}),Object(K.jsxs)(f.a,{variant:"subtitle2",display:"inline",children:[" ","Customer Name"]})]}),Object(K.jsx)(O.a,{item:!0,xs:6,children:Object(K.jsx)(O.a,{container:!0,spacing:3,children:Object(K.jsx)(O.a,{item:!0,xs:12,children:Object(K.jsx)(f.a,{variant:"subtitle1",children:"Product Catalogue"})})})})]}),Object(K.jsxs)(O.a,{container:!0,spacing:3,children:[Object(K.jsx)(O.a,{item:!0,md:6,children:Object(K.jsx)($,{})}),Object(K.jsx)(O.a,{item:!0,xs:6,children:Object(K.jsx)(O.a,{container:!0,spacing:3,children:Object(K.jsxs)(O.a,{item:!0,xs:12,children:[Object(K.jsx)(ve,{value:n,onChange:function(e){r(e.target.value)}}),Object(K.jsx)(be,{tableView:!0,retailer:a,searchQuery:n,shopperId:0}),Object(K.jsx)("hr",{className:e.mt}),Object(K.jsx)(f.a,{variant:"subtitle1",children:"Customer Basket"}),Object(K.jsx)(z,{shopperId:0})]})})})]})]})}var Ee=A(315);function Ce(e){var t=e.value,A=e.onChange,n=Te.map((function(e){return e.name}));return Object(K.jsx)(Ee.a,{id:"retailers",fullWidth:!0,disableClearable:!0,options:n,value:t,onChange:A,renderInput:function(e){return Object(K.jsx)(me.a,Object(V.a)(Object(V.a)({},e),{},{label:"Retailer"}))}})}var ke=A(43),Ie=A.n(ke),Ue=A(70),we=A(137),Ve=A.n(we),Ne=A(138),De=A.n(Ne),Ge="tokens/GET_SPEECH_TO_TEXT_TOKEN",Le="tokens/GET_TEXT_TO_SPEECH_TOKEN",Be={speechToTextToken:null,speechToTextUrl:null,textToSpeechToken:null,textToSpeechUrl:null},Re="/tokens",Pe=function(){return function(e){e({type:"API",name:Ge,url:"".concat(Re,"/speech-to-text"),requestData:{method:"GET"}})}},qe=function(){return function(e){e({type:"API",name:Le,url:"".concat(Re,"/text-to-speech"),requestData:{method:"GET"}})}},We=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Be,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"".concat(Ge,"_SUCCESS"):return Object(V.a)(Object(V.a)({},e),{},{speechToTextToken:t.response.accessToken,speechToTextUrl:t.response.url});case"".concat(Le,"_SUCCESS"):return Object(V.a)(Object(V.a)({},e),{},{textToSpeechToken:t.response.accessToken,textToSpeechUrl:t.response.url});default:return e}},Ye=A(136),Fe=A.n(Ye),Je=Object(m.a)((function(e){return{paper:{display:"flex",color:e.palette.text.secondary,background:"#eeeeee",height:"75vh",alignItems:"center",justifyContent:"center"},inner:{display:"flex",flexDirection:"column",alignItems:"center"}}}));var Xe=Object(w.connect)((function(e){return{speechToTextToken:e.tokens.speechToTextToken,speechToTextUrl:e.tokens.speechToTextUrl,textToSpeechToken:e.tokens.textToSpeechToken,textToSpeechUrl:e.tokens.textToSpeechUrl}}),(function(e){return{dispatchGetSpeechToTextTokens:function(){return e(o.getSpeechToTextToken())},dispatchGetTextToSpeechTokens:function(){return e(o.getTextToSpeechToken())}}}))((function(e){var t=e.speechToTextToken,A=e.speechToTextUrl,n=e.textToSpeechToken,r=e.textToSpeechUrl,a=e.dispatchGetSpeechToTextTokens,c=e.dispatchGetTextToSpeechTokens,o=Je(),s=l.a.useState(!1),i=Object(b.a)(s,2),u=i[0],d=i[1],p=l.a.useState(!1),h=Object(b.a)(p,2),j=h[0],m=h[1],x=l.a.useState(null),O=Object(b.a)(x,2),g=O[0],v=O[1],T=l.a.useState(""),S=Object(b.a)(T,2),y=S[0],E=S[1];l.a.useEffect((function(){t&&A||a(),n&&r||c(),t&&A&&n&&r&&(console.log("Done loading tokens from API"),d(!0))}),[a,c,t,A,n,r]);var C=function(){var e=Object(Ue.a)(Ie.a.mark((function e(){var n,r;return Ie.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=null,e.prev=1,e.next=4,navigator.mediaDevices.getUserMedia({video:!1,audio:!0});case 4:n=e.sent,e.next=10;break;case 7:e.prev=7,e.t0=e.catch(1),console.log(e.t0);case 10:return r=Fe()({url:A,accessToken:t,objectMode:!0,extractResults:!0,format:!0,mediaStream:n,keepMicrophone:!0}),e.abrupt("return",r);case 12:case"end":return e.stop()}}),e,null,[[1,7]])})));return function(){return e.apply(this,arguments)}}(),k=function(){var e=Object(Ue.a)(Ie.a.mark((function e(){var t;return Ie.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return m(!0),e.next=3,C();case 3:(t=e.sent).on("data",(function(e){E(e.alternatives[0].transcript)})),t.on("error",(function(e){console.log(e),U()})),t.on("end",(function(){U()})),v(t);case 8:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),U=function(){m(!1),g&&(g.stop(),v(null))},w=j?Object(K.jsx)(I.a,{color:"secondary","aria-label":"stop",onClick:U,children:Object(K.jsx)(Ve.a,{fontSize:"large"})}):Object(K.jsx)(I.a,{color:"primary","aria-label":"speak",onClick:k,children:Object(K.jsx)(De.a,{fontSize:"large"})});return Object(K.jsx)(M.a,{className:o.paper,children:Object(K.jsxs)("div",{className:o.inner,children:[Object(K.jsx)(f.a,{variant:"h3",children:y}),u?Object(K.jsxs)(l.a.Fragment,{children:[Object(K.jsx)(f.a,{variant:"subtitle2",children:j?"Listening...":"Press the mic icon and start speaking"}),w]}):Object(K.jsx)(f.a,{variant:"subtitle2",children:"Loading... Please wait"})]})})})),Ke=Object(m.a)((function(e){return{root:{paddingTop:e.spacing(2),paddingBottom:e.spacing(2)},mt:{marginTop:e.spacing(3)}}}));var He=Object(w.connect)((function(e){return{authUser:e.auth.user}}),null)((function(e){var t=e.authUser,A=Ke(),n=l.a.useState(""),r=Object(b.a)(n,2),a=r[0],c=r[1],o=l.a.useState(Te[0].name),s=Object(b.a)(o,2),i=s[0],u=s[1];return Object(K.jsxs)(x.a,{maxWidth:"xl",className:A.root,children:[Object(K.jsxs)(O.a,{container:!0,spacing:3,children:[Object(K.jsx)(O.a,{item:!0,md:6,children:Object(K.jsx)(f.a,{variant:"subtitle1",children:"Artificial Cashier"})}),Object(K.jsx)(O.a,{item:!0,xs:6,children:Object(K.jsx)(f.a,{variant:"subtitle1",children:"Product Catalogue"})})]}),Object(K.jsxs)(O.a,{container:!0,spacing:3,children:[Object(K.jsx)(O.a,{item:!0,md:6,children:Object(K.jsx)(Xe,{})}),Object(K.jsxs)(O.a,{item:!0,xs:6,children:[Object(K.jsxs)(O.a,{container:!0,spacing:3,children:[Object(K.jsx)(O.a,{item:!0,xs:6,children:Object(K.jsx)(ve,{value:a,onChange:function(e){c(e.target.value)}})}),Object(K.jsx)(O.a,{item:!0,xs:6,children:Object(K.jsx)(Ce,{value:i,onChange:function(e,t){u(t)}})})]}),Object(K.jsx)(be,{retailer:i,searchQuery:a,limit:9,shopperId:t.userId}),Object(K.jsx)("hr",{className:A.mt}),Object(K.jsx)(f.a,{variant:"subtitle1",children:"Shopping Basket"}),Object(K.jsx)(z,{shopperId:t.userId})]})]})]})})),ze=A(311),Me=A(312),_e=Object(V.a)(Object(V.a)({},{API_URL:"https://api.nextgenshop.co.uk"}),{ENV:"production",HOME_URL:"https://www.nextgenshop.github.io/nextgenshop-frontend",APP_NAME:"NextGenShop"}),Qe="auth/GET_USER",Ze="auth/LOGIN",$e="auth/LOGOUT",et="auth/REGISTER",tt={token:localStorage.getItem("token"),isAuthenticated:!1,user:null},At="/auth",nt=function(){return function(e,t){e({type:"API",name:Qe,url:"".concat(At,"/user/"),requestData:{method:"GET",headers:B(t())}})}},rt=function(e){return function(t){t({type:"API",name:Ze,url:"".concat(At,"/login/"),requestData:{method:"POST",data:e}})}},at=function(){return function(){var e=Object(Ue.a)(Ie.a.mark((function e(t,A){return Ie.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t({type:"API",name:$e,url:"".concat(At,"/logout/"),requestData:{method:"GET",headers:B(A())}});case 1:case"end":return e.stop()}}),e)})));return function(t,A){return e.apply(this,arguments)}}()},ct=function(e){return function(t){t({type:"API",name:et,url:"".concat(At,"/register/"),requestData:{method:"POST",data:e}})}},ot=function(){return function(e){e({type:"".concat(Ze,"_CLEARERR")}),e({type:"".concat(et,"_CLEARERR")})}},st=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:tt,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"".concat(Qe,"_SUCCESS"):return Object(V.a)(Object(V.a)({},e),{},{isAuthenticated:!0,user:t.response});case"".concat($e,"_SUCCESS"):case"".concat(Qe,"_FAILURE"):return localStorage.removeItem("token"),Object(V.a)(Object(V.a)({},tt),{},{token:null});case"".concat(et,"_SUCCESS"):case"".concat(Ze,"_SUCCESS"):return localStorage.setItem("token",t.response.token),Object(V.a)(Object(V.a)({},e),{},{user:t.response.user,token:t.response.token,isAuthenticated:!0});default:return e}},it=A(35),ut=A.n(it),lt={timeOut:5e3,showCloseButton:!0,progressBar:!1,transitionIn:"fadeIn",transitionOut:"fadeOut"},dt=function(e,t,A,n){var r="info"===A?it.toastr.info:"warning"===A?it.toastr.warning:"danger"===A?it.toastr.error:it.toastr.success;n&&(lt.onShowComplete=n),r(e,t,lt)},pt=Object(m.a)((function(e){return{root:{flexGrow:1},title:{flexGrow:1}}}));var ht=Object(w.connect)((function(e){return{auth:e.auth}}),(function(e){return{dispatchLogout:function(){return e(i.logout())}}}))((function(e){var t=e.auth,A=e.dispatchLogout,n=pt();return Object(K.jsx)("div",{className:n.root,children:Object(K.jsx)(ze.a,{position:"sticky",children:Object(K.jsxs)(Me.a,{children:[Object(K.jsx)(f.a,{variant:"h6",className:n.title,children:_e.APP_NAME}),t&&t.isAuthenticated?Object(K.jsx)(ne.a,{color:"inherit",onClick:function(){A(),dt("","You have been logged out!","info")},children:"Logout"}):Object(K.jsxs)(l.a.Fragment,{children:[Object(K.jsx)(ne.a,{color:"inherit",component:h.b,to:"/login",children:"Login"}),Object(K.jsx)(ne.a,{color:"inherit",component:h.b,to:"/register",children:"Register"})]})]})})})}));var jt=Object(w.connect)((function(e){return{auth:e.auth}}),null)((function(e){var t=e.auth;if(t&&t.isAuthenticated&&t.user){var A="cashier"===t.user.type?Object(K.jsx)(ye,{}):Object(K.jsx)(He,{});return Object(K.jsxs)(l.a.Fragment,{children:[Object(K.jsx)(ht,{}),A]})}return Object(K.jsx)(j.a,{to:"/login"})})),bt=A(313),mt=A(76),ft=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1?arguments[1]:void 0,A=t.type,n=t.error,r=n;Array.isArray(n)&&(r=n[0]);var a=/(.*)_(REQUEST|FAILURE|CLEARERR)/.exec(A);if(!a)return e;var c=Object(b.a)(a,3),o=c[1],s=c[2];return Object(V.a)(Object(V.a)({},e),{},Object(mt.a)({},o,"FAILURE"===s?r:""))},xt=A(95),Ot=A.n(xt),gt=ft,vt=Object(m.a)((function(e){return{root:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",paddingTop:e.spacing(2),paddingBottom:e.spacing(2),height:"80vh"},heading:{paddingBottom:e.spacing(2)},mr:{marginRight:e.spacing(1)},mt:{marginTop:e.spacing(1)}}}));var Tt,St=(Tt=[s.LOGIN],function(e){return Ot()(Tt).map((function(t){return Ot.a.get(e,"error.".concat(t))})).compact().first()||""}),yt=Object(w.connect)((function(e){return{auth:e.auth,error:St(e)}}),(function(e){return{dispatchLogin:function(t){return e(i.login(t))},dispatchClearErrors:function(){return e(i.clearErrors())}}}))((function(e){var t=e.auth,A=e.error,n=e.dispatchLogin,r=e.dispatchClearErrors,a=vt(),c=l.a.useState(""),o=Object(b.a)(c,2),s=o[0],i=o[1],u=l.a.useState(""),d=Object(b.a)(u,2),p=d[0],h=d[1];return l.a.useEffect((function(){A&&dt("",A,"danger",r)}),[A,r]),t.isAuthenticated?Object(K.jsx)(j.a,{to:"/"}):Object(K.jsxs)(x.a,{className:a.root,maxWidth:"md",children:[Object(K.jsx)(f.a,{variant:"h4",className:a.heading,children:"NextGenShop Login"}),Object(K.jsx)(me.a,{label:"Email",value:s,onChange:function(e){return i(e.target.value)}}),Object(K.jsx)(me.a,{type:"password",label:"Password",value:p,onChange:function(e){return h(e.target.value)}}),Object(K.jsx)(ne.a,{className:a.mt,color:"primary",variant:"contained",onClick:function(e){(e.preventDefault(),s.trim()&&p)&&n({email:s,password:p});h("")},children:"Login"}),Object(K.jsx)(bt.a,{className:a.mt}),Object(K.jsxs)("div",{className:a.mt,children:[Object(K.jsx)(ne.a,{className:a.mr,variant:"contained",onClick:function(){n({email:"mockuser1@gmail.com",password:"password"})},children:"Login as shopper"}),Object(K.jsx)(ne.a,{variant:"contained",onClick:function(){n({email:"mockcashieruser@gmail.com",password:"password"})},children:"Login as cashier"})]}),Object(K.jsx)(f.a,{className:a.mt,variant:"caption",children:"These buttons are for testing purposes."})]})})),Et=Object(m.a)((function(e){return{heading:{paddingTop:e.spacing(2),paddingBottom:e.spacing(2)},paper:{display:"flex",color:e.palette.text.secondary,background:"#eeeeee",height:"50vh",alignItems:"center",justifyContent:"center"}}}));function Ct(){var e=Et();return Object(K.jsxs)(x.a,{maxWidth:"lg",children:[Object(K.jsx)(f.a,{variant:"h2",className:e.heading,children:"NextGenShop Cashier"}),Object(K.jsx)(M.a,{className:e.paper,children:"Waiting for customer..."})]})}var kt=Object(m.a)((function(e){return{heading:{paddingTop:e.spacing(2),paddingBottom:e.spacing(2)},paper:{display:"flex",color:e.palette.text.secondary,background:"#eeeeee",height:"50vh",alignItems:"center",justifyContent:"center"}}}));function It(){var e=kt();return Object(K.jsxs)(x.a,{maxWidth:"lg",children:[Object(K.jsx)(f.a,{variant:"h2",className:e.heading,children:"NextGenShop Cashier"}),Object(K.jsx)(M.a,{className:e.paper,children:"Waiting for customer..."})]})}A(221);var Ut=function(){return Object(K.jsxs)(l.a.Fragment,{children:[Object(K.jsx)(h.a,{basename:"/nextgenshop-frontend",children:Object(K.jsxs)(j.d,{children:[Object(K.jsx)(j.b,{exact:!0,path:"/",component:jt}),Object(K.jsx)(j.b,{path:"/login",component:yt}),Object(K.jsx)(j.b,{path:"/shop/queue",component:Ct}),Object(K.jsx)(j.b,{path:"/cashier/queue",component:It})]})}),Object(K.jsx)(ut.a,{timeOut:5e3,newestOnTop:!0,position:"top-center",transitionIn:"fadeIn",transitionOut:"fadeOut",progressBar:!0,closeOnToastrClick:!0,preventDuplicates:!0})]})},wt=A(139),Vt=A(34),Nt=A(140),Dt=A(80),Gt=A.n(Dt),Lt=A(96),Bt=(A(239),localStorage.getItem("basket")?JSON.parse(localStorage.getItem("basket")):{basketId:0,items:[],totalPrice:0,shopper:0}),Rt=function(e,t,A){var r={};if(t===s.GET_USER){var c=A.headers.authorization.split(" ")[1];e((r=Lt.find((function(e){return e.token===c})))?{type:"".concat(t,"_SUCCESS"),response:r}:{type:"".concat(t,"_FAILURE"),error:"Invalid token"})}else if(t===s.LOGIN)e((r=Lt.find((function(e){return e.email===A.data.email&&e.password===A.data.password})))?{type:"".concat(t,"_SUCCESS"),response:{user:r,token:r.token}}:{type:"".concat(t,"_FAILURE"),error:"Incorrect email or password"});else if(t===s.LOGOUT)e({type:"".concat(t,"_SUCCESS")});else{if(t===a.GET_PRODUCTS)return!1;if(t===n.UPDATE_BASKET)A.data.items&&(Bt.items=A.data.items),Bt.totalPrice=function(e){var t,A=0,n=Object(X.a)(e);try{for(n.s();!(t=n.n()).done;){var r=t.value;A+=r.product.price*r.quantity}}catch(a){n.e(a)}finally{n.f()}return A}(Bt.items),localStorage.setItem("basket",JSON.stringify(Bt)),e({type:"".concat(t,"_SUCCESS"),response:Bt});else if(t===n.GET_BASKET)e({type:"".concat(t,"_SUCCESS"),response:Bt});else{if(t!==n.DELETE_BASKET)return!1;Bt={basketId:0,items:[],totalPrice:0,shopper:0},localStorage.setItem("basket",JSON.stringify(Bt)),e({type:"".concat(t,"_SUCCESS"),response:Bt})}}return!0},Pt=function(e){var t=e.dispatch;return function(e){return function(A){if(e(A),"API"===A.type){var n=A.name,r=A.url,a=A.requestData,c=A.extraData;Gt.a.defaults.baseURL=_e.API_URL,Gt.a.defaults.headers.common["Content-Type"]="application/json";var o={url:r,method:a.method};a.headers&&(o.headers=a.headers),a.data&&(o.data=a.data),a.params&&(o.params=a.params),Rt(t,n,o)||(t({type:"".concat(n,"_REQUEST")}),Gt.a.request(o).then((function(e){var A=e.data;t({type:"".concat(n,"_SUCCESS"),response:A,extraData:c})})).catch((function(e){var A=e.response?e.response.data.error:"An unknown error has occurred";t({type:"".concat(n,"_FAILURE"),error:A})})))}}}},qt=Object(Vt.combineReducers)({toastr:it.reducer,auth:st,product:he,basket:F,tokens:We,error:gt}),Wt="production"===_e.ENV?Vt.compose:Nt.composeWithDevTools,Yt=[Object(Vt.applyMiddleware)(wt.a,Pt)],Ft=Object(Vt.createStore)(qt,Wt.apply(void 0,Yt));A(240);p.a.render(Object(K.jsx)(l.a.StrictMode,{children:Object(K.jsx)(w.Provider,{store:Ft,children:Object(K.jsx)(Ut,{})})}),document.getElementById("root"))},58:function(e){e.exports=JSON.parse('[{"retailerId":0,"name":"Mock Retailer A"},{"retailerId":1,"name":"Mock Retailer B"},{"retailerId":2,"name":"Mock Retailer C"}]')},96:function(e){e.exports=JSON.parse('[{"userId":0,"fullName":"Mock User 1","email":"mockuser1@gmail.com","password":"password","type":"shopper","token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTW9jayBVc2VyIDEifQ.CnOm194RXYztVQnGS6viXczUdfzZxDEVzF3UxAEsT8o"},{"userId":1,"fullName":"Mock Cashier User","email":"mockcashieruser@gmail.com","password":"password","type":"cashier","token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTW9jayBDYXNoaWVyIFVzZXIifQ.bwyFTfHeHgumUDcCouZbwVfrFt7EzBngfxkJ-XXx3Xo"},{"userId":2,"fullName":"Mock User 2","email":"mockuser2@gmail.com","password":"password","type":"shopper","token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTW9jayBVc2VyIDIifQ.AN6kDMph64I1D2EWiwFSQjTthyMjY_7oyuuOKJKWr6A"}]')}},[[241,1,2]]]);
//# sourceMappingURL=main.b156928f.chunk.js.map