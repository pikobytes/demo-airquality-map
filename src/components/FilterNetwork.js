/**
 * Created by jacob.mendt@pikobytes.de on 02.03.20.
 *
 * This file is subject to the terms and conditions defined in
 * file "LICENSE.txt", which is part of this source code package.
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { withStyles} from "@material-ui/core";


const useStyles = makeStyles(theme => ({
  root: {
    zIndex: 1020,
    position: "absolute",
    top: 10,
    right: 50,
    width: 300,
    "& > p": {
      fontSize: 12,
      color: "rgba(0,0,0,0.6)",
    },
  },
  formControl: {
    backgroundColor: "#FFFFFF",
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));


/**
 * Select Network component
 */
function SelectNetwork(props) {
  const {
    className,
    networks,
    selectedNetwork,
  } = props;

  const handleChange = event => {
    props.onChange(event.target.value);
  };

  const classes = useStyles();
  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);


  return (
    <div className={clsx(classes.root, "pb-select-networks", className)}>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel ref={inputLabel} htmlFor="select-network">
          Network
        </InputLabel>
        <Select
          native
          value={selectedNetwork}
          onChange={handleChange}
          labelWidth={labelWidth}
        >
          {
            networks.map(
              (network, index) => (
                <option key={index} value={network.value}>{network.label}</option>
              )
            )
          }
        </Select>
      </FormControl>
    </div>
  );
}

SelectNetwork.defaultProps = {
  className: "",
  networks: [],
  onChange: () => {},
  selectedNetwork: "",
};

SelectNetwork.propTypes = {
  className: PropTypes.string,
  networks: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
    })
  ),
  onChange: PropTypes.func,
  selectedNetwork: PropTypes.string,
};

export default SelectNetwork;
