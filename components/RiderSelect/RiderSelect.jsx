import React, { useState, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  Select,
  InputLabel,
  MenuItem,
  FormControl,
  FormHelperText,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: "100%",
    maxWidth: "100%",
  },
}));

function getStyles(name, personName, theme) {
  if (!name || !personName) {
    return {
      fontWeight: theme.typography.fontWeightMedium,
      fontStyle: "italics",
    };
  }
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const RiderSelect = ({
  options,
  selectLabel,
  onChange,
  riderPosition,
  value,
}) => {
  const [name, setname] = useState("");
  const classes = useStyles();
  const theme = useTheme();

  useEffect(() => {
    if (!value && name) {
      setname("");
      return;
    }

    if (value && value.name) {
      setname(value.name);
    }
  }, [value]);

  const handleRiderSelection = (riderEvent) => {
    const name = riderEvent.target.value;
    if (!name) {
      setname("");
      onChange("", riderPosition);
    }
    setname(name);
    onChange(name, riderPosition);
  };

  return (
    <FormControl className={classes.formControl} error={value?.error}>
      <InputLabel id={selectLabel}>{selectLabel}</InputLabel>
      <Select
        labelId={selectLabel}
        name=""
        id="select"
        value={name}
        onChange={handleRiderSelection}
        className="roboto"
      >
        <MenuItem className="italic-item" value={null}>
          Clear Selection
        </MenuItem>
        {options.map((riderOption) => {
          return (
            <MenuItem
              key={riderOption.name}
              style={getStyles(riderOption.name, name, theme)}
              value={riderOption.name}
              className="roboto"
              disabled={name === riderOption.name}
            >
              {`#${riderOption.number} - ${riderOption.name}`}
            </MenuItem>
          );
        })}
      </Select>
      {value?.error && <FormHelperText>{value?.error}</FormHelperText>}
    </FormControl>
  );
};

export default RiderSelect;
