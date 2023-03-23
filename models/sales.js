const mongoose=require('mongoose')

const Schema= mongoose.Schema


const salesSchema = new Schema({
    // item_ref:{type:Schema.Types.ObjectId,ref:'Item',required:true},
    date:{
        type:Date,
        required:true
    },
    total:{
        type:Number,
        required:true
    } //total represents the total number o sales the has been done on that date up until that point
})