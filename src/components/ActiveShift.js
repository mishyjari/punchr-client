import React from 'react';

const ActiveShift = props => {

	const totalHours = () => {
		const ms = new Date().getTime() - new Date(props.start).getTime();
		return Math.round(ms/36000)/100
	}

	return (
		<div>
			<h4>Active Shift Details  - Shift #{props.id}</h4>
			<p><strong>Name: </strong>{props.user.first_name + " " + props.user.last_name}</p>
			<p><strong>Opened: </strong>{new Date(props.start).toLocaleString()}</p>
			<p><strong>Elapsed: </strong><em>{totalHours()}</em> hrs.</p>
			<button onClick={() => props.closeShift(props)}>Close shift</button>
			<hr />
		</div>
	)
}

export default ActiveShift
