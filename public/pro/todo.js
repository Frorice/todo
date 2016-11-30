/*
 * ------------------------------------------
 * 应用根模块
 * @version  1.0
 * @author   frorice(https://github.com/frorice)
 * ------------------------------------------
 */
/** @module pro/todo.js */
NEJ.define([
  '{pro}util/data.js',
  '{pro}widget/sidePanel/sidePanel.js',
  '{pro}widget/mainPanel/mainPanel.js'
],function (_appData, _req, sidePanel, mainPanel){
    var _buildApp,init;

    /**
     * 渲染应用界面
     * @param  {Object} _container 应用容器
     * @param  {Object} initData 初始化数据
     * @return {Void}
     */
    _buildApp = function (_container){
      //初始化组件
      sidePanel.init(_container);
      mainPanel.init(_container);
      //初始化本地默认数据
      _appData.init();
    };

    /**
     * 初始化应用
     * @param  {Object} _container 应用容器
     * @return {Void}
     */
     init = function (_container){
      _buildApp(_container);
     }

  return {
    init:init
  };
});