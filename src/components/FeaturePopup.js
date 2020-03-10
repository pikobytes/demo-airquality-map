/**
 * Created by jacob.mendt@pikobytes.de on 02.03.20.
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import Modal from "@material-ui/core/Modal";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { withStyles} from "@material-ui/core";
import {parseSensorHref} from "../structs/utils";

const styles = (theme) => {
  return {
    root: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(2, 4, 3),
    },
    closeButton: {
      margin: theme.spacing(1),
      position: "absolute",
      top: 0,
      right: 0,
    }
  }
};


/**
 * Popup of a feature component
 */
class FeaturePopup extends Component {
  render() {
    const {
      classes,
      className,
      feature,
      year,
    } = this.props;

    // Build title
    const { geometry, properties } = feature;
    const { sensorId, deviceId, networkId } = parseSensorHref(properties.href);
    const title = `${networkId} / ${deviceId} / ${sensorId}`;

    // Build link
    const { coordinates } = geometry;
    const y = year.length === 0 ? "2020" : year;
    const url = `https://opensensorweb.de/#/search?c=${coordinates[0]},${coordinates[1]}` +
      `&sid=${networkId}.${deviceId}.${sensorId},` +
      `&te=${y}-01-01,${y}-12-31&tz=B&z=15&v=sidebar`;

    console.log(feature)
    return (
      <Modal
        className={className}
        aria-labelledby="feature-popup"
        aria-describedby="Popup of the selected feature"
        open={true}
        onClose={this.props.onClose}
      >
        <div className={clsx(classes.root, "content-container")}>
          <div className="popup-content">
            <span className="title">{title}</span>
            <span className="value">Days over 50µg/m³: <span>{properties.over50}</span></span>
            <p className="link">
              See full timeseries at <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
              >OpenSensorWeb</a>.
            </p>
          </div>
          <IconButton
            aria-label="delete"
            className={classes.closeButton}
            onClick={this.props.onClose}
          >
            <CloseIcon />
          </IconButton>
        </div>
      </Modal>
    );
  }
}

FeaturePopup.defaultProps = {
  className: "",
  onClose: () => {},
  year: "",
};

FeaturePopup.propTypes = {
  classes: PropTypes.object,
  className: PropTypes.string,
  feature: PropTypes.shape({
    geometry: PropTypes.shape({
      coordinates: PropTypes.arrayOf(PropTypes.number),
    }),
    properties: PropTypes.shape({
      href: PropTypes.string,
      over50: PropTypes.number,
    })
  }).isRequired,
  onClose: PropTypes.func,
  year: PropTypes.string,
};

export default withStyles(styles)(FeaturePopup);
