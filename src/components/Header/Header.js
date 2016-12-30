import React from 'react'
import { Link } from 'react-router'

import "./Header.scss";

class Header extends React.Component {
	login = <Link className = "login" to = "/login">login</Link>;
	constructor() {

		super();
		this.state = {
			login : (window.location.pathname === "/")? this.login : null,
		}
	}
	shouldComponentUpdate(props,state) {//change for redux store later,that would track
		let login = (window.location.pathname === "/")? this.login : null;
		this.setState({
			login
		})
		return true;
	}
	render() {
		console.log(this.login);
		return (
			<div>
				<header
					className = "header" >
					<label className = "title"><p><Link to = "/">Keep</Link></p> it</label>
					{this.state.login}
				</header>
			</div>
		);
	}
}

export default Header
