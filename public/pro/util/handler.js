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
     * @param  {String} _sign 弹出框名称标记用于区分登录/注册弹出框，添加、修改清单弹出框
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
      if((_event.key == "Enter"&&_event.target.id == 'todo-dialog__list-name--add')
        || _event.target.id  == "todo-dialog__add-list"){
        _req.addList(_e._$get('todo-dialog__list-name--add').value);
      }else if(_event.key == "Enter"
        && _event.target.id == 'main-panel__add-todo'
        && _appData.getCurrList()){
        _req.addTodo(_e._$get('main-panel__add-todo').value);
      }
    };
    /**
     * 更新todo的状态
     * @param  {Object} _event 事件对象
     * @return {Void}
     */
    updateTodo = function (_event){
      var target = _event.target,
          eventType = _event.type,
          tid = target.parentNode.id.replace('todos__',''),
          todos = _appData.getCurrUser().data.todos;
      for(var i=0;todos[i];i++){
        if(todos[i]._id == tid){
          (eventType == 'keyup')? (todos[i].cnt = arguments[1]):
          (todos[i].active = !todos[i].active);
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
      var 
        target  = _event.target,
        user        = _appData.getCurrUser(),
        checkStatus = target.innerHTML.toLowerCase();
      var renderData = {
        uid: user.id
      };
      _appData.setCheckStatus(checkStatus);
      renderData.todos = _appData.getRenderTodos();
      _obs.trigger('renderTodos',renderData);
    };
    /**
     * 切换清单
     * @param  {Object} _event 事件对象
     * @return {Void}
     */
    switchList = function (_event){
      var lid,
      target = _event.target,
      lists = _appData.getCurrUser().data.lists,
      title = _e._$get('title');

      if(target.tagName == 'LI'){
        lid = target.id.replace('todo-lists__','');
      }else if(target.parentNode.tagName == 'LI'){
        lid = target.parentNode.id.replace('todo-lists__','');
      }else if(target.className == 'active'){
        lid = target.parentNode.parentNode.id.replace('todo-lists__','');
      }
      
      if(lid){
        for(var j = 0;lists[j];j++){
          if(lists[j]._id == lid){
            _appData.setCurrList(lists[j]);
            title.innerText = lists[j].name;
            break;
          }
        }
        _req.getTodos(lid);
        _appData.setCheckStatus('active');
      }
    };

     /**
     * 登录/注册/退出
     * @param  {Object} _event 事件对象
     * @return {Void}
     */
    sign = function(_event){
      var userInfo,title = _e._$get('title');
      if(_e._$get('todo-dialog__user-name')){
        userInfo = {
          userName: _e._$get('todo-dialog__user-name').value,
          pwd: _e._$get('todo-dialog__pwd').value 
        };
      }
      if(_event.key == 'Enter' || _event.target.id == 'todo-dialog__sign-in'){
        _req.signIn(userInfo);
      }else if(_event.target.id == 'todo-dialog__sign-up'){
        _req.signUp(userInfo);
      }else {
        title.innerText = 'todos';
        _req.signOut();
      }
    };

    /**
     * 删除清单
     * @param  {Object} _event 事件对象
     * @return {Void}
     */
    deleteList = function (_event){
      var lid = _e._$get('todo-dialog__lid').innerText,
          title = _e._$get('title');
      title.innerText = "todos";
      _req.delList(lid);
    };
    /**
     * 删除todo
     * @param  {Object} _event 事件对象
     * @return {Void}
     */
    deleteTodo = function (_event){
      var target = _event.target;
      var tid = target.parentNode.id.replace('todos__','');
      _req.delTodo(tid);
    };
    /**
     * 修改清单名称
     * @param  {Object} _event 事件对象
     * @return {Void}
     */
    updateList = function (_event){
      var lists = _appData.getCurrUser().data.lists,
      lid       = _e._$get('todo-dialog__lid').innerText,
      listName  = _e._$get('todo-dialog__list-name--update').value;
      for(var i = 0; lists[i]; i++){
        if(lists[i]._id == lid){
          lists[i].name = listName;
          _req.updateList(lists[i]);
          break; 
        }
      }
      
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