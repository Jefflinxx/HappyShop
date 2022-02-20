const router = require("express").Router();
const passport = require("passport");
const encrypt = require("../service/encryption");
const User = require('../models/user');

router.get("/login", (req, res) => {
    res.render("login", { user: req.user });
  });
  
router.get("/signup", (req, res) => {
    res.render("signup", { user: req.user });
  });
  
router.get("/logout", (req, res) => {
    req.logOut();
    res.redirect("/");
  });

router.post("/login",
  passport.authenticate("local", {
    failureRedirect: "/auth/login",
    failureFlash: "Wrong email or password.",
  }),
  (req, res) => {
    res.redirect("/");
  }
);


router.post("/signup", async (req, res) => {
  let { name, email, password } = req.body;
  //check if the data is already in db
  const emailExist = await User.findOne({ email });
   //console.log(emailExist);
    //mongoose如果找不到他會回傳null，但mysql卻會回傳一個空array
  if (emailExist) {
    console.log('already have account!');
    req.flash("error_msg", "Email has already been registered.");
    res.redirect("/auth/signup");
    //我這邊加return是要解決一個ERR_HTTP_HEADERS_SENT的問題
    return;
  }
  if (password.length < 8) {
    console.log('password too shirt!');
    req.flash("error_msg", "The password must be eight characters or more.");
    res.redirect("/auth/signup");
  }

  const encryptPassword = encrypt(password);
  password = encryptPassword;
  let newUser = new User({ name, email, password });
  
  try {
      //如果這邊沒有await 那這邊就會先執行那你什麼都存不進去，就是空的，也不會產生error
    await newUser.save();
    req.flash("success_msg", "Registration succeeds. You can login now.");
    res.redirect("/auth/login");
  } catch (err) {
    req.flash("error_msg", err.errors.name.properties.message);
    res.redirect("/auth/signup");
  }
});  

module.exports = router;