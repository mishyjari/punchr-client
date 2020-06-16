import React from 'react';
import HistorySearcher from './HistorySearcher.js';

const ControlPanel = props => {
	return (
		<div>
			<h1>Control Panel</h1>
			{/* Should display user login prompt. By default, 'sessions' will be stored in the parent state of c-panel.
			We should have a 'keep me logged in' button that creates an actual user session which persists.

			Here a user should be able to search their shift history by date range, update their information, get a 'quick overview'
			of this week (maybe last too?) incluing shifts (maybe just total hours per day) and total pay (if applicable)

			Should also show or link to contact info for coworkers

			if User is a manager, they will be able to search by user or by all users, update user info, edit, create or delete shifts*/}
			<HistorySearcher />
		</div>
	)
}

export default ControlPanel;
