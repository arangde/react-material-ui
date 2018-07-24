import React from "react";
import moment from 'moment';
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";

import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
// core components
import {
  warningColor,
  primaryColor,
  dangerColor,
  successColor,
  infoColor,
  roseColor,
  grayColor,
  defaultFont
} from "assets/jss/material-dashboard-react.jsx";

import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";

import { WITHDRAWAL_STATUS } from '../../constants';
import typographyStyle from "assets/jss/material-dashboard-react/components/typographyStyle.jsx";

const styles = theme => ({
  ...typographyStyle,
  warningTableHeader: {
    color: warningColor
  },
  primaryTableHeader: {
    color: primaryColor
  },
  dangerTableHeader: {
    color: dangerColor
  },
  successTableHeader: {
    color: successColor
  },
  infoTableHeader: {
    color: infoColor
  },
  roseTableHeader: {
    color: roseColor
  },
  grayTableHeader: {
    color: grayColor
  },
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
    ...defaultFont,
    fontSize: "1em"
  },
  tableCell: {
    ...defaultFont,
    lineHeight: "1.42857143",
    padding: "12px 8px",
    verticalAlign: "middle"
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
    color: primaryColor,
    boxShadow: "none"
  },
  close: {
    backgroundColor: "transparent",
    color: dangerColor,
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
  },
  tableCellText: {
    width: '25%'
  }
});

class MemberWithdrawals extends React.Component {
  constructor(props) {
    super(props)
    const tableHead = ["Requested Date", "Amount", "Status", "Accepted Date", "Rejected Date", "Reject Reason", "Note", ""]
    const tableHeaderColor = "primary"
    this.id = props.match.params.id

    this.state = {
      tableHead: tableHead,
      tableHeaderColor: tableHeaderColor,
      error: '',
    }
  }

  componentWillMount() {
    this.props.getWithdrawals(this.id)
  }

  handleProcess = (id) => {
    this.props.push(`/admin/withdrawals/${id}`)
  }

  render() {
    const { classes, withdrawals, member } = this.props
    const { tableHead, tableHeaderColor } = this.state

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
                  {tableHead !== undefined ? (
                    <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
                      <TableRow>
                        {tableHead.map((prop, key) => (
                          <TableCell
                            className={classes.tableCell + " " + classes.tableHeadCell}
                            key={key}
                          >
                            {prop}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                  ) : null}
                  <TableBody>
                    {withdrawals.map((withdrawal, i) => {
                      const requested_date = moment(withdrawal.created_at).format('MM/DD/YYYY')
                      const accepted_date = moment(withdrawal.accepted_date).format('MM/DD/YYYY')
                      const rejected_date = moment(withdrawal.rejected_date).format('MM/DD/YYYY')
                      const status = WITHDRAWAL_STATUS[withdrawal.status] ? WITHDRAWAL_STATUS[withdrawal.status] : ''
                      let statusClass = ''
                      if (status === 'accepted') {
                        statusClass = classes.successText
                      } else if (status === 'rejected') {
                        statusClass = classes.dangerText
                      }

                      return (
                        <TableRow key={i}>
                          <TableCell className={classes.tableCell}>
                            {requested_date}
                          </TableCell>
                          <TableCell className={classes.tableCell}>
                            {withdrawal.amount}
                          </TableCell>
                          <TableCell className={classes.tableCell}>
                            <span className={classes.status + ' ' + statusClass}>{status}</span>
                          </TableCell>
                          <TableCell className={classes.tableCell}>
                            {status === 'accepted' ? accepted_date : ''}
                          </TableCell>
                          <TableCell className={classes.tableCell}>
                            {status === 'rejected' ? rejected_date : ''}
                          </TableCell>
                          <TableCell className={classes.tableCell + ' ' + classes.tableCellText}>
                            {withdrawal.reject_reason}
                          </TableCell>
                          <TableCell className={classes.tableCell + ' ' + classes.tableCellText}>
                            {withdrawal.note}
                          </TableCell>
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
                  </TableBody>
                </Table>
              </div>
            </CardBody>
          </Card>
        </GridItem>
      </Grid>
    );
  }
}

export default withStyles(styles)(MemberWithdrawals);
