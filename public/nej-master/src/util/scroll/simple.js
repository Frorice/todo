NEJ.define(["base/global","base/klass","base/element","base/event","base/util","util/event","util/dragger/dragger","util/animation/easeinout","{platform}simple.js"],function(t,e,i,_,o,s,r,a,n,h,d,l,c){var b;return h._$$SimpleScroll=e._$klass(),b=h._$$SimpleScroll._$extend(s._$$EventTarget),b.__init=function(){this.__aopt={to:{},from:{},duration:500,onstop:this.__doStopBarOpacity._$bind(this),onupdate:this.__doUpdateBarOpacity._$bind(this)},this.__dopt={x:{direction:1,ondragend:this.__onUpdateBarEnd._$bind(this,"x"),onbeforechange:this.__onBeforeUpdateBar._$bind(this,"x")},y:{direction:2,ondragend:this.__onUpdateBarEnd._$bind(this,"y"),onbeforechange:this.__onBeforeUpdateBar._$bind(this,"y")}},this.__dragger={},this.__super()},b.__reset=function(){var e={x:{min:0,speed:1,step:50,interval:50,left:0,right:0,hover:"js-hover",sb:"scrollWidth",cb:"clientWidth",ob:"offsetWidth",sr:"scrollLeft",ss:"width",sp:"left",dr:"right"},y:{min:0,speed:1,interval:50,step:50,top:0,bottom:0,hover:"js-hover",sb:"scrollHeight",cb:"clientHeight",ob:"offsetHeight",sr:"scrollTop",ss:"height",sp:"top",dr:"bottom"}},_=function(_,o){(o||d).body||(o={body:o});var s=t.X(t.X({},e[_]),o);return s.body=i._$get(s.body),s.body&&s.track&&(":parent"==s.track&&(s.track=s.body.parentNode),s.track=i._$get(s.track)),s.min||(s.min=s.body?s.body[s.ob]||10:10),s},o=function(t,e){if(e){var i=this.__dopt[t];i.body=e,i.view=this.__parent,this.__dragger[t]=r._$$Dragger._$allocate(i)}};return function(t){this.__super(t),this.__bar={x:_("x",t.xbar),y:_("y",t.ybar)},this.__parent=i._$get(t.parent),this.__doInitDomEvent([[this.__parent,"mousewheel",this.__onMouseWheel._$bind(this)],[this.__parent,"scroll",this.__doSyncScrollBar._$bind(this)],[this.__parent,"mouseover",this.__doFixScrollBar._$bind(this)],[this.__bar.x.track,"mousedown",this.__onTrackDown._$bind(this,"x")],[this.__bar.y.track,"mousedown",this.__onTrackDown._$bind(this,"y")],[this.__bar.x.track,"mousewheel",this.__onMouseWheel._$bind(this)],[this.__bar.y.track,"mousewheel",this.__onMouseWheel._$bind(this)]]);var e=i._$get(t.trigger);e?(this.__doInitDomEvent([[t.trigger,"mouseenter",this.__onMouseEnter._$bind(this)],[t.trigger,"mouseleave",this.__onMouseLeave._$bind(this)]]),this.__doUpdateBarOpacity({offset:0})):this._$resize(),o.call(this,"x",this.__bar.x.body),o.call(this,"y",this.__bar.y.body)}}(),b.__destroy=function(){var t=function(t,e,i){t._$recycle(),delete i[e];var _=this.__dopt[e];delete _.view,delete _.body},e=function(t,e,_){if(t.body){var o={};o[t.ss]="",o[t.sp]="",i._$style(t.body,o),delete t.body}};return function(){this.__super(),delete this.__isout,delete this.__parent,delete this.__dragging,this.__doStopBarOpacity(),o._$loop(this.__dragger,t._$bind(this)),o._$loop(this.__bar,e._$bind(this)),delete this.__bar}}(),b.__getOverflowParent=function(){return n.__getOverflowParent(this.__parent)},b.__doResetBarSize=function(t){var e=this.__getOverflowParent(),_=e[t.sb],o=e[t.cb],s=_-o,o=o-t[t.sp]-t[t.dr],r=_-o,a={},n={};if(s<=0)t.ratio=0,n.visibility="hidden",a[t.ss]=o+"px";else{var h=Math.ceil(Math.max(t.min,o-o/_*r));n.visibility="visible",a[t.ss]=h+"px",t.max=Math.ceil(o-h+t[t.sp]),t.ratio=(o-h)/r}t.delta=0,t.body&&(t.delta=t.body[t.ob]-t.body[t.cb]),i._$style(t.track||t.body,n),i._$style(t.body,a)},b.__doResetBarPosition=function(t,e){var _=this.__getOverflowParent();if(0!=e&&(_[t.sr]-=e*t.speed),t.body){var o=_[t.sr],s=Math.ceil(o*t.ratio)-t.delta+t[t.sp];i._$setStyle(t.body,t.sp,s+"px")}},b.__doSyncScrollBar=function(){this.__dragging||this._$resize()},b.__doUpdateScrollBar=function(t,e){this.__doResetBarPosition(this.__bar.y,e),this.__doResetBarPosition(this.__bar.x,t)},b.__doAnimScrollBar=function(){this.__doStopBarOpacity();var t=this.__bar.y,e=t.track||t.body;e||(t=this.__bar.x,e=t.track||t.body),this.__aopt.from.offset=i._$getStyle(e,"opacity"),this.__anim=a._$$AnimEaseInOut._$allocate(this.__aopt),this.__anim._$play()},b.__doUpdateBarOpacity=function(t){var e=t.offset;i._$setStyle(this.__bar.x.track||this.__bar.x.body,"opacity",e),i._$setStyle(this.__bar.y.track||this.__bar.y.body,"opacity",e)},b.__doStopBarOpacity=function(){this.__anim&&(this.__anim._$recycle(),delete this.__anim)},b.__onMouseWheel=function(t){var e=this.__getOverflowParent(),i=e.scrollTop,o=e.scrollLeft;this.__doUpdateScrollBar(t.wheelDeltaX||0,t.wheelDeltaY||t.wheelDelta||0),i=e.scrollTop!=i,o=e.scrollLeft!=o,(i||o)&&_._$stop(t)},b.__onMouseEnter=function(t){this.__isout=!1,this._$resize(),this.__aopt.delay=0,this.__aopt.to.offset=.6,this.__doAnimScrollBar()},b.__onMouseLeave=function(t){this.__isout=!0,this.__dragging||(this.__aopt.delay=500,this.__aopt.to.offset=0,this.__doAnimScrollBar())},b.__onTrackDown=function(){var t,e,o,s={x:function(t){this.__doUpdateScrollBar(t,0)},y:function(t){this.__doUpdateScrollBar(0,t)}},r=function(i){o=1,e=null,t=window.clearTimeout(t),_._$delEvent(i.track,"mouseup",e)},a=function(n,h,d){var l=this.__bar[n],c=parseInt(i._$getStyle(l.body,l.sp)),b=c+d;return c<=h&&h<=b?void r(l):(e||(e=r._$bind(this,l),_._$addEvent(l.track,"mouseup",e)),s[n].call(this,(h<c?1:-1)*l.step*o),t=window.setTimeout(a._$bind(this,n,h,d),l.interval),void o++)};return function(t,e){var o=this.__bar[t],s=i._$offset(o.track)[t],n=_._$page(e)[t],h=o.body[o.ob];r(o),a.call(this,t,n-s,h)}}(),b.__onBeforeUpdateBar=function(t,e){this.__dragging=!0;var _=this.__getOverflowParent(),o=this.__bar[t],s=o[o.sp],r=Math.max(s,Math.min(o.max,e[o.sp]));_[o.sr]=Math.ceil((r-s)/o.ratio),e[o.sp]=r,i._$addClassName(o.track,o.hover)},b.__onUpdateBarEnd=function(t){this.__dragging=!1,this.__isout&&this.__onMouseLeave();var e=this.__bar[t];i._$delClassName(e.track,e.hover)},b.__doFixScrollBar=function(t){this._$resize()},b._$resize=function(){this.__doResetBarSize(this.__bar.x),this.__doResetBarSize(this.__bar.y),this.__doUpdateScrollBar(0,0)},b._$show=function(){this.__onMouseEnter()},b._$hide=function(){this.__onMouseLeave()},CMPT&&t.copy(t.P("nej.ut"),h),h});