import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import DialogActions from '@material-ui/core/DialogActions';

import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';

import Grid from '@material-ui/core/Grid';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { url } from '../../globalVariables';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    float: "right"
  },
  title: {
    textAlign: 'center'
  }
}));

export default function AlertDialogSlide(props) {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [hsn, setHsn] = useState("");
  const [gst, setGst] = useState("");
  const [uom, setUom] = useState("");
  const [SuccessMessageDialog, setSucessMessageDialog] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
      axios({
        method: 'post',
        url: url+'/items',
        config: { headers: { 'Content-Type': 'application/json' } },
        headers: {'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token')).token},
        data: {
          catogory: category,
          name: name,
          hsn: hsn,
          gst: gst,
          uom: uom,
          addedBy: JSON.parse(localStorage.getItem('token')).name
        }
      })
      .then(function (response) {
        console.log(response);
        setLoading(false)
        setCategory("");
      setName("");
      setHsn("");
      setGst("")
      setUom("");
      setSucessMessageDialog(true);
      })
      .catch(function (error) {
        console.log(error);
        setLoading(false)
        alert(error)
      });
  }

  const handleClose = () => {
    props.closeItemForm();
  };

  return (
    <div>
      <Dialog
        open={props.open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle className={classes.title} id="alert-dialog-slide-title">Item Entry</DialogTitle>
        <DialogContent>
          <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <form className={classes.form} onSubmit={handleSubmit} >
          <Grid container>
        <Grid item xs='12' md='12' lg='12'>
        <FormControl margin='normal' variant="outlined" fullWidth>
        <InputLabel id="category">Category</InputLabel>
        <Select
          labelId="category"
          name="category"
          fullWidth
          label="Category"
          id="select-category"
          value={category}
          onChange={e=> setCategory(e.target.value)} 
        >
          <MenuItem value={"Medical Equipment"}>Medical Equipment</MenuItem>
          <MenuItem value={"Spears"}>Spares</MenuItem>
          <MenuItem value={"Consumables"}>Consumables</MenuItem>
          <MenuItem disabled value={"Office Durables"}>Office Durables</MenuItem>
          <MenuItem disabled value={"Office Consumables"}>Office Consumables</MenuItem>
        </Select>
      </FormControl>
        </Grid>
      <Grid item xs='12' md='12' lg='12'>
      <TextField
            required
            id="name"
            name="name"
            variant="outlined"
            label="Item Name"
            margin='normal'
            fullWidth
            autoComplete="Iname"
            value={name}
            onChange={e=> setName(e.target.value)}
          />
      </Grid>
          <Grid item xs='12' md='12' lg='12'>
          <TextField
            required
            id="hsn"
            name="hsn"
            variant="outlined"
            margin='normal'
            label="HSN Code"
            fullWidth
            autoComplete="HSN"
            value={hsn}
            onChange={e=> setHsn(e.target.value)}
          />
          </Grid>
         <Grid item xs='12' md='12' lg='12'>
        <FormControl margin='normal' variant="outlined" fullWidth>
        <InputLabel id="gst">GST%</InputLabel>
        <Select
          labelId="gst"
          name="gst"
          fullWidth
          required
          label="Gst"
          id="select-gst"
          value={gst}
          onChange={e=> setGst(e.target.value)} 
        >
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={12}>12</MenuItem>
          <MenuItem value={18}>18</MenuItem>
          <MenuItem value={28}>28</MenuItem>
        </Select>
      </FormControl>
        </Grid>
          <Grid item xs='12' md='12' lg='12'>
          <FormControl margin='normal' variant="outlined" fullWidth>
        <InputLabel id="uom">UOM</InputLabel>
        <Select
          labelId="uom"
          name="UOM"
          label="UOM"
          required
          id="uom"
          value={uom}
          onChange={e=> setUom(e.target.value)} 
        >
          <MenuItem value={"Kg"}>Kg</MenuItem>
          <MenuItem value={"L"}>Litre</MenuItem>
          <MenuItem value={"Piece"}>Pieces</MenuItem>
          <MenuItem value={"No."}>No.</MenuItem>
        </Select>
      </FormControl>
          </Grid>
         <Grid item xs='12'>
         <Button
            type="submit"
            color="primary"
            className={classes.submit}
          >{
              loading ? <CircularProgress size='1.5rem' color='inherit' /> : 'Add'
            }
          </Button>
          <Button
            type='button'
            onClick={handleClose}
            color="secondary"
            className={classes.submit}
          >
            Cancel
          </Button>
         </Grid>
          </Grid>
        </form>
      </div>
      
    </Container>
        </DialogContent>  
      </Dialog>

      {/* SuccessMessageDialog */}
      
      <Dialog
        open={SuccessMessageDialog}
        keepMounted
        onClose={()=> setSucessMessageDialog(false)}>
          <DialogTitle>
            
            <CheckCircleIcon 
            fontSize='inherit'
            htmlColor='green'
            />
            {' '}
            Item Added
          </DialogTitle>
          <DialogActions>
          <Button onClick={()=> {
            setSucessMessageDialog(false)
          }} color="primary">
            Add More
          </Button>
          <Button onClick={()=>{
            setSucessMessageDialog(false)
            handleClose()
          }} color="primary">
            Finish
          </Button>
        </DialogActions>

    </Dialog>
    </div>
  );
}


