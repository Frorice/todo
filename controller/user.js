const userModel = require('../model/user.js');

module.exports = {
  signIn: function *(next){
    const ctx = this,
          data = ctx.request.body;
    if(ctx.session.user){
      let user = yield userModel.findById(ctx.session.user);
      ctx.body = {
        uid: user._id,
        userName: user.name,
        status: 1
      };
      return;
    }

    if(!data||!data.userName || !data.pwd){
      ctx.status = 411;
      return this.body = 'length required';
    }

    var user = yield userModel.findByName(data.userName)
    if(!user){
      ctx.status = 404;
      ctx.body = "not found";
    }else{
      //验证密码
      user.comparePassword(data.pwd, function(isMatch){
        if(isMatch){
          ctx.session.user = user._id;
          ctx.body = {
            uid: user._id,
            status: 1,//1：已登录，其他：未登录
            userName: user.name
          };
        }else{
          ctx.status = 401;
          ctx.body = "unauthorized";
        }
      });
    } 
  },
  signUp: function *(next){
    const ctx = this,
          data = ctx.request.body;

    if(!data||!data.userName||!data.pwd){
      ctx.status = 411;
      ctx.body = 'length required';
      return;
    }

    var user = yield userModel.findByName(data.userName);
    if(user){
      ctx.status = 409;
      ctx.body = "conflict";
    }else{
      user = new userModel({name: data.userName, password: data.pwd});
      yield user.save(function (err) {
        if (err) {
          console.log(err);
          return;
        }
        ctx.session.user = user._id;
        ctx.body = {
          uid: user._id,
          status: 1,//1：已登录，其他：未登录
          userName: user.name
        };
      });
    }
  },
  signOut: function *(next){
    const ctx = this;
    delete ctx.session.user;
    ctx.body = {
      status: 0,
      uid: -1,
      userName: "default"
    };
    
  },
  //登录验证
  signRequired: function *(next){
    const ctx = this;

    if(!ctx.session.user){
      this.status = 401
      this.body = 'unauthorized';
      return;
    }

    yield next;
  }
};