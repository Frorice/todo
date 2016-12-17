const Koa        = require('koa');
const co         = require('co');
const koaStatic  = require('koa-static'); 
const bodyParser = require('koa-bodyparser');
const session    = require('koa-session');
const mongoose   = require('mongoose');


//路由
const user = require('./route/user.js');
const list = require('./route/list.js');
const todo = require('./route/todo.js');

const app = new Koa();

app.keys = ['my todo\'s secret'];
var CONFIG = {
  key: 'koa:sess', 
  maxAge: 60*60*60*24, 
  overwrite: true, //可以覆盖
  httpOnly: true, 
  signed: true, //是否签名
};

mongoose.connect('mongodb://127.0.0.1/todos');

//中间件
//请求体解析
app.use(bodyParser());
//静态资源根目录
app.use(koaStatic(__dirname + '/public'));
//session
app.use(session(CONFIG, app));

app.use(user.routes());
app.use(list.routes());
app.use(todo.routes());

app.on('error', function(err){
  console.error('server error', err);
});

app.listen('3000', function (err){
  if(err){
    console.error(err);
    return;
  }
  console.log("server has been started at port 3000!")
});