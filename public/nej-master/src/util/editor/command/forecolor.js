NEJ.define(["base/global","base/klass","util/editor/command/color"],function(o,r,e,l,_,t,$){var n;return l._$$ForeColor=r._$klass(),n=l._$$ForeColor._$extend(e._$$Color),l._$$ForeColor.command="foreColor",n.__init=function(){this.__super(),this.__fopt.defaultColor="#000"},l._$$ForeColor._$regist(),CMPT&&o.copy(o.P("nej.ut.cmd"),l),l});