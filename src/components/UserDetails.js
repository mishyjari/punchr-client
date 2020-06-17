import React from 'react';
import ActiveShift from './ActiveShift.js';

class UserDetails extends React.Component {

  constructor(props) {
    super(props)
    let user = props.user
    this.state = {
      edit: false,
      form: {
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        hourly_wage: user.hourly_wage,
        phone: user.phone,
        pin: user.pin,
      }
    }
  }

  fromSnakeCase = (snake) => {
    let words = snake.split("_")
    words = words.map(w =>  w[0].toUpperCase() + w.slice(1))
    return words.join(' ')
  }

  renderEditUserButtons = () => {
    if (this.props.loggedInUser &&
      (this.props.loggedInUser.id === this.props.user.id
        || this.props.loggedInUser.is_manager))
      {
      return (
        <React.Fragment>
          <button onClick={() => this.setState(prev => ({edit: !prev.edit}))}>Edit</button>
          <button onClick={() => alert("Not Implemented!")}>Delete</button>
        </React.Fragment>
      )
    } else return null
  }

  handleChange = (event) => {
    event.persist()
    this.setState(prevState => {
      return {
        form: {
          ...prevState.form,
          [event.target.name]: event.target.value,
        }
      }
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.setState({edit: false})
    this.props.handleUpdateUser({...this.state.form, id: this.props.user.id})
  }

  renderEditForm = () => {
    if (this.state.edit) {
      let user = this.props.user
      return (
        <form
          id={"edit-user-" + user.id}
          onSubmit={this.handleSubmit}
          onChange={this.handleChange}
        >
          {Object.keys(this.state.form).map(field => {
            return (
              <React.Fragment>
                <label htmlFor={field}>{this.fromSnakeCase(field)}</label>
                <input name={field} value={this.state.form[field]}/>
                <br />
              </React.Fragment>
            )
          })}
          <button type='submit'>Submit</button>
        </form>
      )
    } else return null
  }

  renderActiveShift = () => {
    if (this.props.shift) {
      return (
        <ActiveShift
          {...this.props.shift}
          closeShift={this.props.closeShift} />
      )
    } else {
      return <h4>No active shift</h4>
    }
  }

  render() {
    console.log('shift prop: ', this.props.shift)
    return (
      <div className="user-details" id={"user-detail-" + this.props.user.id}>
        <p><strong>Name: </strong>{this.props.user.first_name} {this.props.user.last_name}</p>
        <p><strong>Email: </strong>{this.props.user.email}</p>
        <p><strong>Phone: </strong>{this.props.user.phone}</p>
        {this.renderActiveShift()}
        {this.props.user.is_manager ? <h5>Manager</h5> : null}
        {this.renderEditForm()}
        {this.renderEditUserButtons()}
      </div>
    )
  }
}

export default UserDetails
