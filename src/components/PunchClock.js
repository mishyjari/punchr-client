import React from 'react';

class PunchClock extends React.Component {
	render() {
		return (
			<div>
				<form onSubmit={e => {
					e.preventDefault();
					console.log('submitted')
				}}>
					<label for='pin'>Enter PIN:</label><br />
					<input type='text' name='pin' placeholder='XXXX' maxLength='4' /><br />
					<button type='submit'>PUNCH</button>
					<table>
						<tr>
							<td>1</td>
							<td>2</td>
							<td>3</td>
						</tr>
						<tr>
							<td>4</td>
							<td>5</td>
							<td>6</td>
						</tr>
						<tr>
							<td>7</td>
							<td>8</td>
							<td>9</td>
						</tr>
						<tr>
							<td>CL</td>
							<td>0</td>
							<td>BS</td>
						</tr>
					</table>
				</form>
			</div>
		)
	}
}
 export default PunchClock;
