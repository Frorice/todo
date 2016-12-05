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
    checkTodosByStatus,//处理切换状态查看todos的按钮点击事件
    deleteList,//删除清单
    deleteTodo,//删除todo
    updateList;//更新清单
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
     * 增加清单或todo
     * @param  {Object} _event 事件对象
     * @return {Void}
     */

    addItem = function(_event){
      if(_event.srcElement.id == "todo-dialog__add-list"){
        _req.addList(_e._$get('todo-dialog__list-name').value);
      }else{
        if(_event.key == "Enter"){
          _req.addTodo(_e._$get('main-panel__add-todo').value);        
        }
      }
    };
    /**
     * 更新todo的状态
     * @param  {Object} _event 事件对象
     * @return {Void}
     */
    updateTodo = function (_event){
      var srcElement = _event.srcElement;
          tid = srcElement.parentNode.className.replace('todos__',''),
          todos = _appData.getCurrUser().data.todos;
      for(var i=0;todos[i];i++){
        if(todos[i].id == tid){
          todos[i].active = !todos[i].active;
          _req.updateTodo(todos[i]);
          break;
        }
      }
    };
    /**
     * 根据状态查看当前清单中的todo
     * @param  {Object} _event 事件对象
     * @return {Void}
     */
    checkTodosByStatus = function (_event){
      
      var srcElement = _event.srcElement;
          todos = _appData.getCurrUser().data.todos; 
      switch(srcElement.innerHTML.toLowerCase()){
        case 'all':_obs.trigger('updateTodo',{local:true,todos:todos});break;
        case 'active':(function(todos){
          var activeTodos = [];
          for(var i = 0;todos[i];i++){
            if(todos[i].active){
              activeTodos.push(todos[i]);
            }
          }
          _obs.trigger('updateTodo',{local:true,todos:activeTodos});
        })(todos);break;
        case 'done':(function(todos){
          var doneTodos = [];
          for(var i = 0;todos[i];i++){
            if(!todos[i].active){
              doneTodos.push(todos[i]);
            }
          }
          _obs.trigger('updateTodo',{local:true,todos:doneTodos});
        })(todos);break;
      }

    };
    /**
     * 切换清单
     * @param  {Object} _event 事件对象
     * @return {Void}
     */
    switchList = function (_event){
      var lid,
      lists = _appData.getCurrUser().data.lists;
      for(var i = 0; _event.path[i];i++){
        if(_event.path[i].tagName == 'LI'){
          lid = _event.path[i].id.replace('todo-lists__','');
          for(var j = 0;lists[j];j++){
            if(lists[j].id == lid){
              _appData.setCurrList(lists[j]);
              break;
            }
          }
          _req.getTodos(lid);
          break;
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

    /**
     * 删除清单
     * @param  {Object} _event 事件对象
     * @return {Void}
     */
    deleteList = function (_event){
      var lid = _event.srcElement.parentNode.id;
      _req.delList(lid);
    };
    /**
     * 删除todo
     * @param  {Object} _event 事件对象
     * @return {Void}
     */
    deleteTodo = function (_event){
      var srcElement = _event.srcElement;
      var tid = srcElement.parentNode.id.replace('todos__','');
      _req.delTodo(tid);
    };
    /**
     * 修改清单名称
     * @param  {Object} _event 事件对象
     * @return {Void}
     */
    updateList = function (_event){
      var lid = _event.srcElement.parentNode.id;
      var listName = _e._$get('todo-dialog__list-name').value;
      _req.updateList({lid: lid, name: listName}); 
    };

    return {
      showDialog:showDialog,
      switchList:switchList,
      sign:sign,
      addItem:addItem,
      updateTodo:updateTodo,
      updateList:updateList,
      deleteTodo:deleteTodo,
      deleteList:deleteList,
      checkTodosByStatus:checkTodosByStatus
    };
});