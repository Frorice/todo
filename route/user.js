const router  = require('koa-router')();
const user = require('../controller/user.js');

router.post('/api/signin', user.signIn);  

router.post('/api/signout', user.signOut);

router.post('/api/signup', user.signUp);

router.get('/', function *(next){
  var ctx = this;
  ctx.redirect('/html/index.html');
});

module.exports = router;