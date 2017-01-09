import React from 'react'
import { Link } from 'react-router'

import "./Header.scss"

class Header extends React.Component {
  login = (
    <div style={ Styles.bodyRow }>
      <p style={ Styles.login }>Login with:</p>
      <i onClick={ this.loginRedirect } id="github" style={ Styles.social } className="fa fa-github fa-2x"></i>
      <i onClick={ this.loginRedirect } id="google" style={ Styles.social } className="fa fa-google fa-2x"></i>
      <i onClick={ this.loginRedirect } id="facebook" style={ Styles.social } className="fa fa-facebook fa-2x"></i>
    </div>
  )

  logout = (
    <a href="/auth/logout" style={ Styles.logout }>Logout</a>
  )

  constructor() {
    super()

    this.loginRedirect = this.loginRedirect.bind(this)

    this.state = {
      login: (window.location.pathname === "/") ? this.login : this.logout
    }
  }

  shouldComponentUpdate(props, state) {//change for redux store later,that would track
    state.login = (window.location.pathname === "/") ? this.login : this.logout
    return true
  }

  loginRedirect(e) {
    location.href = window.location.origin + '/auth/' + e.target.id;
  }

  titleClick() {
    if (this.state.login == null) {
      location.href = '/app'
    } else {
      location.href = '/'
    }
  }

  render() {
    return (
        <header
          className="header">
          <label className="title" onClick={ this.titleClick }><p>Keep</p> it</label>
          { this.state.login }
        </header>
    )
  }
}

const Styles = {
  bodyRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '225px',
    backgroundColor: 'whitesmoke',
    borderRadius: '5px',
    paddingLeft: '5px',
    paddingRight: '5px'
  },
  login: {
    marginTop: '15px',
    color: '#5E8EE4'
  },
  logout: {
    marginTop: '13px'
  },
  social: {
    color: '#5E8EE4',
    cursor: 'pointer'
  }
}

export default Header
