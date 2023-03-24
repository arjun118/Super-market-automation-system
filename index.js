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
    res.render('bill')
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
    // let options = { format: 'A4', path:"bill.pdf" };
    // let file = { content: "<h1>Welcome to html-pdf-node</h1>" };

    // html_to_pdf.generatePdf(file, options).then(output => {
    //     console.log("PDF :-", output); // PDF Buffer:- [{url: "https://example.com", name: "example.pdf", buffer: <PDF buffer>}]
    // });


    // console.log("HHHH")
    // res.redirect('/bill')

    var bill= req.body
    const date=new Date()
    bill.date=date
    total=0
    for (var i=0;i<bill.item_quantity.length;i++){
        total+=bill.item_quantity[i]
    }
    bill.total=total
    // bill=JSON.stringify(bill)

    res.render('print_bill',{bill})
})


app.listen(3000,()=>{
    console.log("Listening on port 3000!!..")
})