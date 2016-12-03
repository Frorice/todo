/*
 * ------------------------------------------
 * 侧边面板（用户和清单）
 * @version  1.0
 * @author   frorice(https://github.com/frorice)
 * ------------------------------------------
 */
/** @module pro/widget/sidePanel */

NEJ.define([
    'base/element',
    '{pro}util/observer.js'
  ],function (_e,_obs){
    var init, render;

    var 
      sidePanel,//侧边面板节点
      childNode = {
        userBar: _e._$create('div'),
        submitForm: _e._$create('div'),
        todoLists: _e._$create('div')
      };

     /**
     * 初始化
     * @param  {Object} _container 应用容器
     * @return {Void}
     */
    init = function (_container){
      //在内存中创建节点
      sidePanel = _e._$create('div','side-panel');
      //挂载到容器
      _container.appendChild(sidePanel);
      //监听侧边面板渲染事件
      _obs.listen('renderSidePanel',render);
      
    }

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
        sidePanel.appendChild(childNode[_data.widgetType]);
      }
    }

    return {
     init:init
    };
});