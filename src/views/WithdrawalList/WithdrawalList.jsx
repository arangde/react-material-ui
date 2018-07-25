import React from "react";
import moment from 'moment';
import PropTypes from 'prop-types';
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
// @material-ui/icons
import EditIcon from "@material-ui/icons/Edit";

import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import SortableTable from "components/Table/SortableTable.jsx";

import { WITHDRAWAL_STATUS } from '../../constants';
import typographyStyle from "assets/jss/material-dashboard-react/components/typographyStyle.jsx";

const styles = theme => ({
  ...typographyStyle,
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

class WithdrawalList extends React.Component {
  constructor(props) {
    super(props)
    const tableHeaderColor = "primary"
    const tableHead = ["Requested Date", "Member", "Amount", "Status", "Accepted Date", "Rejected Date", "Reject Reason", "Note"]

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
            </CardHeader>
            <CardBody>
              <SortableTable
                tableHeaderColor="primary"
                tableHead={["Requested Date", "Member", "Amount", "Status", "Accepted Date", "Rejected Date", "Reject Reason", "Note", ""]}
                tableData={withdrawals.map((withdrawal) => {
                  const status = WITHDRAWAL_STATUS[withdrawal.status] ? WITHDRAWAL_STATUS[withdrawal.status] : ''
                  let statusClass = ''
                  if (status === 'accepted') {
                    statusClass = classes.successText
                  } else if (status === 'rejected') {
                    statusClass = classes.dangerText
                  }
                  return [
                    moment(withdrawal.created_at).format('MM/DD/YYYY'),
                    withdrawal.member.name,
                    '$' + withdrawal.amount,
                    <span className={classes.status + ' ' + statusClass}>{status}</span>,
                    status === 'accepted' ? moment(withdrawal.accepted_date).format('MM/DD/YYYY') : '',
                    status === 'rejected' ? moment(withdrawal.rejected_date).format('MM/DD/YYYY') : '',
                    withdrawal.reject_reason,
                    withdrawal.note,
                    status === 'requested' ?
                      <IconButton
                        aria-label="Process"
                        className={classes.tableActionButton}
                        onClick={() => this.handleProcess(withdrawal.id)}
                      >
                        <EditIcon
                          className={classes.tableActionButtonIcon + " " + classes.edit}
                        />
                      </IconButton>
                      : ''
                  ]
                })}
              />
            </CardBody>
          </Card>
        </GridItem>
      </Grid >
    );
  }
}

WithdrawalList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(WithdrawalList);
