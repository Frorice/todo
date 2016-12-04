/*
 * ------------------------------------------
 * 添加清单或todo的输入框
 * @version  1.0
 * @author   frorice(https://github.com/frorice)
 * ------------------------------------------
 */
/** @module pro/widget/submitForm */

NEJ.define([
    '{pro}util/observer.js',
    'util/template/jst',
    'text!./submitForm.jst'
  ],function (_obs, _p, _tpl){
    var build, render;

    var submitFormHtml;

    

    /**
     * 构建模板
     * @param  {Object} _data生成html结构所需的数据
     * @return {Void}
     */
    build = function (_data){
      //取得模板
      var _html_seed = _p._$add(_tpl);
      //生成结构
      submitFormHtml = _p._$get(_html_seed, _data);
    }

    /**
     * 构建模板并触发侧边面板渲染事件
     * @param  {Object} _data 生成html结构所需的数据
     *                        {target:"renderSidePanel/renderMainPanel"}
     * @return {Void}
     */
    render = function (_data){
      build({action:_data.target.slice(6).toLowerCase()+'-add'});
      _obs.trigger(_data.target,{
        widgetType: 'submitForm',
        html:submitFormHtml
      });
    }

    return {
      init: function (){
        //监听提交表单渲染事件
        _obs.listen('renderSubmitForm', render);
      }
    };  
});