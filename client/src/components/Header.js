import React from 'react';
import { Consumer } from './UserContext';
import { NavLink, Link } from 'react-router-dom';

const Header = () => {
	return (
		<Consumer>{({ user, authenticated, signOut }) =>(

			<div className="header">
				<div className="bounds">
					<h1 className="header--logo">
					  <NavLink to="/courses">Courses</NavLink>
					</h1>
	{/*Displays welcome greeting for auth'd User, SignIn/Up for new User*/}
					{ (authenticated) ?
							(<nav>
								<span>Welcome {user.firstName} {user.lastName} !</span>
								<Link className="signout" to="/signOut" onClick={signOut}>Sign Out</Link>
							</nav>)
							:
							(<nav>
								<NavLink className="signup" to="/signup">Sign Up</NavLink>
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
