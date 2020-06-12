import React from 'react'
import ActiveShift from './ActiveShift.js';

const ActiveShiftsContainer = props => {
	return (
		<div>
			<h3>Active Shifts</h3>
			{
				props.activeShifts.map(shift => <ActiveShift shift={shift} />)
			}
		</div>
	)
}

export default ActiveShiftsContainer
