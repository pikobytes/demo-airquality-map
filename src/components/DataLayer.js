/**
 * Created by jacob.mendt@pikobytes.de on 27.11.19.
 *
 * This file is subject to the terms and conditions defined in
 * file "LICENSE.txt", which is part of this source code package.
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import mapboxgl from "mapbox-gl";
import { parseSensorHref } from "../structs/utils";


// IDs used for source and layers
const SOURCE_ID = "data-source-1";
export const LAYER_ID_POINTS = "data-layer-points-1";
const LAYER_ID_LABELS = "data-layer-labels-1";

class DataLayer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      popup: undefined,
      selected: undefined,
    }
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
          "stops": [
            [3, 3],
            [5, 4],
            [8, 6],
            [16, 10],
            [22, 180],
          ]
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
        ],
        "circle-opacity": 0.85,
      }
    });

    // register event listeners
    map.on("mousemove", LAYER_ID_POINTS, this.handleMouseMove);
    map.on("mouseleave", LAYER_ID_POINTS, this.handleMouseLeave);
    map.on("click", LAYER_ID_POINTS, this.handleMouseClick);
  }

  componentWillUnmount() {
    const { map } = this.props;
    map.off("mousemove", LAYER_ID_POINTS, this.handleMouseMove);
    map.off("mouseleave", LAYER_ID_POINTS, this.handleMouseLeave);
    map.off("click", LAYER_ID_POINTS, this.handleMouseClick);
  }

  componentDidUpdate() {
    const { map } = this.props;
    map.getSource(SOURCE_ID).setData(this.props.data);
  }

  handleMouseClick = (e) => {
    if (e.features.length > 0) {
      if (this.props.onClick) {
        this.handleMouseLeave();
        this.props.onClick(e.features[0]);
      }
    }
  };

  handleMouseMove = (e) => {
    const { map } = this.props;

    // update the cursor
    map.getCanvas().style.cursor = "pointer";

    if (e.features.length > 0) {
      this.setState({
        selected: e.features[0],
      }, this.renderPopup);
    }
  };

  /**
   * Handler for processing the pointer leave from a Verbund feature
   */
  handleMouseLeave = () => {
    const { map } = this.props;

    // Reset the cursor style
    map.getCanvas().style.cursor = "";

    this.setState({
      selected: undefined,
    }, this.renderPopup);
  };

  renderPopup = () => {
    const { popup, selected } = this.state;
    const { map } = this.props;

    // Clear old popups
    if (popup) {
      popup.remove();
    }

    if (selected !== undefined) {
      const { geometry, properties } = selected;
      const { sensorId, deviceId, networkId } = parseSensorHref(properties.href);
      const title = `${networkId} / ${deviceId} / ${sensorId}`;

      // Create the new popup
      const popup = new mapboxgl.Popup({ className: "pb-map-popup", closeButton: false })
      .setLngLat(geometry.coordinates)
      .setHTML(`<div class="popup-content">` +
        `<span class="title">${title}</span>` +
        `<span class="value">Days over 50µg/m³: <span>${properties.over50}</span></span>` +
        `</div>`)
      .addTo(map);
      this.setState({ popup });
    } else {
      this.setState({ popup: undefined });
    }
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
  },
  onClick: () => {},
};

DataLayer.propTypes = {
  data: PropTypes.object,
  map: PropTypes.instanceOf(mapboxgl.Map).isRequired,
  onClick: PropTypes.func,
};

export default DataLayer;
