const project = require('./project.config')

module.exports = {
  'facebookAuth': {
    'clientID': '830027863804211',
    'clientSecret': 'f39f8dbdcc3f8907ba70cf89f5aa08f0',
    'callbackURL': `http://localhost:${ project.server_port }/auth/facebook/callback`
  },
  'googleAuth': {
    'clientID': '141312166358-pr37mqma0o6coaqqlpa673fn83aaibnk.apps.googleusercontent.com',
    'clientSecret': 'cJ1kw9jnrc3ldhAuXTdMsQCN',
    'callbackURL': `http://localhost:${ project.server_port }/auth/google/callback`
  },
  'githubAuth': {
    'clientID': '06646a944634bb054114',
    'clientSecret': 'acb634328ebf5dd4f4d1610c7eb1a760f3961c4f',
    'callbackURL': `http://localhost:${ project.server_port }/auth/github/callback`
  }
}
