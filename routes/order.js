const router = require("express").Router();
const Order = require("../models/orderlist");
const Product = require("../models/product");

const authCheck = (req, res, next) => {
    if (!req.isAuthenticated()) {
      res.redirect("/auth/login");
    } else {
      next();
    }
  };

//得到使用者的個人訂單資料
router.get("/", authCheck, async (req, res) => {
    const data = await Order.find({user: req.user});
    res.render("cart", { user: req.user, order: data });
});

//能建立個人訂單的route,可以在主頁下訂
router.post("/",authCheck, async (req,res)=>{
    
  const orderdata = await Order.where("userEmail").equals(req.user.email).where("productname").equals(req.body.productname);
  console.log(orderdata.length > 0);
   if(orderdata.length > 0){
    req.flash("error_msg", "You already select this product!");
    res.redirect("/");
    return;
   }else{
    const data = await Product.findOne({name: req.body.productname});
    if(!data){
        req.flash("error_msg", "Product does not exist!");
    res.redirect("/");
    return;
    }
    if(data){
        await new Order({
            userEmail: req.user.email,
            productname: req.body.productname,
            orderQuantity: req.body.orderQuantity,
            orderPrice: data.price * req.body.orderQuantity,
            complete: 0,
          })
            .save()
        res.redirect("/order");
        return;
    }  
   }
});

//修改訂單,還沒測試多個使用者時updateone會不會鎖定到對的資料
router.post("/edit",authCheck, async (req,res)=>{
  
  const data = await Product.findOne({name: req.body.productname});

  Order.updateOne({
    userEmail: req.user.email,
    productname: req.body.productname,
  },{
    productname: req.body.productname,
    orderQuantity: req.body.orderQuantity,
    orderPrice: data.price * req.body.orderQuantity,
  }).then((meg)=>{console.log(meg)});
    res.redirect("/order")
});

//這一塊上社團發問再回來改
// router.post("/delete",authCheck, async (req,res)=>{
//     //console.log(req.body.arrayIndex);
//     orderdata = await Order.find({user: req.user});
//     console.log(orderdata);
//     console.log(typeof(orderdata));
//     console.log(orderdata.constructor == Array)

    
//     //console.log(orderdata[req.body.arrayIndex]);
//     //console.log(ordedData[req.body.arrayIndex].userEmail);
    

//     // const data = await Order.findOne(
//     //     { 
//     //         userEmail: orderData[req.body.arrayIndex].userEmail, 
//     //         productname: orderData[req.body.arrayIndex].productname,
//     //     });
//     // console.log(data);

// });

router.post("/delete",authCheck, async (req,res)=>{
  Order.deleteMany({userEmail: req.user.email}).then();
  res.redirect("/order");
});

router.put("/complete",authCheck, (req,res)=>{

});

module.exports = router;


