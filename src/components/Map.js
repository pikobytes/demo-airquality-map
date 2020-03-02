/**
 * Created by jacob.mendt@pikobytes.de on 26.11.19.
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

export default class Map extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // map object
      map: undefined,

      // reference to the map container, controlled by mapbox
      refMap: React.createRef(),
    };
  }

  componentDidMount() {
    const { refMap } = this.state;
    const {
      mapboxStyle,
      mapboxToken,
      viewport,
    } = this.props;

    // initalize the map object
    mapboxgl.accessToken = mapboxToken;

    const map = new mapboxgl.Map({
      bearing: viewport.bearing,
      center: [viewport.longitude, viewport.latitude],
      container: refMap.current,
      pitch: viewport.pitch,
      style: mapboxStyle,
      zoom: viewport.zoom,
    });

    // disable map rotation using touch rotation gesture
    // disable map rotation using right click + drag
    map.dragRotate.disable();
    map.touchZoomRotate.disableRotation();

    map.addControl(new mapboxgl.NavigationControl({ showCompass: false }));

    // update the state after initial load
    map.on("load", () => {
      this.setState({
        map: map,
      });

      if (this.props.onLoad) {
        this.props.onLoad(map);
      }
    });

  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { map } = this.state;
    const { width, height } = this.props;

    if (
      map !== undefined && (
        width !== prevProps.width ||
        height !== prevProps.height
      )
    ) {
      // Resize the map container
      map.resize();
    }
  }

  componentWillUnmount() {
    const { map } = this.state;

    if (map !== undefined) {
      map.remove();
    }
  }

  render() {
    const { refMap } = this.state;
    const { children, height, width } = this.props;

    return (
      <div ref={refMap} style={{ width: `${width}px`, height: `${height}px` }}>
        {children}
      </div>
    );
  }
}

Map.defaultProps = {
  reducedStyle: false,
  disableInteractions: false,
};

Map.propTypes = {
  height: PropTypes.number,
  mapboxStyle: PropTypes.string,
  mapboxToken: PropTypes.string,
  onLoad: PropTypes.func,
  reducedStyle: PropTypes.bool,
  viewport: PropTypes.shape({
    bearing: PropTypes.number,
    latitude: PropTypes.number,
    longitude: PropTypes.number,
    zoom: PropTypes.number,
    pitch: PropTypes.number
  }),
  width: PropTypes.number,
};
