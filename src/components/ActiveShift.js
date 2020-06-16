import React from 'react';

const ActiveShift = props => {
	return (
		<div>
			<h4>{props.user.first_name + " " + props.user.last_name}</h4>
			<p><strong>Shift Opened: </strong>{props.start}</p>
			<p>Current Length: <em>Do some math here</em></p>
			<button onClick={() => alert('not implemented')}>Close shift</button>
			<hr />
		</div>
	)
}

export default ActiveShift
