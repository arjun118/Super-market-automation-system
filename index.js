const express=require('express');
const app=express()
const path = require('path');
const ejsMate = require('ejs-mate');
const session = require('express-session');

var html_to_pdf = require('html-pdf-node');
const puppeteer = require('puppeteer');
const fs = require('fs');
const Window = require('window');
 
const window = new Window();

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
    var items =[
        {
            "id":"0",
            "name":"cake",
            "price":"20"
        },
        {
            "id":"1",
            "name":"biscuit",
            "price":"10"
        },
        {
            "id":"2",
            "name":"vegetable",
            "price":"50"
        },
        {
            "id":"3",
            "name":"toy",
            "price":"100"
        },
    ]
    res.render('bill',{items})
})


app.get('/print',(req,res)=>{
    res.render('print_bill')
})

function printDiv(divName) {
    var printContents = document.getElementById(divName).innerHTML;
    var originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;

    window.print();

    document.body.innerHTML = originalContents;
}

app.post('/bill',async(req,res)=>{
    var bill= req.body
    const date=new Date()
    bill.date=date
    // bill=JSON.stringify(bill)

    res.render('print_bill',{bill})

    // res.send(req.body)
})


app.listen(3000,()=>{
    console.log("Listening on port 3000!!..")
})