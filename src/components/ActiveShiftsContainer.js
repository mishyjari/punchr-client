import React from 'react'
import ActiveShift from './ActiveShift.js';

const ActiveShiftsContainer = props => {

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
