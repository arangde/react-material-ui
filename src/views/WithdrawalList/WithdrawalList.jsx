import React from "react";
import moment from 'moment';
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
// core components
import GridItem from "components/Grid/GridItem.jsx";

import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";

import PropTypes from 'prop-types';
import TablePagination from '@material-ui/core/TablePagination';
import TableSortLabel from '@material-ui/core/TableSortLabel';

// @material-ui/icons
import EditIcon from "@material-ui/icons/Edit";
import CloseIcon from "@material-ui/icons/Close";
import AddIcon from "@material-ui/icons/Add";
// core components
import buttonStyle from "assets/jss/material-dashboard-react/components/buttonStyle.jsx";

import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";

const styles = theme => ({
  table: {
    marginBottom: "0",
    width: "100%",
    maxWidth: "100%",
    backgroundColor: "transparent",
    borderSpacing: "0",
    borderCollapse: "collapse"
  },
  tableHeadCell: {
    color: "inherit",
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: "300",
    lineHeight: "1.5em",
    fontSize: "1em",
  },
  tableCell: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: "300",
    lineHeight: "1.42857143",
    padding: "12px 8px",
    verticalAlign: "middle"
  },
  tableSortlabel: {
    color: "#9c27b0",
    '&:hover, &:focus': {
      color: "#9c27b0",
    }
  },
  tableResponsive: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  tableActions: {
    textAlign: "right"
  },
  tableActionButton: {
    width: "27px",
    height: "27px"
  },
  tableActionButtonIcon: {
    width: "17px",
    height: "17px"
  },
  edit: {
    backgroundColor: "transparent",
    color: "#9c27b0",
    boxShadow: "none"
  },
  close: {
    backgroundColor: "transparent",
    color: "#f44336",
    boxShadow: "none"
  },
  cardTitle: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  },
  addButton: {
    ...buttonStyle.transparent
  }
});


class WithdrawalList extends React.Component {
  constructor(props) {
    super(props)
    const tableHeaderColor = "primary"
    const tableHead = ["Amount", "Accepted Date", "Rejected Date", "Status", "Note", "Reject Reason"]

    this.state = {
      tableHead: tableHead,
      tableHeaderColor: tableHeaderColor,
      order: 'asc',
      orderBy: tableHead[0].toLowerCase().split(" ").join("_"),
      selected: [],
      editAndRemove: true,
      page: 0,
      rowsPerPage: 10,
      error: '',
    }
  }


  componentWillMount() {
    this.props.getWithdrawalList()
  }

  handleEdit(id) {
    this.props.push(`/admin/withdrawals/${id}`)
  }

  handleAdd = () => {
    this.props.push(`/admin/withdrawals/create`)
  }

  handleRemove(id) {

  }

  getSorting = (order, orderBy) => {
    return order === 'desc'
      ? (a, b) => (b[orderBy] < a[orderBy] ? -1 : 1)
      : (a, b) => (a[orderBy] < b[orderBy] ? -1 : 1)
  }

  handleRequestSort = property => event => {
    const orderBy = property
    let order = 'desc'

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc'
    }

    this.setState({ order, orderBy })
  };

  handleChangePage = (event, page) => {
    this.setState({ page })
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value })
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1

  render() {
    const { classes, withdrawals } = this.props
    const { order, orderBy, rowsPerPage, page, tableHeaderColor, tableHead, editAndRemove } = this.state
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, withdrawals.length - page * rowsPerPage)

    return (
      <Grid container>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary" className={classes.cardTitle}>
              <h4 className={classes.cardTitleWhite}>Withdrawal List</h4>
              <Button variant="fab" mini aria-label="Add" className={classes.addButton} onClick={this.handleAdd}>
                <AddIcon />
              </Button>
            </CardHeader>
            <CardBody>
              <div className={classes.tableResponsive}>
                <Table className={classes.table}>
                  <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
                    <TableRow>
                      {tableHead.map(columnTitle => {
                        let orderKey = columnTitle.toLowerCase().split(" ").join("_")
                        return (
                          <TableCell
                            key={orderKey}
                            className={classes.tableCell + " " + classes.tableHeadCell}
                            sortDirection={orderBy === orderKey ? order : false}
                          >
                            <TableSortLabel
                              active={orderBy === orderKey}
                              direction={order}
                              onClick={this.handleRequestSort(orderKey)}
                              className={classes.tableSortlabel}
                            >
                              {columnTitle}
                            </TableSortLabel>
                          </TableCell>
                        );
                      }, this)}
                      {editAndRemove ? (
                        <TableCell
                          className={classes.tableCell + " " + classes.tableHeadCell}
                        >
                        </TableCell>
                      ) : null}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {withdrawals.sort(this.getSorting(order, orderBy))
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map(withdrawal => {
                        const isSelected = this.isSelected(withdrawal.id);
                        return (
                          <TableRow
                            hover
                            role="checkbox"
                            aria-checked={isSelected}
                            tabIndex={-1}
                            key={withdrawal.id}
                            selected={isSelected}
                          >
                            <TableCell className={classes.tableCell}>{withdrawal.amount}</TableCell>
                            <TableCell className={classes.tableCell}>{moment(withdrawal.accepted_date).format('MM/DD/YYYY')}</TableCell>
                            <TableCell className={classes.tableCell}>{moment(withdrawal.rejected_date).format('MM/DD/YYYY')}</TableCell>
                            <TableCell className={classes.tableCell}>{withdrawal.status}</TableCell>
                            <TableCell className={classes.tableCell}>{withdrawal.note}</TableCell>
                            <TableCell className={classes.tableCell}>{withdrawal.reject_reason}</TableCell>
                            {editAndRemove ? (
                              <TableCell className={classes.tableActions}>
                                <IconButton
                                  aria-label="Edit"
                                  className={classes.tableActionButton}
                                  onClick={() => this.handleEdit(withdrawal.id)}
                                >
                                  <EditIcon
                                    className={classes.tableActionButtonIcon + " " + classes.edit}
                                  />
                                </IconButton>
                                <IconButton
                                  aria-label="Close"
                                  className={classes.tableActionButton}
                                  onClick={() => this.handleRemove(withdrawal.id)}
                                >
                                  <CloseIcon
                                    className={classes.tableActionButtonIcon + " " + classes.close}
                                  />
                                </IconButton>
                              </TableCell>
                            ) : null}
                          </TableRow>
                        );
                      })}
                    {emptyRows > 0 && (
                      <TableRow style={{ height: 49 * emptyRows }}>
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
              <TablePagination
                component="div"
                count={withdrawals.length}
                rowsPerPage={rowsPerPage}
                page={page}
                backIconButtonProps={{
                  'aria-label': 'Previous Page',
                }}
                nextIconButtonProps={{
                  'aria-label': 'Next Page',
                }}
                onChangePage={this.handleChangePage}
                onChangeRowsPerPage={this.handleChangeRowsPerPage}
              />
            </CardBody>
          </Card>
        </GridItem>
      </Grid>
    );
  }
}

WithdrawalList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(WithdrawalList);
