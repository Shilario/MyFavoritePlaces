import React, { Component } from 'react';
import './App.css';
import Map from "./Map";
import SideNavBar from "./SideNavBar";

class App extends Component {
  state = {
    locations: [
      {title: 'Cibao International Airport', location: {lat: 19.403653385, lng: -70.6028109221}},
      {title: 'Fortaleza San Luis', location: {lat: 19.4422796642, lng: -70.7016891932}},
      {title: 'Punta Cana', location: {lat: 18.58182, lng: -68.40431}},
      {title: 'Cordillera Septentrional', location: {lat: 19.614, lng: -70.729}},
      {title: 'Alcázar de Colón', location: {lat: 18.473164774, lng: -69.876329828}},
      {title: 'Fortaleza Ozama', location: {lat: 18.4732, lng: -69.88171}}
    ],
    markers: []
  }

  addMarkersToMap(locations, map){
    for (let i = 0; i < locations.length; i++) {
      // Get the position from the location array.
      let position = locations[i].location,
        title = locations[i].title,
        marker = new window.google.maps.Marker({
          position: position,
          title: title,
          map,
          animation: window.google.maps.Animation.DROP,
          id: i
        });
      // Push the marker to our array of markers.
      this.state.markers.push(marker);
      // Create an onclick event to open the large infowindow at each marker.
      // marker.addListener('click', function() {
      //   populateInfoWindow(this, largeInfowindow);
      // });
      // Two event listeners - one for mouseover, one for mouseout,
      // to change the colors back and forth.
    }
    return this.state.markers;
  }

  render() {
    const mapOptions = {
      center: { lat: 19.4517, lng: -70.69703 },
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
            onMapLoad={ map =>  this.addMarkersToMap(this.state.locations, map) }
          />
        </div>
      </div>
    );
  }
}

export default App;
