import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';

class UserSignUp extends Component
	{
		state = {
			firstName: "",
			lastName: "",
			emailAddress: "",
			password: "",
			confirmPassword: "",
			errMsg: ""
		};
	// Receives SignIn data input by User
	handleUserInput = e => {
		let input = e.target;
		this.setState({
			[input.name] : input.value
		});
	};

  handleSignUp = (e, err) => {
	  e.preventDefault();

	  const { firstName, lastName, emailAddress, password, confirmPassword } = this.state;

		if ((firstName === "" ||
				 lastName === "" ||
				 emailAddress === "" ||
				 password === "" ||
				 confirmPassword === "")) {
		  this.setState({
				errMsg: 'Please complete all fields below'
			})
		} else if (password !== confirmPassword) {
			this.setState({
				errMsg: 'Passwords do not match'
			})
			this.props.history.push("/error");
			console.log(err);

		} else {
		axios.post("http://localhost:5000/api/users", {firstName, lastName, emailAddress, password})
		  .then(res => {
				if(res.status === 201) {
					console.log(`User ${firstName} ${lastName} successfully created`);
					this.setState({
						errMsg: ""
					})
					this.props.history.push("/signin");
					this.props.signIn({ emailAddress, password});
				}
			})
			.catch(err => {
				if(err.status === 400 || err.status === 500){
					this.setState({
						errMsg: "other error"
					})
					this.props.history.push("/error");
				}
			});

	}
  }
  	render(){
			const { firstName, lastName, emailAddress, password, errMsg } = this.state;

  		return(
  			<div className="bounds">
  				<div className="grid-33 centered signin">
  					<h1>Sign Up</h1>
  					<div>
						 { errMsg ? (
							<div>
							 <h2 className='validation--errors--label'>Registration Error</h2>
							  <div className='validation-errors'>
								 <ul>
									<li>{errMsg}</li>
								 </ul>
							  </div>
						  	</div>
							) : ""}
  						<form onSubmit={ e => this.handleSignUp(e, firstName, lastName, emailAddress, password)} >
  							<div>
								<input id="firstName"
									name="firstName"
									type="text"
									className=""
									placeholder="First Name"
									onChange={this.handleUserInput}/>
						  	</div>
								<div>
								<input id="lastName"
									name="lastName"
									type="text"
									className=""
									placeholder="Last Name"
									onChange={this.handleUserInput}/>
						  	</div>
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
								<div>
  								<input id="confirmPassword"
  									name="confirmPassword"
  									type="password"
  									className=""
  									placeholder="Confirm Password"
  									onChange={this.handleUserInput} />
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

  		 );
  	}
  }
  export default withRouter(UserSignUp);
