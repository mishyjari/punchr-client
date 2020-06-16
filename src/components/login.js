import React from 'react';

class Login extends React.Component {
	state = {
    email: '',
    password: '',
    successful: true,
    token: '',
		exp: '',
		loggedInUser: {},
  }
  
  renderFailedLogin = () => {
    if (this.state.successful) return null 
    else return <p style={{backgroundColor: 'red'}}>Email or password incorrect.</p>
  }

	handleChange = e => {
		const key = e.target.name;
		this.setState({ [key]: e.target.value })
	};

	handleSubmit = e => {
		e.preventDefault();
		const data = {
      email: this.state.email,
      password: this.state.password,
		}
		fetch('http://localhost:3000/sessions', {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json"
			},
			body: JSON.stringify(data)
		})
			.then( res => {
        if (res.status !== 200) {
          this.setState({
            successful: false,
            token: '',
						exp: '',
						loggedInUser: {},
          })
        } else {
          res.json().then(json => {
            this.setState({
              successful: true,
              token: json.token,
							exp: json.exp,
							loggedInUser: json.user,
            })
          })
        }
      })
	};

	render() {
		return (
			<div>
        {this.renderFailedLogin()}
				<form onSubmit={this.handleSubmit} onChange={this.handleChange}>
					<label for='email'>Email:</label>
					<input type="text" name="email" /><br />
					<label for='password'>Password:</label>
					<input type="password" name="password" /><br />
					<button type='submit'>Submit</button>
				</form>
			</div>
		)
	}
}

export default Login
