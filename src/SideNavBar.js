import React, { Component } from  'react';
import './Map.css';

class SideNavBar extends Component {

  constructor(){
    super();
    this.pickPlace = this.pickPlace.bind(this);
  }

  state = {
    query: ''
  }

  updateQuery = (query) => {
    this.setState({ query: query.trim() })
    this.props.onFilteredPlace(this.state.query)
  }

  pickPlace(target){
    let currentElement = target.currentTarget;
    let filterPlace = currentElement.innerHTML;
    this.setState({ query: filterPlace.trim() })

    this.props.onFilteredPlace(filterPlace)
  }

  render() {
    const { locations } = this.props;
    const { query } = this.state;

    return (
      <div className="left-sidenav" name='Search locations'>
        <div className='list-places-top'>
          <input
            aria-label='search places'
            aria-required='true'
            id='search'
            className='search-locations'
            type='text'
            placeholder='Search Locations'
            value={query}
            onChange={(event) => this.updateQuery(event.target.value)}
          />
        </div>
        <div className="list-places">
          <ul name="List of my favorite places in the Dominican Republic">
            {
              locations.map(location => (
                <li key={location.title} className='place'>
                  <a className='place-item' onClick={this.pickPlace} role='button'>{location.title}</a>
                </li>
              ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default SideNavBar;