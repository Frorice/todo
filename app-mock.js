const Koa       = require('koa');
const co         = require('co');
const koaStatic  = require('koa-static'); 
const bodyParser = require('koa-bodyparser');

const app = new Koa();

//中间件
app.use(bodyParser());
app.use(koaStatic(__dirname + '/public'));

//路由
const user = require('./route/user.js');
const list = require('./route/list.js');
const todo = require('./route/todo.js');

app.use(user.routes());
app.use(list.routes());
app.use(todo.routes());

app.use(co.wrap(function *(ctx, next){
}));

app.listen('3000', function (err){
  if(err){
    console.error(err);
    return;
  }
  console.log("server has been started!")
});