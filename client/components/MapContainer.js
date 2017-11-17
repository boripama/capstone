import React, { Component } from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import { Polyline } from './index';


export class MapContainer extends Component {
  constructor() {
    super();
    this.state = {
      routeCoords: [],
      tempCoords: [
        { lat: 41.888446, lng: -87.635384 },
        { lat: 41.888446, lng: -87.736384 },
        { lat: 41.888446, lng: -87.837384 }
      ]
    };
  }
  componentDidMount() {
    const routeReturn = window.google.maps.geometry.encoding.decodePath(this.props.polyline);
    console.log('route coordinates: ', routeReturn);
    this.setState({ routeCoords: routeReturn });

  }
  render() {

    if (this.state.routeCoords.length) {
      console.log('I AM THE ROUTE TO BE RENDERED: ', this.state.tempCoords);
      return (
        <div>

          <Map
            google={this.props.google}
            initialCenter={{
              lat: 41.888446,
              lng: -87.635384 //fullstack
            }}
            zoom={14}
          >
            {/* <Polyline path={this.state.tempCoords} /> */}

            <Marker
              onClick={this.onMarkerClick}
              name={'Current location'} />

          </Map>
        </div>
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

/* onGoogleApiLoaded={({ map, maps }) => { this.setState({ map: map, maps: maps, mapLoaded: true }); }} */
