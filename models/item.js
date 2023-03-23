const mongoose=require('mongoose')

const Schema= mongoose.Schema

const itemSchema=new Schema({
    item_id:{
        type:String,
        required:true,
        unique:true
    },
    item_name:{
        type:String,
        required:true
    },
    stock:{
        type:Number,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true
    }
})

module.exports=mongoose.model('Item',itemSchema)