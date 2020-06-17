import React from 'react';

class Signup extends React.Component {
	state = {
		firstName: '',
		lastName: '',
		pin: '',
		email: '',
		phone: '',
		password: '',
		wage: '',
		confirmPw: '',
		isManager: false
	}

	handleChange = e => {
		const key = e.target.name;
		if (key === 'isManager'){
			this.setState({ isManager: e.target.checked })
		} else {
			this.setState({ [key]: e.target.value })
		}
	};

	handleSubmit = e => {
		e.preventDefault();
		const data = {
			first_name: this.state.firstName,
			last_name: this.state.lastName,
			pin: Number(this.state.pin),
			email: this.state.email,
			phone: this.state.phone,
			hourly_wage: this.state.wage,
			password: this.state.password,
			is_manager: this.state.isManager
		}
		this.props.addUser(data);
		this.setState({
			firstName: '',
			lastName: '',
			pin: '',
			email: '',
			phone: '',
			password: '',
			wage: '',
			confirmPw: ''
		})
	};

	render() {
		console.log(this.state)
		return (
			<div>
				<form onSubmit={this.handleSubmit} onChange={this.handleChange}>
					<label htmlFor='isManager'>Manager? </label>
					<input type='checkbox' name='isManager' value={this.state.isManager} /><br />
					<label htmlFor='firstName'>First Name:</label>
					<input type="text" name="firstName" value={this.state.firstName} /><br />
					<label htmlFor='lastName'>Last Name:</label>
					<input type="text" name="lastName" value={this.state.lastName} /><br />
					<label htmlFor='email'>Email:</label>
					<input type="email" name="email" value={this.state.email} /><br />
					<label htmlFor='phone'>Phone Number:</label>
					<input type="tel" name="phone" value={this.state.phone} /><br />
					<label htmlFor='password'>Password:</label>
					<input type="password" name="password" value={this.state.password} /><br />
					<label htmlFor='confirmPw'>Confirm Password:</label>
					<input type="password" name="confirmPw" /><br />
					<label htmlFor='pin'>Select a PIN:</label>
					<input type="text" name="pin" maxLength="4" value={this.state.pin} /><br />
					<button type='submit'>Submit</button>
				</form>
			</div>
		)
	}
}

export default Signup
