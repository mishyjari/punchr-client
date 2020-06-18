import React from 'react';
import SearchResults from './SearchResults.js';

const SHIFTS_API = "http://localhost:3000/shifts";

class HistorySearcher extends React.Component {
  state = {
    start: new Date(new Date().getTime()-604800000), // 1 Week Ago
    end: new Date(),
    user: null,
    results: []
  }

  getSearchUri = (start,end) => {
    return `${SHIFTS_API}?start=${start.toISOString()}&end=${end.toISOString()}`
  }

  componentDidMount() {
    console.log(this.getSearchUri(this.state.start,this.state.end))
    fetch(this.getSearchUri(this.state.start,this.state.end))
    .then( res => res.json() )
    .then( shifts => {
      console.log('shifts res', shifts)
      this.setState({ results: shifts })
    })
  };


  handleSearch = e => {
    e.preventDefault();
    fetch(this.getSearchUri(this.state.start,this.state.end))
      .then( res => res.json() )
      .then( shifts => {
        this.setState({ results: shifts })
    })
  }

  handleChange = e => {
    e.persist();
    const key = e.target.name;
    console.log(new Date(e.target.value), key)
    this.setState(prevState => ({
      [key]: new Date(e.target.value),
    }))
  }

	addShiftInState = shift => {
		this.setState(prevState => ({results: [...prevState.results, shift]}))
	}

	updateShiftInState = (shift, i) => {
		let shiftArr = [...this.state.results]
		shiftArr[i] = shift
		this.setState({results: shiftArr})
	}

  // This will add a shift to results regardless of whether of not it is in range.
  // todo: the above is for simplicity. We can do a check against the range as a stretch goal.
	addOrUpdateShiftInState = shift => {
		const i = this.state.results.findIndex(elem => elem.id === shift.id)
		if (i < 0) this.addShiftInState(shift)
    else this.updateShiftInState(shift, i)
    this.props.handleShiftChange(shift)
	}

  render() {
    return (
      <div id='history-searcher'>
        <form onSubmit={this.handleSearch} onChange={this.handleChange}>
          <label htmlFor="start"><strong>Start Date: </strong></label>
          <input name="start" type="date" value={this.state.start.toISOString().split("T")[0]} />
          <label htmlFor="end"><strong>End Date: </strong></label>
          <input name="end" type="date" value={this.state.end.toISOString().split("T")[0]} />
          <button type='submit'>Search</button>
        </form>
        <SearchResults
          users={this.props.users}
          results={this.state.results}
          loggedInUser={this.props.loggedInUser}
          handleShiftUpdateOrCreate={this.addOrUpdateShiftInState}
        />
      </div>
    )
  }
}

export default HistorySearcher;
