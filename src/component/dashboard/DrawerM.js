import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import FavoriteIcon from '@material-ui/icons/Favorite';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import StockIcon from '@material-ui/icons/StoreMallDirectory';
import {Link} from 'react-router-dom'
const useStyles = makeStyles({
    root: {
        position: 'fixed',
        bottom: 0,
        width: '100%',
        left: 0,
        right: 0
    },
});

export default function SimpleBottomNavigation(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState(props.value);
    return (
        <BottomNavigation
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue)
            }}
            showLabels
            className={classes.root}
        >
            <BottomNavigationAction label="Dashboard" icon={<Link to='/dashboard' style={{textDecoration: 'none',color: 'inherit'}}><DashboardIcon /></Link>} />
            <BottomNavigationAction label="Stock" icon={<Link to='/stock' style={{textDecoration: 'none',color: 'inherit'}}><StockIcon /></Link>} />
            <BottomNavigationAction label="Sales" icon={<Link to='/sales' style={{textDecoration: 'none',color: 'inherit'}}><ShoppingCartIcon /></Link>} />
            <BottomNavigationAction label="Vendors" icon={<Link to='/vendors' style={{textDecoration: 'none',color: 'inherit'}}><FavoriteIcon /></Link>} />
          
        </BottomNavigation>
    );
}
