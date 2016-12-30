'use strict'

module.exports = function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  } else {
    return res.redirect('/login')
  }
}
