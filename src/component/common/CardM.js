import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
// import CardMedia from '@material-ui/core/CardMedia';
// import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
// import IconButton from '@material-ui/core/IconButton';
// import MoreVertIcon from '@material-ui/icons/MoreVert';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import IconButton from '@material-ui/core/IconButton';
import Skeleton from '@material-ui/lab/Skeleton';

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 345,
    margin: theme.spacing(2),
  },
  media: {
    height: 190,
  },
}));


export default function Media(props) {
  const { loading = false } = props;
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardHeader
        action={
          loading ? null : (
            props.actionButton === 'add'? <IconButton aria-label="settings">
            <AddCircleIcon/>
          </IconButton>: null
          )
        }
        title={
          loading ? (
            <Skeleton animation="wave" height={10} width="80%" style={{ marginBottom: 6 }} />
          ) : (
            props.title
          )
        }
        subheader={loading ? <Skeleton animation="wave" height={10} width="40%" /> : props.subheader}
      />
      <CardContent>
        {loading ? (
          <React.Fragment>
            <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
            <Skeleton animation="wave" height={10} width="80%" />
          </React.Fragment>
        ) : (
            <>
          <Typography variant="body2" color="textSecondary" component="p">
            {
              props.content1
            }
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          {
            props.content2
          }
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {
            props.content3
          }
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {
            props.content4
          }
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {
            props.content5
          }
        </Typography>
        </>
        )}
      </CardContent>
    </Card>
  );
}

Media.propTypes = {
  loading: PropTypes.bool,
};
