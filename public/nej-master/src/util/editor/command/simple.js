NEJ.define(["base/global","base/klass","util/editor/command"],function(e,t,n,m,_,a,i){var o;return m._$$SimpleCommand=t._$klass(),o=m._$$SimpleCommand._$extend(n._$$EditorCommand),o._$execute=function(){this.__editor._$execCommand(this.__name)},o._$queryState=function(){return this.__editor._$queryCommand(this.__name,"State")},CMPT&&e.copy(e.P("nej.ut.cmd"),m),m});