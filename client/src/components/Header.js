import React from 'react';
import { Consumer } from './UserContext';
import { NavLink,Link } from 'react-router-dom';
import { BrowserRouter } from "react-router-dom";


const Header = () => {
	return (
		<BrowserRouter>
		<Consumer>{({ user, Authenticated }) =>(

			<div className="header">
				<div className="bounds">
					<h1 className="header--logo">Courses</h1>
					{/*Displays welcome greeting in header for logged-in User*/}
					{ (Authenticated) ?
						(<nav>
							<span>Welcome {user.firstName} {user.lastName} !</span>
							<Link className="signout" to="/signOut" onClick={e => this.signOut(e)}>Sign Out</Link>
						</nav>)
						:
						(<nav>
							<NavLink className="signup" to="/signUp">Sign Up</NavLink>
							<NavLink className="signin" to="/signin">Sign In</NavLink>
						</nav>)
					}
				</div>
			</div>
		)}
		</Consumer>
		</BrowserRouter>
	);
}

export default Header;
