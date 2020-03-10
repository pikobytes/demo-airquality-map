/**
 * Created by jacob.mendt@pikobytes.de on 02.03.20.
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import FormControl from "@material-ui/core/FormControl";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InputBase from "@material-ui/core/InputBase";
import InputLabel from "@material-ui/core/InputLabel";
import IconInfo from "@material-ui/icons/InfoRounded";
import IconCancel from "@material-ui/icons/CancelRounded";
import NativeSelect from "@material-ui/core/NativeSelect";
import Typography from "@material-ui/core/Typography";
import { withStyles} from "@material-ui/core";

// For own dropdown field
const BootstrapInput = withStyles(theme => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: 16,
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}))(InputBase);


const styles = (theme) => {
  return {
    root: {
      zIndex: 1020,
      position: "absolute",
      left: 10,
      top: 100,
      width: 300,
      backgroundColor: "#FFFFFF",
      boxShadow: "0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.2)",
      padding: theme.spacing(1),
      "& > p": {
        fontSize: 12,
        color: "rgba(0,0,0,0.6)",
      },
    },
    containerList: {},
    icon: {
      width: 16,
      height: 16,
    },
    formControl: {
      margin: theme.spacing(0, 0, 2, 0),
      width: 300 - theme.spacing(2),
      cursor: "pointer",
    },
    header: {
      marginBottom: theme.spacing(2),
      border: "none",
      boxShadow: "none",
      "& .MuiExpansionPanelSummary-root": {
        padding: 0,
      },
      "& .MuiExpansionPanelDetails-root": {
        padding: theme.spacing(1, 0, 1, 0),
      }
    },
    heading: {
      fontWeight: theme.typography.fontWeightRegular,
    }
  }
};

const TICKS = [
  {"label": "0-7 days", color: "#2167fe" },
  {"label": "> 14 days", color: "#66affe" },
  {"label": "> 21 days", color: "#99c6fc" },
  {"label": "> 28 days", color: "#b4e5fe" },
  {"label": "> 35 days", color: "#fdfdbe" },
  {"label": "> 42 days", color: "#fefe00" },
  {"label": "> 49 days", color: "#feaa00" },
  {"label": "> 56 days", color: "#fd0000" },
  {"label": "> 63 days", color: "#a80000" },
  {"label": "> 70 days", color: "#a900e6" }
];

/**
 * Formats a given number to a string, which has every three digits a point
 * seperator in it.
 * @param {number} x
 * @returns {string}
 */
export function beautifyNumber(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}


/**
 * Map legend component
 */
class FilterLegend extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showInfo: true,
    }
  }

  handleChange = event => {
    this.props.onChange(event.target.value);
  };

  handleExpansion = (event, expanded) => {
    this.setState({
      showInfo: expanded,
    })
  };

  render() {
    const { showInfo } = this.state;
    const {
      className,
      classes,
      currentYear,
      featureCount,
      metadata,
    } = this.props;

    return (
      <div className={clsx(classes.root, "pb-map-legend", className)}>
        <ExpansionPanel className={classes.header}
          expanded={showInfo}
          onChange={this.handleExpansion}
        >
          <ExpansionPanelSummary
            expandIcon={showInfo ? <IconCancel /> : <IconInfo />}
            aria-controls="info"
            id="info-header"
          >
            <Typography className={classes.heading} component="h6" variant="h6">Found {beautifyNumber(featureCount)} sensors.</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              Number of exceedances of the particulate matter PM10 daily mean value of 50 µg/m3 in {currentYear}.
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <FormControl className={classes.formControl}>
          <InputLabel id="customized-select">Evaluation year</InputLabel>
          <NativeSelect
            id="customized-select"
            value={currentYear}
            onChange={this.handleChange}
            input={<BootstrapInput />}
          >
            {
              [
                { year: "", path: undefined },
                ...metadata.slices,
              ].map(
                (slice, index) => (
                  <option key={index} value={slice.year}>{slice.year}</option>
                )
              )
            }
          </NativeSelect>
        </FormControl>
        <Typography component="p" variant="body1">
          Legende:
        </Typography>
        <List className={classes.containerList}>
          {
            TICKS.map(
              (tick, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <div className={classes.icon} style={{ backgroundColor: tick.color }} />
                  </ListItemIcon>
                  <ListItemText
                    primary={tick.label}
                  />
                </ListItem>
              )
            )
          }
        </List>
        <Typography component="p" variant="body1">
          Data is based on <a
          href="https://opensensorweb.de"
          target="_blank"
          rel="noopener noreferrer"
        >OpenSensorWeb</a>. Last update on {metadata.lastUpdate}.
        </Typography>
      </div>
    );
  }
}

FilterLegend.defaultProps = {
  className: "",
  currentYear: "",
  featureCount: 0,
  metadata: {
    lastUpdate: "2020-03-01",
    slices: [],
  },
  onChange: () => {},
};

FilterLegend.propTypes = {
  classes: PropTypes.object,
  className: PropTypes.string,
  currentYear: PropTypes.string,
  featureCount: PropTypes.number,
  metadata: PropTypes.shape({
    lastUpdate: PropTypes.string,
    slices: PropTypes.arrayOf(
      PropTypes.shape({
        path: PropTypes.string,
        year: PropTypes.string,
      })
    ),
  }),
  onChange: PropTypes.func,
};

export default withStyles(styles)(FilterLegend);
