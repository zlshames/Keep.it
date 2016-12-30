import React from 'react'
import { Link } from 'react-router'

import "./Header.scss";

class Header extends React.Component {
	login = <Link className = "login__link" to = "/login">login</Link>;
	constructor() {

		super();
		this.state = {
			login : (window.location.pathname === "/")? this.login : null,
		}
	}
	shouldComponentUpdate(props,state) {//change for redux store later,that would track
		state.login = (window.location.pathname === "/")? this.login : null;

		return true;
	}
	render() {

		return (
				<header
					className = "header">
					<label className = "title"><p>Keep</p> it</label>
					{this.state.login}
				</header>
		);
	}
}

export default Header
