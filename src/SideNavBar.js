import React, { Component } from  'react';
import './Map.css';

class SideNavBar extends Component {

  state = {
    query: ''
  }

  updateQuery = (query) => {
    this.setState({ query: query.trim() })
    this.props.onFilteredPlace(this.state.query)
  }

  render() {
    const { locations } = this.props;
    const { query } = this.state;

    return (
      <div className="left-sidenav">
        <div className='list-places-top'>
          <input
            className='search-locations'
            type='text'
            placeholder='Search Locations'
            value={query}
            onChange={(event) => this.updateQuery(event.target.value)}
          />
        </div>
        <div className="list-places">
          <ul>
            {
              locations.map(location => (
                <li key={location.title} className='place'>
                  <div className='place-item' onClick={() => this.updateQuery(location.title)}>{location.title}</div>
                </li>
              ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default SideNavBar;