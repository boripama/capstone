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
    axios.post('/api/polydecoder', {polyline: this.props.polyline})
      .then(data => {
        this.setState({ routeCoords: data });
      });
  }
  render() {

    // if (this.state.routeCoords.length) {
    console.log('I AM A ROUTE COORD: ', this.state);
    return (

      <Map google={this.props.google} zoom={14}>

        <Marker
          onClick={this.onMarkerClick}
          name={'Current location'} />

      </Map>
    );
    // }
    // else {
    //   return null;
    // }

  }
}

export default GoogleApiWrapper({
  apiKey: ('YAIzaSyCcF35bbRWUQbTvP4t7XkY62MS5JDJ_oZk')
})(MapContainer);

// <Map google={this.props.google} zoom={14}>
//   style={{ width: '100%', height: '100%', position: 'relative' }}
//   className={'map'}
//   zoom={14}>
//   {/* <Polygon
//     paths={this.state.routeCoords}
//     strokeColor="#0000FF"
//     strokeOpacity={0.8}
//     strokeWeight={2}
//     fillColor="#0000FF"
//     fillOpacity={0.35} />
//   <Marker
//     onClick={this.onMarkerClick}
//     name={'Current location'} /> */}

// </Map>
