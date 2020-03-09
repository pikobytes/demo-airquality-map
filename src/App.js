/**
 * Created by jacob.mendt@pikobytes.de on 02.03.20.
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */
/**
 * Created by jacob.mendt@pikobytes.de on 26.11.19.
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */
import React, { Component } from "react";
import axios from "axios";
import clsx from "clsx";
import { withStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import DataLayer from "./components/DataLayer";
import Map from "./components/Map";
import FilterLegend from "./components/FilterLegend";
import Snackbar from "./components/Snackbar";
import Logo from "./icons/pikobytes-logo-white.png";
import "./App.scss";

// Import globals
const PRIVACY_LINK = process.env.REACT_APP_LINK_PRIVACY;
const IMPRESSUM_LINK = process.env.REACT_APP_LINK_IMPRESSUM;
const MAPBOX_ACCESS_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;
const MAPBOX_STYLE = process.env.REACT_APP_MAPBOX_STYLE;

const styles = (theme) => {
  return {
    containerMap: {
      width: "100%",
      height: "100%",
      display: "block",
    },
    containerLogo: {
      position: "absolute",
      top: 10,
      left: 10,
      zIndex: 1020,
      "& img": {
        width: 250,
      }
    },
    content: {
      flexGrow: 1,
      marginBottom: 40,
    },
    root: {
      height: "100%",
      width: "100%",
      display: "flex",
    },
    footer: {
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 0,
      height: 40,
      background: "#F5F5F5",
      "& div": {
        marginTop: theme.spacing(1.5),
        textAlign: "center",
      },
      "& a": {
        height: 16,
        width: 64,
        color: "rgba(0,0,0,0.6)",
        fontFamily: "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
        fontSize: 14,
        letterSpacing: 0.4,
        lineHeight: "18px",
        textAlign: "center",
        textDecoration: "none",
      },
      "& a:hover": {
        color: "rgba(0,0,0,0.6)",
        textDecoration: "none",
      },
      "& a:first-child": {
        paddingRight: theme.spacing(3)
      },
    }
  }
};


class App extends Component {
  state = {
    // parameters for the size of the map container
    width: 0,
    height: 0,

    // current year
    currentYear: "",

    // metadata for selection the current slice
    metadata: undefined,

    // data selection currently displayed
    data: undefined,

    // map object
    map: undefined,

    // use this in case a feedback is need
    feedback: undefined,

    // features within map bounds
    featuresWithinBounds: 0,
  };

  componentDidMount() {
    window.addEventListener("resize", this.handleResize);

    // Initial make sure to update the size parameters
    this.handleResize();

    // Start fetching the relevant data for visualization
    this.fetchInitialData();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  fetchInitialData = async () => {
    try {
      const metadata = await axios.get("data/metadata.json");

      if (metadata.status === 200) {
        this.setState({
          metadata: metadata.data,
        }, () => {
          const { metadata } = this.state;

          if (metadata.slices.length > 0) {
            const dataDesc = metadata.slices[metadata.slices.length - 1];
            this.setState({
              currentYear: dataDesc.year,
            });
            this.fetchSelectData(dataDesc.path);
          }
        });
      }

    } catch (e) {
      this.setState({
        feedback: {
          message: e.message,
          variant: "error",
        }
      })
    }
  };

  fetchSelectData = async (path) => {
    try {
      const measurements = await axios.get(path);

      if (measurements.status === 200) {
        this.setState({
          data: measurements.data,
        }, () => {
          // Make sure to update also the displayed feature count
          const { map } = this.state;

          if (map !== undefined) {
            this.updateFeaturesWithinBounds(map.getBounds());
          }
        });
      }

    } catch (e) {
      this.setState({
        feedback: {
          message: e.message,
          variant: "error",
        }
      })
    }
  };

  /**
   * Changes the data currently displayed
   * @param {string} newYear
   */
  handleChangeData = (newYear) => {
    const { metadata } = this.state;
    this.setState({
      currentYear: newYear,
    }, () => {
      if (metadata !== undefined) {
        const dataDesc = metadata.slices.find(m => m.year === newYear);

        if (dataDesc === undefined) {
          this.setState({
            data: undefined,
          });
        } else {
          this.fetchSelectData(dataDesc.path);
        }
      }
    });
  };

  /**
   * Close handler for feedback
   */
  handleCloseFeedback = () => {
    this.setState({
      feedback: undefined,
    });
  };

  /**
   * @param {mapboxgl.Map} map
   */
  handleMapLoad = (map) => {
    if (this.state.map === undefined) {
      map.on("moveend", (e) => {
        this.updateFeaturesWithinBounds(
          e.target.getBounds(),
        );
      });

      // Initial update of features within map bounds
      this.updateFeaturesWithinBounds(
        map.getBounds(),
      );

      this.setState({
        map: map,
      });
    }
  };

  /**
   * In case of resize event, this triggers an update of the map size
   */
  handleResize = () => {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight - 40,
    })
  };

  /**
   * Updates the Features within map bounds count
   * @param {mapboxgl.LngLatBounds} bounds
   */
  updateFeaturesWithinBounds = (bounds) => {
    const { data } = this.state;

    if (data !== undefined) {
      const featuresWithinBounds = data.features.reduce(
        (acc, cur) => {
          return acc + (
            bounds.contains(cur.geometry.coordinates) ? 1 : 0
          )
        }, 0
      );

      // update state
      this.setState({
        featuresWithinBounds: featuresWithinBounds,
      });
    }
  };

  render() {
    const {
      currentYear,
      height,
      width,
      map,
      metadata,
      data,
      feedback,
      featuresWithinBounds,
    } = this.state;
    const { classes } = this.props;

    return (
      <div className={clsx(classes.root, "pb-airquality-map")}>
        <main className={clsx(classes.content)}>
          <div className={classes.containerLogo}>
            <img src={Logo} alt=""  />
          </div>
          <div className={classes.containerMap}>
            {
              (width > 0 && height > 0) && (
                <Map
                  height={height}
                  mapboxStyle={MAPBOX_STYLE}
                  mapboxToken={MAPBOX_ACCESS_TOKEN}
                  onLoad={this.handleMapLoad}
                  viewport={{
                    bearing: 0,
                    latitude: 51.415,
                    longitude: 0,
                    zoom: 2,
                    pitch: 0,
                  }}
                  width={width}
                >
                  {
                    map !== undefined && (
                      <DataLayer data={data} map={map} />
                    )
                  }
                </Map>
              )
            }
          </div>
          { feedback !== undefined && (
            <Snackbar
              className="pb-snackbar-feedback"
              message={feedback.message}
              onClose={this.handleCloseFeedback}
              variant={feedback.variant}
            />
          )}
          <FilterLegend
            currentYear={currentYear}
            featureCount={featuresWithinBounds}
            metadata={metadata}
            onChange={this.handleChangeData}
          />
        </main>
        <div className={classes.footer}>
          <div>
            <a
              href={IMPRESSUM_LINK}
              target="_blank"
              rel="noopener noreferrer"
            >Impressum</a>
            <a
              href={PRIVACY_LINK}
              target="_blank"
              rel="noopener noreferrer"
            >Datenschutz</a>
          </div>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(App);
