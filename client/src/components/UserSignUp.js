import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';
import UserContext from "./UserContext";

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

  handleSignUp = (e, err, error, signIn) => {
	  e.preventDefault();

	  const { firstName, lastName, emailAddress, password, confirmPassword } = this.state;

		if (password !== confirmPassword) {
			this.setState({
				errMsg: 'Passwords do not match'
			})
			console.log(err);

		} else {
		axios.post("http://localhost:5000/api/users", {firstName, lastName, emailAddress, password})
		  .then(res => {
				if(res.status === 201) {
					console.log(`User ${firstName} ${lastName} successfully created`);
					this.setState({
						errMsg: ""
					});

					console.log(password, confirmPassword);
					this.context.signIn(null, emailAddress, password);
				  this.props.history.push("/courses");
				}
			})
			.catch(err => {
				if(err.response.status === 400){
					this.setState({
						errMsg: err.response.data.error.message
					})
				} else if (err.status === 401){
					this.setState({
						errMsg: err.response.message
					})
				}	else {
					this.props.history.push("/error");
					console.log(err.response.status);
					console.log(err.response.data.error.message);
				}
			});

	}
  }
  	render(){
			const { firstName, lastName, emailAddress, password, errMsg, signIn } = this.state;

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
									<li>{ errMsg }</li>
								 </ul>
							  </div>
						  	</div>
							) : ""}
  						<form onSubmit={ e => this.handleSignUp(e, signIn, firstName, lastName, emailAddress, password)} >
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

	UserSignUp.contextType = UserContext;
  export default withRouter(UserSignUp);
