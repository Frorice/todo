/*
 * ------------------------------------------
 * 主面板（todos）
 * @version  1.0
 * @author   frorice(https://github.com/frorice)
 * ------------------------------------------
 */
/** @module pro/widget/mainPanel */

NEJ.define([
    'base/element',
    '{pro}util/observer.js'
  ],function (_e,_obs){
    var init, render;

    var 
      mainPanel,//主面板节点
      childNode = {
        submitForm: _e._$create('div'),
        todos: _e._$create('div')
      };
     /**
     * 初始化
     * @param  {Object} _container 应用容器
     * @return {Void}
     */
    init = function (_container){
      //在内存中创建节点
      mainPanel = _e._$create('div','main-panel');
      //挂载到容器
      _container.appendChild(mainPanel);
      //监听主面板渲染事件
      _obs.listen('renderMainPanel',render);

    };

    /**
     * 在内存中创建节点
     * @param  {Object} _data 面板的部分html结构
     *                        和该结构的标记。add代表添加结构，replace代表替换结构
     *                        例：{_sign:'add',html:"<div></div>"}
     * @return {Void}
     */
    render = function (_data){
      childNode[_data.widgetType].innerHTML = _data.html;
      if(_data._sign === 'add'){
        mainPanel.appendChild(childNode[_data.widgetType]);
      }
    };

    return {
     init:init
    };
});