/*
 * ------------------------------------------
 * 事件处理函数集
 * @version  1.0
 * @author   frorice(https://github.com/frorice)
 * ------------------------------------------
 */
/** @module pro/util/handler.js */
NEJ.define([
    '{pro}util/observer.js',
    '{pro}util/data.js',
    '{pro}util/request.js',
    'base/element',
  ], function (_obs, _appData, _req, _e){
    
  var 
    showDialog,//处理需要弹出框的情况。
    sign,//处理登录，注册，退出。
    addItem,//处理清单和todo的添加。
    updateTodo,//处理todo的状态变化。
    switchList,//处理清单的切换。
    checkTodosByStatus;//处理切换状态查看todos的按钮点击事件

    /**
     * 根据标识显示弹出框
     * @param  {Object} _data 渲染需要的数据
     * @param  {String} _sign 弹出框名称标记目前有两个，登录/注册弹出框，添加清单弹出框
     * @return {Void}
     */
    showDialog = function (_data, _sign){
      if(typeof _data == 'string'){
        _sign = _data;
      }

      _obs.trigger('renderDialog', _data, _sign);
    };

    /**
     * 根据标识决定添加的对象
     * @param  {String} _sign 区分添加清单和todo list/todo
     * @return {Void}
     */

    addItem = function(_sign){
      alert('addItem');
    };

    updateTodo = function (){
      alert('updateTodo');
    };

    checkTodosByStatus = function (){
      alert('checkTodosByStatus');
    };
     /**
     * 切换清单
     * @param  {Object} _event 事件对象
     * @return {Void}
     */
    switchList = function (_event){
      for(var i=0;_event.path[i++];){
        if(_event.path[i-1].tagName == 'LI'){
          _req.getTodos(_event.path[i-1].id.replace('todo-lists_',''));
        }
      }
    };

     /**
     * 登录/注册/退出
     * @param  {Object} _event 事件对象
     * @return {Void}
     */
    sign = function(_event){
      var userInfo = {
        userName: _e._$get('todo-dialog__user-name').value,
        pwd:_e._$get('todo-dialog__pwd').value
      };
      if(_event.srcElement.id == 'todo-dialog__sign-in'){
        _req.signIn(userInfo);
      }else{
        _req.signUp(userInfo);
      }
    };

    return {
      showDialog:showDialog,
      switchList:switchList,
      sign:sign,
      addItem:addItem,
      updateTodo:updateTodo,
      checkTodosByStatus:checkTodosByStatus
    };
});