import React, {useState} from 'react';
import ShiftForm from './ShiftForm.js';

const ShiftDetails = props => {

  const [edit, setEditStatus] = useState(true)

  const start = new Date(props.shift.start)
  const end = props.shift.end ? new Date(props.shift.end) : null

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
    const ms = endTime.getTime() - start.getTime();
    return Math.round(ms/36000)/100
  }

  const onUpdateFormSubmit = (shift) => {
    setEditStatus(true)
    props.onUpdateSubmit(shift)
  }

  if (!props.shift.user) console.log('no user', props.shift)
  const fullName = `${props.shift.user.first_name} ${props.shift.user.last_name}`

  if (edit) {
    return (
      <tr>
        <td>{start.toLocaleDateString()}</td>
        <td>{fullName}</td>
        <td>{get24hTime(start)}</td>
        <td>{get24hTime(end)}</td>
        <td>{totalHours()}</td>
        <td>{props.canEdit ? <button onClick={() => setEditStatus(false)}>Edit</button> : null}</td>
      </tr>
    )
  } else {
    return (
      <ShiftForm 
        users={props.users} 
        shift={props.shift} 
        handleSubmit={onUpdateFormSubmit} 
        handleCancel={() => setEditStatus(true)} 
      />
    )
  }
}
 export default ShiftDetails
