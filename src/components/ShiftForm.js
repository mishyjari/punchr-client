import React from 'react'
import {updateShift, createShift} from '../requests.js';


class ShiftForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      date: "",
      user_id: this.props.users[0].id,
      start_time: "",
      end_time: "",
    }
    if (props.shift) {
      let start = new Date(props.shift.start)
      let end = new Date(props.shift.end)
      this.state = {
        date: start.toISOString().split('T')[0],
        user_id: props.shift.user_id,
        start_time: this.get24hTime(start),
        end_time: props.shift.end ? this.get24hTime(end) : "",
      }
    }
  }

  // TODO: NOT DRY
  get24hTime = t => {
    if (t) {
      return t.toTimeString()
        .split(':')
        .splice(0,2)
        .join(':')
    } else { return "" }
  }

  handleChange = (event) => {
    event.persist()
    console.log('event', event.target.name, typeof(event.target.value), event.target.value)
    this.setState({[event.target.name]: event.target.value})
  }

  handleCancel = (event) => {
    this.setState({
      date: "",
      user_id: this.props.users[0].id,
      start_time: "",
      end_time: "",
    }, () => this.props.handleCancel(event))
  }

  handleSubmit = (event) => {
    // new Date(2020-06-17) == Tue Jun 16 2020 20:00:00 GMT-0400 (Eastern Daylight Time)
    let start = new Date(this.state.date + ' 12:00')
    let end = new Date(this.state.date + ' 12:00')
    let start_time = this.state.start_time.split(':')
    let end_time = this.state.end_time.split(':')

    start.setHours(parseInt(start_time[0]), parseFloat(start_time[1]))
    end.setHours(parseInt(end_time[0]), parseInt(end_time[0]))

    let newShift = {
      user_id: this.state.user_id,
      start: start.toISOString(),
      end: this.state.end_time ? end.toISOString() : 'no end',
    }
    if (this.props.shift) newShift.id = this.props.shift.id

    let callback = () => {
    // send to backend: it is easiest to do this here: why?
    // App.js and HistorySearcher both need access to the response
    // They must have the _response_ because they need an id
    // We could just have App.js call the request, but then it would 
    // need to come back down here with the response.
      const request = newShift.id ? updateShift : createShift
      request(newShift).then(json => {
        console.log(json)
        this.props.handleSubmit(json)
      })
    }

    this.setState({
      date: "",
      user_id: this.props.users[0].id,
      start_time: "",
      end_time: "",
    }, callback)
  }

  render() {
    return (
      <tr>
        <td><input name="date" type="date" onChange={this.handleChange} value={this.state.date}/></td>
        <td><select name="user_id" onChange={this.handleChange} value={this.state.user_id}>
          {this.props.users.map(user => <option value={user.id}>{user.first_name + ' ' + user.last_name}</option>)}
        </select></td>
        <td><input name="start_time" type="time" onChange={this.handleChange} value={this.state.start_time}/></td>
        <td><input name="end_time" type="time" onChange={this.handleChange} value={this.state.end_time}/></td>
        <td><button onClick={this.handleCancel}>Cancel</button></td>
        <td><button onClick={this.handleSubmit}>Submit</button></td>
      </tr>
    )
  }
}
export default ShiftForm