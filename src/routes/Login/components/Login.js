import React from 'react'
import { Link } from "react-router"
import './Login.scss'

class Login extends React.Component {
	constuctor() {

		this.auth = this.auth.bind(this);
	}
	auth(e) {
		location.href = window.location.origin + "/auth/" + e.target.id;
	}
	render() {

		return(

			<div className = "login__body">
				<div className = "login_inner">

					<div className = "login__body__header">
						<h3>{"Login with :"}</h3>
					</div>

					<div className = "login__items">
						<a onClick = {this.auth} id = "facebook" className = "btn btn-block btn-social btn-facebook">
							<span className = "fa fa-facebook"></span> {"Sign in with Facebook"}
						</a>

						<a onClick = {this.auth} id = "google" className = "btn btn-block btn-social btn-google">
							<span className = "fa fa-google"></span> {"Sign in with Google"}
						</a>

						<a onClick = {this.auth} id = "github" className = "btn btn-block btn-social btn-github">
							<span className = "fa fa-github"></span> {"Sign in with Github"}
						</a>
					</div>
				</div>
			</div>
		);
	}
}
export default Login
