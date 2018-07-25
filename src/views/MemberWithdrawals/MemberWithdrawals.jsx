import React from "react";
import moment from 'moment';
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import IconButton from "@material-ui/core/IconButton";

import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";

import PropTypes from 'prop-types';
import TablePagination from '@material-ui/core/TablePagination';
import TableSortLabel from '@material-ui/core/TableSortLabel';

// @material-ui/icons
import EditIcon from "@material-ui/icons/Edit";
// core components

import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";

import { WITHDRAWAL_STATUS } from '../../constants';
import typographyStyle from "assets/jss/material-dashboard-react/components/typographyStyle.jsx";

const styles = theme => ({
  ...typographyStyle,
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
  tableCellWide: {
    width: '25%'
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
  status: {
    fontSize: '0.8em',
    textTransform: 'uppercase',
  }
});

class MemberWithdrawals extends React.Component {
  constructor(props) {
    super(props)

    const tableHeaderColor = "primary"
    const tableHead = ["Requested Date", "Amount", "Status", "Accepted Date", "Rejected Date", "Reject Reason", "Note"]
    this.id = props.match.params.id

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
    this.props.getWithdrawals(this.id)
  }

  handleProcess = (id) => {
    this.props.push(`/admin/withdrawals/${id}`)
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
    const { classes, withdrawals, member } = this.props
    const { order, orderBy, rowsPerPage, page, tableHeaderColor, tableHead, editAndRemove } = this.state
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, withdrawals.length - page * rowsPerPage)

    return (
      <Grid container>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary" className={classes.cardTitle}>
              <h4 className={classes.cardTitleWhite}>
                {member ? member.name + '\'s Withdrawal List' : 'Withdrawal List'}
              </h4>
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
                        const status = WITHDRAWAL_STATUS[withdrawal.status] ? WITHDRAWAL_STATUS[withdrawal.status] : ''
                        let statusClass = ''
                        if (status === 'accepted') {
                          statusClass = classes.successText
                        } else if (status === 'rejected') {
                          statusClass = classes.dangerText
                        }
                        return (
                          <TableRow
                            hover
                            role="checkbox"
                            aria-checked={isSelected}
                            tabIndex={-1}
                            key={withdrawal.id}
                            selected={isSelected}
                          >
                            <TableCell className={classes.tableCell}>{moment(withdrawal.created_at).format('MM/DD/YYYY')}</TableCell>
                            <TableCell className={classes.tableCell}>{withdrawal.amount}</TableCell>
                            <TableCell className={classes.tableCell}>
                              <span className={classes.status + ' ' + statusClass}>{status}</span>
                            </TableCell>
                            <TableCell className={classes.tableCell}>
                              {status === 'accepted' ? moment(withdrawal.accepted_date).format('MM/DD/YYYY') : ''}
                            </TableCell>
                            <TableCell className={classes.tableCell}>
                              {status === 'rejected' ? moment(withdrawal.rejected_date).format('MM/DD/YYYY') : ''}
                            </TableCell>
                            <TableCell className={classes.tableCell + ' ' + classes.tableCellWide}>{withdrawal.reject_reason}</TableCell>
                            <TableCell className={classes.tableCell + ' ' + classes.tableCellWide}>{withdrawal.note}</TableCell>
                            <TableCell className={classes.tableActions}>
                              {status === 'requested' &&
                                <IconButton
                                  aria-label="Process"
                                  className={classes.tableActionButton}
                                  onClick={() => this.handleProcess(withdrawal.id)}
                                >
                                  <EditIcon
                                    className={classes.tableActionButtonIcon + " " + classes.edit}
                                  />
                                </IconButton>
                              }
                            </TableCell>
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

MemberWithdrawals.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MemberWithdrawals);
