
const mongoose = require('mongoose');

const Schema=mongoose.Schema;

const TaskSchema= new mongoose.Schema({
  
    title:{type:String,required: true},
    taskcompleted:{type:String,default:false}
})

const Model=mongoose.model("Model",TaskSchema)

module.exports = Model;