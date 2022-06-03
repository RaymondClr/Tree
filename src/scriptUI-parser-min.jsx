// prettier-ignore
var parseScriptUI=function(){function t(t,n,e){switch(e.length){case 0:return t.call(n);case 1:return t.call(n,e[0]);case 2:return t.call(n,e[0],e[1]);case 3:return t.call(n,e[0],e[1],e[2]);default:return t.apply(n,e)}}function n(t,n){for(var e=-1,r=t.length;++e<r;)n(t[e],e,t)}function e(t,n){for(var e=-1,r=t.length,o=Array(r);++e<r;)o[e]=n(t[e],e,t);return o}function r(t){return F([].slice.call(arguments,1),function(n){if(C(n))for(var e in n)t[e]=n[e]}),t}function o(t,n){n=c(n,t);for(var e=0,r=n.length;null!=t&&e<r;)t=t[B(n[e++])];return e&&e==r?t:void 0}function i(t){return Object.prototype.toString.call(t)}function f(t,n){return u(t,n,function(n,e){return v(t,e)})}function u(t,e,r){var o={};return n(e,function(n){var e=t[n];r(e,n)&&(o[n]=e)}),o}function a(t){if("string"==typeof t)return t;if(y(t))return e(t,a)+"";var n=t+"";return"0"==n&&1/t==-En?"-0":n}function c(t,n){if(y(t))return t;return w(t,n)?[t]:j(D(t))}function l(t,n){if(null==n||n<1)return[];for(var e=[],r=0,o=t.length;r<o;)e.push([].slice.call(t,r,r+=n));return e}function s(t){if(!L(t))return t;return y(t)?t.slice():r({},t)}function h(t){var n=y(t)?[]:{};return L(t)&&b(t,function(t,e,r){v(r,e)&&(n[e]=L(t)?h(t):t)}),n}function p(t){return function(){return t}}function d(t,n){for(var e=-1,r=t.length;++e<r;)if(t[e]===n)return!0;return!1}function b(t,e){var r=y(t)?n:F;return r(t,e)}function g(t,n,e){var r=null==t?void 0:t[n];return void 0===r?e:r}function v(t,n){return null!=t&&Object.prototype.hasOwnProperty.call(t,n)}function y(t){return"[object Array]"===i(t)}function x(t){return!0===t||!1===t}function k(t){return"function"==typeof t}function w(t,n){if(y(t))return!1;var e=typeof t;if("number"==e||"boolean"==e||null==t)return!0;return Hn.test(t)||!qn.test(t)||null!=n&&t in Object(n)}function O(t){return null==t}function m(t){return null===t}function S(t){return"number"==typeof t}function C(t){var n=typeof t;return null!=t&&("object"==n||"function"==n)}function L(t){return null!=t&&"object"==typeof t}function T(t){return"string"==typeof t}function I(t){var n=[];for(var e in t)t.hasOwnProperty(e)&&n.push(e);return n}function z(t,n){var e={};return F(t,function(t,r,o){e[r]=n(t,r,o)}),e}function P(t,n){if(null==t)return{};for(var e={},r=0,o=t.length;r<o;r++)n?e[t[r]]=n[r]:e[t[r][0]]=t[r][1];return e}function F(t,e){n(I(t),function(n){e(t[n],n,t)})}function W(t,n){return e(t,A(n))}function A(t){return function(n){return n[t]}}function j(t){var n=[];return 46===t.charCodeAt(0)&&n.push(""),t.replace(Jn,function(t,e,r,o){n.push(r?o.replace(Mn,"$1"):e||t)}),n}function R(t,n){for(var e=-1,r=Array(t);++e<t;)r[e]=n(e);return r}function B(t){if("string"==typeof t)return t;var n=t+"";return"0"==n&&1/t==-En?"-0":n}function D(t){return null==t?"":a(t)}function N(t,n){return delete t[n],t}function U(t){for(var n=I(t),e=n.length,r=new Array(e),o=0;o<e;o++)r[o]=t[n[o]];return r}function E(){for(var n=t(Math.max,null,W(arguments,"length").concat(0)),e=new Array(n),r=0;r<n;r++)e[r]=W(arguments,""+r);return e}function V(n,e,r,o){var i=nn(r)?_:X;return t(i,null,arguments)}function M(n,e){var o=Qt(n.type)?G:Y;r(t(o,null,arguments),Lt(e))}function X(t,n,e){return r(kn(t,e,In(n,e)),Lt(n))}function Y(t,n,e){e=ee&&Dt(e)?"button":e;var r=Nt(e)?ht:wn;return r(t,e,In(n,e))}function _(t,n,e,o){var i=Lt(n),f=mn(t,$t(n));return i.expanded&&o.nodes.push(f),r(f,N(i,"expanded"))}function G(t,n){return On(t,$t(n))}function q(t,n,e){return vt(n,function(n,r,i,f){var u=o(t,i);o(e,i)(u)&&(f[r]=u)}),n}function H(t,n,e){b(t,function(r,o){e(r,o,n.concat(o),t),L(r)&&H(r,n.concat(o),e)})}function J(t,n,e,r,o){F(t,function(t,i){if(i=xt(i).toLowerCase(),!sn(i)||Gt(n.type,i))return;if(Bt(i)){var f=e(n,t,i,o);J(t,f,e,r,o)}else r(n,t,i)})}function K(t){return g(t,"config")}function Q(t){return g(t,"param")}function Z(t){var n=g(t,"param");return y(n)?yn(n):[]}function tt(t){var n=g(t,"style");return C(n)?n:{}}function nt(t,n){var e=Wt(t,n),r=new yt;return J(t,e,V,M,r),wt(r.nodes),e}function et(t,n,e,r){var o=nt(t,n);return Ft(o,r),pn(o)&&e&&o.show(),o}function rt(t,n,e,r){var o=null;return function(){return qt(o)&&(o=nt(t,n)),Ft(o,r),pn(o)&&e&&o.show(),o}}function ot(n){var e=n?rt:et;return t(e,null,[].slice.call(arguments,1))}function it(){var t=this.graphics.measureString(this.text,this.font),n=this.graphics.measureString(this.text,this.font,t[0]),e=Zn?Ot(n[0],this.text):n[0],r=(this.width-e)/2+this.left+this.fontOffset[0],o=re?fe:(this.height-n[1])/2+this.top+this.fontOffset[1];return[r+Ie[0],o+Ie[1]]}function ft(t){return ScriptUI.newFont(t.fontName,gn(t.fontStyle),t.fontSize)}function ut(n,r){var o=e(r,function(e){return t(Sn,n,e)});return P(xe,o)}function at(t,n,e){var o=mt(e,n);O(o)&&(o={});var i=g(e,1,Ue.bounds),u=g(e,2,Ue.text),a={text:u,properties:{name:o.name}},c=t.add(ct(n,a),i),l=r(f(o,ve),{bounds:i,text:u});return l=q(vn(l),h(Me),Ye),dt(c,n,l)}function ct(t,n){return dn(t)+st(n)}function lt(t,n,e){var o=mt(e,n);O(o)&&(o={});var i=g(e,1,Ee.bounds),u=g(e,2,Ee.text),a={text:u,properties:{name:o.name}},c=t.add(ct(n,a),i),l=r(f(o,ye),{bounds:i,text:u});return l=q(vn(l),h(Xe),_e),dt(c,n,l)}function st(t){return kt(uneval(t))}function ht(t,n,e){var r={rectbutton:at,roundbutton:lt};return r[n](t,n,e)}function pt(t,n){var e=t.graphics,r="rectbutton"===n?"rectPath":"ellipsePath",o="rectbutton"===n?bt:gt;return t.onDraw=function(){var n=new o(t);e[r](n.left,n.top,n.width,n.height),n.enableFill&&e.fillPath(n.pen.fill),n.enableStroke&&e.strokePath(n.pen.stroke),n.enableText&&e.drawString(n.text,n.pen.text,n.textX,n.textY,n.font)},t}function dt(t,n,e){var o=t.graphics,i=ut(o,xn(e)),u=ft(bn(e));return r(o,f(e,we),{pen:i.mouseout,font:u}),pt(Wn(An(t,i)),n)}function bt(t){this.graphics=t.graphics,this.enableText=this.graphics.enableText,this.enableFill=this.graphics.enableFill,this.enableStroke=this.graphics.enableStroke,this.fontOffset=this.graphics.fontOffset,this.pen=this.graphics.pen,this.text=t.text,this.font=this.graphics.font,this.left=0,this.top=0,this.width=t.size[0]-ie,this.height=t.size[1]-ie,this.textLocation=it.call(this),this.textX=this.textLocation[0],this.textY=this.textLocation[1]}function gt(t){this.graphics=t.graphics,this.enableText=this.graphics.enableText,this.enableFill=this.graphics.enableFill,this.enableStroke=this.graphics.enableStroke,this.fontOffset=this.graphics.fontOffset,this.pen=this.graphics.pen,this.text=t.text,this.font=this.graphics.font,this.left=this.pen.stroke.lineWidth,this.top=this.pen.stroke.lineWidth,this.width=t.size[0]-2*this.left-ie,this.height=t.size[1]-2*this.top-ie,this.textLocation=it.call(this),this.textX=this.textLocation[0],this.textY=this.textLocation[1]}function vt(n,e){H(n,[],function(n){L(n)||t(e,null,arguments)})}function yt(){this.nodes=[]}function xt(t){return t.replace(Vn,"")}function kt(t){return t.replace(Xn,"")}function wt(t){n(t,function(t){t.expanded=!0})}function Ot(t,n){var e=n.length;return t/((e+ue)/e)}function mt(t,n){return t[St(n)]}function St(t){if(tn(t))return he[t];if(Nt(t))return de[t];if(Bt(t))return pe[t]}function Ct(t){return y(t)?yn(t):Z(t)}function Lt(t){return y(t)?{}:tt(t)}function Tt(t,n){return rn(n)?n:new Window(t[0],t[1],t[2],t[3])}function $t(t){var n=C(t)?Q(t):t;return String(n)}function It(t){return e(zt(t),function(t){return t/255})}function zt(t){var n;return t=t.replace(_n,"$1$1$2$2$3$3"),t.replace(Gn,function(t,e,r,o){n=[parseInt(e,16),parseInt(r,16),parseInt(o,16)]}),n}function Pt(t,n){return It(t).concat(n)}function Ft(t,n){t.layout.layout(n),t.layout.resize()}function Wt(t,n){var e=Tt(jn(Z(t)),n);return e.onResizing=e.onResize=Cn,r(e,tt(t))}function At(t){return parseInt(Dn.appVersion)===t}function jt(t,n){return function(e){return S(e)&&e>=t&&e<=n}}function Rt(t){return null!=t&&"[object BridgeTalk]"===i(t)}function Bt(t){return Zt(t)||Qt(t)}function Dt(t){return d(ke,t)}function Nt(t){return v(de,t)}function Ut(t){return"dropdownlist"===t}function Et(t){return jt(0,3)(t)||T(t)&&Yn.test(t)}function Vt(t){return t===Bn}function Mt(t){return null!=t&&"[object global]"===i(t)}function Xt(t){return null!=t&&"[object $]"===i(t)}function Yt(t){return T(t)&&Gn.test(t)}function _t(t){return Kn===t}function Gt(t,n){return Kt(t)&&!en(n)||an(t)&&!cn(n)}function qt(t){return null===t||!t.visible}function Ht(t){return t.button===be}function Jt(t){return"listbox"===t}function Kt(t){return Ut(t)||Jt(t)}function Qt(t){return an(t)||Kt(t)}function Zt(t){return v(pe,t)}function tn(t){return v(he,t)}function nn(t){return"node"===t}function en(t){return"item"===t}function rn(t){return t instanceof Panel}function on(t){return rn(t)}function fn(t){return t.button===ge}function un(t){return"treeview"===t}function an(t){return un(t)||nn(t)}function cn(t){return nn(t)||en(t)}function ln(t){return Vt(t)||on(t)}function sn(t){return tn(t)||Bt(t)||en(t)||Nt(t)}function hn(t,n){return!!t&&d(n,t.appName)}function pn(t){return t instanceof Window}function dn(t){return Ce[t]}function bn(t){return f(t,me)}function gn(t){return T(t)?ScriptUI.FontStyle[t.toUpperCase()]:t}function vn(t){return z(t,function(t,n){return d(Oe,n)&&!y(t)?R(4,p(t)):t})}function yn(t){return e(t,function(t){return m(t)?void 0:t})}function xn(n){return e(t(E,null,U(f(n,Se))),function(n){var r=l(n,3),o=E(r[0],r[1]),i=e(o,function(n){return t(Pt,null,n)});return i.concat(r[2])})}function kn(t,n,e){return t.add(n,e[1],e[2],e[3])}function wn(t,n,e){return t.add(n,e[1],e[2],e[3],e[4],e[5])}function On(t,n){return t.add("item",n)}function mn(t,n){return t.add("node",n)}function Sn(t,n,e,r){return{text:this.newPen(this.PenType.SOLID_COLOR,t,1),fill:this.newBrush(this.BrushType.SOLID_COLOR,n),stroke:this.newPen(this.PenType.SOLID_COLOR,e,r)}}function Cn(){this.layout.resize()}function Ln(n){if(!C(n))return null;var e=t(ot,null,Tn(n,Ln));return oe.push(e),e}function Tn(t,n){var e=r(s(Ve),K(t)),o=!!e.show,i=!!e.dockable,f=!!e.singleton,u=$n(n.context,i,f),a=zn(n.layoutMode,e.layoutMode);return[f,t,u,o,a]}function $n(t,n,e){if(e||!n)return Window;if(ln(Rn))return Rn;return ln(t)?t:Window}function In(t,n){return Fn(Ct(t),n)}function zn(t,n){if(jt(0,2)(n))return n;if(jt(0,2)(t))return t;return 0}function Pn(t,e){n(xe,function(n){t.addEventListener(n,e)})}function Fn(t,n){var e=t[0];if(O(e))return t;var r=St(n),o=t[r];if(C(o)||(t[r]={}),v(o,"name"))return t;return t[r].name=e,t}function Wn(t){return t.addEventListener("mouseup",function(n){n.stopPropagation(),k(t.onClick)&&Ht(n)&&t.onClick()}),t}function An(t,n){return Pn(t,function(e){if(e.stopPropagation(),fn(e))return;t.graphics.pen=n[e.type],t.notify("onDraw")}),t}function jn(t){var n=String(t[0]);return t[0]=d(ce,n)?n:se,t}var Rn=this,Bn=Xt($)&&Mt($.global)&&$.global,Dn=!!Bn&&Rt(Bn.BridgeTalk)&&Bn.BridgeTalk,Nn=["aftereffects","photoshop","illustrator","indesign","estoolkit"];if(!hn(Dn,Nn))throw"不受支持的宿主应用";var Un="0.2.0",En=1/0,Vn=/\d/g,Mn=/\\(\\)?/g,Xn=/\)$|^\(/g,Yn=/REGULAR|BOLD|ITALIC|BOLDITALIC/i,_n=/^#?([a-f\d])([a-f\d])([a-f\d])$/gi,Gn=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/gi,qn=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,Hn=/^\w*$/,Jn=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,Kn=Dn.appName,Qn=_t("aftereffects"),Zn=_t("photoshop"),te=_t("illustrator"),ne=_t("indesign"),ee=Qn&&At(16),re=te||ne,oe=[],ie=Zn?1:0,fe=te?4.5:5,ue=2.4,ae={aftereffects:["dialog","palette","window"],photoshop:"dialog",illustrator:["dialog","palette","window"],indesign:"dialog",estoolkit:["dialog","palette","window"]},ce=ae[Kn],le={aftereffects:"palette",photoshop:"dialog",illustrator:"palette",indesign:"dialog",estoolkit:"palette"},se=le[Kn],he={button:3,checkbox:3,dropdownlist:3,edittext:3,flashplayer:3,iconbutton:3,image:3,listbox:3,progressbar:5,radiobutton:3,scrollbar:5,slider:5,statictext:3,treeview:3},pe={group:2,panel:3,tab:3,tabbedpanel:3},de={rectbutton:3,roundbutton:3,angle:3},be=0,ge=2,ve=["enableText","enableFill","enableStroke","fontName","fontStyle","fontSize","fontOffset","fontColor","fillColor","strokeColor","fontOpacity","fillOpacity","strokeOpacity","strokeWidth"],ye=ve,xe=["mouseover","mouseout","mousedown","mouseup"],ke=["rectbutton","roundbutton"],we=["enableText","enableFill","enableStroke","fontOffset"],Oe=["fontColor","fillColor","strokeColor","fontOpacity","fillOpacity","strokeOpacity","strokeWidth"],me=["fontName","fontStyle","fontSize"],Se=["fontColor","fillColor","strokeColor","fontOpacity","fillOpacity","strokeOpacity","strokeWidth"],Ce={rectbutton:"customView",roundbutton:"customView",angle:"customBoundedValue"},Le={aftereffects:2,photoshop:1,illustrator:2,indesign:2,estoolkit:2},Te=R(4,p(Le[Kn])),$e={aftereffects:[0,0],photoshop:[0,0],illustrator:[0,2],indesign:[0,3],estoolkit:[0,-1]},Ie=$e[Kn],ze={aftereffects:["#161616","#8a8a8a","#161616","#ffffff"],photoshop:["#f0f0f0","#f0f0f0","#f0f0f0","#ffffff"],illustrator:["#4b4b4b","#ffffff","#ffffff","#ffffff"],indesign:["#4b4b4b","#ffffff","#ffffff","#ffffff"],estoolkit:["#000000","#000000","#000000","#000000"]},Pe=ze[Kn],Fe={aftereffects:["#8a8a8a","#232323","#636363","#2d8ceb"],photoshop:["#454545","#454545","#363636","#454545"],illustrator:["#ffffff","#535353","#46a0f5","#46a0f5"],indesign:["#ffffff","#535353","#46a0f5","#46a0f5"],estoolkit:["#e5f1fb","#e1e1e1","#cce4f7","#e5f1fb"]},We=Fe[Kn],Ae={aftereffects:["#8a8a8a","#8a8a8a","#636363","#2d8ceb"],photoshop:["#666666","#666666","#636363","#1473e7"],illustrator:["#ffffff","#ffffff","#46a0f5","#46a0f5"],indesign:["#ffffff","#ffffff","#46a0f5","#46a0f5"],estoolkit:["#0078d7","#adadad","#005499","#0078d7"]},je=Ae[Kn],Re={aftereffects:[0,0,80,28],photoshop:[0,0,65,25],illustrator:[0,0,80,26],indesign:[0,0,80,28],estoolkit:[0,0,78,23]},Be=Re[Kn],De={aftereffects:[0,0,30,30],photoshop:[0,0,28,28],illustrator:[0,0,28,28],indesign:[0,0,30,30],estoolkit:[0,0,23,23]},Ne=De[Kn],Ue={text:"",bounds:Be},Ee={text:"",bounds:Ne},Ve={dockable:!0,show:!0,singleton:!1},Me={enableText:!0,enableFill:!0,enableStroke:!0,fontName:"Tahoma",fontStyle:"REGULAR",fontSize:12,fontOffset:[0,0],fontColor:Pe,fillColor:We,strokeColor:je,fontOpacity:[1,1,1,1],fillOpacity:[1,1,1,1],strokeOpacity:[1,1,1,1],strokeWidth:Te},Xe=Me,Ye={enableText:x,enableFill:x,enableStroke:x,fontName:T,fontStyle:Et,fontSize:jt(1,24),fontOffset:[S,S],fontColor:[Yt,Yt,Yt,Yt],fillColor:[Yt,Yt,Yt,Yt],strokeColor:[Yt,Yt,Yt,Yt],fontOpacity:[jt(0,1),jt(0,1),jt(0,1),jt(0,1)],fillOpacity:[jt(0,1),jt(0,1),jt(0,1),jt(0,1)],strokeOpacity:[jt(0,1),jt(0,1),jt(0,1),jt(0,1)],strokeWidth:[jt(0,10),jt(0,10),jt(0,10),jt(0,10)]},_e=Ye;return Ln.version=Un,Ln}.call(this);
