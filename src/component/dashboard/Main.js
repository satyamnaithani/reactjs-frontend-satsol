import React, { lazy, Suspense } from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
const SalesChart = lazy(()=>import('./SalesChart'))
const Orders = lazy(()=>import('./Orders'))
const Stock = lazy(()=>import('./Stock'))
const Deposits = lazy(()=>import('./Deposits'))
const Sales = lazy(()=>import('./Sales'))
const Chart = lazy(()=>import('./Chart'))
const SalesChartLastMonth = lazy(()=>import('./SalesChartLastMonth'))
const Purchase = lazy(()=>import('./Purchase'))
const LastMonthSale = lazy(()=>import('./LastMonthSale'))
const Expenses = lazy(()=>import('./Expenses'))
const Profits = lazy(()=>import('./Profits'))
const SalesQuarterly = lazy(()=>import('./SalesQuarterly'))
const ExpensesChart = lazy(()=>import('./ExpensesChart'))




function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://satsolindia.com/">
        Satvik Solutions
        </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function Main() {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const fixedHeightPaperBarChart = clsx(classes.paper, classes.fixedHeightBarChart);
  return (
    <Suspense fallback={<div/>}>
    <div className={classes.root}>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {/* Chart */}
            <Grid item xs={12} md={8} lg={9}>
              <Paper className={fixedHeightPaper}>
              <Suspense fallback={<div style={{minWidth: '80vh'}}/>}>
                <SalesChart />
                </Suspense>
              </Paper>
            </Grid>
            {/* Recent Deposits */}
            
            <Grid item xs={12} md={4} lg={3}>
              <Paper className={fixedHeightPaper}>
              <Suspense fallback={<div/>}>
                <Sales />
                </Suspense>
              </Paper>
            </Grid>
            <Grid item xs={12} md={8} lg={9}>
              <Paper className={fixedHeightPaper}>
              <Suspense fallback={<div/>}>
                <SalesChartLastMonth />
                </Suspense>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4} lg={3}>
              <Paper className={fixedHeightPaper}>
              <Suspense fallback={<div/>}>
                <LastMonthSale/>
                </Suspense>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <Paper className={fixedHeightPaper}>
              <Suspense fallback={<div/>}>
                <Deposits />
                </Suspense>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <Paper className={fixedHeightPaper}>
              <Suspense fallback={<div/>}>
                <Purchase />
              </Suspense>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <Paper className={fixedHeightPaper}>
              <Suspense fallback={<div/>}>
                <SalesQuarterly />
              </Suspense>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <Paper className={fixedHeightPaper}>
              <Suspense fallback={<div/>}>
                <ExpensesChart />
              </Suspense>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <Paper className={fixedHeightPaper}>
              <Suspense fallback={<div/>}>
                <Expenses/>
                </Suspense>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <Paper className={fixedHeightPaper}>
              <Suspense fallback={<div/>}>
                <Profits />
              </Suspense>
              </Paper>
            </Grid>
            {/* Stock */}
            <Grid item xs={12} md={12} lg={12}>
              <Paper className={classes.paper} style={{overflowY: 'hidden'}}>
              <Suspense fallback={<div/>}>
                <Stock />
              </Suspense>
              </Paper>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <Paper className={fixedHeightPaperBarChart}>
              <Suspense fallback={<div/>}>
                <Chart />
              </Suspense>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
              <Suspense fallback={<div/>}>
                <Orders />
              </Suspense>
              </Paper>
            </Grid>
          </Grid>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
    </Suspense>
  )
}
const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
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
    ///overflowX: 'hidden',
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
    //height: '100vh',
    //overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
  fixedHeightBarChart: {
    height: 400,
  }
}));
