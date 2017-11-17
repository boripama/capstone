import React, { Component } from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
// import { Polyline } from './index';


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
    const pLine = new window.google.maps.Polyline({
      path: this.state.tempCoords,
      geodesic: true,
      strokeColor: '#FF0000',
      strokeOpacity: 1.0,
      strokeWeight: 2
    });
    // let map = new window.google.maps.Map(document.getElementById('map'), {
    //   zoom: 14,
    //   center: { lat: 34.366, lng: -89.519 }
    // }); //standard google maps map object
    console.log('route coordinates: ', routeReturn);
    this.setState({ routeCoords: routeReturn, line: pLine });

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
            onGoogleApiLoaded={({ map, maps }) => {
              this.setState({ map: map, maps: maps, mapLoaded: true });
              this.state.line.setMap(map);
            }}
          >


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


// this.line = new window.google.maps.Polyline(Object.assign({}, renderedPolyline, this.props.path));
