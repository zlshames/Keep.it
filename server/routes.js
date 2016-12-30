'use strict'

const configAuth = require('../config/passport.config')
const NoteController = require('./controllers/NoteController')
const isAuthenticated = require('./middleware')

module.exports = function (app, passport) {
  // Note routes
  app.get('/notes', isAuthenticated, NoteController.show)
  app.post('/notes', isAuthenticated, NoteController.store)
  app.put('/notes/:id', isAuthenticated, NoteController.update)
  app.delete('/notes/:id', isAuthenticated, NoteController.destroy)

  // Facebook Auth
  app.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }))
  app.get('/auth/facebook/callback', passport.authenticate('facebook', {
      successRedirect: '/app',
      failureRedirect: '/login'
  }))

  // Google Auth
  app.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile'] }))
  app.get('/auth/google/callback', passport.authenticate('google', {
      successRedirect: '/app',
      failureRedirect: '/login'
  }))

  // Github Auth
  app.get('/auth/github', passport.authenticate('github', { scope: ['user:email'] }))
  app.get('/auth/github/callback', passport.authenticate('github', {
      successRedirect: '/app',
      failureRedirect: '/login'
  }))
}
