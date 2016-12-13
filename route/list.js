const router  = require('koa-router')();
const user = require('../controller/user.js');
const list = require('../controller/list.js');

router.get('/api/lists', user.signRequired, list.list);  

router.post('/api/lists', user.signRequired, list.insert);

router.del('/api/lists', user.signRequired, list.delete);

router.put('/api/lists', user.signRequired, list.insert);

module.exports = router;