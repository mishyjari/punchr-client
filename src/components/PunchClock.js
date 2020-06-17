import React from 'react';
import '../App.css';
import UserDetails from './UserDetails.js';
import { NavLink } from 'react-router-dom';

class PunchClock extends React.Component {

	render() {
		return (
			<div id='punchr-app'>
				<form onSubmit={this.props.handlePunch}>
					<label for='pin'>Enter PIN:</label><br />
					<input
						type='text'
						name='pin'
						placeholder='XXXX'
						maxLength='4'
						value={this.props.pin}
						onChange={this.props.handleChange} />
					<br />
					<button type='submit'>PUNCH</button>
				</form>
				{
					this.props.selectedUser
					?
						<div>
							<h4>{this.props.selectedUser.first_name + " " + this.props.selectedUser.last_name}</h4>
							{
								this.props.findActiveShiftByUser(this.props.selectedUser)
								?
									<p>User Punched</p>
								:
									<p>User Not Punched In</p>
							}
						</div>
					:
						<p>user not found</p>
				}
				{
					this.props.selectedUser
					?
						<UserDetails
							user={this.props.selectedUser}
							shift={this.props.findActiveShiftByUser(this.props.selectedUser)}
							closeShift={this.props.closeShift}
						/>
					:
						<h4>Type your PIN to see Status</h4>
				}
			</div>
		)
	}
}
 export default PunchClock;
