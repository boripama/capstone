import React, { Component } from 'react';
import { Map, Marker, Polygon, GoogleApiWrapper } from 'google-maps-react';
import axios from 'axios';


export class MapContainer extends Component {
  constructor() {
    super();
    this.state = {
      routeCoords: []
    };
  }
  componentDidMount() {
    console.log('ROUUUTE: ', this.props.polyline);
    const routeReturn = window.google.maps.geometry.encoding.decodePath(this.props.polyline);
    console.log('route coordinates: ', routeReturn);
    this.setState({ routeCoords: routeReturn });

  }
  render() {

    if (this.state.routeCoords.length) {
      console.log('I AM A ROUTE COORD: ', this.state.routeCoords);
      return (

        <Map
          google={this.props.google}
          initialCenter={{
            lat: 41.888446,
            lng: -87.635384 //fullstack
          }}
          zoom={14}
        >

          <Marker
            onClick={this.onMarkerClick}
            name={'Current location'} />

          <Polygon
            paths={this.state.routeCoords}
            strokeColor="#0000FF"
            strokeOpacity={0.8}
            strokeWeight={2}
            fillColor="#0000FF"
            fillOpacity={0.35} />

        </Map>
      );
    }
    else {
      return null;
    }

  }
}

export default GoogleApiWrapper({
  apiKey: ('YAIzaSyCcF35bbRWUQbTvP4t7XkY62MS5JDJ_oZk')
})(MapContainer);
