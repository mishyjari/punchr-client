import React from 'react';
import ShiftDetails from './ShiftDetails.js';
import ShiftForm from './ShiftForm.js';

const SearchResults = props => {

  let {results, loggedInUser, handleShiftUpdateOrCreate, users} = props
  const managerHasAccess = loggedInUser && loggedInUser.is_manager
  return (
    <div>
      <table>
        <tr>
          <th>Date</th>
          <th>Employee Name</th>
          <th>Start Time</th>
          <th>End Time</th>
          <th>Total Hours</th>
          <th>Edit</th>
        </tr>
        {results.map(shift => <ShiftDetails users={users} shift={shift} onUpdateSubmit={handleShiftUpdateOrCreate} canEdit={managerHasAccess}/>)}
        {managerHasAccess ? <ShiftForm handleSubmit={handleShiftUpdateOrCreate} users={users} handleCancel={() => void(0)}/> : null}
      </table>
    </div>
  )
}

export default SearchResults;
