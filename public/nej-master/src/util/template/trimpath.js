!function(){"undefined"==typeof TrimPath&&(TrimPath={},"undefined"!=typeof exports&&(TrimPath=exports));var n,e,t,r={},i=[],f=/\s+/g,u=+new Date,o=function(){var n=/^\s*[\[\{'"].*?[\]\}'"]\s*$/,e=/[\&\|\<\>\+\-\*\/\%\,\(\)\[\]\?\:\!\=\;]/,r=/^(?:defined|null|undefined|true|false|instanceof|new|this|typeof|\$v|[\d]+)$/i,i=/^new\s+/,f=/['"]/,u=function(e){if(!n.test(e)&&(e=e.split(".")[0].trim(),e&&!f.test(e))){e=e.replace(i,"");try{if(r.test(e))return;t[e]=1}catch(n){}}};return function(t){if(t=t||"",t&&!n.test(t))for(var r=t.split(e),i=0,f=r.length;i<f;i++)u(r[i])}}(),s=function(n){if("in"!=n[2])throw"bad for loop statement: "+n.join(" ");return i.push(n[1]),o(n[3]),"var __HASH__"+n[1]+" = "+n[3]+","+n[1]+","+n[1]+"_count=0;if (!!__HASH__"+n[1]+")for(var "+n[1]+"_key in __HASH__"+n[1]+"){"+n[1]+" = __HASH__"+n[1]+"["+n[1]+"_key];if (typeof("+n[1]+')=="function") continue;'+n[1]+"_count++;"},a=function(){var n=i[i.length-1];return"}; if(!__HASH__"+n+"||!"+n+"_count){"},l=function(){return i.pop(),"};"},p=function(n){if("as"!=n[2])throw"bad for list loop statement: "+n.join(" ");var e=n[1].split("..");return e.length>1?(o(e[0]),o(e[1]),"for(var "+n[3]+","+n[3]+"_index=0,"+n[3]+"_beg="+e[0]+","+n[3]+"_end="+e[1]+","+n[3]+"_length=parseInt("+n[3]+"_end-"+n[3]+"_beg+1);"+n[3]+"_index<"+n[3]+"_length;"+n[3]+"_index++){"+n[3]+" = "+n[3]+"_beg+"+n[3]+"_index;"):(o(n[1]),"for(var __LIST__"+n[3]+" = "+n[1]+","+n[3]+","+n[3]+"_index=0,"+n[3]+"_length=__LIST__"+n[3]+".length;"+n[3]+"_index<"+n[3]+"_length;"+n[3]+"_index++){"+n[3]+" = __LIST__"+n[3]+"["+n[3]+"_index];")},_=function(n){if(n&&n.length){n.shift();var e=n[0].split("(")[0];return"var "+e+" = function"+n.join("").replace(e,"")+"{var __OUT=[];"}},c=function(n){if(!n[1])throw"bad include statement: "+n.join(" ");return'if (typeof inline == "function"){__OUT.push(inline('},h=function(n,e){return o(e.slice(1).join(" ")),n},g=function(n){return h("if(",n)},d=function(n){return h("}else if(",n)},v=function(n){return h("var ",n)};e={blk:/^\{(cdata|minify|eval)/i,tag:"forelse|for|list|if|elseif|else|var|macro|break|notrim|trim|include",def:{if:{pfix:g,sfix:"){",pmin:1},else:{pfix:"}else{"},elseif:{pfix:d,sfix:"){",pdft:"true"},"/if":{pfix:"}"},for:{pfix:s,pmin:3},forelse:{pfix:a},"/for":{pfix:l},list:{pfix:p,pmin:3},"/list":{pfix:"};"},break:{pfix:"break;"},var:{pfix:v,sfix:";"},macro:{pfix:_},"/macro":{pfix:'return __OUT.join("");};'},trim:{pfix:function(){n=!0}},"/trim":{pfix:function(){n=null}},inline:{pfix:c,pmin:1,sfix:"));}"}},ext:{seed:function(n){return(n||"")+""+u},default:function(n,e){return n||e}}};var x=function(){var n=/\\([\{\}])/g;return function(t,r){t=t.replace(n,"$1");var i=t.slice(1,-1).split(f),u=e.def[i[0]];if(!u)return void b(t,r);if(u.pmin&&u.pmin>=i.length)throw"Statement needs more parameters:"+t;if(r.push(u.pfix&&"string"!=typeof u.pfix?u.pfix(i):u.pfix||""),u.sfix){if(i.length<=1)u.pdft&&r.push(u.pdft);else for(var o=1,s=i.length;o<s;o++)o>1&&r.push(" "),r.push(i[o]);r.push(u.sfix)}}}(),m=function(n,e){if(n&&n.length){if(1==n.length){var t=n.pop();return o(t),void e.push(""==t?'""':t)}var r=n.pop().split(":");if(e.push("__MDF['"+r.shift()+"']("),m(n,e),r.length>0){var i=r.join(":");o(i),e.push(","+i)}e.push(")")}},b=function(e,t){if(e){var r=e.split("\n");if(r&&r.length)for(var i,f=0,u=r.length;f<u;f++)i=r[f],n&&!(i=i.trim())||(T(i,t),n&&f<u-1&&t.push("__OUT.push('\\n');"))}},T=function(){var n=/\|\|/g,e=/#@@#/g;return function(t,r){for(var i,f,u,o,s,a="}",l=-1,p=t.length;l+a.length<p&&(i="${",f="}",u=t.indexOf(i,l+a.length),!(u<0))&&("%"==t.charAt(u+2)&&(i="${%",f="%}"),o=t.indexOf(f,u+i.length),!(o<0));){O(t.substring(l+a.length,u),r),s=t.substring(u+i.length,o).replace(n,"#@@#").split("|");for(var _=0,c=s.length;_<c;s[_]=s[_].replace(e,"||"),_++);r.push("__OUT.push("),m(s,r),r.push(");"),a=f,l=o}O(t.substring(l+a.length),r)}}(),O=function(){var n={r:/\n|\\|\'/g,"\n":"\\n","\\":"\\\\","'":"\\'"},e=function(e){return(e||"").replace(n.r,function(e){return n[e]||e})};return function(n,t){n&&t.push("__OUT.push('"+e(n)+"');")}}(),w=function(){var n=/\t/g,r=/\n/g,i=/\r\n?/g,u=function(n,e){for(var t=n.indexOf("}",e+1);"\\"==n.charAt(t-1);)t=n.indexOf("}",t+1);return t},o=function(){var n=[],e=arguments[0];for(var t in e)t=(t||"").trim(),t&&n.push(t+"=$v('"+t+"')");return n.length>0?"var "+n.join(",")+";":""};return function(s){t={},s=s.replace(i,"\n").replace(n,"    ");var a=["if(!__CTX) return '';",""];a.push("function $v(__NAME){var v = __CTX[__NAME];return v==null?window[__NAME]:v;};"),a.push("var defined=function(__NAME){return __CTX[__NAME]!=null;},"),a.push("__OUT=[];");for(var l,p,_,c,h,g,d,v,m=-1,T=s.length;m+1<T;){for(l=m,l=s.indexOf("{",l+1);l>=0;){if(p=u(s,l),_=s.substring(l,p),c=_.match(e.blk)){if(h=c[1].length+1,g=s.indexOf("}",l+h),g>=0&&(d=g-l-h<=0?"{/"+c[1]+"}":_.substr(h+1),h=s.indexOf(d,g+1),h>=0)){switch(b(s.substring(m+1,l),a),v=s.substring(g+1,h),c[1]){case"cdata":O(v,a);break;case"minify":O(v.replace(r," ").replace(f," "),a);break;case"eval":v&&a.push("__OUT.push((function(){"+v+"})());")}l=m=h+d.length-1}}else if("$"!=s.charAt(l-1)&&"\\"!=s.charAt(l-1)&&0==_.substr("/"==_.charAt(1)?2:1).search(e.tag))break;l=s.indexOf("{",l+1)}if(l<0)break;if(p=u(s,l),p<0)break;b(s.substring(m+1,l),a),x(s.substring(l,p+1),a),m=p}return b(s.substring(m+1),a),a.push(';return __OUT.join("");'),a[1]=o(t),t=null,new Function("__CTX","__MDF",a.join(""))}}();TrimPath.seed=function(){return u},TrimPath.merge=function(){var n={};return TrimPath.dump=function(){return{func:n,text:r}},function(t,i,f){try{if(i=i||{},!n[t]&&!r[t])return"";if(n[t]||(n[t]=w(r[t]),delete r[t]),f)for(var u in e.ext)f[u]||(f[u]=e.ext[u]);return n[t](i,f||e.ext)}catch(n){return n.message||""}}}(),TrimPath.parse=function(){var n=+new Date;return function(e,t){return e?(t=t||"ck-"+n++,null!=r[t]&&(console.warn("jst template overwrited with key "+t),console.debug("old template content: "+r[t].replace(/\n/g," ")),console.debug("new template content: "+e.replace(/\n/g," "))),r[t]=e,t):""}}()}();