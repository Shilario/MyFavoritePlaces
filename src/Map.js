import React, { Component } from 'react';
import './Map.css';
import $ from 'jquery';

window.jQuery = $;
window.$ = $;

class Map extends Component {
  constructor() {
    super();
    this.createMap = this.createMap.bind(this);
  }

  createMap() {
    const map = new window.google.maps.Map(
      document.getElementById(this.props.id),
      this.props.options);
    this.addMarkersToMap(this.props.locations, map)
  }

  // Adds the marker to the map
  addMarkersToMap(locations, map){
    const markers = [];
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
      markers.push(marker);
      // Create an onclick event to open the large infowindow at each marker.
      const infoWindow = new window.google.maps.InfoWindow();

      marker.addListener('click', function() {
        infoWindow.marker = marker;

        $.ajax({
          url: '//en.wikipedia.org/w/api.php',
          data: { action: 'opensearch', list: 'search', search: marker.title, format: 'json' },
          dataType: 'jsonp',
          success: function (results) {
            infoWindow.setContent('<div>' + results[2] + '</div>');
            infoWindow.open(map, marker);
          },
          error: function (err) {
            console.log('Error', err)
          }
        });

        // Make sure the marker property is cleared if the infowindow is closed.
        infoWindow.addListener('closeclick', function () {
          infoWindow.setMarker = null;
        });
      });
    }
    return markers;
  }

  componentDidMount() {
    if (!window.google) {
      const scriptTag = document.createElement('script');
      scriptTag.type = 'text/javascript';
      scriptTag.src = `https://maps.google.com/maps/api/js?key=AIzaSyBkSEwnoelnECMgtf-6Dt18lcw0KzTmgis&callback=createMap`;
      scriptTag.async = true;
      const x = document.getElementsByTagName('script')[0];
      x.parentNode.insertBefore(scriptTag, x);
      // Below is important.
      //We cannot access google.maps until it's finished loading
      scriptTag.addEventListener('load', element => {
        this.createMap()
      })
    } else {
      this.createMap()
    }
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    this.createMap();
    return null;
  }

  render() {
    return (
      <div id={this.props.id} className="map" aria-label='Google Maps'/>
    );
  }
}

export default Map;