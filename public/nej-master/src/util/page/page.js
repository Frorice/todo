NEJ.define(["base/global","base/klass","base/element","base/util","./base.js"],function(t,_,e,i,s,a,n,o,h){var d;return a._$$PageFragment=_._$klass(),d=a._$$PageFragment._$extend(s._$$PageAbstract),d.__init=function(){this.__ndot=[],this.__super()},d.__destroy=function(){this.__super(),this.__doRecycleDotNode()},d.__doRecycleDotNode=function(){var t=function(t,_,i){e._$remove(t),i.splice(_,1)};return function(){i._$reverseEach(this.__ndot,t)}}(),d.__doRefreshPage=function(){this.__extdata={last:!1,first:!1,list:this.__list},this.__doRecycleDotNode(),this.__doSetNodeIndex(this.__list[0],1);var t=1,_=this.__list.length;if(this.__total<_)for(var i;t<_;t++)i=t+1,this.__doSetNodeIndex(this.__list[t],i>this.__total?null:i);else{if(this.__index>1){var s=Math.floor((_-2)/2),a=this.__total-_+2,n=Math.max(2,this.__index-s);if(this.__total>=_&&(n=Math.min(n,a)),n>2){var o=e._$create("span","zdot");this.__ndot.push(o),o.innerText="...",this.__list[0].insertAdjacentElement("afterEnd",o),this.__extdata.first=!0}for(var h;h=n+t-1,!(h>this.__index);t++)this.__doSetNodeIndex(this.__list[t],h)}if(this.__index<this.__total){for(var h,n=this.__index+1,d=0,l=_-2;h=n+d,!(t>l||h>this.__total);d++,t++)this.__doSetNodeIndex(this.__list[t],h);if(h<this.__total){var o=e._$create("span","zdot");this.__ndot.push(o),o.innerText="...",this.__list[t].insertAdjacentElement("beforeBegin",o),this.__extdata.last=!0}h<=this.__total&&this.__doSetNodeIndex(this.__list[t++],this.__total)}for(;t<_;t++)this.__doSetNodeIndex(this.__list[t])}},CMPT&&(t.P("nej.ut")._$$Page=a._$$PageFragment),a});