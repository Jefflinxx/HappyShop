const passport = require("passport");
const LocalStrategy = require("passport-local");
const GoogleStrategy = require("passport-google-oauth20");
const User = require("../models/user");
const encrypt = require("../service/encryption");

passport.serializeUser((user, done) => {
    console.log("Serializing user now");
    done(null, user._id);
  });
  
  passport.deserializeUser((_id, done) => {
    console.log("Deserializing user now");
    User.findById({ _id }).then((user) => {
      console.log("Found user.");
      done(null, user);
    });
  });

passport.use(
  new LocalStrategy((username, password, done) => {
    const encryptPassword = encrypt(password);
    User.findOne({ email: username, password: encryptPassword })
      .then((user) => {
        if (!user) {
          done(null, false);
        } else {
          //這個done應該也會把user吃進去讓我可以用session的方式做驗證
          done(null, user);
        }
  }).catch((e)=>{done(null, false)});
}));

passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/redirect",
      },
      (accessToken, refreshToken, profile, done) => {
        User.findOne({ googleID: profile.id }).then((foundUser) => {
          if (foundUser) {
            console.log("User already exist");
            done(null, foundUser);
          } else {
            new User({
              name: profile.displayName,
              googleID: profile.id,
              thumbnail: profile.photos[0].value,
              email: profile.emails[0].value,
            })
              .save()
              .then((newUser) => {
                console.log("New user created.");
                done(null, newUser);
              });
          }
        });
      }
    )
  );