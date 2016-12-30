'use strict'

// Middleware: Redirect to login if not authenticated
module.exports = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next()
  } else {
    return res.redirect('/login')
  }
}
