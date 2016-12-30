const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
const GithubStrategy = require("passport-github").Strategy
const configAuth = require('../config/passport.config')

module.exports = function (passport) {
  passport.serializeUser((user, done) => {
    done(null, user)
  })

  passport.deserializeUser((user, done) => {
    done(null, user)
  })

  /*
   * Facebook Strategy OAuth
   */
  passport.use(new FacebookStrategy({
    clientID: configAuth.facebookAuth.clientID,
    clientSecret: configAuth.facebookAuth.clientSecret,
    callbackURL: configAuth.facebookAuth.callbackURL,
    profileFields: ['id', 'emails', 'name']
  }, (token, refreshToken, profile, done) => {
    process.nextTick(() => {
      return done(null, profile)
    })
  }))

  /*
   * Google Strategy OAuth
   */
  passport.use(new GoogleStrategy({
    clientID: configAuth.googleAuth.clientID,
    clientSecret: configAuth.googleAuth.clientSecret,
    callbackURL: configAuth.googleAuth.callbackURL
  }, (token, refreshToken, profile, done) => {
    process.nextTick(() => {
      return done(null, profile)
    })
  }))

  /*
   * Github Strategy OAuth
   */
  passport.use(new GithubStrategy({
    clientID: configAuth.githubAuth.clientID,
    clientSecret: configAuth.githubAuth.clientSecret,
    callbackURL: configAuth.githubAuth.callbackURL
  }, (token, refreshToken, profile, done) => {
      process.nextTick(() => {
        return done(null, profile)
      })
  }))
}
