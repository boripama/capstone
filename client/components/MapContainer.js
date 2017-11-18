import React from 'react';
import polyline from '@mapbox/polyline';
import {connect} from 'react-redux';
import ReactMapboxGl, { Layer, Source } from 'react-mapbox-gl';

const Map = ReactMapboxGl({
  accessToken: 'pk.eyJ1IjoicGF0cmlja2d1bmQiLCJhIjoiY2o4YnF3em5hMDB3azMzc2Z0c2s4aXA0diJ9.lC8yZP6sxPbTeu9iW_UTkA'
});

const MapContainer = (props) => {
  const SOURCE_OPTIONS = {
    type: 'geojson',
    data: {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'LineString',
        coordinates: polyline.decode(props.poly)
      }
    }};
  return (
    <Map
      style="mapbox://styles/mapbox/streets-v9"
      center={[ -87.62071623466909, 41.880666855722666 ]}
      containerStyle={{
        height: '25vh',
        width: '25vw'
      }}>
      <Source id="source_id" tileJsonSource={SOURCE_OPTIONS} />
      <Layer
        type="line" id="layer_id" sourceId="source_id" paint={{'line-color': '#888',
          'line-width': 4}} />
    </Map>
  );
};

const MapState = null;
const MapDispatch = null;

export default connect(MapState, MapDispatch)(MapContainer);

