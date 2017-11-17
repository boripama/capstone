import { PureComponent } from 'react';

export default class Polyline extends PureComponent {

  componentWillUpdate() {
    this.line.setMap(null);
  }

  componentWillUnmount() {
    this.line.setMap(null);
  }

  getPaths() {
    const { origin, destination } = this.props;

    return [
      { lat: Number(origin.lat), lng: Number(origin.long) },
      { lat: Number(destination.lat), lng: Number(destination.long) }
    ];
  }

  render() {
    // const Polyline = this.props.maps.Polyline;
    console.log('path: ', this.props.path);
    const renderedPolyline = this.renderPolyline();
    // const paths = { path: this.getPaths() };

    this.line = new window.google.maps.Polyline(Object.assign({}, renderedPolyline, this.props.path));

    this.line.setMap(this.props.map);

    return null;
  }

  renderPolyline() {
    return {
      geodesic: true,
      strokeColor: this.props.color || '#ffffff',
      strokeOpacity: 1,
      strokeWeight: 4
    };
  }
}

