NEJ.define(["./proxy.js","base/klass","base/config","base/util","util/flash/flash"],function(e,t,s,r,a,_,i,n,o){var h,u={},d=r._$uniqueID();return this["ld"+d]=function(e,t){var s=u[e];s&&(delete u[e],s.__onLoadRequest({status:200,result:t}))},this["er"+d]=function(e,t){var s=u[e];s&&(delete u[e],s.__onLoadRequest({status:t||0}))},_._$$ProxyFlash=t._$klass(),h=_._$$ProxyFlash._$extend(e._$$ProxyAbstract),h.__doSendRequest=function(e){var t=u.flash;if(r._$isArray(t))return void t.push(this.__doSendRequest._$bind(this,e));if(!t)return u.flash=[this.__doSendRequest._$bind(this,e)],void a._$flash({hidden:!0,src:s._$get("ajax.swf"),onready:function(e){if(e){var t=u.flash;u.flash=e,r._$reverseEach(t,function(e,t,s){try{e()}catch(e){}})}}});this.__rkey=r._$uniqueID(),u[this.__rkey]=this;var _=r._$fetch({url:"",data:null,method:"GET"},e.request);_.key=this.__rkey,_.headers=e.headers,_.onerror="cb.er"+d,_.onloaded="cb.ld"+d;var i=s._$getFlashProxy(_.url);i&&(_.policyURL=i),t.request(_)},h._$abort=function(){delete u[this.__rkey],this.__onAbort()},_});