NEJ.define(["base/util","base/event","./paste.js"],function(t,n,e){return NEJ.patch("GR",function(){e.__doDumpContent=function(o,i){var a=o.accept||"",p=i.clipboardData||{},c=(p.types||[])[0]||"";return a&&0!=c.indexOf(a)||(n._$stop(i),0!=c.indexOf("text"))?(e.__doDumpImage(o),void t._$forEach(p.files,function(t){if(!a||0==t.type.indexOf(a))return n._$stop(i),e.__doDumpFile(t,o),!0})):void o.onpaste({type:"string",content:p.getData("text")})}}),NEJ.patch("TR",function(){e.__doDumpContent=function(t,n){console.log(n)}}),e});