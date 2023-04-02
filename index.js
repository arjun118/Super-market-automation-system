const express=require('express');
const app=express()
const path = require('path');
const ejsMate = require('ejs-mate');
const session = require('express-session');
const mongoose = require('mongoose')

const Window = require('window');
const window = new Window();

const Bill = require('./models/bill')
const Item = require('./models/item')
const Sales=require('./models/sales')


mongoose.connect('mongodb://127.0.0.1:27017/supermarket',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});


app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({extended:true}))

app.get('/',(req,res)=>{
    res.render('home')
})
app.get('/stat',async (req,res)=>{
    const data=await Sales.aggregate([
        {
            $group: {
              _id: {$month: "$date"},
              total_month_revenue: {
                $sum:"$total"
              }
            }
        },
        {
            $addFields: {
                month:"$_id"
              }
        }
    ])
    const sales={data}
    res.render('sales_stat',{sales})
})
app.get('/login',(req,res)=>{
    res.render('login')
})
app.get('/register',(req,res)=>{
    res.render('register')
})
app.get('/bill',async(req,res)=>{
    // var items =[
    //     {
    //         "id":"0",
    //         "name":"cake",
    //         "qty":"10",
    //         "price":"20"
    //     },
    //     {
    //         "id":"1",
    //         "name":"biscuit",
    //         "qty":"20",
    //         "price":"10"
    //     },
    //     {
    //         "id":"2",
    //         "name":"vegetable",
    //         "qty":"30",
    //         "price":"50"
    //     },
    //     {
    //         "id":"3",
    //         "name":"toy",
    //         "qty":"5",
    //         "price":"100"
    //     },
    // ]
    const items = await Item.find({})
    res.render('bill',{items})
})


app.get('/print',(req,res)=>{
    res.render('print_bill')
})

app.get('/additem',async(req,res)=>{
    const item = new Item({item_name:"toy",quantity:"5",unit_price:"100",description:"kids"})
    await item.save();
    res.send(item)
})


app.get('/inventory',(req,res)=>{
    res.render('inventory')
})

app.post('/bill',async(req,res)=>{
    var bill= req.body
    const date=new Date()
    bill.date=date

    var bill_items=[]

    for (let i = 0; i < bill.id.length; i++) {
        var q = await Item.find({_id:bill.id[i]})
        q=q[0].quantity
        const x = await Item.findOneAndUpdate({_id:bill.id[i]},{quantity:q-bill.qty[i]})
        bill_items.push({item_ref:bill.id[i],
        quantity:bill.qty[i],
        cost:bill.total[i]})
    }
    // console.log(bill_items)
    
    const new_bill = new Bill({customer_name:bill.customer_name,contact:bill.contact,
    items:bill_items,
    total_cost:bill.sub_total,
    date:bill.date})
    await new_bill.save();

    // bill=JSON.stringify(bill)

    res.render('print_bill',{bill})

    // res.send(req.body)

})


app.post('/register',async(req,res)=>{
    res.send(req.body)
})

app.post('/login',async(req,res)=>{
    res.send(req.body)
})

app.listen(3000,()=>{
    console.log("Listening on port 3000!!..")
})