NEJ.define(["base/global","base/klass","util/event","util/timer/animation"],function(i,t,e,n,_,s,o,a){var m;return _._$$Animation=t._$klass(),m=_._$$Animation._$extend(e._$$EventTarget),m.__reset=function(i){this.__super(i),this.__end=i.to||s,this.__begin=i.from||{},this.__delay=Math.max(0,parseInt(i.delay)||0)},m.__destroy=function(){this.__super(),this._$stop(),this.__dtime&&(window.clearTimeout(this.__dtime),delete this.__dtime),delete this.__end,delete this.__begin},m.__onAnimationFrame=function(i){if(this.__begin)return(""+i).indexOf(".")>=0&&(i=+new Date),this.__doAnimationFrame(i)?void this._$stop():void(this.__timer=n.requestAnimationFrame(this.__onAnimationFrame._$bind(this)))},m.__doAnimationFrame=o,m._$play=function(){var i=function(){this.__dtime=window.clearTimeout(this.__dtime),this.__begin.time=+new Date,this.__timer=n.requestAnimationFrame(this.__onAnimationFrame._$bind(this))};return function(){this.__dtime=window.setTimeout(i._$bind(this),this.__delay)}}(),m._$stop=function(){this.__timer=n.cancelAnimationFrame(this.__timer),this._$dispatchEvent("onstop")},CMPT&&i.copy(i.P("nej.ut"),_),_});