import React from 'react';
import logo from './logo.svg';
import './App.css';
import ReactDOM from 'react-dom'
import ActiveShiftsContainer from './components/ActiveShiftsContainer.js';
import { BrowserRouter as Router, NavLink } from 'react-router-dom';

class App extends React.Component {

	state = {
		activeShifts: ['Shift 1','Shift 2', 'Shift 3']
	}
	
	render() {
	
		return (
			<div>
				<h1>Punchr</h1>
				<ActiveShiftsContainer activeShifts={this.state.activeShifts}/>
			</div>
		)
	}
}

export default App;
