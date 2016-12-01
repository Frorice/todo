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
        url = _urls.userUrl,
        opt = {
          data: accountInfo,
          method:'POST',
          onload:function(_data){
            _obs.trigger('signin',_data);
            console.log(_data,"signIn");
          },
          onerror:function(_error){
            console.error("这里出错了");
          },
          onbeforerequest:function(_event){
            console.log("先做点处理");
          }
        }
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
        url = _urls.userUrl,
        opt = {
          data: accountInfo,
          method:'POST',
          onload:function(_data){
            _obs.trigger('signUp',_data);
            console.log(_data,"signUp");
          },
          onerror:function(_error){
            console.error("这里出错了");
          },
          onbeforerequest:function(_event){
            console.log("先做点处理");
          }
        }
    }
    /**
     * 退出登录
     * @return {Void}
     */
    signOut = function (accountInfo){
      if(!accountInfo){
        //若没有账户信息，返回
        return;
      }
      var 
        url = _urls.userUrl,
        opt = {
          data: accountInfo,
          method:'POST',
          onload:function(_data){
            _obs.trigger('signOut',_data);
            console.log(_data,"signOut");
          },
          onerror:function(_error){
            console.error("这里出错了");
          },
          onbeforerequest:function(_event){
            console.log("先做点处理");
          }
        }
    }
    /**
     * 取得todo列表
     * @return {Void}
     */
    getTodos = function (){
      var 
        url = _urls.todosUrl,
        opt = {
          param:{
            uid:2342,//_appData.getCurrUser().id,
            lid:232//_appData.getCurrList().id
          },
          method:'GET',
          onload:function(_data){
            _obs.trigger('getTodos',_data);
            console.log(_data,"getTodos");
          },
          onerror:function(_error){
              console.error("这里出错了");
          },
          onbeforerequest:function(_event){
              console.log("先做点处理");
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
            uid:32//_appData.getCurrUser().id
          },
          method:'GET',
          onload:function(_data){
            _obs.trigger('getLists',_data);
            console.log(_data,"getLists");
          },
          onerror:function(_error){
              console.error("这里出错了");
          },
          onbeforerequest:function(_event){
              console.log("先做点处理");
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
            uid:564,
            lid:343,
            cnt:cnt
          },
          method:'POST',
          onload:function(_data){
            _obs.trigger('addTodo',_data);
              console.log(_data,"addTodo");
          },
          onerror:function(_error){
              console.error("这里出错了");
          },
          onbeforerequest:function(_event){
              console.log("先做点处理");
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
            uid:3434,
            name:name
          },
          method:'POST',
          onload:function(_data){
            _obs.trigger('addList',_data);
              console.log(_data,"addList");
          },
          onerror:function(_error){
              console.error("这里出错了");
          },
          onbeforerequest:function(_event){
              console.log("先做点处理");
          }
        };

      _j._$request(url,opt);
    };

    /**
     * 更新单个todo的内容
     * @return {Void}
     */
    updateTodo = function (data){
      var 
        url = _urls.todosUrl,
        opt = {
          data:data,
          method:'PATCH',
          onload:function(_data){
            _obs.trigger('updateTodo',_data);
              console.log(_data,"updateTodo");
          },
          onerror:function(_error){
              console.error("这里出错了");
          },
          onbeforerequest:function(_event){
              console.log("先做点处理");
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
          method:'PATCH',
          onload:function(_data){
            _obs.trigger('updateList',_data);
              console.log(_data,"updateList");
          },
          onerror:function(_error){
              console.error("这里出错了");
          },
          onbeforerequest:function(_event){
              console.log("先做点处理");
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
          data:{
            tid:tid
          },
          method:'DELETE',
          onload:function(_data){
            _obs.trigger('delTodo',_data);
            console.log(_data,"delTodo");
          },
          onerror:function(_error){
              console.error("这里出错了");
          },
          onbeforerequest:function(_event){
              console.log("先做点处理");
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
          data:{
            lid:lid
          },
          method:'DELETE',
          onload:function(_data){
            _obs.trigger('delList',_data);
            console.log(_data,"delList");
          },
          onerror:function(_error){
              console.error("这里出错了");
          },
          onbeforerequest:function(_event){
              console.log("先做点处理");
          }
        };

      _j._$request(url,opt);
    };

    return {
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