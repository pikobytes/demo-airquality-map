/**
 * Created by jacob.mendt@pikobytes.de on 27.11.19.
 *
 * This file is subject to the terms and conditions defined in
 * file "LICENSE.txt", which is part of this source code package.
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import mapboxgl from "mapbox-gl";


// IDs used for source and layers
const SOURCE_ID = "data-source-1";
const LAYER_ID_POINTS = "data-layer-points-1";
const LAYER_ID_LABELS = "data-layer-labels-1";

class DataLayer extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {
      data,
      map,
    } = this.props;

    // add the data
    map.addSource(SOURCE_ID, {
      "type": "geojson",
      "data": data,
    });

    //
    // Add layers for displaying the Notfallverbünde and the INSTITUTIONSeinrichtungen
    //

    // Notfallverbünde: display the data with a fill and a line layer
    map.addLayer({
      "id": LAYER_ID_POINTS,
      "source": SOURCE_ID,
      "type": "circle",
      "paint": {
        "circle-radius": {
          "base": 1.75,
          "stops": [[5, 3], [8, 5], [16, 10], [22, 180]]
        },
        "circle-color": [
          "step",
          ["get", "over50"],
          "#2167fe",
          7, "#2d9dfe",
          14, "#66affe",
          21, "#99c6fc",
          28, "#b4e5fe",
          35, "#fdfdbe",
          42, "#fefe00",
          49, "#feaa00",
          56, "#fd0000",
          63, "#a80000",
          70, "#a900e6",
        ]
      }
    });

    // register event listeners
    map.on("mousemove", LAYER_ID_POINTS, this.handleMouseMove);
    map.on("mouseleave", LAYER_ID_POINTS, this.handleMouseLeave);
  }

  componentWillUnmount() {
    const { map } = this.props;
    map.off("mousemove", LAYER_ID_POINTS, this.handleMouseMove);
    map.off("mouseleave", LAYER_ID_POINTS, this.handleMouseLeave);
  }

  componentDidUpdate() {
    const { map } = this.props;
    map.getSource(SOURCE_ID).setData(this.props.data);
  }

  handleMouseMove = (e) => {
    const { map } = this.props;

    // update the cursor
    map.getCanvas().style.cursor = "pointer";

    if (e.features.length > 0) {
      const values = e.features.map(
        ft => ft.properties.over50
      );
      console.log(values);
    }
  };

  /**
   * Handler for processing the pointer leave from a Verbund feature
   */
  handleMouseLeave = () => {
    const { map } = this.props;

    // Reset the cursor style
    map.getCanvas().style.cursor = "";
  };

  render() {
    return (
      <div style={{ display: "none" }} />
    );
  }
}

DataLayer.defaultProps = {
  data: {
    type: "FeatureCollection",
    features: [],
  }
};

DataLayer.propTypes = {
  data: PropTypes.object,
  map: PropTypes.instanceOf(mapboxgl.Map).isRequired,
};

export default DataLayer;
