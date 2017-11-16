import React, { Component } from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';

export class MapContainer extends Component {
  render() {
    return (
      <Map google={this.props.google} zoom={14}>

        <Marker
          onClick={this.onMarkerClick}
          name={'Current location'} />

      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ('YAIzaSyCcF35bbRWUQbTvP4t7XkY62MS5JDJ_oZk')
})(MapContainer);
