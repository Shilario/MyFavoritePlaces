import React, { Component } from 'react';
import './App.css';
import Map from "./Map";
import SideNavBar from "./SideNavBar";

class App extends Component {
  render() {
    const mapOptions = {
      center: { lat: 41.0082, lng: 28.9784 },
      zoom: 8
    };
    return (
      <div id="main">
        <div id="sidebar-container">
          <SideNavBar/>
        </div>
        <div id="map-container">
          <Map
            id='map'
            options= {mapOptions}
            onMapLoad={ map => {
              const marker = new window.google.maps.Marker({
                position: { lat: 41.0082, lng: 28.9784 },
                map: map,
                title: 'My Map'
              });
            }}
          />
        </div>
      </div>
    );
  }
}

export default App;
