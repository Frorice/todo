!function(t,n,r){function e(t){t=t||{},t.macros&&(this._macros=t.macros),this._links={},this._rules={},this.TRUNK=null,this.cache=$(t.maxCache||200),this.cache.set("",[[]])}function i(t){return et.parse(t)}function o(t,n){return n?t.nodeName===n:1===t.nodeType}function u(t,n){var t=t.firstChild;return!t||o(t,n)?t:s(t,n)}function a(t,n){var t=t.lastChild;return!t||o(t,n)?t:c(t,n)}function c(t,n){for(;t=t.previousSibling;)if(o(t,n))return t;return t}function s(t,n){for(;t=t.nextSibling;)if(o(t,n))return t;return t}function f(t,n){var r=ot[n];if(r)return"function"==typeof r?r(t):t[r];if(at)return t.getAttribute(n);var e=t.getAttributeNode(n);return"boolean"==typeof t[n]?t[n]?n:null:e&&e.specified?e.value:null}function l(t){for(var n=t.length;n--;){var r=t[n];t.splice(n,1,null),~t.indexOf(r)?t.splice(n,1):t.splice(n,1,r)}return t}function h(t,n){if(t&&n)for(var r=t.nextSibling;r;){if(r===n)return-1;r=r.nextSibling}return t?1:-1}function p(t){return l(t.sort(ct))}function d(t,n){var r,e,i,o;return t?(i=n?"type":"child",r=s,e=c,o=u):(i="last"+(n?"type":"child"),e=s,r=c,o=a),function(t,u){var a=ft[i];if(t===it)return!1;var c=st(t),s=t.parentNode,f=(u.step>0?r:e,u.step),l=u.start,h=n&&t.nodeName;if(null===f)return!1;if(!a[c]){var p=o(s,h),d=0;do a[st(p)]=++d,ft.length++;while(p=r(p,h))}var g=a[c];return 0===f?g===l:(g-l)/f>=0&&(g-l)%f===0}}function g(){ft.length&&(ft={child:{},lastchild:{},type:{},lasttype:{},length:0})}function v(t,n,r){var e;for(var i in n)if(r!==i&&(e=ht[i])&&!e(t,n[i]))return!1;return!0}function m(t,n,r){var e=n.length,i=n[e-1];if(v(t,i,r)){if(1==e)return!0;var o=n[e-2],u=pt.combos[o.combo],a=dt[e-2],c=u(t,a);return!!c}return!1}function y(t){return function(r){return r==it||null==r||r==n?null:m(r,t)}}function b(t){for(var n=[],r=0,e=t.length;r<e;r++)n.push(y(t.slice(0,r+1)));return n}function x(t,n,r){if(!n.length)return t;var e=dt;dt=b(n);for(var i=t.length;i--;)m(t[i],n,r)||t.splice(i,1);return dt=e,t}function N(t,n){var r,e,i=t[t.length-1];return i.id?(r=lt.byId(i.id),e="id"):i.classList&&i.classList.length&&lt.byClassName?(r=lt.byClassName(i.classList,n),e="classList"):(r=lt.byTagName(i.tag||"*",n),e="tag"),r.length?x(r,t,e):r}function w(t,n){if(!t[0][0])return[];for(var r=[],e=0,i=0,o=t.length;i<o;i++){var u=t[i],a=u.length,c=(u[a-1],N(u,n));c&&c.length&&e++,r=r?r.concat(c):c}return g(),e>1&&p(r),r}function _(t,r){var e=i(t),o=w(e,r||n);return o}function C(t,r){var e;if(gt&&!A.debug)try{e=(r||n).querySelector(t)}catch(n){e=_(t,r)[0]}else e=_(t,r)[0];return e}function E(t,r){var e;if(gt&&!A.debug)try{e=P((r||n).querySelectorAll(t))}catch(n){e=_(t,r)}else e=_(t,r);return e}function S(t,n){if(!t||1!==t.nodeType)return!1;var r=i(n),e=r.length;if(!r[e-1][0])return!1;for(;e--;)if(T(t,r[e]))return!0;return!1}function T(t,n){var r=n.length;return!!v(t,n[r-1])&&1===x([t],n.slice(0)).length}function I(t){return function(n,r){var e=r.split(/\s+of\s+/);if(e.length<2)throw Error("no 'of' keyword in nth-match\"s selector");var i=Y(e[0]),o=e[1],u=n.parentNode[t?"firstChild":"lastChild"],a=t?"nextSibling":"previousSibling",c=i.step,s=i.start,f=0;if(!S(n,o))return!1;if(null===c)return!1;do if(1===u.nodeType&&A.matches(u,o)&&f++,u===n)break;while(u=u[a]);return 0===c?f===s:(f-s)/c>=0&&(f-s)%c===0}}var A=function(t,n){return E(t,n)},L=Array.prototype,O=Object.prototype,k=String.prototype,j=Function.prototype,B=L.slice,F=(n.body,n.createElement("div")),P=function(t){return B.call(t)},D=function(t){return null==t?String(t):O.toString.call(t).slice(8,-1).toLowerCase()},R=function(t,n,r){for(var e in n)(null==t[e]||r)&&(t[e]=n[e])},$=function(t){var n=[],e={};return{set:function(t,r){return n.length>this.length&&delete e[n.shift()],e[t]=r,n.push(t),r},get:function(t){return t===r?e:e[t]},length:t,len:function(){return n.length}}},q=function(t){return function(n,r){if("object"==D(n))for(var e in n)t.call(this,e,n[e]);else t.call(this,n,r);return this}},U=function(t){try{return t()}catch(t){return!1}finally{F=document.createElement("div")}};try{B.call(n.getElementsByTagName("body"))}catch(t){P=function(t){for(var n=[],r=t.length,e=0;e<r;e++)n.push(t[e]);return n}}var K=/^\s+|\s+$/g;k.trim=k.trim||function(){return this.replace(K,"")},j.bind=j.bind||function(t,n){n=B.call(arguments,1);var r=this;return function(){return r.apply(t,n.concat(B.call(arguments)))}},L.indexOf=L.indexOf||function(t){for(var n=0,r=this.length;n<r;n++)if(t===this[n])return n;return-1};var z=/\(\?\!|\(\?\:/,H=function(t){for(var n=0,r=0,e=t.length,i=t.split(z).length-1;e--;){var o=t.charAt(e);0!==e&&"\\"===t.charAt(e-1)||("("===o&&n++,")"===o&&r++)}if(n!==r)throw t+"中的括号不匹配";return n-i},M=function(t,n){return t},Z=Object.keys||function(t){var n=[];for(var r in t)t.hasOwnProperty(r)&&n.push(r);return n},G=function(t){var n=t.reg;return"regexp"===D(n)&&(n=n.toString().slice(1,-1)),t.regexp=n.replace(Q,function(t,n){if(n in tt)return tt[n];throw new Error('can"t replace undefined macros:'+n)}),t},J=function(t){for(var n in t)t.hasOwnProperty(n)&&G(t[n]);return t};R(e.prototype,{parse:function(t){if(t=clean(t),r=this.cache.get(t))return r;for(var n,r=this.parsed=[[null]],e=this.input=t,i=this.TRUNK;n!=(e=e.replace(i,this._process.bind(this)));)n=e;return""!==e&&this.error(e),this.cache.set(t,r)},on:function(t){if("string"===D(t)){var n={};n[t]=arguments[1],t=n}for(var e in t){var i=t[e];"object"!==D(i)&&(i={regexp:i});var o=i.regexp;"regexp"===D(o)&&(i.regexp=o.toString().slice(1,-1)),i.order===r&&(i.order=1),this._rules[e]=i}return this.setup(),this},off:function(t){if("array"===D(t))for(var n=t.length;n--;)this.off(t[n]);else this._rules[t]&&delete this._rules[t];return this},current:function(){var t=this.parsed,n=t[t.length-1],r=n.length;return n[r-1]||(n[r-1]={tag:"*"})},error:function(t){throw Error("输入  "+this.input+"  含有未识别语句:"+t||"")},clone:function(t){return(new e).on(this._rules)},_process:function(){var t=this._links,n=this._rules,r=B.call(arguments);for(var e in t){var i=t[e],o=i[1],u=parseInt(i[0]);if(r[u]&&(rule=n[e]))return rule.action.apply(this,r.slice(u,u+o)),""}return""},setup:function(){J(this._rules);for(var t=1,n=[],r=this._rules,e=this._links,i=Z(r).sort(function(t,n){return r[t].order>=r[n].order}),o=i.length;o--;){var u=i[o],a=r[u],c=H(a.regexp)+1;a.filter&&!ht[u]&&(ht[u]=a.filter),e[u]=[t,c];var s=M(a.regexp,t-1);t+=c,n.push(s)}return this.TRUNK=new RegExp("^(?:("+n.join(")|(")+"))"),this}});var Q=/\{\{([^\}]*)\}\}/g,V=/^(?:(\d+)|([+-]?\d*)?n([+-]\d+)?)$/,W=/^(nth)[\w-]*(-of-type|-child)/,X=$(100),Y=function(t){var n,r,e;return t&&(t=t.replace(/\s+/g,""))?(e=X.get(t))?e:("even"==t?(r=2,n=2):"odd"==t?(n=2,r=1):(e=t.match(V),e?e[1]?(n=0,r=parseInt(e[1])):("-"==e[2]&&(e[2]="-1"),n=e[2]?parseInt(e[2]):1,r=e[3]?parseInt(e[3]):0):n=null),r<1&&(n<1?n=null:r=- -r%n+n),X.set(t,{start:r,step:n})):{start:1,step:0}},tt={split:"\\s*,\\s*",operator:"[*^$|~!]?=",combo:"[>\\s+~](?!=)",word:"[\\\\\\w\\u00A1-\\uFFFF-]"},nt={split:{reg:"{{split}}",action:function(t){this.parsed.push([null])},order:0},id:{reg:"#({{word}}+)",action:function(t,n){this.current().id=n}},tag:{reg:"\\*|[a-zA-Z-]\\w*",action:function(t){this.current().tag=t.toLowerCase()}},classList:{reg:"\\.({{word}}+)",action:function(t,n){var r=this.current(),e=r.classList||(r.classList=[]);e.push(n)}},pesudos:{reg:":({{word}}+)(?:\\(([^\\(\\)]*|(?:\\([^\\)]+\\)|[^\\(\\)]*)+)\\))?",action:function(t,n,r){var e=this.current(),i=e.pesudos||(e.pesudos=[]),n=n.toLowerCase(),o={name:n};r&&(r=r.trim()),W.test(n)&&(r=Y(r)),r&&(o.param=r),i.push(o)}},attributes:{reg:"\\[\\s*({{word}}+)(?:({{operator}})['\"]?([^'\"\\[]+)['\"]?)?\\s*\\]",action:function(t,n,r,e){var i=this.current(),o=i.attributes||(i.attributes=[]);o.push({key:n,operator:r,value:e})}},combo:{reg:"\\s*({{combo}})\\s*",action:function(t,n){var r=this.parsed,e=r[r.length-1];this.current().combo=n,e.push(null)},order:0}},rt=new RegExp("\\s*(,|"+tt.combo+"|"+tt.operator+")\\s*","g");clean=function(t){return t.trim().replace(/\s+/g," ").replace(rt,"$1")};var et=new e;et.on(nt);var it=n.documentElement||n,ot={for:"htmlFor",href:function(t){return"href"in t?t.getAttribute("href",2):t.getAttribute("href")},type:function(t){return"type"in t?t.getAttribute("type"):t.type}},ut=U(function(){return F.appendChild(n.createComment("")),!F.getElementsByTagName("*").length||"number"!=typeof n.getElementsByTagName("input").length}),at=U(function(){F.innerHTML="<select></select>";var t=D(F.lastChild.getAttribute("multiple"));return"boolean"!==t&&"string"!==t}),ct=n.compareDocumentPosition?function(t,n){return t.compareDocumentPosition&&n.compareDocumentPosition?4&t.compareDocumentPosition(n)?-1:t===n?0:1:0}:"sourceIndex"in n?function(t,n){return t.sourceIndex&&n.sourceIndex?t.sourceIndex-n.sourceIndex:0}:function(t,r){var e=0,i=[t],o=[r],u=t.parentNode,a=r.parentNode,c=u;if(t===n)return-1;if(r===n)return 1;if(!u&&!a)return 0;if(!a)return-1;if(!u)return 1;if(u===a)return h(t,r);for(;c;)i.unshift(c),c=c.parentNode;for(c=a;c;)o.unshift(c),c=c.parentNode;for(;i[e]===o[e];)e++;return h(i[e],o[e])},st=function(t){var n=0;return function(r){return r._uid||(r._uid=t+n++)}}("nes_"+(+new Date).toString(36)),ft={length:1};g();var lt={byId:function(t){var r=n.getElementById(t);return r?[r]:[]},byClassName:n.getElementsByClassName?function(t,r){return t=t.join(" "),P((r||n).getElementsByClassName(t))}:null,byTagName:ut?function(t,r){var e=(r||n).getElementsByTagName(t);return P(e)}:function(t,r){for(var e,i=(r||n).getElementsByTagName(t),o=[],u=0;e=i[u];u++)1===e.nodeType&&o.push(e);return o}},ht={id:function(t,n){return t.id===n},classList:function(t,n){for(var r=n.length,e=" "+t.className+" ";r--;)if(e.indexOf(" "+n[r]+" ")===-1)return!1;return!0},tag:function(t,n){return"*"==n||t.tagName.toLowerCase()===n},pesudos:function(t,n){for(var r=n.length,e=pt.pesudos;r--;){var i=n[r],o=i.name,u=e[o];if(!u)throw Error("不支持的伪类:"+o);if(!u(t,i.param))return!1}return!0},attributes:function(t,n){for(var r=n.length,e=pt.operators;r--;){var i=n[r],o=i.operator,u=e[o],a=f(t,i.key);if(null!==a){if(o){if(!u)throw Error("不支持的操作符:"+o);if(!u(i.value,a+""))return!1}}else if("!="!==o)return!1}return!0}},pt={combos:{">":function(t,n){var r=t.parentNode;if(n(r))return r},"~":function(t,n){for(var r=c(t);r;){if(n(r))return r;r=c(r)}}," ":function(t,n){for(var r=t.parentNode;r;){var e=n(r);if(e)return r;if(null===e)return null;r=r.parentNode}return null},"+":function(t,n){var r=c(t);if(r&&n(r))return r}},operators:{"^=":function(t,n){return null!=n&&0===n.indexOf(t)},"=":function(t,n){return n===t},"~=":function(t,n){return null!=n&&~(" "+n+" ").indexOf(t)},"$=":function(t,n){return n.substr(n.length-t.length)===t},"|=":function(t,n){return~("-"+n+"-").indexOf("-"+t+"-")},"*=":function(t,n){return~n.indexOf(t)},"!=":function(t,n){return n!==t}},pesudos:{not:function(t,n){return!S(t,n)},matches:function(t,n){return S(t,n)},"nth-child":d(!0,!1),"nth-last-child":d(!1,!1),"nth-of-type":d(!0,!0),"nth-last-of-type":d(!1,!0),"first-child":function(t){return!c(t)},"last-child":function(t){return!s(t)},"last-of-type":function(t){return!s(t,t.nodeName)},"first-of-type":function(t){return!c(t,t.nodeName)},"only-child":function(t){return!c(t)&&!s(t)},"only-of-type":function(t){return!c(t,t.nodeName)&&!s(t,t.nodeName)},contains:function(t,n){return~(t.innerText||t.textContent||"").indexOf(n)},checked:function(t){return!!t.checked||!!t.selected},selected:function(t){return t.selected},enabled:function(t){return t.disabled===!1},disabled:function(t){return t.disabled===!0},empty:function(t){var n;for(t=t.firstChild;t;){if(t.nodeName>"@"||3===(n=t.nodeType)||4===n)return!1;t=t.nextSibling}return!0},focus:function(t){return t===n.activeElement&&(!n.hasFocus||n.hasFocus())&&!!(t.type||t.href||~t.tabIndex)},target:function(t,n){var r=t.id||t.name;return!!r&&"#"+r===location.hash}}},dt=null,gt=!!n.querySelector;!function(t,n){for(var r in t)A[r]=function(r){var e=t[r];return q(function(t,i){e[t]=i,r in n&&n[r](t,i)})}(r)}(pt,{operators:function(t){var n=tt.operator.split("]");n.splice(1,0,t.charAt(0)+"]"),tt.operator=n.join(""),et.setup()},combos:function(t){var n=tt.combo.split("]");n.splice(1,0,t+"]"),tt.combo=n.join(""),et.setup()}}),A.debug=!1,A._nthCache=X,A.parser=et,A.parse=i,A._find=w,A._get=_,A.one=C,A.all=E,A.matches=S,A._uniqueSort=p,A._cleanSelector=clean,A._getUid=st,"object"==typeof exports?module.exports=A:"function"==typeof define&&define.amd?define(function(){return A}):t.nes=A,A.pesudos({"nth-match":I(!0),"nth-last-match":I(!1),"local-link":function(t,n){n&&(n=parseInt(n))}})}(window,document,void 0);