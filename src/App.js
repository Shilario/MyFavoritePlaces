import React, { Component } from 'react';
import './App.css';
import Map from "./Map";
import SideNavBar from "./SideNavBar";
import { locations } from "./utils/Places";
import escapeRegExp from 'escape-string-regexp';

class App extends Component {

  constructor(props) {
    super(props);
    window.self = this;
  }

  state = {
    locations
  }

  componentDidMount() {
    document.title = 'My favorite places in the Dominican Republic'
  }

  filterLocations = (name) => {
    const match = new RegExp(escapeRegExp(name), 'i');

    let filtered = locations.filter(place => match.test(place.title));
    this.setState({
      locations: filtered
    })
  };

  render() {
    const mapOptions = {
      center: { lat: 19.4517, lng: -70.69703 },
      zoom: 8
    };

    return (
      <div id="main">
        <div id="sidebar-container">
          <SideNavBar
            locations={this.state.locations}
            onFilteredPlace={this.filterLocations}
          />
        </div>
        <div id="map-container">
          <Map
            id='map'
            options= {mapOptions}
            locations={this.state.locations}
          />
        </div>
      </div>
    );
  }
}

export default App;
