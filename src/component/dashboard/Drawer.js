import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import { secondaryListItems } from './listItems';
import {NavLink} from 'react-router-dom'
import logo from './logo.png'

// ListItems
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';



const drawerWidth = 240;

export default function Headers(props) {
    const classes = useStyles();
    const [open] = React.useState(true);

  

    return (
      
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose)
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <img src={logo} alt="Satvik Solutions" width="220" height="40"/>
        </div>
        <Divider />
        <List className={classes.drawerColor}>
       <NavLink to='/dashboard' style={{textDecoration: 'none', color: 'inherit'}}>
        <ListItem button>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>
       </NavLink>
       <NavLink to='/stock' style={{textDecoration: 'none', color: 'inherit'}}>
    <ListItem button>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Stock" />
    </ListItem>
      </NavLink>
      <NavLink to='/sales' style={{textDecoration: 'none', color: 'inherit'}}>
    <ListItem button>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Sales" />
    </ListItem>
      </NavLink>
    <NavLink to='/vendors' style={{textDecoration: 'none', color: 'inherit'}}>
    <ListItem button>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Vendors" />
    </ListItem>
      </NavLink>
      <NavLink to='/expenses' style={{textDecoration: 'none', color: 'inherit'}}>
    <ListItem button>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Expenses" />
    </ListItem>
      </NavLink>
    <NavLink to='/customers' style={{textDecoration: 'none', color: 'inherit'}}> 
    <ListItem button>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Customers" />
    </ListItem>
      </NavLink>
    <NavLink to='/item_master' style={{textDecoration: 'none', color: 'inherit'}}>
    <ListItem button>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Item Master" />
    </ListItem>
      </NavLink>
        </List>
        <Divider />
        <List className={classes.drawerColor}>{secondaryListItems}</List>
      </Drawer>
        
    )

}













const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex'
      //background: 'linear-gradient(180deg, rgba(222,225,230,1) 0%, rgba(218,220,224,1) 12%, rgba(26,26,26,1) 12%, rgba(61,72,108,1) 92%, rgba(8,12,17,1) 100%);'
    },
    toolbar: {
      paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
      display: 'flex',
      alignItems: 'center',
      textAlign: 'center',
      padding: '0 8px',
      ...theme.mixins.toolbar,
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 36,
    },
    menuButtonHidden: {
      display: 'none',
    },
    title: {
      flexGrow: 1,
    },
    drawerPaper: {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerPaperClose: {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9),
      },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      height: '100vh',
      overflow: 'auto',
    },
    container: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
    },
    paper: {
      padding: theme.spacing(2),
      display: 'flex',
      overflow: 'auto',
      flexDirection: 'column'
    },
    fixedHeight: {
      height: 240,
    },
    drawerColor: {
      background: '#fff'
    }
  }));