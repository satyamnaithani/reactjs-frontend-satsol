import React, {useState} from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import axios from 'axios'
import {url} from '../../../globalVariables';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

export default function AddressForm() {
  const [type, setType]= useState("");
  const [amount, setAmount] = useState("")
  const [description, setDescription] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const handleSubmit = (evt) => {
    evt.preventDefault();
    setLoading(true);
    axios({
      method: 'post',
      url: url +'/expense',
      config: { headers: { 'Content-Type': 'application/json' } },
      headers: {'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token')).token},
      data: {
        type: type,
        amount: amount,
        description: description,
        addedBy: JSON.parse(localStorage.getItem('token')).name
      }
    })
    .then(function (response) {
      console.log(response);
      setLoading(false)
      setSuccess(true)
      setAmount("")
      setDescription("")
      setType("")
    })
    .catch(function (error) {
      console.log(error);
      setLoading(false)
      alert('Error adding Expense')
    });
   

}
  
  const classes = useStyles();
  return (
    <div className={classes.paper}>
      <Typography variant="h6" gutterBottom className={classes.heading}>
        Expenses
      </Typography>
      <form className={classes.form} noValidate onSubmit={handleSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
        <FormControl className={classes.formControl}>
        <InputLabel id="type">Type</InputLabel>
        <Select
          labelId="type"
          name="Type"
          label="Type"
          id="type"
          value={type}
          onChange={e=> setType(e.target.value)} 
        >
          <MenuItem value={"Transportation"}>Transportation</MenuItem>
          <MenuItem value={"Utility"}>Utility</MenuItem>
          <MenuItem value={"Consumables"}>Consumables</MenuItem>
        </Select>
      </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="amount"
            name="amount"
            label="Amount"
            fullWidth
            autoComplete="amount"
            value={amount}
            onChange={e=> setAmount(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="description"
            name="Description"
            label="Description"
            fullWidth
            autoComplete="description"
            value={description}
            onChange={e=> setDescription(e.target.value)}
          />
        </Grid>
        
        
      </Grid>
      <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
             {loading?'Processing...': 'ADD'}
          </Button>
      </form>
      <Snackbar open={success} autoHideDuration={3000} onClose={()=> setSuccess(false)} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert onClose={()=> setSuccess(false)} severity="success">
          Added!
  </Alert>
      </Snackbar>
   </div>
  );
}

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  


const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    background: '#fff',
    borderRadius: '10%'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '80%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    padding: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  heading: {
    paddingTop: theme.spacing(6)
  },
  formControl: {
    minWidth: 120,
  }
}));