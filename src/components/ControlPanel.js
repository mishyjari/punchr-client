import React from 'react';
import Login from './login.js'
import HistorySearcher from './HistorySearcher.js';
import Signup from './signup.js';
import UserDetailsContainer from './containers/UserDetailsContainer.js';
import UserDetails from './UserDetails.js'
import {BrowserRouter as Router, Route, NavLink} from 'react-router-dom';

class ControlPanel extends React.Component {
	state = {
		loggedInUser: null,
		token: '',
		exp: '',
	}

	componentDidMount() {
		if (window.localStorage.user)
		{
			this.setState(JSON.parse(window.localStorage.user))
		}
	}

	handleLogin = newState => {
		this.setState(newState);
	}


	handleLogout = () => {
		this.setState({
			loggedInUser: null,
			token: '',
			exp: '',
		}, () => (window.localStorage.user = null) )
	}

	render () {
		const user = this.state.loggedInUser;
		return (
			<div id='cpanel'>
				<h2>Control Panel</h2>
				{
					user
					?
						<div id='cpanel-info'>
							<h4>Logged In As: {user.first_name} {user.last_name}</h4>
							<p><button onClick={this.handleLogout}>Logout</button></p>
							<Router>
								<span class='nav'>
									<NavLink
									to='/control-panel/users'
									activeStyle={{
										fontWeight: 'bold',
									}}>All Users</NavLink>
								</span>
								<span class='nav'>
									<NavLink
										to='/control-panel/new-user'
										activeStyle={{
											fontWeight: 'bold',
										}}>Add New User</NavLink>
									</span>
								<span class='nav'>
									<NavLink to='/control-panel/history'
										activeStyle={{
											fontWeight: 'bold',
										}}>Search Shift History</NavLink>
									</span>
								<Route
									exact path='/control-panel/history'
									render={(routerProps) => <HistorySearcher
										loggedInUser={this.state.loggedInUser}
										users={this.props.users}
										handleShiftChange={this.props.handleShiftChange}
										{...routerProps}
									/>}
								/>
								<Route
									exact path='/control-panel/users'
									render={routerProps => <UserDetailsContainer
										{...routerProps}
										users={this.props.users}
										loggedInUser={this.state.loggedInUser}
										handleUpdateUser={this.props.handleUpdateUser}
									 />}
									/>
								<Route
									exact path='/control-panel/new-user'
									render={() => <Signup addUser={this.props.addUser} />}
								/>
							</Router>
							</div>
					:
						<Login onLogin={this.handleLogin} />
				}
			</div>
		)
	}
}

export default ControlPanel;
