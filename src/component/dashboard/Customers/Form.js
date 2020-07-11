import React, {useState} from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import axios from 'axios'
import {url} from '../../../globalVariables';



export default function AddressForm() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [gst, setGst] = useState("");
  const [dl, setDl] = useState("");
  const [contact, setContact] = useState("");
  const [person, setPerson] = useState("");
  const [loading, setLoading] = useState(false)

  const handleSubmit = (evt) => {
    evt.preventDefault();
    setLoading(true);
    axios({
      method: 'post',
      url: url +'/customers/',
      config: { headers: { 'Content-Type': 'application/json' } },
      headers: {'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token')).token},
      data: {
        name: name,
        address: address,
        city: city,
        state: state,
        zip: zip,
        gst: gst,
        dl: dl,
        contact: contact,
        person: person,
        addedBy: JSON.parse(localStorage.getItem('token')).name
      }
    })
    .then(function (response) {
      console.log(response);
      setLoading(false)
      alert('Customer Added')
      setName("");
      setAddress("");
      setCity("");
      setContact("");
      setDl("");
      setPerson("");
      setZip("");
      setState("")
      setGst("")
    })
    .catch(function (error) {
      console.log(error);
      setLoading(false)
      alert('Error adding Customer')
    });
   

}
  
  const classes = useStyles();
  return (
    <div className={classes.paper}>
      <Typography variant="h6" gutterBottom className={classes.heading}>
        Customer Registration
      </Typography>
      <form className={classes.form} noValidate onSubmit={handleSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            id="name"
            name="name"
            label="Customer Name"
            fullWidth
            autoComplete="Cname"
            value={name}
            onChange={e=> setName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address"
            name="address"
            label="Address"
            fullWidth
            autoComplete="billing address-line1"
            value={address}
            onChange={e=> setAddress(e.target.value)}
          />
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="City"
            fullWidth
            autoComplete="city"
            value={city}
            onChange={e=> setCity(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required 
            id="state" 
            name="state" 
            label="State" 
            fullWidth
            value={state}
            onChange={e=> setState(e.target.value)}
            />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            name="zip"
            label="Zip / Postal code"
            fullWidth
            autoComplete="billing postal-code"
            value={zip}
            onChange={e=> setZip(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="gst"
            name="gst"
            label="GSTIN"
            fullWidth
            autoComplete="GST"
            value={gst}
            onChange={e=> setGst(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
        <TextField
            required
            id="dl"
            name="dl"
            label="Drug License"
            fullWidth
            autoComplete="dl"
            value={dl}
            onChange={e=> setDl(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
        <TextField
            required
            id="phone"
            name="phone"
            label="Contact No."
            fullWidth
            autoComplete="contact"
            value={contact}
            onChange={e=> setContact(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
        <TextField
            required
            id="person"
            name="person"
            label="Contact Person"
            fullWidth
            autoComplete="person"
            value={person}
            onChange={e=> setPerson(e.target.value)}
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
   </div>
  );
}




const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(10),
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
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    padding: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  heading: {
    paddingTop: theme.spacing(6)
  }
}));