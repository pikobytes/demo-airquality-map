/**
 * Created by jacob.mendt@pikobytes.de on 02.03.20.
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */
/**
 * Created by jacob.mendt@pikobytes.de on 28.01.20.
 *
 * This file is subject to the terms and conditions defined in
 * file "LICENSE.txt", which is part of this source code package.
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import FormControl from "@material-ui/core/FormControl";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuItem from "@material-ui/core/MenuItem";
import InputBase from "@material-ui/core/InputBase";
import InputLabel from "@material-ui/core/InputLabel";
import NativeSelect from "@material-ui/core/NativeSelect";
import Typography from "@material-ui/core/Typography";
import { withStyles} from "@material-ui/core";

// For own dropdown field
const BootstrapInput = withStyles(theme => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
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
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);


const styles = (theme) => {
  return {
    root: {
      zIndex: 1020,
      position: "absolute",
      right: 10,
      bottom: 67,
      width: 300,
      backgroundColor: "#FFFFFF",
      boxShadow: "0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.2)",
      padding: theme.spacing(1),
      "& > p": {
        fontSize: 12,
        color: "rgba(0,0,0,0.6)",
      }
    },
    containerList: {

    },
    icon: {
      width: 16,
      height: 16,
    },
    formControl: {
      margin: theme.spacing(0, 0, 2, 0),
      width: 300 - theme.spacing(2),
      cursor: "pointer",
    },
  }
};

const TICKS = [
  {"label": "0-7 Tage", color: "#2167fe" },
  {"label": "> 14 Tage", color: "#66affe" },
  {"label": "> 21 Tage", color: "#99c6fc" },
  {"label": "> 28 Tage", color: "#b4e5fe" },
  {"label": "> 35 Tage", color: "#fdfdbe" },
  {"label": "> 42 Tage", color: "#fefe00" },
  {"label": "> 49 Tage", color: "#feaa00" },
  {"label": "> 56 Tage", color: "#fd0000" },
  {"label": "> 63 Tage", color: "#a80000" },
  {"label": "> 70 Tage", color: "#a900e6" }
];

/**
 * Map legend component
 */
class FilterLegend extends Component {
  constructor(props) {
    super(props);
  }

  handleChange = event => {
    this.props.onChange(event.target.value);
  };

  render() {
    const {
      className,
      classes,
      currentYear,
      metadata,
    } = this.props;

    return (
      <div className={clsx(classes.root, "pb-map-legend", className)}>
        <FormControl className={classes.formControl}>
          <InputLabel id="customized-select">Beurteilungsjahr</InputLabel>
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
          Zahl der Überschreitungungen des Feinstaub PM10 Tagesmittelwertes von 50 µg/m3 im Jahr 2019
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
          Letzte Datenaktualisierung zum {metadata.lastUpdate}
        </Typography>
      </div>
    );
  }
}

FilterLegend.defaultProps = {
  className: "",
  currentYear: "",
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
