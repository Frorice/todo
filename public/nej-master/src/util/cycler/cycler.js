NEJ.define(["base/global","base/klass","base/element","base/event","base/util","util/event","util/page/simple"],function(t,e,i,_,s,n,a,o,h,r,g){var m;return o._$$Cycler=e._$klass(),m=o._$$Cycler._$extend(n._$$EventTarget),m.__init=function(){this.__popt={index:1,onchange:this.__onPageChange._$bind(this)},this.__super()},m.__reset=function(t){this.__super(t),this.__list=t.list||[],this.__nbox=i._$get(t.nbox),this.__interval=1e3*(t.interval||2);var e=i._$getChildren(t.pbox);this.__popt.list=e,this.__popt.total=e.length,this.__popt.event=t.event,this.__pager=a._$$PageSimple._$allocate(this.__popt)},m.__destroy=function(){this.__super(),i._$remove(this.__image),delete this.__nbox,delete this.__image,delete this.__popt.list,this.__timer=window.clearTimeout(this.__timer)},m.__onPageChange=function(t){this.__timer=window.clearTimeout(this.__timer);var e=t.index,i=this.__list[e-1];i&&this._$setImage(i),this._$dispatchEvent("onchange",e)},m.__onNextPage=function(){var t=this.__pager._$getIndex(),e=this.__pager._$getTotal();this.__pager._$setIndex((t+1)%(e+1))},m.__onImageLoad=function(t){this.__timer=window.setTimeout(this.__onNextPage._$bind(this),this.__interval),i._$setStyle(this.__imgbox,"opacity",1)},m._$setImage=function(){var t={opacity:0,transitionProperty:"opacity",transitionDuration:"1s",transitionTimingFunction:"ease-in-out"},e=function(t,e){i._$setStyle(this.__imgbox,e,t)};return function(n){this.__image&&i._$remove(this.__image),this.__imgbox&&i._$remove(this.__imgbox),this.__image=new Image,this.__imgbox=i._$create("div"),s._$forIn(t,e,this),n.indexOf(".png")>-1&&i._$setStyle(this.__image,"filter","progid:DXImageTransform.Microsoft.AlphaImageLoader (enabled=true)"),this.__imgbox.appendChild(this.__image),this.__nbox.appendChild(this.__imgbox),_._$addEvent(this.__image,"load",this.__onImageLoad._$bind(this,!0)),_._$addEvent(this.__image,"error",this.__onImageLoad._$bind(this,!1)),this.__image.src=n}}(),CMPT&&t.copy(t.P("nej.ut"),o),o});