const project = require('./project.config')

module.exports = {
  'facebookAuth': {
    'clientID': '830027863804211',
    'clientSecret': '',
    'callbackURL': `http://localhost:${ project.server_port }/auth/facebook/callback`
  },
  'googleAuth': {
    'clientID': '141312166358-pr37mqma0o6coaqqlpa673fn83aaibnk.apps.googleusercontent.com',
    'clientSecret': '',
    'callbackURL': `http://localhost:${ project.server_port }/auth/google/callback`
  },
  'githubAuth': {
    'clientID': '06646a944634bb054114',
    'clientSecret': '',
    'callbackURL': `http://localhost:${ project.server_port }/auth/github/callback`
  }
}
