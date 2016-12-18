const todoModel = require('../model/todo.js');
const listModel = require('../model/list.js');

module.exports = {
  insert: function *(next){
    const ctx = this,
    data      = ctx.request.body,
    _uid      = ctx.session.user;

    var todo,list,rawActive;

    if(!data || !data.uid && !data.lid){
      ctx.status = 411;
      ctx.body   = 'length required';
      return;
    }

    //若uid不是当前登录用户，拒绝
    if(_uid != data.uid){
      ctx.status = 401;
      ctx.body   = 'unauthorized';
      return;
    }

    list = yield listModel.findById(data.lid);
    if(!list){
      ctx.status = 404;
      ctx.body = 'not found';
      return;
    }
    data.cnt = data.cnt.substr(0,24).replace(/</g,'&lt');//简单防xss+超过24个字符长的todo内容会被截断
    if(data._id){
      //更新todo
      todo = yield todoModel.findById(data._id);
      if(!todo || todo.uid!=_uid){
        ctx.status = 404;
        ctx.body = 'not found';
        return;
      }else{
        rawActive = todo.active;
        for(var i in data){
          //不允许修改todo的归属
          if(i!='uid'&&i!='lid'){
            todo[i] && (todo[i] = data[i]);
            (i=='active')&&(todo[i] = data[i]);
          }
        }
      }
    }else{
      //添加todo
      todo = new todoModel(data);
    }

    yield todo.save(function (err){
      if(err){
        console.error(err);
        return;
      }
      if(ctx.method == 'POST'){//添加todo则list的active数和total数+1
        todo.active && list.active++;
        list.total++;
      }else{//更新todo则list的active数根据todo的active加减
       if((data.active===false||data.active===true)
        &&rawActive!==todo.active){
        //修改后和修改前的状态不一致则list的active数需要变化
        todo.active?list.active++:list.active--;
       }
      }
      list.save(function (err){
        if(err){
          console.error(err);
          return;
        }
      });
      ctx.body = {
        list: list,
        todo: todo
      };
    });
  },
  delete: function *(next){
    const ctx = this,
    data      = ctx.query,
    _uid      = ctx.session.user;

    var todo, list;

    if(!data||!data.tid){
      ctx.status = 411;
      ctx.body   = 'length required';
      return;
    }

    todo = yield todoModel.findById(data.tid);
    if(!todo||todo.uid != _uid){//防止未授权删除别人的todo
      this.status = 404;
      this.body   = 'not found';
    }else{
      var result = yield todoModel.removeById(data.tid);
      result = result.result;
      if(result.ok){
        //删除后所在list的total减一，active也要相应变化
        list = yield listModel.findById(todo.lid);
        todo.active&&list.active--;
        list.total--;
        list.save(function (err){
          if(err){
            cosnole.error(err);
          }
        });
        ctx.body = {
          list: list,
          todo: {
            uid: todo.uid,
            _id: todo._id,
            del: true
          }
        };
      }
      
    }
  },
  list: function *(next){
    const ctx = this,
    data      = ctx.query,
    _uid      = ctx.session.user;
    
    var todos,list;

    if(!data||!data.uid && !data.lid){
      ctx.status = 411;
      ctx.body   = 'length required';
      return;
    }
    //若uid不是当前登录用户，拒绝
    if(_uid != data.uid){
      ctx.status = 401;
      ctx.body   = 'unauthorized';
      return;
    }

    todos = yield todoModel.findByLid(data.lid);
    if(!todos||!todos.length){
      ctx.status = 404;
      ctx.body   = 'not found';
    }else{
      list = yield listModel.findById(data.lid);
      ctx.body = {
        list: list,
        todos: {
          uid:data.uid,
          lid:data.lid,
          todos:todos
        }
      };
    }
  }
};