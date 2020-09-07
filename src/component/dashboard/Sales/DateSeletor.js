import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import ResetIcon from "@material-ui/icons/RotateLeft";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  button: {
    // background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    backgroundColor: "#8BC6EC",
    backgroundImage:
      "linear-gradient(239deg, #8BC6EC 0%, #9599E2 50%, #a8e7f2 100%)",
    borderRadius: 3,
    border: 0,
    color: "white",
    height: 48,
    padding: "0 30px",
    boxShadow: "0 3px 5px 2px #8BC6EC",
    "&:hover": {
      // background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 100%)",
      backgroundColor: "#8BC6EC",
      backgroundImage:
        "linear-gradient(180deg, #8BC6EC 0%, #9599E2 50%, #a8e7f2 100%)",

      borderRadius: 3,
      border: 0,
      color: "white",
      height: 48,
      padding: "0 30px",
      boxShadow: "0 4px 7px 3px  #8BC6EC",
    },
    "&:active": {
      backgroundColor: "#8BC6EC",
      backgroundImage:
        "linear-gradient(180deg, #8BC6EC 0%, #9599E2 50%, #a8e7f2 100%)",
      borderRadius: 3,
      border: 0,
      color: "white",
      height: 48,
      padding: "0 30px",
      boxShadow: "0 3px 5px 2px  #8BC6EC",
    },
  },
});
export default function DateSelector(props) {
  const [selectedDateStart, setSelectedDateStart] = useState("");
  const [selectedDateEnd, setSelectedDateEnd] = useState("");
  const classes = useStyles("");
  const handleSubmit = () => {
    if (selectedDateStart === "" || selectedDateEnd === "") {
      alert("Enter Date First!");
    } else {
      props.dateSelector(selectedDateStart, selectedDateEnd);
    }
  };

  return (
    <Grid container justify="center" spacing="5">
      <Grid item>
        <TextField
          id="dateStart"
          label="Satrt Date"
          type="date"
          //variant="outlined"
          size="medium"
          InputLabelProps={{
            shrink: true,
          }}
          value={selectedDateStart}
          onChange={(e) => setSelectedDateStart(e.target.value)}
        />
      </Grid>
      <Grid item>
        <TextField
          id="dateEnd"
          label="End Date"
          type="date"
          //variant="outlined"
          size="medium"
          InputLabelProps={{
            shrink: true,
          }}
          value={selectedDateEnd}
          onChange={(e) => setSelectedDateEnd(e.target.value)}
        />
      </Grid>
      <Grid item>
        <Button
          size="large"
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          className={classes.button}
        >
          Search
        </Button>
      </Grid>
      <Grid item>
        <IconButton>
          <ResetIcon
            onClick={() => {
              setSelectedDateStart("");
              setSelectedDateEnd("");
              props.handleReset();
            }}
          />
        </IconButton>
      </Grid>
    </Grid>
  );
}
