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
    'base/event',
    '{pro}util/observer.js',
    '{pro}util/handler.js',
  ],function (_e, _v, _obs, _hdl){
    var init, render;

    var 
      mainPanel,//主面板节点
      childNode = {
        submitForm: null,
        todos: null
      };
     /**
     * 初始化
     * @param  {Object} _container 应用容器
     * @return {Void}
     */
    init = function (_container){
      //在内存中创建节点
      mainPanel = _e._$create('div','main-panel');
      mainPanel.innerHTML = '<div class="title-bar"><span id="title">todos</span></div>';
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
      if(!childNode[_data.widgetType]){
        childNode[_data.widgetType] = _e._$create('div');
        //绑定事件
        bindEvent(childNode[_data.widgetType], _data.widgetType);
        mainPanel.appendChild(childNode[_data.widgetType]);
      }
        
      childNode[_data.widgetType].innerHTML = _data.html;
    };

    bindEvent = function(_node, _widgetType){
      var typeMap = {
        todos:{
          eventType:'click keyup',
          handler:function(_event){
            var target = _event.target;
            if(_event.type == 'keyup'&&_event.key == 'Enter'){
              _hdl.updateTodo(_event,target.value);
            }else{
              if(target.id == 'changeTodo'){
                var span = target.parentNode.getElementsByTagName('span')[0],
                    text = span.innerText;
                    span.outerHTML = '<input type="text" value='+text+'>';
              }
              if(target.tagName == 'INPUT' && target.type == 'checkbox'){
                _hdl.updateTodo(_event);
              }
              if(target.tagName == 'LI' && target.parentNode.id == "todos__switch-status"){
                _hdl.checkTodosByStatus(_event);
              }
              if(target.id == 'delTodo'){
                _hdl.deleteTodo(_event);
              }
            }
            

          }
        },
        submitForm:{
          eventType:'keyup',
          handler:_hdl.addItem
        }
      };
      _v._$addEvent(_node, typeMap[_widgetType].eventType, typeMap[_widgetType].handler);
    };

    return {
     init:init
    };
});