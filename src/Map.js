import React, { Component } from 'react';
import './Map.css';

class Map extends Component {
  constructor(props) {
    super(props);
    this.onScriptLoad = this.onScriptLoad.bind(this)
  }

  onScriptLoad() {
    const map = new window.google.maps.Map(
      document.getElementById(this.props.id),
      this.props.options);

    this.props.onMapLoad(map)
  }

  componentDidMount() {
    if (!window.google) {
      const scriptTag = document.createElement('script');
      scriptTag.type = 'text/javascript';
      scriptTag.src = `https://maps.google.com/maps/api/js?key=AIzaSyBkSEwnoelnECMgtf-6Dt18lcw0KzTmgis`;
      const x = document.getElementsByTagName('script')[0];
      x.parentNode.insertBefore(scriptTag, x);
      // Below is important.
      //We cannot access google.maps until it's finished loading
      scriptTag.addEventListener('load', element => {
        this.onScriptLoad()
      })
    } else {
      this.onScriptLoad()
    }
  }

  render() {
    return (
      <div id={this.props.id} className="map"/>
    );
  }
}

export default Map