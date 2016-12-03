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
    //当前用户
    currUser,
    currList;

  var 
    _changeCurrUser, _updateLists, _updateTodos, _initByLocalData;

  var init;

    /**
     * 切换用户
     * @param  {Object} _user 用户数据（id，name）
     * @return {Void}
     */
    _changeCurrUser = function (_user){
      if(currUser && currUser.id == _user.id){
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
      _obs.trigger('renderTodoLists',_data);
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
      _obs.trigger('renderTodos',_data);
    };

    /**
     * 加载本地数据到缓存
     * @return {Void}
     */
    _initByLocalData = function (){
      //取出本地保存的清单
      var _todo_default_lists = JSON.parse(
        localStorage.getItem('_todo_offline_data_lists')
      ),
      _todo_default_todos = {};

      if(_todo_default_lists){
        defaultUser.data.lists = _todo_default_lists;
        //取清单中的第一个作为当前清单
        currList = defaultUser.data.lists[0];
        defaultUser.data.todos = JSON.parse(
          localStorage.getItem(currList.name)
        );
      }
      //渲染基础组件
      _obs.trigger('renderUserBar', {
        id: defaultUser.id,
        userName: defaultUser.name,
        status: 0
      });

      _obs.trigger('renderSubmitForm',{target:"renderSidePanel"});

      _obs.trigger('renderSubmitForm',{target:"renderMainPanel"});
    };

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
      _initByLocalData();
    };

    return {
      init:init,
      getCurrUser: function (){
        return {
          id: currUser.id,
          name: currUser.name
        };
      },
      getCurrList: function (){
        return currList;
      },
      setCurrList: function (list){
        currList = list;
      }
    };
});