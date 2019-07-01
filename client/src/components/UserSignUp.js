import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Consumer } from './UserContext';

class UserSignUp extends Component
	{
		state = {
      firstName: '',
      lastName: '',
			emailAddress:'',
			password: '',
      confirmPassword: '',
			prevPath:'',
		};
    // input event
  	handleUserInput = e => {
  		e.preventDefault();
  		const input = e.target;
  		this.setState({
  			[input.name] : input.value
  		});
  	}
  	// POSTs new user data to db if valid, displays error if invalid
  	handleSubmit = (e,signin,prevPath) => {

  		e.preventDefault();
  		const { firstName, lastName, emailAddress, password, confirmPassword } = this.state;
			if(password === "") {
				this.setState({
					err:{data:{message:'Please enter a password.'}}
				});
			} else if(password!==confirmPassword) {
				this.setState({
					err:{data:{message:'password not matched'}}
				});
				return;
			} else {
				const user = { firstName, lastName, emailAddress, password };
				axios.post("http://localhost:5000/api/users", user)
				.then(res => {
					if(res.status === 201) {
						console.log(`User ${firstName} ${lastName} has been created`);
						this.setState({
							err: ''
						})
						this.props.signIn(null, emailAddress, password);
					}
				}).catch(err => {
					if(err.response.status === 400) {
						const error = err.response.data.message;
						this.setState({
							err: error
						});
					} else if(err.response.status === 500) {
						this.props.history.push("/error");
					}
				});
			}
  	}

		handleCancel = (e) => {
			e.preventDefault();
			this.props.history.push("/courses");
		}

  	render(){
  		return(
  		<Consumer>{ ({ signUp }) =>(
  			<div className="bounds">
  				<div className="grid-33 centered signin">
  					<h1>Sign Up</h1>
  					<div>
  						<form onSubmit={ e => this.handleSignUp(e, this.state)} >
  							<div>
								<input id="firstName"
									name="firstName"
									type="text"
									className=""
									placeholder="First Name"
									onChange={this.handleInput}/>
						  	</div>
								<div>
								<input id="lastName"
									name="lastName"
									type="text"
									className=""
									placeholder="Last Name"
									onChange={this.handleInput}/>
						  	</div>
							  <div>
  								<input id="emailAddress"
  									name="emailAddress"
  									type="email"
  									className=""
  									placeholder="Email Address"
  									onChange={this.handleInput}/>
  							</div>
  							<div>
  								<input id="password"
  									name="password"
  									type="password"
  									className=""
  									placeholder="Password"
  									onChange={this.handleInput} />
  							</div>
								<div>
  								<input id="password"
  									name="password"
  									type="password"
  									className=""
  									placeholder="Confirm Password"
  									onChange={this.handleInput} />
  							</div>
  							<div className="grid-100 pad-bottom">
  								<button className="button" type="submit">Sign Up</button>
  								<Link className="button button-secondary" to="/">Cancel</Link>
  							</div>
  						</form>
  					</div>
  					<p>&nbsp;</p>
  					<p>Already have a user account? <Link to="/signIn"> Click here </Link> to sign in!</p>
  				</div>
  			</div>
  		)}</Consumer>
  		 );
  	}
  }
  export default UserSignUp;
