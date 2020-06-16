import React from 'react';

const ShiftDetails = props => {

  const start = new Date(props.start)
  const end = props.end ? new Date(props.end) : null

  const get24hTime = t => {
    if (t) {
      return t.toTimeString()
        .split(':')
        .splice(0,2)
        .join(':')
    } else { return 'n/a' }
  }

  const totalHours = () => {
    const endTime = !end ? new Date() : end
    console.log(start,end,endTime)
    const ms = endTime.getTime() - start.getTime();
    return Math.round(ms/36000)/100
  }

  const fullName = `${props.user.first_name} ${props.user.last_name}`

  return (
    <tr>
      <td>{start.toLocaleDateString()}</td>
      <td>{fullName}</td>
      <td>{get24hTime(start)}</td>
      <td>{get24hTime(end)}</td>
      <td>{totalHours()}</td>
    </tr>
  )
}
 export default ShiftDetails
