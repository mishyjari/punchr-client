import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.js';
import * as serviceWorker from './serviceWorker';
import PunchClock from './components/PunchClock.js';
import ControlPanel from './components/ControlPanel.js';

import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom'

ReactDOM.render(
  <React.StrictMode>
    <App />
	<Router>
		<div>
			<NavLink to="/">Home</NavLink>
			<NavLink to="/control-panel">Control Panel</NavLink>
			<NavLink to='/users'>Users</NavLink>
			<NavLink to='/login'>Login</NavLink>
			<NavLink to='/signup'>Signup</NavLink>
			<Route exact path='/' component={PunchClock} />
			<Route exact path='/control-panel' component={ControlPanel} />
			<Route exact path='/login' render={() => <div><h1>Login Form</h1></div>} />
			<Route exact path='/shifts' render={() => <div><h1>Shifts</h1></div>} />
			<Route exact path='/users' render={() => <div><h1>Users</h1></div>} />
			<Route exact path='/signup' render={() => <div><h1>Signup</h1></div>} />
		</div>
	</Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
