const express=require('express');
const app=express()
const path = require('path');
const ejsMate = require('ejs-mate');
const session = require('express-session');

<<<<<<< HEAD
=======

var html_to_pdf = require('html-pdf-node');
const puppeteer = require('puppeteer');
const fs = require('fs');
>>>>>>> 5e9e9513a8f88fa47f24ce1e2a518f234e6a5165
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
            "qty":"10",
            "price":"20"
        },
        {
            "id":"1",
            "name":"biscuit",
            "qty":"20",
            "price":"10"
        },
        {
            "id":"2",
            "name":"vegetable",
            "qty":"30",
            "price":"50"
        },
        {
            "id":"3",
            "name":"toy",
            "qty":"5",
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

app.get('/inventory',(req,res)=>{
    res.render('inventory')
})

app.post('/bill',async(req,res)=>{
    var bill= req.body
    const date=new Date()
    bill.date=date
    // bill=JSON.stringify(bill)

    res.render('print_bill',{bill})

    // res.send(req.body)

    // let options = { format: 'A4', path:"bill.pdf" };
    // let file = { content: "<h1>Welcome to html-pdf-node</h1>" };

    // html_to_pdf.generatePdf(file, options).then(output => {
    //     console.log("PDF :-", output); // PDF Buffer:- [{url: "https://example.com", name: "example.pdf", buffer: <PDF buffer>}]
    // });


    // console.log("HHHH")
    // res.redirect('/bill')
})


app.listen(3000,()=>{
    console.log("Listening on port 3000!!..")
})