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
    'base/event',
    '{pro}util/observer.js',
    '{pro}util/handler.js',
    '{pro}widget/dialog/dialog.js'
  ],function (_e, _v, _obs, _hdl, dialog){
    var init, render, bindEvent;

    var 
      sidePanel,//侧边面板节点
      childNode = {
        userBar: null,
        submitForm: null,
        todoLists: null
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
      if(!childNode[_data.widgetType]){
        childNode[_data.widgetType] = _e._$create('div');
        //绑定事件
        bindEvent(childNode[_data.widgetType], _data.widgetType);
        sidePanel.appendChild(childNode[_data.widgetType]);
      }
        
      childNode[_data.widgetType].innerHTML = _data.html;
      
    };

    bindEvent = function(_node, _widgetType){
      var typeMap = {
        userBar:'sign',
        submitForm:'addList',
        todoLists: function (_event){
          console.log(_event)
          if(_event.target.id == "todo-lists__edit"){
            _hdl.showDialog({
              _sign: _event.target.parentNode.parentNode.id.replace('todo-lists__',''),
              _value: _e._$getSibling(_event.target.parentNode,{backward:true}).innerText
            },'editList');
          }else{
           _hdl.switchList(_event); 
          }
          
        }
      };
      //为userbar和submitForm绑定事件
      if(typeof typeMap[_widgetType] == 'string'){
        _v._$addEvent(_node, 'click', function (_event){

          if(_event.target.id == 'user-bar__sign-out'){
            //退出操作
            _hdl.sign(_event);
            return;
          } 

          //userbar内点击除登录按钮以外的区域不响应
          if(_widgetType=='userBar'&& _event.target.id != 'user-bar__sign'){
            return;
          }
          _hdl.showDialog({
            _sign:typeMap[_widgetType]
          },typeMap[_widgetType]);
          dialog.setWarningText(typeMap[_widgetType],'');
        });
      }
      
      _v._$addEvent(_node, 'click', typeMap[_widgetType]);
    };

    return {
     init:init
    };
});