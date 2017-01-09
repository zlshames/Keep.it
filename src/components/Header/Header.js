import React from 'react'
import { Link } from 'react-router'

import "./Header.scss"

class Header extends React.Component {
  login = (
    <div className = "header__login">
      <p className = "login__text">Login with:</p>
      <i onClick={ this.loginRedirect } id="github" className="fa fa-github fa-2x"></i>
      <i onClick={ this.loginRedirect } id="google" className="fa fa-google fa-2x"></i>
      <i onClick={ this.loginRedirect } id="facebook" className="fa fa-facebook fa-2x"></i>
    </div>
  )

  logout = (
    <a href="/auth/logout" className = "header__logout">Logout</a>
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

export default Header
