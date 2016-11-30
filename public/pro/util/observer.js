/*
 * ------------------------------------------
 * 发布-订阅模块
 * @version  1.0
 * @author   frorice(https://github.com/frorice)
 * ------------------------------------------
 */
/** @module pro/util/observer.js */
NEj.define([],function (){
  var clientList = {},//订阅缓存
      listen,
      trigger,
      remove;

  /**
   * 订阅
   * @param  {String}   key   事件名
   * @param  {Function} cb    回调函数
   * @return {Void}
   */
  listen = function (key, cb){
    if(!clientList[key]){
      clientList[key] = [];
    }
    clientList[key].push(cb);
  };

  /**
   * 发布
   * @return {Void}
   */
  trigger = function (){
    var key = Array.prototype.shift.call(arguments),
        cbs = clientList[key];

    if(!cbs || cbs.length === 0){
      return false;
    }

    for(var i = 0, cb; cb = cbs[i++];){
      cb.apply(this, arguments);
    }
  };

  /**
   * 移除
   * @param  {String}   key   事件名
   * @param  {Function} cb    回调函数
   * @return {Void}
   */
  remove = function (key, cb){
    var cbs = clientList[key];

    if(!cbs){
      return false;
    }

    if(!cb){
      cbs && (cbs.length = 0);
    }else{
      for(var i = cbs.length-1; i>=0; i--){
        var _cb = cbs[i];
        if(_cb===cb){
          cbs.splice(i,1);
        }
      }
    }
  };

  return {
    listen: listen,
    trigger: trigger,
    remove: remove
  }

});