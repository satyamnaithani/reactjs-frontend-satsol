import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import axios from 'axios'
import { saveAs } from 'file-saver';
import {url} from '../../../globalVariables';

//download pdf
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import GetAppIcon from '@material-ui/icons/GetApp';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';




const useStyles = makeStyles((theme) => ({
  root: {
    margin: 'auto',
  },
  cardHeader: {
    padding: theme.spacing(1, 2),
  },
  list: {
    width: 400,
    height: 460,
    backgroundColor: theme.palette.background.paper,
    overflow: 'auto',
  },
  button: {
    margin: theme.spacing(0.5, 0),
  },
  fab: {
    margin: theme.spacing(2),
  },
  absolute: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(3),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a, b) {
  return [...a, ...not(b, a)];
}

export default function InvoiceList() {
  const [checked, setChecked] = React.useState([]);
  const [left, setLeft] = React.useState([]);
  const [right, setRight] = React.useState([]);
  const [pdfIsLoading, setpdfIsLoading] = React.useState(false);
  useEffect(() => {
    axios({
      method: 'GET',

      url: url + '/orders'
    })
      .then(response => {
        const data = response.data.data
        const leftArr = [];
        for (var key in data) {
          if (data.hasOwnProperty(key)) {
            leftArr.push(data[key])
          }
        }
        console.log(leftArr)
        setLeft(leftArr)
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  const createAndDownloadPdf = () => {

    if(right.length === 0 ) {
      alert('Add Atleast one Item to make invoice');
    }

    else {

    let arr = right.slice(0);
    let arrSize = arr.length

    if(arr.length < 10) {
      for(var i = 0; i< 10-arrSize; i ++) {
        arr.push('')
      }
  console.log(arr)
    }  else {
      arr = arr.slice(0,11)
    } 

    setpdfIsLoading(true);
    axios.post(url +'/pdf/create-pdf', arr)
      .then(() => axios.get(url + '/pdf/fetch-pdf', { responseType: 'blob' }))
      .then((res) => {
        const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
        saveAs(pdfBlob, 'satyam.pdf');
        setpdfIsLoading(false);
        setRight([])
      })
      .catch(err => console.log(err))
  }}
  const classes = useStyles();
  console.log(right)

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);
  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const numberOfChecked = (items) => intersection(checked, items).length;

  const handleToggleAll = (items) => () => {
    if (numberOfChecked(items) === items.length) {
      setChecked(not(checked, items));
    } else {
      setChecked(union(checked, items));
    }
  };
  

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const customList = (title, items) => (
    <Card>
      <CardHeader
        className={classes.cardHeader}
        avatar={
          <Checkbox
            onClick={handleToggleAll(items)}
            checked={numberOfChecked(items) === items.length && items.length !== 0}
            indeterminate={numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0}
            disabled={items.length === 0}
            inputProps={{ 'aria-label': 'all items selected' }}
          />
        }
        title={title}
        subheader={`${numberOfChecked(items)}/${items.length} selected`}
      />
      <Divider />
      <List className={classes.list} dense component="div" role="list">
        {items.map((value) => {
          const labelId = `transfer-list-all-item-${value}-label`;

          return (
            <ListItem key={value._id} role="listitem" button onClick={handleToggle(value)}>
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              {/* <ListItemText id={labelId} primary={`List item ${value + 1}`} /> */}
              <ListItemText id={value._id} primary={`${value.item} ${value.quantity}${value.uom}`} secondary={value.customer} />
            </ListItem>
          );
        })}
      </List>
    </Card>
  );
  return (
    <Grid container spacing={2} justify="center" alignItems="center" className={classes.root}>
      <Grid item>{customList('Choices', left)}</Grid>
      <Grid item>
        <Grid container direction="column" alignItems="center">
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
            aria-label="move selected right"
          >
            &gt;
          </Button>
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0}
            aria-label="move selected left"
          >
            &lt;
          </Button>
        </Grid>
      </Grid>
      <Grid item>{customList('Chosen', right)}</Grid>
      <Grid>
        <Tooltip title="Generate and Download Invoice" aria-label="Download Invoice">
          <Fab color="secondary" className={classes.absolute} >
            <GetAppIcon onClick={createAndDownloadPdf} />
          </Fab>
        </Tooltip>
        <Backdrop className={classes.backdrop} open={pdfIsLoading}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </Grid>
    </Grid>
  );
}