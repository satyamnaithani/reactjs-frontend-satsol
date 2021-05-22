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

export default function SideMenu(props) {
    const classes = useStyles();
    const [open] = React.useState(true);
    const menuItems = [
      { name: 'Dashboard', link: '/dashboard', icon: <DashboardIcon />},
      { name: 'Stock', link: '/stock', icon: <ShoppingCartIcon />},
      { name: 'Sales', link: '/sales', icon: <ShoppingCartIcon />},
      { name: 'Purchase', link: '/purchase', icon: <PeopleIcon />},
      { name: 'Vendors', link: '/vendors', icon: <PeopleIcon />},
      { name: 'Customers', link: '/customers', icon: <PeopleIcon />},
      { name: 'Item Master', link: '/item_master', icon: <BarChartIcon />}
    ];
    return (
	<Drawer variant="permanent" classes={{ paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose) }} open={open}>
		<div className={classes.toolbarIcon}><img src={logo} alt="Satvik Solutions" width="220" height="40"/></div>
		<strong className={classes.username}>{JSON.parse(localStorage.getItem('token')).name}</strong>
		<Divider />
		<List className={classes.drawerColor}>
			{menuItems.map((item, index) => (
				<NavLink to={item.link} style={{textDecoration: 'none', color: 'inherit'}}>
					<ListItem button>
						<ListItemIcon>{item.icon}</ListItemIcon>
						<ListItemText primary={item.name} />
					</ListItem>
				</NavLink>
			))}
		</List>
		<Divider />
		<List className={classes.drawerColor}>{secondaryListItems}</List>
	</Drawer>   
    )
}

const useStyles = makeStyles((theme) => ({
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
    paper: {
      padding: theme.spacing(2),
      display: 'flex',
      overflow: 'auto',
      flexDirection: 'column'
    },
    drawerColor: {
      background: '#fff'
    },
    username: {
      textAlign: 'center',
      letterSpacing: '3px',
      color: 'blue'
    }
  }));