NEJ.define(["base/global","base/klass","./animation.js"],function(t,i,n,e,s,_,o){var a;return e._$$AnimBounce=i._$klass(),a=e._$$AnimBounce._$extend(n._$$Animation),a.__reset=function(t){this.__super(t),this.__acceleration=t.acceleration||30,this.__springtension=t.springtension||.3},a.__doAnimationFrame=function(t){var i=t-this.__begin.time,n=i/this.__acceleration,e=n*Math.pow(Math.E,-this.__springtension*n),s=this.__begin.velocity*e,_=this.__begin.offset+s,o=!1;return i>1&&Math.abs(s)<1&&(o=!0,_=this.__begin.offset),this._$dispatchEvent("onupdate",{offset:_}),o},a._$stop=function(){this._$dispatchEvent("onupdate",{offset:this.__begin.offset}),this.__super()},CMPT&&t.copy(t.P("nej.ut"),e),e});