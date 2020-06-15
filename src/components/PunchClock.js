import React from 'react';

const USERS_API = "http://localhost:3000/users";
const SHIFTS_API = "http://localhost:3000/shifts";
const ACTIVE_SHIFTS_API = "http://localhost:3000/shifts/current";
const HEADERS = {
	"Content-Type": "application/json",
	"Accept": "application/json"
};

class PunchClock extends React.Component {

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

	findUserByPin = () => {
		const pin = Number(this.state.pin);
		const user = this.state.users.find(user => (user.pin === pin));			
		if (user) {
			this.setState({ selectedUser: user }, console.log(this.findActiveShiftByUser(user)))
		} else {
			this.setState({ selectedUser: null })
		};
	};

	handleChange = e => {
		e.persist();
	 	const newVal = e.target.value;
	 	this.setState({ pin: newVal }, () => this.findUserByPin() )
	};

	findActiveShiftByUser = user => {
		return this.state.activeShifts.find( shift => {
			return (shift.user_id === user.id)
		})
	}

	newPunch = () => {
		console.log('new punch')
		fetch(SHIFTS_API, {
			method: "POST",
			headers: HEADERS,
			body: JSON.stringify({ user_id: this.state.selectedUser.id })
		})
			.then( res => res.json() )
			.then( shift => this.setState(prevState => ({
				activeShifts: [...prevState.activeShifts, shift],
				pin: ''
				})
			), console.log(this.state.activeShifts))
	}
	
	closeShift = shift => {
		console.log('close shift');
		let shiftArr = [...this.state.activeShifts];
		const i = shiftArr.indexOf(shift);
		shiftArr.splice(i,1);
		console.log('close arr',shiftArr)
	
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
			<div>
				<form onSubmit={this.handlePunch}>
					<label for='pin'>Enter PIN:</label><br />
					<input type='text' name='pin' placeholder='XXXX' maxLength='4' value={this.state.pin} onChange={this.handleChange} /><br />
					<button type='submit'>PUNCH</button>
					<table>
						<tr>
							<td>1</td>
							<td>2</td>
							<td>3</td>
						</tr>
						<tr>
							<td>4</td>
							<td>5</td>
							<td>6</td>
						</tr>
						<tr>
							<td>7</td>
							<td>8</td>
							<td>9</td>
						</tr>
						<tr>
							<td>CL</td>
							<td>0</td>
							<td>BS</td>
						</tr>
					</table>
				</form>
				{
					this.state.selectedUser 
					?
						<div>
							<h4>{this.state.selectedUser.first_name + " " + this.state.selectedUser.last_name}</h4>
							{
								this.findActiveShiftByUser(this.state.selectedUser)
								?
									<p>User Logged In</p>
								:
									<p>User Not Logged In</p>
							}
						</div>
					: 
						<p>user not found</p>
				}
			</div>
		)
	}
}
 export default PunchClock;
