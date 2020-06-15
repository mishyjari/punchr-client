import React from 'react'
import ActiveShift from './ActiveShift.js';

const ActiveShiftsContainer = props => {
	
	console.log('container', props)
	const findUserByShift = shift => {
		return props.users.find(user => (user.id === shift.user_id))
	};

	return (
		<div>
			<h3>Active Shifts</h3>
			{
				props.activeShifts.map(shift => <ActiveShift shift={shift} user={() => findUserByShift(shift)} />)
			}
		</div>
	)
}

export default ActiveShiftsContainer
