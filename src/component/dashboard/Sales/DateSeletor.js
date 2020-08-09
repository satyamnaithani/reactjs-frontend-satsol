import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import  Button  from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton'
import ResetIcon from '@material-ui/icons/RotateLeft';
export default function DateSelector(props) {

    const [selectedDateStart, setSelectedDateStart] = useState('');
    const [selectedDateEnd, setSelectedDateEnd] = useState('');

    const handleSubmit = () => {
        if(selectedDateStart === '' || selectedDateEnd === ''){
            alert('Enter Date First!')
        }
        else{
            props.dateSelector(selectedDateStart, selectedDateEnd)
        }
       
      }
    return (
        <Grid container justify="center" spacing='5'>
            <Grid item >
                
            <TextField
                id="date"
                label="Satrt Date"
                type="date"
                variant='outlined'
                size='medium'
                InputLabelProps={{
                    shrink: true,
                }}
                value={selectedDateStart}
            onChange={e => setSelectedDateStart(e.target.value)}
            />
            </Grid>
            <Grid item>
             <TextField
                id="date"
                label="End Date"
                type="date"
                variant='outlined'
                size='medium'
                InputLabelProps={{
                    shrink: true,
                }}
                value={selectedDateEnd}
            onChange={e => setSelectedDateEnd(e.target.value)}
            />
            </Grid>
            <Grid item>
             <Button size="large" variant="contained" color="primary" onClick={handleSubmit}>Search</Button>
            </Grid>
            <Grid item>
            <IconButton>
            <ResetIcon onClick={()=>{
                setSelectedDateStart('')
                setSelectedDateEnd('')
                props.handleReset()}
                } />
            </IconButton>
            </Grid>
        </Grid>
  );
  
}