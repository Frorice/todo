const router  = require('koa-router')();
const user = require('../controller/user.js');
const todo = require('../controller/todo.js');

router.get('/api/todos', user.signRequired, todo.list);  

router.post('/api/todos', user.signRequired, todo.insert);

router.del('/api/todos', user.signRequired, todo.delete);

router.put('/api/todos', user.signRequired, todo.insert);

module.exports = router;