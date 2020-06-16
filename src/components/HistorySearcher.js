import React from 'react';

const SHIFTS_API = "http://localhost:3000/shifts";

class HistorySearcher extends React.Component {
  state = {
    start: new Date(new Date().getTime()-604800000), // 1 Week Ago
    end: new Date(),
    user: null,
    results: []
  }

  componentWillMount() {
    fetch(SHIFTS_API)
    .then( res => res.json() )
    .then( shifts => this.setState({ results: shifts }) )
  }

  handleSearch = e => {
    e.preventDefault();
    const results = this.state.results.filter(shift => {
      return (Date.parse(shift.start) >= this.state.start) &&
        (Date.parse(shift.start) <= this.state.end)
    })
    console.log("search results", results);
    this.setState({ results: results })
  };

  handleChange = e => {
    e.persist();
    const key = e.target.name;
    this.setState({ [key]: new Date(e.target.value) })
  }

  render() {
    return (
      <div>
        <h3>Search Shift History</h3>
        <form onSubmit={this.handleSearch} onChange={this.handleChange}>
          <label htmlFor="start">Start Date</label>
          <input name="start" type="date" value={this.state.start.toISOString().split("T")[0]} />
          <label htmlFor="end">End Date</label>
          <input name="end" type="date" value={this.state.end.toISOString().split("T")[0]} />
          <button type='submit'>Search</button>
        </form>
      </div>
    )
  }
}

export default HistorySearcher;
