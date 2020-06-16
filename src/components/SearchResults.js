import React from 'react';
import ShiftDetails from './ShiftDetails.js';

const SearchResults = props => {
  return (
    <div>
      <table>
        <tr>
          <th>Date</th>
          <th>Employee Name</th>
          <th>Start Time</th>
          <th>End Time</th>
          <th>Total Hours</th>
        </tr>
        {
          props.results.map(shift => <ShiftDetails {...shift} />)
        }
      </table>
    </div>
  )
}

export default SearchResults;
