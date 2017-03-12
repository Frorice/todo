/*
 * ------------------------------------------
 * 处理应用所需的数据
 * @version  1.0
 * @author   frorice(https://github.com/frorice)
 * ------------------------------------------
 */
/** @module pro/util/data.js */
NEJ.define([
  '{pro}util/observer.js',
  '{pro}util/request.js'
],function(_obs, _req){

  var 
    //未登录的默认用户
    defaultUser = {
      id:-1,
      name:"Default",
      data:{
        lists:null,
        todos:null
      }
    },
    checkStatus = 'all',//当前查看状态
    //当前用户
    currUser,
    currList;

  var 
    _changeCurrUser, _updateLists, _updateTodos, _initRequiredWidget, _replaceItem, _switchTodos;

  var init, getRenderTodos;

    /**
     * 切换用户
     * @param  {Object} _user 用户数据（id，name）
     * @return {Void}
     */
    _changeCurrUser = function (_user){
      if(currUser && currUser.id == _user.id){
        return;
      }
      currUser = {
        id:_user.uid,
        name:_user.userName,
        data:{
          lists:null,
          todos:null
        }
      };
      _obs.trigger('renderUserBar',_user);
    };

    /**
     * 刷新清单列表
     * @param  {Object} _data   用户清单数据
     * @return {Void}
     */
    _updateLists = function (_data){

      if(_data.none){
        _obs.trigger('renderTodoLists',{none:true});
        currUser.data.lists = null;
        currList = null;
        return;
      }

      if(_data.uid != currUser.id){
        return;
      }
      
      if(!_data.lists){
        currUser.data.lists ? _replaceItem(currUser.data.lists, _data)
        :(!_data.del && (currUser.data.lists = [_data])); 
      }else{
        currUser.data.lists = _data.lists;
      }
      
      _obs.trigger('renderTodoLists',{
        uid: _data.uid,
        lists: currUser.data.lists
      });
    };

    /**
     * 刷新todo列表
     * @param  {Object} _data   清单todo数据
     * @return {Void}
     */
    _updateTodos = function (_data){
      if(_data.none){
        _obs.trigger('renderTodos',{none:_data.none});
        currUser.data.todos = null;
        return;
      }
      if(_data.uid != currUser.id){
        return;
      }
      if(!_data.todos){
        currUser.data.todos ? _replaceItem(currUser.data.todos, _data)
        :(!_data.del && (currUser.data.todos = [_data])); 
      }else{
        currUser.data.todos = _data.todos;
      }
      var renderData = {
        uid: _data.uid
      };
      renderData.todos = getRenderTodos();
      _obs.trigger('renderTodos',renderData);
    };

    _initRequiredWidget = function (){

      _obs.trigger('renderSubmitForm',{target:"renderSidePanel"});

      _obs.trigger('renderSubmitForm',{target:"renderMainPanel"});
    };
    /**
     * 删除或替换列表中的项
     * @param  {Array}  arr 数据列表
     * @param  {Object} data 要替换或删除的项
     * @return {Void}
     */
    _replaceItem = function (arr, data){
      var length = arr.length;
      for(var i=0;arr[i];i++){
        if(arr[i]._id == data._id){
          data.del? arr.splice(i, 1): (arr[i] = data);
          break;
        }
      }
      if(i == length){
        arr.push(data);
      }
    };
    /**
     * 根据不同条件返回相应todo集合（全部/未完成/已完成）
     * @param  {Boolean}  checkStatus 查询条件
     * @return {Array}    renderTodos 用于渲染todo列表的todo集合
     */
    _switchTodos = function(checkStatus){
      var renderTodos = [];
      for(var i = 0;currUser.data.todos[i];i++){
        if(checkStatus?currUser.data.todos[i].active:!currUser.data.todos[i].active){
          renderTodos.push(currUser.data.todos[i]);
        }
      }
      return renderTodos;
    };
    getRenderTodos = function(){
      var todos = {
        'all': currUser.data.todos
      };
      todos.active = _switchTodos(true);
      todos.done   = _switchTodos(false);
      return todos[checkStatus];
    }
    /**
     * 监听数据变化并初始化数据
     * @param  {Object} _container 应用容器
     * @return {Void}
     */
    init = function (){
      var listens = {
        signIn:_changeCurrUser,
        signUp:_changeCurrUser,
        signOut:_changeCurrUser,
        getLists:_updateLists,
        addList:_updateLists,
        updateList:_updateLists,
        delList:_updateLists,
        getTodos:_updateTodos,
        addTodo:_updateTodos,
        updateTodo:_updateTodos,
        delTodo:_updateTodos,
      };

      //监听引发数据变更的事件以更新缓存数据
      for(var request in _req){
        _obs.listen(request,listens[request]);
      }
      _initRequiredWidget();
    };

    return {
      init:init,
      getCurrUser: function (){
        return {
          id: currUser.id,
          name: currUser.name, 
          data: currUser.data
        };
      },
      getCurrList: function (){
        return currList;
      },
      setCurrList: function (list){
        currList = list;
      },
      getRenderTodos: getRenderTodos,
      setCheckStatus: function(status){
        if(!checkStatus) return null;
        checkStatus = status;
      }
    };
});