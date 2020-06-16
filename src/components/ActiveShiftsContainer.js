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
				props.shifts.length > 0
				?
					props.shifts.map(shift => <ActiveShift {...shift} />)
				:
					<h4>No Active Shifts</h4>

			}
		</div>
	)
}

export default ActiveShiftsContainer
