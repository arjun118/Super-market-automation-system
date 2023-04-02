const mongoose=require('mongoose')

const Schema= mongoose.Schema

const Item= require('./item')

const billSchema= new Schema({
    customer_name:{
        type:String,
    },
    contact:{
        type:String,
    },
    items:[
       { 
            item_id:{type:String},
            quantity:{type:Number},
            cost:{type:Number}
        }
    ],
    total_cost:{
        type:Number,
    },
    date:{
        type:Date,
    }
})

module.exports=mongoose.model('Bill',billSchema)