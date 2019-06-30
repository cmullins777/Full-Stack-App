import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Consumer } from './UserContext';

class UserSignIn extends Component
	{
		state = {
			emailAddress:'',
			password: ''
		};
	// Receives SignIn data input by User
	handleUserInput = e => {
		e.preventDefault();
		const input = e.target;
		this.setState({
			[input.name] : input.value
		});
	}

	render(){
		return(
		<Consumer>{ ({ signIn }) =>(
			<div className="bounds">
				<div className="grid-33 centered signin">
					<h1>Sign In</h1>
					<div>
						<form onSubmit={ e => signIn(e, this.state.emailAddress, this.state.password)} >
							<div>
								<input id="emailAddress"
									name="emailAddress"
									type="email"
									className=""
									placeholder="Email Address"
									onChange={this.handleUserInput}/>
							</div>
							<div>
								<input id="password"
									name="password"
									type="password"
									className=""
									placeholder="Password"
									onChange={this.handleUserInput} />
							</div>
							<div className="grid-100 pad-bottom">
								<button className="button" type="submit">Sign In</button>
								 <Link className="button button-secondary" to="/courses">Cancel</Link>
							</div>
						</form>
					</div>
					<p>&nbsp;</p>
					<p>Don't have a user account?
					  <Link to="/signup"> Click here </Link> to sign up!
					</p>
				</div>
			</div>
		)}</Consumer>
		 );
	}
}
export default UserSignIn;
