import React from 'react';
import logo from './logo.svg';
import './App.css';
import ReactDOM from 'react-dom'
import ActiveShiftsContainer from './components/ActiveShiftsContainer.js';
import { BrowserRouter as Router, NavLink } from 'react-router-dom';

const USERS_API = "http://localhost:3000/users";
const ACTIVE_SHIFTS_API = "http://localhost:3000/shifts/current";

class App extends React.Component {

	state = {
		activeShifts: [],
		users: []
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
		//this.fetchUsers();
		//this.fetchActiveShifts();
	}

	
	render() {
		return (
			<div>
				<h1>Punchr</h1>
			</div>
		)
	}
}

export default App;
