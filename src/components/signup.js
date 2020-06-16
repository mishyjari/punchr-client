import React from 'react';

class Signup extends React.Component {
	state = {
		firstName: '',
		lastName: '',
		pin: '',
		email: '',
		phone: '',
		password: '',
		confirmPw: ''
	}

	handleChange = e => {
		const key = e.target.name;
		this.setState({ [key]: e.target.value })
	};

	handleSubmit = e => {
		e.preventDefault();
		const data = {
			first_name: this.state.firstName,
			last_name: this.state.lastName,
			pin: Number(this.state.pin),
			email: this.state.email,
			phone: this.state.phone,
			password: this.state.password
		}
		e.target.reset();
		fetch('http://localhost:3000/users', {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json"
			},
			body: JSON.stringify(data)
		})
			.then( res => res.json() )
			.then( user => alert('User Created') )
	};

	render() {
		return (
			<div>
				<form onSubmit={this.handleSubmit} onChange={this.handleChange}>
					<label for='firstName'>First Name:</label>
					<input type="text" name="firstName" /><br />
					<label for='lastName'>Last Name:</label>
					<input type="text" name="lastName" /><br />
					<label for='email'>Email:</label>
					<input type="text" name="email" /><br />
					<label for='phone'>Phone Number:</label>
					<input type="text" name="phone" /><br />
					<label for='password'>Password:</label>
					<input type="password" name="password" /><br />
					<label for='confirmPw'>Confirm Password:</label>
					<input type="password" name="confirmPw" /><br />
					<label for='pin'>Select a PIN:</label>
					<input type="text" name="pin" maxLength="4" /><br />
					<button type='submit'>Submit</button>
				</form>
			</div>
		)
	}
}

export default Signup
