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
      name:"default",
      data:{
        lists:null,
        todos:null
      }
    },
    currUser = defaultUser;//当前用户
    
  var 
    _changeCurrUser,_updateLists,_updateTodos;

  var init;

    /**
     * 切换用户
     * @param  {Object} _user 用户数据（id，name）
     * @return {Void}
     */
    _changeCurrUser = function (_user){
      if(currUser.id == _user.id){
        return;
      }
      currUser = _user;
      _obs.trigger('renderUserBar',currUser);
    };

    /**
     * 刷新清单列表
     * @param  {Object} _data   用户清单数据
     * @return {Void}
     */
    _updateLists = function (_data){
      if(_data.uid != currUser.id){
        return;
      }
      currUser.data.lists = _data.lists;
      _obs.trigger('renderTodoLists',currUser.data.lists);
    };

    /**
     * 刷新todo列表
     * @param  {Object} _data   清单todo数据
     * @return {Void}
     */
    _updateTodos = function (_data){
      if(_data.uid != currUser.id){
        return;
      }
      currUser.data.todos = _data.todos;
      _obs.trigger('renderTodos',currUser.data.todos);
    };

    /**
     * 初始化数据
     * @param  {Object} _container 应用容器
     * @return {Void}
     */
    init = function (){
      //初始化本地数据
      _updateLists({
        uid:-1,
        lists:localStorage.get('lists')
      });
      _updateTodos({
        uid:-1,
        lid:23,
        lists:localStorage.get('todos')
      });

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

      //监听网络请求以更新缓存数据
      for(var request in _req){
        _obs.listen(request,listens[request]);
      }

    };

    return {
      init:init
    };
});