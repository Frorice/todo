const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const Todo = new Schema({
  cnt: {
    type: String,
    trim: true,
    require: true
  },
  active: {
    type: Boolean,
    default: true
  },
  uid: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  lid: {
    type: Schema.ObjectId,
    ref: 'List'
  },
  createTime:{
    type: Date,
    default: Date.now()
  },
  updateTime:{
    type: Date,
    default: Date.now()
  }
});

Todo.pre('save', function (next){
  if(this.isNew){
    this.createTime = this.updateTime = Date.now();
  }else{
    this.updateTime = Date.now();
  }
  next();
});

Todo.statics = {
  findById: function (id) {
    return this.findOne({_id: id});
  },
  findByLid: function (lid){
    return this.find({lid: lid});
  },
  findByUid: function (uid){
    return this.find({uid: uid});
  },
  removeByLid: function (lid){
     return this.remove({lid: lid},function (err){
      if(err){
        console.error(err);
      }
     });
  },
  removeById: function (id){
    return this.remove({_id: id});
  }
}

module.exports = mongoose.model('Todo', Todo);

