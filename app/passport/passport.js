  //var passport = require('passport');
  var FacebookStrategy = require('passport-facebook').Strategy;
  var TwitterStrategy = require('passport-twitter').Strategy;
  var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
  var User = require('../../app/models/user.server.model');
  var session = require('express-session');
  var jwt = require('jsonwebtoken');
  var secret = "harryporter";

module.exports = function(app, passport){

    app.use(passport.initialize());
    app.use(passport.session());
    app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: true,cookie: { secure: false } }))

    passport.serializeUser(function(user, done) {
      token = jwt.sign({user_name: user.user_name, email: user.email}, secret, { expiresIn: '24h'});     
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });
  	
  	passport.use(new FacebookStrategy({
        clientID: '*****',
        clientSecret: '*****',
        callbackURL: "https://localhost:8000/auth/facebook/callback",
        profileFields: ['id', 'displayName', 'photos', 'email']
    },
    function(accessToken, refreshToken, profile, done) {
         /*console.log(profile._json.email);*/
         User.findOne({email: profile._json.email}).select('user_name password email').exec(function(err, user){
          if(err) done(err);

          if(user && user != null){
            done(null, user);
          }else{
            done(err);
          }
         });
        //done(null, profile);
      }
    ));

    passport.use(new TwitterStrategy({
      consumerKey:  "*****",
      consumerSecret: "******",
      callbackURL: "https://localhost:8000/auth/twitter/callback",
      userProfileURL: "https://api.twitter.com/1.1/account/verify_credentials.json?include_email=true"
    },
      function(token, tokenSecret, profile, done) {
       /* console.log(profile.emails[0].value);*/
        User.findOne({email: profile.emails[0].value}).select('user_name password email').exec(function(err, user){
          if(err) done(err);

          if(user && user != null){
            done(null, user);
          }else{
            done(err);
          }
         });
        //done(null, profile);
      }
    ));

    passport.use(new GoogleStrategy({
      clientID:  "*****",
      clientSecret: "*******",
      callbackURL: "https://localhost:8000/auth/google/callback"
    },
      function(accessToken, refreshToken, profile, done) {
        console.log(profile.emails[0].value);
        User.findOne({email: profile.emails[0].value}).select('user_name password email').exec(function(err, user){
          if(err) done(err);

          if(user && user != null){
            done(null, user);
          }else{
            done(err);
          }
         });
        //done(null, profile);
      }
    ));

    app.get('/auth/google', passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login', 'profile' , 'email'] }));
    app.get('/auth/google/callback',passport.authenticate('google', { failureRedirect: '/googleError' }), function(req, res) {
      res.redirect('/google/' + token);
    });

    app.get('/auth/twitter', passport.authenticate('twitter'));
    app.get('/auth/twitter/callback', passport.authenticate('twitter', {failureRedirect: '/twitterError' }), function(req, res){
      res.redirect('/twitter/' + token);
    });


    app.get('/auth/facebook/callback',passport.authenticate('facebook', {failureRedirect: '/facebookError' }), function(req, res){
      res.redirect('/facebook/' + token);
    });

    app.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }));
     
    return passport;
};
