import React from 'react';
import '../App.css';


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



	render() {
		console.log(this.props)
		return (
			<div id='punchr-app'>
				<form onSubmit={this.props.handlePunch}>
					<label for='pin'>Enter PIN:</label><br />
					<input type='text' name='pin' placeholder='XXXX' maxLength='4' value={this.state.pin} onChange={this.props.handleChange} /><br />
					<button type='submit'>PUNCH</button>
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
