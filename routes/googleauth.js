const router = require("express").Router();
const passport = require("passport");

router.get( "/google",
    passport.authenticate("google", { scope: ["profile", "email"],prompt: "select_account" })
);
  
router.get("/google/redirect", 
    passport.authenticate("google"), (req, res) => {
      res.redirect("/");
});

module.exports = router;