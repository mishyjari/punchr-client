import React from 'react'
import ShiftDay from '../ShiftDay'
const ALL_SHIFTS = 'http://localhost:3000/shifts/'


class ShiftDayContainer extends React.Component {
  constructor(props) {
    super(props)
    let date = new Date()
    date.setHours(0,0,0,0)
    this.state = {
      today: date,
    }
  }

  shouldComponentUpdate(nextProps){
    return nextProps.shifts !== this.props.shifts;
  }

	// componentDidMount() {
  //   fetch(ALL_SHIFTS + '?start=' + this.state.today.toISOString())
  //     .then(res => res.json())
  //     .then(json => this.setState({shifts: json}))
  // }

  formatShifts = (shifts) => {
    return shifts.map(oldShift => {
      let shift = {...oldShift}
      shift.start = new Date(oldShift.start)
      if (shift.start < this.state.today) shift.start = this.state.today
      shift.end = oldShift.end ? new Date(oldShift.end) : new Date()
      return shift
    })
  }

  render() {
    return (
      <div className="shift-day-container">
      <ShiftDay 
        shifts={this.formatShifts(this.props.shifts)}
        date={this.state.today}
      />
      </div>
    )
  }
}
export default ShiftDayContainer