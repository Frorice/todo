NEJ.define(["base/global","base/klass","base/util","./bezier.js"],function(e,n,s,i,a,_,t,$){var r;return a._$$AnimEaseIn=n._$klass(),r=a._$$AnimEaseIn._$extend(i._$$AnimBezier),r.__reset=function(e){e=s._$merge({},e),e.timing="easein",this.__super(e)},CMPT&&e.copy(e.P("nej.ut"),a),a});