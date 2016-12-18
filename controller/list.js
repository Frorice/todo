const listModel = require('../model/list.js');
const todoModel = require('../model/todo.js');

module.exports = {
  insert: function *(next){
    const ctx = this,
    data      = ctx.request.body,
    _uid      = ctx.session.user;

    var list;

    if(!data||!data.uid||!data.name){
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
    data.name = data.name.substr(0,10).replace(/</g,'&lt');//简单防xss+超过10个字符长的清单名会被截断
    if(data._id){
      //更新list
      list = yield listModel.findById(data._id);
      if(!list || list.uid != _uid){//防止未授权修改别人的list
        ctx.status = 403;
        ctx.body = 'forbidden';
        return;
      }else{
        
        for(var i in data){
          if(i!='uid'){
            list[i] && (list[i] = data[i]);
          }
        }
      }
    }else{
      //添加list
      list = new listModel(data);
    }

    yield list.save(function (err){
      if(err){
        console.error(err);
        return;
      }
      ctx.body = list;
    });
  },
  delete: function *(next){
    const ctx = this,
    data      = ctx.query,
    _uid      = ctx.session.user;

    var list;

    if(!data||!data.lid){
      ctx.status = 411;
      ctx.body   = 'length required';
      return;
    }

    list = yield listModel.findById(data.lid);
    if(!list||list.uid != _uid){//防止未授权删除别人的list
      this.status = 403;
      this.body   = 'forbidden';
    }else{
      var result = yield listModel.removeById(data.lid);
      result = result.result;
      if(result.ok){
        //删除该list下所有todo
        yield todoModel.removeByLid(data.lid);
        ctx.body = {
          list: {
            uid: list.uid,
            _id: list._id,
            del: true
          }
        };  
      }else{
        ctx.body = result;
      }

    }
  },
  list: function *(next){
    const ctx = this,
    data      = ctx.query,
    _uid      = ctx.session.user;

    if(!data||!data.uid){
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

    
    var lists = yield listModel.findByUid(data.uid);
    if(!lists||!lists.length){
      ctx.status = 404;
      ctx.body   = 'not found';
    }else{
      ctx.body = {
        uid:data.uid,
        lists:lists
      };
    }
  }
}