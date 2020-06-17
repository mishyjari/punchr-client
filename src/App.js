import React from 'react';
import logo from './logo.svg';
import './App.css';
import ReactDOM from 'react-dom';
import PunchClock from './components/PunchClock.js';
import ControlPanel from './components/ControlPanel.js';
import {deleteUser, updateUser} from './requests.js';


import ActiveShiftsContainer from './components/ActiveShiftsContainer.js';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';

const USERS_API = "http://localhost:3000/users";
const SHIFTS_API = "http://localhost:3000/shifts";
const ACTIVE_SHIFTS_API = "http://localhost:3000/shifts/current";
const HEADERS = {
	"Content-Type": "application/json",
	"Accept": "application/json"
};

class App extends React.Component {

	state = {
		users: [],
		activeShifts: [],
		pin: null,
		selectedUser: null
	};

	fetchUsers = () => {
		fetch("http://localhost:3000/users")
			.then( res => res.json() )
			.then( users => this.setState({ users }) )
	};

	fetchActiveShifts = () => {
		fetch(ACTIVE_SHIFTS_API)
			.then( res => res.json() )
			.then( activeShifts => this.setState({ activeShifts }))
	};

	componentWillMount(){
		this.fetchUsers();
		this.fetchActiveShifts();
	}

	handleChange = e => {
		e.persist();
		const newVal = e.target.value;
		this.setState({ pin: newVal }, () => this.findUserByPin() )
	};

	handlePunch = e => {
		e.preventDefault();
		if ( this.state.selectedUser ){
			const shift = this.findActiveShiftByUser(this.state.selectedUser);
			if ( shift ){
				this.closeShift(shift)
			} else {
				this.newPunch()
			}
		} else {
			console.log('No user selected')
		}
	}


	findUserByPin = () => {
		const pin = Number(this.state.pin);
		const user = this.state.users.find(user => (user.pin === pin));
		if (user) {
			this.setState({ selectedUser: user })
		} else {
			this.setState({ selectedUser: null })
		};
	};

	findActiveShiftByUser = user => {
		return this.state.activeShifts.find( shift => {
			return (shift.user_id === user.id)
		})
	}

	findUserByShift = shift => {
		return this.state.users.find(user => (user.id === shift.user_id))
	};

	newPunch = () => {
		console.log('new punch')
		fetch(SHIFTS_API, {
			method: "POST",
			headers: HEADERS,
			body: JSON.stringify({
				user_id: this.state.selectedUser.id,
				end: null
			 })
		})
			.then( (res,err) => res.json() )
			.then( shift => {
				shift.user = this.findUserByShift(shift);
				this.setState(prevState => ({
					activeShifts: [...prevState.activeShifts, shift],
					pin: ''
				}))
				})
	}

	closeShift = shift => {
		console.log('close shift');

		let shiftArr = [...this.state.activeShifts];
		const i = shiftArr.indexOf(shift);
		shiftArr.splice(i,1);

		fetch(SHIFTS_API + `/${shift.id}`, {
			method: "PATCH",
			headers: HEADERS,
			body: JSON.stringify({
				end: new Date()
			})
		})
			.then( res => res.json() )
			.then( shift => {
				this.setState(prevState => ({
					activeShifts: shiftArr,
					pin: ''
				}))
			})
	}

	handleUpdateUser = newData => {
		updateUser(newData)
		.then( user => {
			const users = [...this.state.users];
			const index = users.findIndex(u => u.id === user.id);
			users.splice(index,1,user);
			this.setState({ users })
		})
	}

	addUser = data => {
		console.log(data)
		fetch(USERS_API, {
			method: "POST",
			headers: HEADERS,
			body: JSON.stringify(data)
		})
		.then( res => res.json() )
		.then( user => {
				this.setState(prevState => ({
					users: [...prevState.users, user]
				}), alert("User Created!"))
		})
	}

	render() {
		return (
			<div id='main'>
				<div id='header'>
					<h1>Punchr</h1>
				</div>
				<Router>
					<Route exact path='/' render={() => <PunchClock
						{...this.state}
						handlePunch={this.handlePunch}
						handleChange={this.handleChange}
						findActiveShiftByUser={this.findActiveShiftByUser}
						closeShift={this.closeShift} />} />
					<Route exact path='/control-panel' render={() => {
							return <ControlPanel
								users={this.state.users}
								handleUpdateUser={this.handleUpdateUser}
								addUser={this.addUser}
								/>
						}} />
					<div id='navigation'>
						<NavLink to='/'>Home</NavLink>
						<br />
						<NavLink to='/control-panel'>Control Panel</NavLink>
					</div>

				</Router>
				<ActiveShiftsContainer
					shifts={this.state.activeShifts}
					closeShift={this.closeShift} />
			</div>
		)
	}
}

export default App;
