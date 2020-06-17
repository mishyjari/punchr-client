import React from 'react'
import ActiveShift from './ActiveShift.js';
import '../stylesheets/Shifts.css';

const ActiveShiftsContainer = props => {

	return (
		<div id='active-shifts-container'>
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
