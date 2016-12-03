/*
 * ------------------------------------------
 * 用户信息条
 * @version  1.0
 * @author   frorice(https://github.com/frorice)
 * ------------------------------------------
 */
/** @module pro/widget/userBar */

NEJ.define([
    '{pro}util/observer.js',
    'util/template/jst',
    'text!./userBar.jst'
  ],function (_obs, _p, _tpl){
    var build, render;

    var userBarHtml;//用户信息条html结构

    /**
     * 构建模板
     * @param  {Object} _data生成html结构所需的数据
     * @return {Void}
     */
    build = function (_data){
      //取得模板
      var _html_seed = _p._$add(_tpl);
      //生成结构
      userBarHtml = _p._$get(_html_seed, _data);
    }

    /**
     * 构建模板并触发侧边面板渲染事件
     * @param  {Object} _data 生成html结构所需的数据
     * @return {Void}
     */
    render = function (_data){
      build(_data);
      _obs.trigger('renderSidePanel',{
        _sign:'add',
        widgetType:'userBar',
        html:userBarHtml
      });
    }

    return {
      init: function (){
        //监听用户信息条渲染事件
        _obs.listen('renderUserBar', render);
      }
    };
});