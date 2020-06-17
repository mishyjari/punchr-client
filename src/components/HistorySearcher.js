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
    return `${SHIFTS_API}?start=${start.toISOString()}&end=${end.toISOString()}}`
  }

  componentDidMount() {
    fetch(this.getSearchUri(this.state.start,this.state.end))
    .then( res => res.json() )
    .then( shifts => {
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
        <SearchResults results={this.state.results} />
      </div>
    )
  }
}

export default HistorySearcher;
