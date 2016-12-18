/*
 * ------------------------------------------
 * 应用根模块
 * @version  1.0
 * @author   frorice(https://github.com/frorice)
 * ------------------------------------------
 */
/** @module pro/todo.js */
NEJ.define([
  '{pro}util/request.js',
  '{pro}util/data.js',
  '{pro}widget/sidePanel/sidePanel.js',
  '{pro}widget/mainPanel/mainPanel.js',
  '{pro}widget/submitForm/submitForm.js',
  '{pro}widget/todoLists/todoLists.js',
  '{pro}widget/todos/todos.js',
  '{pro}widget/userBar/userBar.js',
  '{pro}widget/dialog/dialog.js'
],function (_req, _appData, sidePanel, mainPanel, submitForm, todoLists, todos, userBar, dialog){
    var init;

    /**
     * 初始化应用
     * @param  {Object} _container 应用容器
     * @return {Void}
     */
    init = function (_container){
     //初始化组件
     submitForm.init();
     todoLists.init();
     todos.init();
     userBar.init();
     dialog.init();

     sidePanel.init(_container);
     mainPanel.init(_container);
     //初始化本地默认数据
     _appData.init();
     //尝试自动登录(已登录过或多开)
     _req.signIn({init: true});
    }

  return {
    init:init
  };
});