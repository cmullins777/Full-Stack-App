import React, { Component } from 'react';
import { Route, Switch, Redirect, BrowserRouter } from "react-router-dom";
import axios from 'axios';

// Client components
import CourseDetail from './components/CourseDetail';
import Courses from './components/Courses';
import CreateCourse from './components/CreateCourse';
import Error from './components/Error';
import Header from './components/Header';
// import PrivateRoute from './components/PrivateRoute';
import { Provider } from './components/UserContext';
import UpdateCourse from './components/UpdateCourse';
import UserSignIn from './components/UserSignIn';
import UserSignOut from './components/UserSignOut';
import UserSignUp from './components/UserSignUp';

class App extends Component {

 // Initialize state
	state = {
		user: {},
		username: "",
		password: "",
		authenticated: false
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
					this.setState({
						user: user,
						authenticated: true,
						password: user.password,
						username: user.emailAddress,
						err:{}
					});
					console.log("SignIn successful");
					console.log("user.id is" + user.id);
					console.log(emailAddress);
					console.log(password);

					// Persist data locally using React's localStorage browser instance
					React.useEffect(() => {
						localStorage.setItem("id", user.id)
					}, [user.id]);
						localStorage.setItem("username", emailAddress);
						localStorage.setItem("password", password);
						localStorage.setItem("name", name);
						localStorage.setItem("authenticated", true)
					}
			}).catch(err => {
				if(err.status === 400){
					//login failed
					console.log(this.state,'401');
					console.log("SignIn failing here");
					this.props.history.push("/error");
					//server error, show Error page
				} else if (err.status === 500) {
					this.props.history.push("/error");
				}
			});
			console.log(localStorage.getItem("username"));
			console.log(localStorage.getItem("password"));
	}

	// signOut, re-initialize state
	async handleSignOut(){
		localStorage.clear();
		await this.setState({
			user: {},
			username: "",
			password: "",
			authenticated: false
		});
	}

  render(){
  return (
		<BrowserRouter>
	  <Provider value={{
			user: this.state.user,

			emailAddress: this.state.emailAddress,
			password: this.state.password,
			authenticated: this.state.authenticated,
		  signIn: this.handleSignIn.bind(this),
			signOut: this.handleSignOut.bind(this)
				}}>

			<div>
				<Header props={this.props}/>
				 <div className="bounds">
					<Switch>
				  	{/* Root route redirects to All Courses */}
						<Route exact path="/" render={()=> <Redirect to="/courses" />}/>
						{/* Route for User SignIn, SignUp, SignOut */}
						<Route exact path="/signin" render={ () => <UserSignIn />} />
						<Route exact path="/signup" render={() => <UserSignUp />} />
						<Route exact path="/signout" render={() => <UserSignOut />} />
						{/* Routes for all Courses and individual Course by Id */}
						<Route exact path="/courses" render={() => <Courses />}/>
						<Route exact path="/courses/:id/update" component={ UpdateCourse } />
						<Route exact path="/courses/create" component={ CreateCourse } />

						<Route exact path="/courses/:id" component={CourseDetail} />
						{/* Private routes for auth'd users to Create Course */}

						{/* Error Route */}
						<Route exact path="/error" render={() => <Error />} />
					</Switch>
			   </div>
			  </div>

	  </Provider>
	</BrowserRouter>
  );}
}
export default App;
