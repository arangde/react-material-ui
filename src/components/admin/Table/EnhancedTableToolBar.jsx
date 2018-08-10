import React from "react";
import classNames from 'classnames';
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit,
    backgroundColor: "#f55a4e",
  },
  highlight:
    theme.palette.type === 'light'
      ? {
        color: "#fff",
        fontSize: "17px",
        backgroundColor: "#4caf50",
        textTransform: "uppercase",
      }
      : {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.secondary.dark,
      },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
    textTransform: "uppercase",
    '& h2': {
      color: "#fff",
      fontSize: "17px",
    }
  },
});

class EnhancedTableToolBar extends React.Component {

  render() {
    const { numSelected, classes, unSelected, checkedIds } = this.props;
    console.log(checkedIds)
    return (
      <Toolbar
        className={classNames(classes.root, {
          [classes.highlight]: numSelected > 0,
        })}
      >
        <div className={classes.title}>
          {numSelected > 0 ? (
            <Typography color="inherit" variant="subheading">
              {numSelected} selected
          </Typography>
          ) : (
              <Typography variant="title" id="tableTitle">
                new {unSelected} messages
              </Typography>
            )}
        </div>
        <div className={classes.spacer} />
        <div className={classes.actions}>
          {numSelected > 0 ? (
            <IconButton aria-label="Delete">
              <DeleteIcon />
            </IconButton>
          ) : null}
        </div>
      </Toolbar>
    );
  }
}

EnhancedTableToolBar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  unSelected: PropTypes.number.isRequired,
  checkedIds: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default withStyles(toolbarStyles)(EnhancedTableToolBar);
