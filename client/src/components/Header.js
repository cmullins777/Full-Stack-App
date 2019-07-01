import React from 'react';
import { Consumer } from './UserContext';
import { NavLink,Link } from 'react-router-dom';

// If values present, clear SignUp form

const Header = () => {
	return (
		<Consumer>{({ user, Authenticated, signIn, handleClearForm }) =>(

			<div className="header">
				<div className="bounds">
					<h1 className="header--logo">Courses</h1>
					{/*Displays welcome greeting for auth'd User, SignIn/Up for new User*/}
					{ (Authenticated) ?
						(<nav>
							<span>Welcome {user.firstName} {user.lastName} !</span>
							<Link className="signout" to="/signOut" onClick={e => this.signOut(e)}>Sign Out</Link>
						</nav>)
						:
						(<nav>
							<NavLink className="signup" to="/signup" onClick={e => this.handleClearForm(e, signIn, this.state.emailAddress, this.state.password)}>Sign Up</NavLink>
							<NavLink className="signin" to="/signin">Sign In</NavLink>
						</nav>)
					}
				</div>
			</div>
		)}
		</Consumer>
	);
}

export default Header;
