NEJ.define(["base/global","base/util","base/element","{platform}focus.js","base/chain"],function(e,s,a,t,n,o,c,i,f){return o._$focus=function(e,n){if(e=a._$get(e)){var o=0,c="js-focus";s._$isNumber(n)?o=n:s._$isString(n)?c=n:s._$isObject(n)&&(o=n.mode||o,c=n.clazz||c);var i=parseInt(a._$dataset(e,"mode"));isNaN(i)||(o=i),i=a._$dataset(e,"focus"),i&&(c=i),t.__focusElement(e,o,c)}},n._$merge(o),CMPT&&e.copy(e.P("nej.e"),o),o});