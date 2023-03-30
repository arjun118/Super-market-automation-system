const mongoose=require('mongoose')

const Schema= mongoose.Schema

const billSchema= new Schema({
    customer_name:{
        type:String,
        required:true
    },
    contact:{
        type:String,
        required:true
    },
    items:[
       { 
            item_ref:{type:Schema.Types.ObjectId, ref:'Item', required:true},
            quantity:{type:Number, required:true},
            cost:{type:Number,required:true}
        }
    ],
    total_cost:{
        type:Number,
        required:true
    },
    date:{
        type:Date,
        required:true
    }
})

module.exports=mongoose.model('Bill',billSchema)