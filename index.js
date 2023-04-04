const express=require('express');
const path = require('path');
const ejsMate = require('ejs-mate');
const session = require('express-session');
const mongoose = require('mongoose')
const passport = require('passport');
const LocalStrategy = require('passport-local');
const Window = require('window');
const flash = require('connect-flash');
const window = new Window();

const Bill = require('./models/bill')
const User = require('./models/user')
const Item = require('./models/item')
const Sales=require('./models/sales')
const {isLoggedIn} = require('./middleware')

mongoose.connect('mongodb://127.0.0.1:27017/supermarket',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});


const app=express()
app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({extended:true}))

const sessionConfig={
    secret: 'supermarketapp',
    resave: false,
    saveUninitialized: true,
    cookie:{
        httpOnly: true,
        expires: Date.now()+1000*60*60*24*2, //expires after two days
        maxAge: 1000*60*60*24*2 
    }
}
app.use(session(sessionConfig))
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

app.get('/',(req,res)=>{
    res.render('home')
})

app.get('/makeuser',async(req,res)=>{
    const user = new User({name:'staff',user_type:'Staff',username:'staff'});
    const newuser = await User.register(user,'staff');
    res.send(newuser);
})

app.get('/login',(req,res)=>{
    res.render('login')
})

app.post('/login',passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }),async(req,res)=>{
    req.flash('success', 'Welcome back!');
    res.redirect('/welcome')
})

app.get('/logout',async(req,res)=>{
    req.logout(req.user, err => {
        if(err) return next(err);
        req.flash('success', "Goodbye!");
        res.redirect('/login');
      });
})

app.get('/register',(req,res)=>{
    res.render('register')
})

app.post('/register',async(req,res)=>{
    try {
        const {name,username,user_type,password}=req.body
        joining_date=Date.now()
        const user = new User({name,user_type,joining_date,username});
        const newuser = await User.register(user,password);
        req.login(newuser, err => {
            if (err) return next(err);
            req.flash('success', 'Welcome new user!');
            res.redirect('/welcome');
        })
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('register');
    }
})


app.get('/stat',isLoggedIn,async (req,res)=>{
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

app.get('/bill',isLoggedIn,async(req,res)=>{
    const items = await Item.find({})
    res.render('bill',{items})
})

app.get('/profile',isLoggedIn,async(req,res)=>{
    res.render('profile')
})

app.get('/about',isLoggedIn,async(req,res)=>{
    res.render('about')
})

app.get('/welcome',isLoggedIn,async(req,res)=>{
    res.render('welcome')
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

app.listen(3000,()=>{
    console.log("Listening on port 3000!!..")
})