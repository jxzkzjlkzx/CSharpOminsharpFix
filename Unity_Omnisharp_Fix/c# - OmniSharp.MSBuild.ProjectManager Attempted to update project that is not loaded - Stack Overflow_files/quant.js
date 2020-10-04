/* Copyright (c) 2008-2020, Quantcast Corp. */
!function(window){function RequireDependencyError(n){Error.apply(this),this.name="RequireDependencyError",this.message=n||""}RequireDependencyError.prototype=Error.prototype;var amd={},definitions={};amd.require=function(n,e){"function"==typeof n&&(e=n,n=[]);for(var t=[],r=0;r<n.length;r++){var i=n[r];if(!definitions.hasOwnProperty(i))throw new RequireDependencyError("No module named "+i+" has been defined");t[r]=definitions[i]}return e.apply({},t)};var array=Array.prototype,available=function(n,e){return"function"==typeof n[e]},map="map",forEach="forEach",reduce="reduce",indexOf="indexOf";with(available(array,map)||(array[map]=function(n,e){var t=[];e||(e=this);for(var r=0;r<this.length;r++)t[r]=n.call(e,this[r],r,this);return t}),available(array,forEach)||(array[forEach]=array[map]),available(array,reduce)||(array[reduce]=function(n,e){var t=0;for(void 0===e&&(e=this[t++]);t<this.length;t++)e=n.call(this,e,this[t],t,this);return e}),available(array,indexOf)||(array[indexOf]=function(n){for(var e=0;e<this.length;e++)if(this[e]==n)return e;return-1}),amd.define=function(n,e,t){definitions.hasOwnProperty(n)||(definitions[n]=amd.require(e,t))},amd)define("quant/origin",[],function(){return function(n){for(var e=n.domain||"",t=new Date(0).toUTCString(),r=e.split("."),i=1;i<=r.length;i++){var a=r.slice(-i).join("."),o="_dlt=1; domain="+a;if(n.cookie=o,/_dlt=1/.test(n.cookie))return n.cookie=o+"; expires="+t,a}return e}}),define("quant/windows",[],function(){return function(n,e){if(void 0===n)throw new Error("window many not be undefined");if(void 0===e)throw new Error("top may not be undefined");e=e.self,this.depth=0;var t=n.self;for(this.top=t;t!==e;){t=t.parent.self;try{t.location.href&&(this.url=t.location.href,this.top=t)}catch(n){}this.depth++}this.locate=function(t){for(var r=n;;){try{if(t in r.frames)return r}catch(n){}if(r===e)break;r=r.parent.self}}}}),define("quant/log",[],function(){function n(n,e){this.isDebug=/qcdbgc=1$/.test(window.location.toString());var t=function(){return(new Date).toString()},r=function(r,i){"undefined"!=typeof console&&console.log(r+" "+t()+" "+i),e&&"ERROR"==r&&n.beacon("//"+e+"/log/"+r.toLowerCase()+"?msg="+encodeURI(i))};this.error=function(n,e){void 0!==e&&void 0!==e.stack&&(n+=" caused by "+e.message+" at:\n"+e.stack),r("ERROR",n)},this.debug=function(n){this.isDebug&&r("DEBUG",n)}}return n}),define("quant/ready",[],function(){function n(){var n=!1,e=[];document.readyState in{complete:!0,interactive:!0}&&(n=!0);var t=function(){for(n=!0;e.length>0;)e.shift()()};document.addEventListener?(document.addEventListener("DOMContentLoaded",t,!1),window.addEventListener("load",t,!1)):document.attachEvent&&(document.attachEvent("onreadystatechange",t,!1),window.attachEvent("onload",t)),this.ready=function(t){n?t():e.push(t)}}return(new n).ready}),define("quant/promise",[],function(){function n(c){var u,s,f=[],l=e,d=function(n){return n},p=function(n,e,t,r){try{var a=n(r);i(a)?(a.then(e),a.catch(t)):e(a)}catch(n){t(n)}},v=function(n){u=n,l=t,f.forEach(function(e){e.push(n),p.apply(0,e)})},h=function(n){s=n,l=r,f.forEach(function(e){e[r](n)})},g=function(n,e,t){return function(r){p(n,e,t,r)}};try{c(v,h)}catch(n){h(n)}return{then:function(i){switch(l){case e:return new n(function(n,e){f.push([i,n,e])});case t:return a(i(u));case r:return o(s)}},catch:function(i){switch(l){case e:return new n(function(n,e){f.push([d,n,g(i,n,e)])});case t:return a(u);case r:return a(i(s))}}}}var e=0,t=1,r=2,i=function(n){return"object"==typeof n&&"then"in n&&"function"==typeof n.then},a=function(n){return i(n)?n:{then:function(e){return a(e(n))},catch:function(n){return this}}},o=function(n){return{then:function(n){return this},catch:function(e){return a(e(n))}}};return n.resolve=a,n.reject=o,n.all=function(n){return n.length?n.map(function(n){return n.then(function(n){return[n]})}).reduce(function(n,e){return n.then(function(n){return e.then(function(e){return n.concat(e)})})}):a([])},n}),define("quant/loader",["quant/ready","quant/promise"],function(n,e){function t(t,r){var i,a=[];n(function(){i=r.getElementsByTagName("head")[0]});var o=function(n){var e=new Image;return e.src=n,e};this.image=function(n){return new e(function(e,t){var r=o(n);a.push(r),r.onload=function(){e(r),a.shift(),delete r.onload,delete r.onerror},r.onerror=t})},this.beacon=function(n){var e=t.navigator;e&&e.sendBeacon?e.sendBeacon(n):o(n)};var c=function(n,e,t){var i=r.createElement("script");i.type="text/javascript",i.src=n;var a=function(){e(i),i.onreadystatechange=null,i.onload=null,i.onerror=null};return i.onload=a,i.onreadystatechange=function(){i.readyState in{loaded:1,complete:1}&&a()},i.onerror=t,i};this.script=function(t){return new e(function(e,r){n(function(){var n=c(t,e,r);i.firstChild?i.insertBefore(n,i.firstChild):i.appendChild(n)})})}}return t}),define("quant/json",[],function(){var localJSON=window.JSON||{};return void 0!==localJSON.stringify&&'{"test":["1"]}'===localJSON.stringify({test:["1"]})||(localJSON.stringify=function(n){var e=typeof n;if("object"!==e||null===n)return"string"===e&&(n='"'+n+'"'),String(n);var t,r,i=[],a=n&&n.constructor===Array;for(t in n)r=n[t],"function"!==(e=typeof r)&&("string"===e?r='"'+r+'"':"object"===e&&null!==r&&(r=localJSON.stringify(r)),i.push((a?"":'"'+t+'":')+String(r)));return(a?"[":"{")+String(i)+(a?"]":"}")},localJSON.parse=localJSON.parse||function(string){return eval("("+string+")")}),localJSON}),define("quant/event",[],function(){function n(){this.add=function(n,e,t){n.addEventListener?n.addEventListener(e,t):"function"==typeof jQuery?jQuery(n).on(e,t):n.attachEvent&&n.attachEvent("on"+e,t)},this.remove=function(n,e,t){n.removeEventListener?n.removeEventListener(e,t):"function"==typeof jQuery?jQuery(n).off(e,t):n.detachEvent&&n.detachEvent("on"+e,t)},this.trigger=function(n,e,t){var r=n.ownerDocument;if(n.dispatchEvent&&r.createEvent){var i=r.createEvent("Event");if(i.initEvent(e,!0,!0),void 0!==t)for(var a in t)a in i||(i[a]=t[a]);n.dispatchEvent(i)}else"function"==typeof jQuery&&jQuery(n).trigger(e,t)}}return new n}),define("quant/now",[],function(){return function(){return(new Date).getTime()}}),define("quant/consent/truste",["quant/json","quant/promise","quant/event","quant/now"],function(n,e,t,r){return function(i,a,o,c,u,s,f,l){var d,p={},v=function(n){var e=n.source[0];return"p"+n.consent[0]+("a"==e?"e":"i")};"object"==typeof c&&"function"==typeof c.callApi?(!0,d=function(n,t,r,i){var a=c.callApi(t,i,l,u,r);return n.cm=v(a),e.resolve(!0)}):d=function(c,s,f,d){return i.depth>0&&(t.add(a,"message",function(e){var t=e.data;if("string"==typeof t&&t.indexOf("PrivacyManagerAPI")>0)try{t=n.parse(t)}catch(n){return}else if(void 0!==t.PrivacyManagerAPI){var r=t.PrivacyManagerAPI;c.cm=v(r)}}),o.postMessage(n.stringify({PrivacyManagerAPI:{timestamp:r(),action:s,self:d,domain:l,authority:u,type:f}}),"*")),e.resolve(!0)},this.consent=function(n){return d(n,"getConsent",s,f)},this.parameters=p}}),define("quant/consent/uspapi",["quant/promise","quant/json","quant/event","quant/now"],function(n,e,t,r){return function(i,a,o,c,u){var s;if("function"==typeof c)s=function(e,t){return new n(function(n,e){c("getUSPData",t,function(t,r){r&&void 0!==t?n(t.uspString):e(t)})}).catch(function(n){return o.error("[USPAPI] unsuccessful: "+n),!0})};else{var f=(i.locate(u),{});t.add(a,"message",function(n){var t=n.data;if("string"==typeof t&&"{"==t[0])try{t=e.parse(t)}catch(n){return}if(t.hasOwnProperty("__uspapiReturn")){var r=t.__uspapiReturn,i=r.callId,a=f[i];if(void 0===a)return;r.success?a[RESOLVE](r.returnValue):a[REJECT](r.returnValue)}}),s=function(e,t){var a=i.locate(u);if(void 0===a)return n.resolve(void 0);var o=r();return new n(function(n,r){f[o]=[n,r],a.postMessage({__uspapiCall:{command:e,version:t,callId:o}})})}}this.consent=function(n){return s("getUSPData",1).then(function(e){return e&&"string"==typeof e.uspString&&(n.us_privacy=e.uspString),!0})}}}),define("quant/consent/tcf1.1",["quant/promise","quant/json","quant/event","quant/now"],function(n,e,t,r){return function(i,a,o,c,u){var s,f;if("function"==typeof c)f=function(e,t){return new n(function(n,r){c(e,t,function(e,t){t?n(e):r(e)})})};else{var l={};t.add(a,"message",function(n){var t=n.data;if(void 0===t)return void o.error("[TCF]: Recieved undefined message");if("string"==typeof t&&"{"==t[0])try{t=e.parse(t)}catch(n){return}if(t.hasOwnProperty("__cmpReturn")){var r=t.__cmpReturn,i=r.callId,a=l[i];if(void 0===a)return;r.success?a[0](r.returnValue):a[1](r.returnValue)}}),f=function(t,a){var o=i.locate(u);if(void 0===o)return n.resolve({gdprApplies:!1});var c=r();return new n(function(n,r){l[c]=[n,r],o.postMessage(e.stringify({__cmpCall:{command:t,parameter:a,callId:c}}),"*")})}}this.consent=function(n){return void 0===s&&(s=f("getVendorConsents",[11]).then(function(e){return e.gdprApplies&&"false"!=e.gdprApplies?(n.gdpr=1,f("getConsentData",null).then(function(t){n.gdpr_consent=t.consentData;var r=e.purposeConsents||e.purposes,i=!0;return"object"==typeof r&&(i=r[1]),i&&(i=!e.vendorConsents||e.vendorConsents[11]),i})):(n.gdpr=n.gdpr||0,!0)}).catch(function(e){return o.error(e),n.gdpr=n.gdpr||0,!0})),s}}}),define("quant/consent-manager",["quant/promise","quant/json"],function(n,e){return function(e){var t,r={},i=function(i){return void 0===t&&(t=n.all(e.map(function(n){return n.consent(r)})).then(function(n){return n.reduce(function(n,e){return n&&e},!0)})),t.then(function(n){if(n)return i()})};this.consent=i,this.wrap=function(n){return function(){var e=this,t=arguments;return i(function(){return n.apply(e,t)})}},this.parameters=r}}),define("quant/consent/tcf2.0",["quant/promise","quant/json","quant/event","quant/now"],function(n,e,t,r){function i(n,e){var t=e.gdprApplies,r=e.purpose,i=e.vendor,a=i&&i.consents&&i.consents[f],o=i&&i.legitimateInterests&&i.legitimateInterests[f],c=e.publisher?e.publisher.restrictions:{};return!t||n.map(function(n){var e=!!r.consents&&r.consents[n],t=!!r.legitimateInterests&&r.legitimateInterests[n],i=c&&c[n]?c[n][f]:null;return 0!==i&&(!(!a||!e||2===i||-1==d.indexOf(n)&&1!==i)||!(1===i||!o||!t||n===s||-1!=d.indexOf(n)&&2!==i))}).reduce(function(n,e){return n&&e},!0)}function a(a,s,f,d,y){var q,m;if("function"==typeof d)m=function(e,t){return new n(function(n,r){d(e,p,function(t,i){if(i){var a=t.eventStatus;e===v&&t.gdprApplies&&"useractioncomplete"!==a&&"tcloaded"!==a||n(t)}else r(t)},t)})};else{var w={},_={};t.add(s,"message",function(n){var t=n.data;if(void 0===t)return void f.error(o+"Recieved undefined message");if("string"==typeof t&&"{"==t[0])try{t=e.parse(t)}catch(n){return}if(t.hasOwnProperty(h)){var r=t[h],i=r.callId,a=w[i];if(void 0===a)return;var s=r.returnValue;r.success?_[i]===v&&s.gdprApplies&&"useractioncomplete"!==s.eventStatus&&"tcloaded"!==s.eventStatus||a[c](s):a[u](s)}}),m=function(t,i){var o=a.locate(y);if(void 0===o)return n.resolve({gdprApplies:!1});var c=r();return new n(function(n,r){w[c]=[n,r],_[c]=t;var a={};a[g]={command:t,parameter:i,version:p,callId:c},o.postMessage(e.stringify(a),"*")})}}this.consent=function(n){return void 0===q&&(q=m(v).then(function(e){return e.gdprApplies&&"false"!=e.gdprApplies?(n.gdpr=1,n.gdpr_consent=e.tcString):n.gdpr=n.gdpr||0,i(l,e)}).catch(function(e){return f.error(e),n.gdpr=n.gdpr||0,!0})),q}}var o="[TCF2]: ",c=0,u=1,s="1",f=11,l=[s,"3","7","8","9","10"],d=[s,"3"],p=2,v="addEventListener",h="__tcfapiReturn",g="__tcfapiCall";return a.resolveConsent=i,a}),define("quant/qtrack",[],function(){function n(n,e){for(var t in e)e.hasOwnProperty(t)&&(n[t]=e[t])}function e(e,t,a){for(var o=0;o<r.length;o++){var c={qacct:r[o],labels:a?e:"_fp.event."+e,event:"refresh"};if(n(c,i),void 0!==t&&null!==t)for(var u in t)t.hasOwnProperty(u)&&("product_id"===u&&t[u].constructor===Array&&(t[u]=t[u].join(",")),c[s[u]||u]=t[u]);window._qevents.push(c)}}function t(t,s,f){if(t===o){if(-1!==r.indexOf(s))return;r.push(s);var l={qacct:s};n(i,f),n(l,i),window._qevents.push(l)}else t===c?-1!==a.indexOf(s)?e(s,f,!1):console.warn("Unsupported event by track, please use "+u+" for this event."):t===u&&e(s,f,!0)}var r,i,a=["PageView","ViewContent","Search","AddToWishlist","AddToCart","InitiateCheckout","AddPaymentInfo","Purchase","Lead","Register","StartTrial","Subscribe","SubmitApplication"],o="init",c="track",u="trackCustom",s={order_id:"orderid",value:"revenue"};return function(){if(window.qtrack||(window.qtrack=function(){window.qtrack.impl.apply(window.qtrack,arguments)}),!window.qtrack.impl&&(r=[],i={},window.qtrack.impl=t,window.qtrack&&window.qtrack.q))for(;window.qtrack.q.length>0;)t.apply(t,window.qtrack.q.shift())}}),define("quant.js",["quant/origin","quant/windows","quant/log","quant/loader","quant/consent/truste","quant/consent/uspapi","quant/consent/tcf1.1","quant/consent-manager","quant/consent/tcf2.0","quant/qtrack"],function(n,e,t,r,i,a,o,c,u,s){return void 0===window.__qc&&(window.__qc=function(s,f,l){if(s.__qc)return s.__qc;var d,p,v,h,g,y,q,m,w,_,b,E,O,S,P,j,k,C,x,A,I,R,D,T,M,N,L,z,J,U,V,B,Q,F,G,W,Z,$,H,K,X,Y,nn,en,tn,rn,an,on,cn,un=n(f),sn=new e(s,s.top),fn=new r(s,f),ln=new t(fn,"quantcount.com"),dn=new c([new i(sn,s,s.top,s.PrivacyManagerAPI,"truste.com","advertising","quantserve.com",un),new a(sn,s,ln,s.__uspapi,"__uspapiLocator"),new o(sn,s,ln,s.__cmp,"__cmpLocator"),new u(sn,s,ln,s.__tcfapi,"__tcfapiLocator")]),pn=["a","ce","cm","dst","enc","fpa","fpan","je","ns","ogl","rf","tzo","sr"],vn=["4dcfa7079941","127fdf7967f31","588ab9292a3f","32f92b0727e5","22f9aa38dfd3","a4abfe8f3e04","18b66bc1325c","958e70ea2f28","bdbf0cb4bbb","65118a0d557","40a1d9db1864","18ae3d985046","3b26460f55d"],hn=!1,gn=!1,yn=0,qn=[],mn=[],wn=[],_n=[],bn={},En=0,On=null,Sn={},Pn={},jn=null,kn=[].slice;!function(){var n;n=f.createElement("script"),d="async"in n?1:n.readyState?2:3,n=null}();var Cn=function(n){try{return{init:O,hash:E,push:S,rules:G,require:require,hasRules:Z,defaults:X,__qc:function(){return!0}}[n].apply(null,kn.call(arguments,1))}catch(n){return ln.error(n),!1}};return Cn.evts=0,Cn.v=2,Cn.SD=vn,Cn.qpixelsent=[],F=function(n){var e,t=n?n.length||0:0;for(e=0;e<t;e++)if(!n[e])return!1;return!0},K=function(n){(n=n||s._qacct)&&(J(_n,n)||_n.push(n))},J=function(n,e){var t,r=n.length;for(t=0;t<r;t++)if(n[t]===e)return!0;return!1},B=function(n){return{}.toString.call(n).match(/\s([a-zA-Z]+)/)[1].toLowerCase()},Q=function(n){var e,t,r;if("array"===(t=B(n)))return n.slice(0);if("object"===t){e={};for(r in n)n.hasOwnProperty(r)&&(e[r]=n[r]);return e}return"string"===t?""+n:n},S=function(n,e){x(n,e)},Z=function(n){return J(wn,n)},X=function(n,e){var t;n&&(t=Sn[n],t&&(e=rn(e,t)),e.qacct&&delete e.qacct,Sn[n]=e)},Y=function(n){var e,t,r,i,a,o;if(g(n)){a=n;for(i in a){if("string"==typeof a[i]){e=n.event||"load",t=n.media||"webpage","rule"!==e&&"load"!==e||"webpage"!==t&&"ad"!==t?x(n):(o=n.qacct||s._qacct,n.qacct=o,r=Pn[o],r=r?rn(r,n):n,Pn[o]=r),K(n.qacct);break}"object"==typeof a[i]&&null!=a[i]&&Y(a[i])}}},rn=function(n,e){var t={};return t.qacct=n.qacct||e.qacct,"load"===n.event||"load"===e.event?t.event="load":n.event&&e.event?t.event=n.event||e.event:t.event=null,t.media=null,"webpage"===n.media||"webpage"===e.media?t.media="webpage":"ad"===n.media||"ad"===e.media?t.media="ad":t.media=n.media||e.media,N(t,n,e),N(t,e,n),t.event||delete t.event,t.media||delete t.media,t},N=function(n,e,t){var r,i,a,o,c,u;for(r in e)e.hasOwnProperty(r)&&!n.hasOwnProperty(r)&&(i=e[r],a=t[r],o="",c=!!i&&"string"==typeof i,u=!!a&&"string"==typeof a,c&&(o=i),c&&u&&(o+=","),u&&(o+=a),n[r]=o)},nn=function(){var n,e,t=[];if(!(En>0)){V();for(n in Pn)Pn.hasOwnProperty(n)&&Pn[n]&&(e=Pn[n],t.push(e),delete Pn[n]);1==t.length&&x(t[0]),t.length>1&&x(t)}},en=function(){var n,e,t,r=[];for(t=_n.slice(0),n=0;n<t.length;n++)e=t[n],Z(e)||r.push(e);if(0===r.length)nn();else for(n=0;n<r.length;n++)e=r[n],wn.push(e),L(e)},z=function(n,e,t,r){var i;if(n=s.location.protocol+"//"+n,On=On||f.scripts[0],i=f.createElement("script"),1===d)i.src=n,i.async=!0,i.onload=e,t&&(i.onerror=function(n){i.onerror=null,t(n)}),On.parentNode.insertBefore(i,On);else if(2===d){var a=!1;i.onload=i.onreadystatechange=function(){a||"loaded"!=i.readyState&&"complete"!=i.readyState||(a=!0,i.onreadystatechange=null,e())},i.src=n,On.parentNode.insertBefore(i,On)}else r&&r()},L=function(n){En++,z("rules.quantcount.com/rules-"+n+".js",function(){bn[n]=2===d?2:0,tn()},function(e){bn[n]=1,tn()},function(){bn[n]=4,tn()})},tn=function(){En-=En>0?1:0,nn()},G=function(){var n,e,t,r=!0;if(arguments.length){for(t=function(n){r?Y(n):x(n,!0)},n=0;n<arguments.length;n++)e=kn.call(arguments[n],0),e.splice(1,0,t),W.apply(null,e);r=!1,hn&&nn()}},W=function(n,e){var t,r,i,a,o,c,u,s=[],f=[],l=e||x;if((r=kn.call(arguments,2))&&r.length){for(i=r[0]||F,a=r[1],o=r[2],t=o.length,c=0;c<t;c++)s.push(!1),f.push(null);u={p:n,f:s,r:i,c:o,a:a,v:f},Z(n)||wn.push(n),mn.push(u),$(u,l)}else wn.push(n),bn[n]=6},$=function(n,e){var t,r=n&&n.c?n.c.length:0;for(t=0;t<r;t++)!function(t){var r,i;try{r=n.c[t][0],i=n.c[t].slice(1),i.splice(0,0,function(r){n.f[t]=!0,n.v[t]=r,H(n,e)}),r.apply(null,i)}catch(r){n.f[t]=!0,n.v[t]=!1,H(n,e)}}(t)},H=function(n,e){var t,r,i,a,o,c,u,s=n.a,f=n.f,l=n.v,d=n.r||F;if(t=F(f),t&&(t=t&&d(l)),t)for(o=0;o<s.length;o++)try{r=s[o][0],i=s[o].length>1?s[o].slice(1):[],i=i.concat(n.v),a=r.apply(null,i),c={qacct:n.p,event:"rule"};for(u in a)a.hasOwnProperty(u)&&"qacct"!==u&&(c[u]=a[u]);e(c)}catch(n){continue}},p=function(){return v(0)!==v(6)?1:0},v=function(n){var e=new Date(2e3,n,1,0,0,0,0),t=e.toGMTString();return e-new Date(t.substring(0,t.lastIndexOf(" ")-1))},h=function(n){return n.replace(/\./g,"%2E").replace(/,/g,"%2C")},y="function"==typeof encodeURIComponent?encodeURIComponent:h,g=function(n){return void 0!==n&&null!=n},q=function(){return Math.round(2147483647*Math.random())},m=function(n){var e,t,r,i="",a=f.cookie;return a?(e=a.indexOf(n+"="),t=e+n.length+1,e>-1&&(r=a.indexOf(";",t),r<0&&(r=a.length),i=a.substring(t,r)),i):i},k=function(n){return"P0-"+q()+"-"+n.getTime()},j=function(n,e,t){return["__qca=",n,"; expires=",e.toGMTString(),"; path=/; domain=",t].join("")},P=function(){var n,e,t,r,i=["",""];if(1===yn)return i[0]=";fpan=u;fpa=",i;for(n=E(un),r=0;r<vn.length;r++)if(vn[r]===n)return i[0]=";fpan=u;fpa=",i;return e=new Date,t=m("__qca"),t.length>0||jn?(0===t.length&&(t=jn,i[1]=j(jn,new Date(e.getTime()+338688e5),un)),i[0]=";fpan=0;fpa="+t):(jn=k(e),i[1]=j(jn,new Date(e.getTime()+338688e5),un),i[0]=";fpan=1;fpa="+jn),i},w=function(){var n=P()[1];n&&(f.cookie=n)},_=function(n){f.cookie=n+"=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/; domain="+un},b=function(n,e){var t;for(t=0;t<e.length;t++)n^=e.charCodeAt(t),n+=(n<<1)+(n<<4)+(n<<7)+(n<<8)+(n<<24);return n},E=function(n){var e,t,r,i;return e=2166136261,t=3386659096,r=b(e,n),i=b(t,n),Math.round(Math.abs(r*i)/65536).toString(16)},T=function(n){var e,t;if(n&&"object"===B(n))for(t=0;t<pn.length;t++)e=pn[t],n.hasOwnProperty(e)&&n[e]&&delete n[e]},D=function(n,e,t){var r,i,a,o,c,u={},f=s._qacct,l=null,d="webpage",p="load",v={};if(f=e?e.qacct||s._qacct:s._qacct,c=Pn[f],e?c&&(e=rn(e,c)):e=c,f&&delete Pn[f],T(e),null!=e)for(a in e)v[a]=void 0!==e[a],e.hasOwnProperty(a)&&"string"==typeof a&&"string"==typeof e[a]&&("uid"!==a&&"uh"!==a?"qacct"!==a&&(e[a].length>0?u[a+n]=y(e[a]):v[a]=!1,"media"===a&&(d=e[a]),"event"===a&&(p=e[a])):(C()||(l=E(e[a])),delete e[a]));if("string"!=typeof f){if(!g(s._qacct)||0===s._qacct.length)return null;f=s._qacct}if(!f)return null;if(i=Sn[f])for(a in i)"string"==typeof a&&i.hasOwnProperty(a)&&!v[a]&&(u[a+n]=y(i[a]),"media"===a&&(d=i[a]),"event"===a&&(p=i[a]));if(r=bn[f],g(r)||(r=3),u["rf"+n]=""+r,"string"==typeof l&&(e.uh=l,u["uh"+n]=y(l)),"webpage"===d&&"load"===p){for(o=0;o<Cn.qpixelsent.length;o++)if(Cn.qpixelsent[o]===f&&!t)return null;Cn.qpixelsent.push(f)}return"ad"===d&&(yn=1),u["a"+n]=f,u},R=function(n){var e,t=[];for(e in n)n[e]&&n.hasOwnProperty(e)&&t.push(e+"="+n[e]);return t.join(";")},M=function(){var n,e,t,r,i,a=f.getElementsByTagName("meta"),o="";for(n=0;n<a.length;n++){if(i=a[n],o.length>=1e3)return o;g(i)&&g(i.attributes)&&g(i.attributes.property)&&g(i.attributes.property.value)&&g(i.content)&&(e=i.attributes.property.value,t=i.content,e.length>3&&"og:"===e.substring(0,3)&&(o.length>0&&(o+=","),r=t.length>80?80:t.length,o+=h(e.substring(3,e.length))+"."+h(t.substring(0,r))))}return y(o)},C=function(){var n,e=!1;return g(s.external)&&(n=s.external,e="function"==typeof n.InPrivateFilteringEnabled&&!0===n.InPrivateFilteringEnabled()),e||"1"==l.doNotTrack||"yes"===l.doNotTrack||"1"==l.msDoNotTrack},x=function(n,e){var t,r,i,a,o,c,u,d,v,h,m="function"==typeof encodeURIComponent?"n":"s",w=q(),_="",b="",E="",O="",S="",j="u",k="1",C=[];if(yn=0,g(Cn.qpixelsent)||(Cn.qpixelsent=[]),g(n)){if("object"===(v=B(n)))i=D("",n,e);else if("array"===v)for(o=0;o<n.length;o++)h=D("."+(o+1),n[o],e),i=0===o?h:rn(i,h)}else"string"==typeof _qacct&&(i=D("",null,e));i&&(t=l.cookieEnabled?"1":"0",void 0!==l.javaEnabled&&(j=l.javaEnabled()?"1":"0"),g(s._qmeta)&&(b=";m="+y(s._qmeta),s._qmeta=null),self.screen&&(_=screen.width+"x"+screen.height+"x"+screen.colorDepth),c=new Date,u=p(),d=P()[0],s.location&&s.location.href&&(E=y(s.location.href)),f&&f.referrer&&(S=y(f.referrer)),s.self===s.top&&(k="0"),i.url?O=E:i.url=E,i.ref||(i.ref=S||""),r=M(),a=R(i),C.push("/pixel;r="+w+";"+a+d+";ns="+k+";ce="+t+";qjs=1;qv=7298e392-20200929010851"),C.push((i.ref?"":";ref=")+";d="+un+";je="+j+";sr="+_+";enc="+m+";dst="+u+";et="+c.getTime()+";tzo="+c.getTimezoneOffset()+(O?";ourl="+O:"")+b+";ogl="+r),qn.push(C),I())},A=function(n){dn.consent(function(){return!0}).then(function(n){return n?"quantserve.com":"quantcount.com"}).then(function(e){var t=dn.parameters;return fn.image(["//pixel.",e,n[0],";cm=",t.cm,1===t.gdpr?";gdpr=1;gdpr_consent="+t.gdpr_consent:";gdpr=0",t.us_privacy?";us_privacy="+t.us_privacy:"",n[1]].join("")).then(function(n){n&&"number"==typeof n.width&&3===n.width?_("__qca"):w()})})},I=function(){for(;qn.length;)A(qn.shift())},an=function(){var n,e,t=arguments;for(U([].slice.call(t)),e=0;e<t.length;e++)n=t[e],x(n);_n.length?en():nn()},U=function(n){var e,t=B(n);if("array"===t)for(e=0;e<n.length;e++)U(n[e]);else"object"===t&&K(n.qacct||s._qacct)},V=function(){var n;if(gn||s._qevents.length||s.ezt.length||"undefined"==typeof _qacct||(x({qacct:s._qacct}),gn=!0),!Cn.evts){for(n in s._qevents)s._qevents[n]!==s._qevents.push&&s._qevents.hasOwnProperty(n)&&x(s._qevents[n]);for(n in s.ezt)s.ezt[n]!==s.ezt.push&&s.ezt.hasOwnProperty(n)&&x(s.ezt[n]);s._qevents={push:an},s.ezt.push=function(){var n,e=arguments;if(g(s.queueManager))for(n=0;n<e.length;n++)s.queueManager.push(e[n]);else an.apply(this,arguments)},Cn.evts=1}},cn=function(n){var e;n&&(e=Q(n),U(n),s._qevents.push(e),n=null)},on=function(n){n.push=function(){return U([].slice.call(arguments)),en(),[].push.apply(n,arguments)}},O=function(){g(s._qevents)||(s._qevents=[]),g(s.ezt)||(s.ezt=[]),cn(s._qoptions),cn(s.qcdata),cn(s.smarttagdata),Cn.evts||(on(s._qevents),on(s.ezt)),U(s.ezt),U(s._qevents),U({qacct:s._qacct}),s._qoptions=null,_n.length?en():nn(),hn=!0},s.quantserve=s.quantserve||O,Cn.quantserve=O,Cn}(window,window.document,window.navigator)),window.quantserve(),s(),window.__qc})}(window);