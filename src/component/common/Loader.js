import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import Grid from '@material-ui/core/Grid';



export default function Variants() {
    //const data = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
    const data = [0, 1, 2, 3]
    return (
        <><br/>
            {
                data.map((data, index) => (
                    <Grid item container xs={12} key= {index}>
                        {/* <Skeleton variant="circle" width={40} height={40} animation="wave" /> */}
                        <Skeleton variant="rect" width={345} height={250} animation="wave" /><br/>
                    </Grid>
                ))
            }
        </>
    );
}