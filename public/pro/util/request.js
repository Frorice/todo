/*
 * ------------------------------------------
 * 处理网络请求
 * @version  1.0
 * @author   frorice(https://github.com/frorice)
 * ------------------------------------------
 */
/** @module pro/util/request.js */
NEJ.define([
  'base/event',
  'util/ajax/rest',
  '{pro}util/requestUrls.js',
  '{pro}util/data.js',
  '{pro}util/observer.js'
],function (_v,_j,_urls,_appData,_obs){
    // 通用错误处理，所有请求异常均会调用此回调处理
    _v._$addEvent(
        window,'resterror',function(_error){
            //输出错误信息
            console.error(
              '错误：'
              + _error.message +'\n'
              + _error.code + ' '
              + _error.data
            );
        }
    );

    var 
      signIn,siginUp,signOut,
      getTodos,getLists,
      addTodo,addList,
      updateTodo,updateList,
      delTodo,delList;
    /**
     * 登录
     * @param {Object} accountInfo 账户信息 
     * @return {Void}
     */
    signIn = function (accountInfo){
      if(!accountInfo){
        //若没有账户登录，返回 
        return;
      }
      var 
        url = _urls.signInUrl,
        opt = {
          data: accountInfo,
          method:'POST',
          onload:function(_data){
            _obs.trigger('signIn',_data);
            getLists();
          },
          onerror:function(_error){
            _obs.trigger('renderDialog',{_sign:'sign',sign:'sign'});
          }
        }
      _j._$request(url,opt);
    }
    /**
     * 注册
     * @param {Object} accountInfo 账户信息 
     * @return {Void}
     */
    signUp = function (accountInfo){
      if(!accountInfo){
        //若账户为空，返回
        return;
      }
      var 
        url = _urls.signUpUrl,
        opt = {
          data: accountInfo,
          method:'POST',
          onload:function(_data){
            _obs.trigger('signUp',_data);
            console.log(_data,"signUp");
          }
        }
      _j._$request(url,opt);
    }
    /**
     * 退出登录
     * @return {Void}
     */
    signOut = function (accountInfo){
      var 
        url = _urls.signOutUrl,
        opt = {
          method:'POST',
          onload:function(_data){
            _obs.trigger('signOut',_data);
            _obs.trigger('getLists',{
              uid: _appData.getCurrUser().id,
              lists: _appData.getCurrUser().data.lists
            })
            console.log(_data,"signOut");
          }
        }
      _j._$request(url,opt);
    }
    /**
     * 取得todo列表
     * @return {Void}
     */
    getTodos = function (_lid){
      var 
        url = _urls.todosUrl,
        opt = {
          param:{
            uid:_appData.getCurrUser().id,
            lid:_lid
          },
          method:'GET',
          onload:function(_data){
            _obs.trigger('getTodos',_data);
            console.log(_data,"getTodos");
          },
          onerror:function(_error){
              if(_error.data == 404){
                console.log(_appData.getCurrList());
              }
          }
        };

      _j._$request(url,opt);
    };

    /**
     * 取得清单列表
     * @return {Void}
     */
    getLists = function (){
      var 
        url = _urls.listsUrl,
        opt = {
          param:{
            uid:_appData.getCurrUser().id
          },
          method:'GET',
          onload:function(_data){
            _obs.trigger('getLists',_data);
            console.log(_data,"getLists");
          },
          onerror:function(_error){
              console.error("这里出错了");
          }
        };

      _j._$request(url,opt);
    };

    /**
     * 添加单个todo
     * @return {Void}
     */
    addTodo = function (cnt){
      var 
        url = _urls.todosUrl,
        opt = {
          data:{
            uid:_appData.getCurrUser().id,
            lid:_appData.getCurrList()._id,
            cnt:cnt
          },
          method:'POST',
          onload:function(_data){
            _obs.trigger('addTodo',_data.todo);
            _obs.trigger('updateList',_data.list);
            console.log(_data,"addTodo");
          },
          onerror:function(_error){
              console.error("这里出错了");
          }
        };

      _j._$request(url,opt);
    };

    /**
     * 添加单个清单
     * @return {Void}
     */
    addList = function (name){
      var 
        url = _urls.listsUrl,
        opt = {
          data:{
            uid:_appData.getCurrUser().id,
            name:name
          },
          method:'POST',
          onload:function(_data){
            _obs.trigger('addList',_data);
            console.log(_data,"addList");
          },
          onerror:function(_error){
              console.error("这里出错了");
          }
        };

      _j._$request(url,opt);
    };

    /**
     * 更新单个todo的状态
     * @return {Void}
     */
    updateTodo = function (todo){

      var 
        url = _urls.todosUrl,
        opt = {
          data:todo,
          method:'PUT',
          onload:function(_data){
            _obs.trigger('updateTodo', _data.todo);
            _obs.trigger('updateList', _data.list);
            console.log(_data,"updateTodo");
          },
          onerror:function(_error){
              console.error("这里出错了");
          }
        };

      _j._$request(url,opt);
    };

    /**
     * 更新单个清单的名称
     * @return {Void}
     */
    updateList = function (data){
      var 
        url = _urls.listsUrl,
        opt = {
          data:data,
          method:'PUT',
          onload:function(_data){
            _obs.trigger('updateList',_data);
            console.log(_data,"updateList");
          },
          onerror:function(_error){
              console.error("这里出错了");
          }
        };

      _j._$request(url,opt);
    };
    
    /**
     * 删除单个todo
     * @return {Void}
     */
    delTodo = function (tid){
      var 
        url = _urls.todosUrl,
        opt = {
          param:{
            tid:tid
          },
          method:'DELETE',
          onload:function(_data){
            _obs.trigger('delTodo',_data.todo);
            _obs.trigger('updateList',_data.list);
            console.log(_data,"delTodo");
          },
          onerror:function(_error){
              console.error("这里出错了");
          }
        };

      _j._$request(url,opt);
    };

    /**
     * 删除单个清单
     * @return {Void}
     */
    delList = function (lid){
      var 
        url = _urls.listsUrl,
        opt = {
          param:{
            lid:lid
          },
          method:'DELETE',
          onload:function(_data){
            _obs.trigger('delList',_data.list);
            console.log(_data,"delList");
          },
          onerror:function(_error){
              console.error("这里出错了");
          }
        };

      _j._$request(url,opt);
    };

    return {
      signIn:signIn,
      signUp:signUp,
      signOut:signOut,
      getTodos: getTodos,
      getLists: getLists,
      addTodo: addTodo,
      addList: addList,
      updateTodo: updateTodo,
      updateList: updateList,
      delTodo: delTodo,
      delList: delList
    };
});