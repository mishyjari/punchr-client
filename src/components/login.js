import React from 'react';

class Login extends React.Component {
	state = {
    email: '',
    password: '',
    successful: true,
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
		e.target.reset();
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
          }, () => {
						this.props.onLogin({
							loggedInUser: null,
							token: '',
							exp: '',
						})
					})
        } else {
          res.json().then(json => {
            this.setState({
              successful: true,
            }, () => {
							this.props.onLogin({
								loggedInUser: json.user,
								token: json.token,
								exp: json.exp
							});
							window.localStorage.user = JSON.stringify({
								loggedInUser: json.user,
								token: json.token,
								exp: json.exp
							})
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
