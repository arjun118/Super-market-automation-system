const mongoose=require('mongoose')

const Schema= mongoose.Schema

const itemSchema=new Schema({
    item_name:{
        type:String,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    unit_price:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true
    }
})

module.exports=mongoose.model('Item',itemSchema)