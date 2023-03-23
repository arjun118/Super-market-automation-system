const express=require('express');
const app=express()
const path = require('path');
const ejsMate = require('ejs-mate');
const session = require('express-session');

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({extended:true}))

app.get('/',(req,res)=>{
    res.render('home')
})
app.get('/stat',(req,res)=>{
    res.render('sales_stat')
})
app.get('/bill',(req,res)=>{
    res.render('bill')
})
app.post('/bill',async(req,res)=>{
    res.send(req.body)
})

app.listen(3000,()=>{
    console.log("Listening on port 3000!!..")
})