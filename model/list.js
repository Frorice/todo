const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const List = new Schema({
  name: {
    type: String,
    trim: true,
    require: true
  },
  active: {
    type: Number,
    default: 0
  },
  total: {
    type: Number,
    default: 0
  },
  uid: {
    type: Schema.ObjectId,
    ref: 'User'
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

List.pre('save', function (next){
  if(this.isNew){
    this.createTime = this.updateTime = Date.now();
  }else{
    this.updateTime = Date.now();
  }
  next();
});

List.statics = {
  findById: function(id) {
    return this.findOne({_id: id});
  },
  findByUid: function(uid){
    return this.find({uid: uid});
  },
  removeById: function(id){
    return this.remove({_id: id});
  }
}

module.exports = mongoose.model('List', List);

