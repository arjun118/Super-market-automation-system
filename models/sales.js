const mongoose=require('mongoose')

const Schema= mongoose.Schema


const salesSchema = new Schema({
    // item_ref:{
    //     type:Schema.Types.ObjectId,
    //     ref:'Item',
    //     required:true
    // }, //lets keep this commented for now

    //to test just add a random date in proper format and total sales in mongodb collection
    date:{
        type:Date,
        required:true
    },
    total:{
        type:Number,
        required:true
    }
     //total 
})

module.exports=mongoose.model('Sales',salesSchema)