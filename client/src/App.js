import React, { Component } from 'react';
import { Route, Switch, Redirect, BrowserRouter } from "react-router-dom";
import axios from 'axios';

// Client components
import CourseDetail from './components/CourseDetail';
import Courses from './components/Courses';
import Error from './components/Error';
import Header from './components/Header';
import UserContext from './components/UserContext';
import UserSignIn from './components/UserSignIn';
import UserSignOut from './components/UserSignOut';

export default class App extends Component {

 // Initialize state
	state = {
		authUserData: {}
	};

	// Signin authentication, data persisting
	handleSignIn = (e, emailAddress, password, props) => {
		if(e){
			e.preventDefault();
		}
	// Authenticate user by request to REST API's users endpoint
		axios.get("http://localhost:5000/api/users",
			{
				auth: {
					username: emailAddress,
					password: password
				}
			})
			.then(res => {
				if (res.status === 200) {
					const user = res.data;
					const name = user.firstName + " " + user.lastName;
					console.log("SignIn successful");
					this.setState({
						user: user,
						loggedIn: true,
						password: user.password,
						emailAddress: user.emailAddress,
					});
					// Persist data locally using React's localStorage browser instance
					React.useEffect(() => {
						localStorage.setItem("id", user.id)
					}, [user.id]);
						localStorage.setItem("username", emailAddress);
						localStorage.setItem("password", password);
						localStorage.setItem("name", name);

					const { history, location } = props;
					const path = location.state ? location.state.prevLocation : 'courses';
					history.push(path);
					}
			}).catch(err => {
				if(err.status === 400){
					//login failed
					console.log(this.state,'401');
					console.log("SignIn failing here");
					//server error, show Error page
				} else if (err.status === 500) {
					this.props.history.push("/error");
				}
			});
	}
	// signOut, re-initialize state
	async handleSignOut(){
		localStorage.clear();
		await this.setState({
			authUserData: {}
		});
		this.props.history.push("/courses");
	}

  render(){
  return (
	  <UserContext.Provider value={{
		  signIn: this.handleSignIn.bind(this),
			signOut: this.handleSignOut.bind(this)
				}}>
		<div id="root">
			<div>
				<Header props={this.props}/>
				<hr />
				<div className="bounds">
         <BrowserRouter>
					<Switch>
				  	{/*Root route redirects to All Courses*/}
						<Route exact path="/" render={()=> <Redirect to="/courses" />}/>
						{/*Route for User SignIn*/}
						<Route exact path="/signin" render={ () => <UserSignIn />} />
						{/*Routes for all Courses and individual Course by Id*/}
						<Route exact path="/courses" render={() => <Courses />}/>
						<Route exact path="/courses/:id" render={ props => <CourseDetail {...props} />} />
						{/*Other Routes: SignOut, Error*/}
						<Route exact path="/signout" render={() => <UserSignOut />} />
						<Route exact path="/error" render={() => <Error />} />
					</Switch>
         </BrowserRouter>
				</div>
			</div>
		</div>
	  </UserContext.Provider>
  );}
}
