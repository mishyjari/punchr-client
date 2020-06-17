import React from 'react';
import logo from './logo.svg';
import './App.css';
import ReactDOM from 'react-dom';
import PunchClock from './components/PunchClock.js';


import ActiveShiftsContainer from './components/ActiveShiftsContainer.js';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';

const USERS_API = "http://localhost:3000/users";
const ACTIVE_SHIFTS_API = "http://localhost:3000/shifts/current";

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
						onChange={this.handleChange} />} />
				</Router>
				<ActiveShiftsContainer shifts={this.state.activeShifts} />
			</div>
		)
	}
}

export default App;
