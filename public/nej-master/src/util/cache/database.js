NEJ.define(["base/global","base/klass","base/util","util/event","base/chain"],function(e,t,n,a,_,i,r,s,o){var u;return i._$$DataBase=t._$klass(),u=i._$$DataBase._$extend(a._$$EventTarget),u.__reset=function(){var e=function(e){var t=e.target.result;this.__database=t;var a=n._$indexOf(t.objectStoreNames,this.__tbname);a>=0||t.createObjectStore(this.__tbname,{keyPath:this.__key})},t=function(e){this.__database=e.target.result,this._$dispatchEvent("onready",{target:this}),n._$forEach(this.__queue,function(e){e.call(this)},this),delete this.__queue};return function(a){this.__super(a);var _=(a.namespace||"").split("."),i=_[0]||"db-"+n._$uniqueID();this.__tbname=_[1]||"tb-"+n._$uniqueID(),this.__key=a.key||"id";var r=indexedDB.open(i,a.version||n._$uniqueID());r.onsuccess=t._$bind(this),r.onupgradeneeded=e._$bind(this)}}(),u.__destroy=function(){this.__super(),delete this.__dbname,delete this.__tbname,delete this.__queue,delete this.__key,this.__database&&(this.__database.close(),delete this.__database)},u.__isDBReady=function(e,t){if(!this.__database){this.__queue||(this.__queue=[]);var n=o.slice.call(t,0)||[];return n.unshift(this),this.__queue.push(e._$bind.apply(e,n)),!1}return!0},u.__getTransaction=function(e){e=e||r;var t=this.__database.transaction(this.__tbname,e.mode||"readwrite");return n._$loop(e,function(e,a){n._$isFunction(e)&&(t[a]=e)},this),t.objectStore(this.__tbname)},u.__doAction=function(e,t,a){var _=this.__isDBReady(this.__doAction,arguments);if(_){a=a||r;var i,o=this.__getTransaction({oncomplete:function(e){i?(a.onerror||s)(i):(a.onload||s)()},onerror:function(e){i=e.target.error,e.preventDefault()}});n._$loop(t,function(t){null!=t&&o[e](t)})}},u._$get=function(){var e=function(e,a,_){var i=0;n._$loop(a,function(n,r){i++,t(e,r,function(e,t){i--,a[t]=e,i||_(a)})}),i||_(a)},t=function(e,t,n){var a=e.get(t);a.onsuccess=function(e){n(e.target.result||null,t)},a.onerror=function(e){n(null,t)}};return function(a,_){var i=this.__isDBReady(this._$get,arguments);if(i){var o=this.__getTransaction(_),u=(_||r).onload||s;if(n._$isArray(a)){var c=n._$array2object(a);e(o,c,function(e){var t=[];n._$forEach(a,function(n,a){t[a]=e[n]||null}),u(t)})}else n._$isObject(a)?e(o,a,u):t(o,a,u)}}}(),u._$add=function(e,t){this._$update(e,t)},u._$update=function(e,t){n._$isArray(e)||(e=[e]),this.__doAction("put",e,t)},u._$import=function(e,t){this.__doAction("put",e,t)},u._$delete=function(e,t){n._$isArray(e)||(e=[e]),this.__doAction("delete",e,t)},u._$clear=function(e){delete this.__queue;var t=this.__isDBReady(this._$clear,arguments);t&&(e=e||r,this.__getTransaction({oncomplete:e.onload,onerror:function(t){t.preventDefault(),(e.onerror||s)(t.target.error)}}).clear())},i._$request=function(e){var t,a=n._$merge({},e,function(e){return n._$isFunction(e)}),_=e.onload||s,r=e.onerror||s,o=i._$$DataBase._$allocate(a);switch(e.action){case"get":t=o._$get;break;case"add":t=o._$add;break;case"clear":t=o._$clear;break;case"update":t=o._$update;break;case"import":t=o._$import;break;case"delete":t=o._$delete}t&&t.call(o,e.param,{onload:function(e){o._$recycle(),_(e)},onerror:function(e){o._$recycle(),r(e)}})},CMPT&&(e.P("nej.j")._$requestByDB=i._$request,e.P("nej.ut")._$$DataBase=i._$$DataBase),i});