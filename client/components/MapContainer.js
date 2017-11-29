import React from 'react';
import polyline from '@mapbox/polyline';
import { connect } from 'react-redux';
import ReactMapboxGl, { Layer, Source } from 'react-mapbox-gl';

const Map = ReactMapboxGl({
  accessToken: 'pk.eyJ1IjoicGF0cmlja2d1bmQiLCJhIjoiY2o4YnF3em5hMDB3azMzc2Z0c2s4aXA0diJ9.lC8yZP6sxPbTeu9iW_UTkA'
});

const MapContainer = (props) => {
  const coords = polyline.decode(props.activity.polyline);

  const SOURCE_OPTIONS = {
    type: 'geojson',
    data: {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'LineString',
        coordinates: coords
      }
    }
  };
  return (
    <Map
      style="mapbox://styles/mapbox/streets-v9"
      center={coords[0]}
      containerStyle={{
        height: '100%',
        width: '100%'
      }}>
      <Source id="source_id" tileJsonSource={SOURCE_OPTIONS} />
      <Layer
        type="line" id="layer_id" sourceId="source_id" paint={{
          'line-color': '#888',
          'line-width': 4
        }} />
    </Map>
  );
};

const MapState = null;
const MapDispatch = null;

export default connect(MapState, MapDispatch)(MapContainer);

