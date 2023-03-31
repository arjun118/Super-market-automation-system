const mongoose=require('mongoose')

const Schema= mongoose.Schema

const itemSchema=new Schema({
    item_name:{
        type:String,
    },
    quantity:{
        type:Number,
    },
    unit_price:{
        type:Number,
    },
    description:{
        type:String,
    }
})

module.exports=mongoose.model('Item',itemSchema)