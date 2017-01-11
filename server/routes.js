'use strict'

const configAuth = require('../config/passport.config')
const NoteController = require('./controllers/NoteController')
const isAuthenticated = require('./middleware')

module.exports = function (app, passport) {
  // Auth Check route
  app.get('/auth/check', (request, response) => {
    if (request.isAuthenticated()) {
      response.json({
        authenticated: true,
        user: req.user
      })
    } else {
      response.json({ authenticated: false })
    }
  })

  app.get('/auth/logout', (request, response) => {
    if (request.isAuthenticated()) {
      request.logout();
      response.redirect('/');
    } else {
      response.json({
        success: false,
        error: 'You must be logged in to logout'
      })
    }
  })

  // Note routes
  app.get('/notes', isAuthenticated, NoteController.show)
  app.post('/notes', isAuthenticated, NoteController.store)
  app.put('/notes/:id', isAuthenticated, NoteController.update)
  app.delete('/notes/:id', isAuthenticated, NoteController.destroy)
  app.post('/notes/filtered', isAuthenticated, NoteController.filter)

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
