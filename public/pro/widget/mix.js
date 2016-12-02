var fs = require('fs');

var files = [
  './mainPanel/mainPanel.mcss',
  './sidePanel/sidePanel.mcss',
  './userBar/userBar.mcss',
  './submitForm/submitForm.mcss',
  './todoLists/todoLists.mcss',
  './todos/todos.mcss',
],
targetFile = '../../css/todo.mcss';

var targetData = '';

files.forEach(function (file){
  var data = fs.readFileSync(file, 'utf8');
  targetData += data + '\n';
});

//先删除 再生成
fs.unlinkSync(targetFile);
fs.appendFile(targetFile, targetData, {encoding:'utf8'}, function (err){
  if(err){
    throw err;
  }
  console.log("complete!");
});