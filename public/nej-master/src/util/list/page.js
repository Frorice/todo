NEJ.define(["base/global","base/klass","base/util","./module.js"],function(t,e,_,i,s,o,n,h){var r;return s._$$ListModulePG=e._$klass(),r=s._$$ListModulePG._$extend(i._$$ListModule),r.__getPageInfo=function(t,e){return this.__super(this.__first,t,this.__limit,e)},r.__getOffsetByIndex=function(t){var e=0;return t>1&&(e=this.__first+(t-2)*this.__limit),e},r.__doChangePage=function(t){this.__super(t),t.stopped||this.__doChangeOffset(this.__getOffsetByIndex(t.index))},r.__doBeforeListLoad=function(){this.__doClearListBox(),this.__doShowMessage("onbeforelistload","列表加载中...")},r.__doBeforeListShow=function(){this.__super(),this.__doClearListBox()},r.__doBeforeListRender=function(t,e,_){var i=this.__getPageInfo(e,t.length);return!!this.__doSyncPager(i.index,i.total)||void this.__doSwitchPagerShow(i.total>1?"":"none")},r.__doShowEmpty=function(){this.__doShowMessage("onemptylist","没有列表数据！")},r.__doRenderMessage=function(t,e){return!e&&_._$isString(t)?void(this.__lbox.innerHTML=t):void this.__super(t,e)},r.__doShowListByJST=function(t){this.__lbox.innerHTML=t},r.__doShowListByItem=function(t){this.__items=t},r.__cbItemAdd=function(t){this.__doCheckResult(t,"onafteradd"),t.stopped||this._$refresh()},r.__cbItemDelete=function(t){this.__doCheckResult(t,"onafterdelete"),t.stopped||this._$refresh()},r.__cbAppendList=function(t,e){var _=1;this.__pager&&(_=this.__pager._$getIndex());var i=this.__getOffsetByIndex(_),s=i+(_>1?this.__limit:this.__first);if(t>=s&&this.__pager){var o=this.__getPageInfo(0,this._$getTotal());this.__pager._$updateTotal(o.total),this.__doSwitchPagerShow(o.total>1?"":"none")}else this._$refresh()},r.__cbUnshiftList=function(t,e){var _=1;this.__pager&&(_=this.__pager._$getIndex());var i=this.__getOffsetByIndex(_),s=this.__getPageInfo(i,this._$getTotal());this.__doChangePage({last:_,index:s.index})},CMPT&&t.copy(t.P("nej.ut"),s),s});