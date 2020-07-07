import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
export default function DateSelector() {

    const [selectedDateStart, setSelectedDateStart] = useState();
    const [selectedDateEnd, setSelectedDateEnd] = useState();


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
            onChange={e => setSelectedDateStart(e.value)}
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
            onChange={e => setSelectedDateEnd(e.value)}
            />
            </Grid>
            <Grid item>
             <Button size="large" variant="contained" color="primary">Search</Button>
            </Grid>
        </Grid>
  );
}