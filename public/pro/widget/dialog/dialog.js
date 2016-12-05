/*
 * ------------------------------------------
 * 弹出框
 * @version  1.0
 * @author   frorice(https://github.com/frorice)
 * ------------------------------------------
 */
/** @module pro/widget/dialog */

NEJ.define([
    '{pro}util/observer.js',
    '{pro}util/handler.js',
    'base/element',
    'base/event',
    'util/template/jst',
    'text!./dialog.jst'
  ],function (_obs, _hdl, _e, _v, _p, _tpl){
    var build, render, openDialog;

    var dialogHtml, dialogNode = {};//用户信息条html结构

    /**
     * 构建模板
     * @param  {Object} _data生成html结构所需的数据
     * @return {Void}
     */
    build = function (_data){
      //取得模板
      var _html_seed = _p._$add(_tpl);
      //生成结构
      dialogHtml = _p._$get(_html_seed, _data);
    }

    /**
     * 构建模板并添加到结构已添加过则从结构中调出
     * @param  {Object} _data 生成html结构所需的数据
     * @param  {String} _sign 弹出框标记目前有两个，登录/注册弹出框，添加清单弹出框
     * @return {Void}
     */
    render = function (_data, _sign){
      build(_data);
      if(!dialogNode[_sign]){
        dialogNode[_sign] = _e._$create('div','none diaCta');
        _v._$addEvent(dialogNode[_sign], 'click', function (_event){
          if(_event.srcElement.id == 'todo-dialog__sign-up' ||
            _event.srcElement.id == 'todo-dialog__sign-in' ){
            _hdl.sign(_event);
            _e._$replaceClassName(dialogNode[_sign],'','none');
          }
          if(_event.srcElement.id == "todo-dialog__add-list"){
            _hdl.addItem(_event);
            _e._$replaceClassName(dialogNode[_sign],'','none');
          }
          if(_event.srcElement.id == "todo-dialog__delete-list"){
            _hdl.deleteList(_event);
            _e._$replaceClassName(dialogNode[_sign],'','none');
          }
          if(_event.srcElement.id == "todo-dialog__update-list"){
            _hdl.updateList(_event);
            _e._$replaceClassName(dialogNode[_sign],'','none');
          }
          if(_event.srcElement.id == "todo-dialog__cancel"){
            _e._$replaceClassName(dialogNode[_sign],'','none'); 
          }
        });
        dialogNode[_sign].innerHTML = dialogHtml;
        document.body.appendChild(dialogNode[_sign]);
      }

      openDialog(_sign);
      
    };

    /**
     * 显示弹出框
     * @param  {String} _sign 弹出框标记目前有两个，登录/注册弹出框，添加清单弹出框
     * @return {Void}
     */
    openDialog = function (_sign){
      _e._$replaceClassName(dialogNode[_sign], 'none', '');  //改class来显示
    };

    return {
      init: function (){
        _obs.listen('renderDialog', render);
      }
    };
});