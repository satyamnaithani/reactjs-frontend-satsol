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
  const [code, setCode] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [gst, setGst] = useState("");
  const [dl, setDl] = useState("");
  const [contact, setContact] = useState("");
  const [person, setPerson] = useState("");


  const handleSubmit = (evt) => {
    evt.preventDefault();
    const address = address1 + " " + address2;
    axios({
      method: 'post',
      url: url +'/customers/',
      config: { headers: { 'Content-Type': 'application/json' } },
      data: {
        name: name,
        code: code,
        address: address,
        city: city,
        state: state,
        zip: zip,
        gst: gst,
        dl: dl,
        contact: contact,
        person: person
      }
    })
    .then(function (response) {
      console.log(response);
      alert('Customer Added')
    })
    .catch(function (error) {
      console.log(error);
      alert('Error adding Customer')
    });
    setName("");
    setCode("");
    setAddress1("");
    setAddress2("");
    setCity("");
    setCode("");
    setContact("");
    setDl("");
    setPerson("");
    setZip("");
    setState("")
    setGst("")

}
  
  const classes = useStyles();
  return (
    <div className={classes.paper}>
      <Typography variant="h6" gutterBottom className={classes.heading}>
        Customer Registration
      </Typography>
      <form className={classes.form} noValidate onSubmit={handleSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={8}>
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
        <Grid item xs={4} >
          <TextField
            required
            id="code"
            name="code"
            label="Code"
            fullWidth
            autoComplete="Ccode"
            value={code}
            onChange={e=> setCode(e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            required
            id="address1"
            name="address1"
            label="Address line 1"
            fullWidth
            autoComplete="billing address-line1"
            value={address1}
            onChange={e=> setAddress1(e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="address2"
            name="address2"
            label="Address line 2"
            fullWidth
            autoComplete="billing address-line2"
            value={address2}
            onChange={e=> setAddress2(e.target.value)}
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
            ADD
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