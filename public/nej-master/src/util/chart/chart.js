NEJ.define(["base/global","base/config","base/element","util/flash/flash","base/chain"],function(e,a,t,n,i,h,r,s,f){return h._$drawChart=function(e,i){e=t._$get(e)||r,n._$flash({parent:e,width:i.width||"100%",height:i.height||"100%",src:a._$get("chart.swf"),params:{wmode:"transparent"},onready:function(e){e.initChart(i.data)}._$bind(this)})},i._$merge(h),CMPT&&e.copy(e.P("nej.e"),h),h});