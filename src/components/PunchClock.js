import React from 'react';
import '../App.css';
import UserDetails from './UserDetails.js';
import { NavLink } from 'react-router-dom';

class PunchClock extends React.Component {

	render() {
		console.log(this.props)
		return (
			<div id='punchr-app'>
				<div id='punch-clock'>
					<form onSubmit={this.props.handlePunch}>
						<input
							id='pin-input'
							type='text'
							name='pin'
							placeholder='PIN'
							maxLength='4'
							value={this.props.pin}
							onChange={this.props.handleChange} />
						<br />
						<button type='submit' id="punch-btn">PUNCH</button>
					</form>
				</div>
				<div id='details-main'>
				{
					this.props.selectedUser
					?
						<UserDetails
							user={this.props.selectedUser}
							shift={this.props.findActiveShiftByUser(this.props.selectedUser)}
							closeShift={this.props.closeShift}
						/>
					:
						<div>
						{
							(this.props.pin && this.props.pin.length === 4)
							?
								<h4>No user found with pin matching {this.props.pin}</h4>
							:
								<h4>Type your PIN to see Status</h4>
						}
					</div>
					}
				</div>
			</div>
		)
	}
}
 export default PunchClock;
