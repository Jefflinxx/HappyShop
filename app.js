const express = require("express");
const app = express();
const session = require("express-session");
const flash = require("connect-flash");
//入口引用就好，後面都可以吃到
const dotenv = require("dotenv");
dotenv.config();
//route
const authRoute = require("./routes/localauth");
const orderRoute = require("./routes/order");
const googleAuthRoute = require("./routes/googleauth"); 

require('./models/connect');
const Product = require("./models/product");

const passport = require("passport");
require('./config/passport');



app.set("view engine", "ejs");
//用來接post或put的資料
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

app.use("/auth", authRoute);
app.use("/auth", googleAuthRoute);
app.use("/order", orderRoute);


app.get("/", (req, res) => {
  Product.find({}).then((data)=>{
    res.render("index", { user: req.user, product: data });
  }).catch((e)=>{console.log(e)});
});

  
app.listen(8080, () => {
  console.log("Server running on port 8080.");
});

//暫時的
// const hi = new Product({name:'c',price:20,quantity:3,remark:'c'});

//     hi.save().then(()=>{
//         console.log("data has beem saved.");
//     }).catch((e)=>{
// 				consle.log(e);
//     });
  