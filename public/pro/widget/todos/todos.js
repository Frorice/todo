/*
 * ------------------------------------------
 * 用户todo列表
 * @version  1.0
 * @author   frorice(https://github.com/frorice)
 * ------------------------------------------
 */
/** @module pro/widget/todos */

NEJ.define([
    '{pro}util/observer.js',
    'util/template/jst',
    'text!./todos.jst'
  ],function (_obs, _p, _tpl){
    var build, render;

    var todosHtml;

    

    /**
     * 构建模板
     * @param  {Object} _data生成html结构所需的数据
     * @return {Void}
     */
    build = function (_data){
      //取得模板
      var _html_seed = _p._$add(_tpl);
      //生成结构
      todosHtml = _p._$get(_html_seed, _data);
    }

    /**
     * 构建模板并触发侧边面板渲染事件
     * @param  {Object} _data 生成html结构所需的数据
     * @return {Void}
     */
    render = function (_data){
      build(_data);
      _obs.trigger('renderMainPanel',{
        widgetType: 'todos',
        html:todosHtml
      });
    }

    return {
      init: function (){
        //监听用户todo列表渲染事件
        _obs.listen('renderTodos', render);
      }
    };
});