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
    _changeCurrUser, _updateLists, _updateTodos, _initByLocalData, _replaceItem;

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
      if(_data.uid != currUser.id){
        return;
      }
      if(!_data.todos){
        currUser.data.todos ? _replaceItem(currUser.data.todos, _data)
        :(!_data.del && (currUser.data.todos = [_data])); 
      }else{
        currUser.data.todos = _data.todos;
      }
      _obs.trigger('renderTodos',{
        uid: _data.uid,
        todos:currUser.data.todos
      });
    };

    /**
     * 自动登录或要求登录
     * @return {Void}
     */
    _initByLocalData = function (){
      _req.signIn({});

      _obs.trigger('renderSubmitForm',{target:"renderSidePanel"});

      _obs.trigger('renderSubmitForm',{target:"renderMainPanel"});
    };
    /**
     * 删除或替换列表中的项
     * @param  {Object} _container 应用容器
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
      _initByLocalData();
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
      }
    };
});