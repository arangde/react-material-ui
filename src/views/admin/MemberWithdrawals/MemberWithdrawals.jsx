import React from "react";
import moment from 'moment';
import PropTypes from 'prop-types';
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";

// @material-ui/icons
import EditIcon from "@material-ui/icons/Edit";

import GridItem from "components/admin/Grid/GridItem.jsx";
import Card from "components/admin/Card/Card.jsx";
import CardHeader from "components/admin/Card/CardHeader.jsx";
import CardBody from "components/admin/Card/CardBody.jsx";
import SortableTable from "components/admin/Table/SortableTable.jsx";

import cardStyle from "assets/jss/material-dashboard-react/components/cardStyle.jsx";
import tableStyle from "assets/jss/material-dashboard-react/components/tableStyle.jsx";
import typographyStyle from "assets/jss/material-dashboard-react/components/typographyStyle.jsx";

import { WITHDRAWAL_STATUS } from '../../../constants';

const styles = theme => ({
  ...tableStyle(theme),
  ...typographyStyle,
  ...cardStyle,
  status: {
    fontSize: '0.8em',
    textTransform: 'uppercase',
  }
});

class MemberWithdrawals extends React.Component {
  constructor(props) {
    super(props)

    this.id = props.match.params.id
  }

  componentWillMount() {
    this.props.getWithdrawals(this.id)
  }

  handleProcess = (id) => {
    this.props.push(`/admin/withdrawals/${id}`)
  }

  render() {
    const { classes, withdrawals, member } = this.props

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
              <SortableTable
                tableHeaderColor="primary"
                tableHead={["Requested Date", "Amount", "Status", "Accepted Date", "Rejected Date", "Reject Reason", "Note", ""]}
                tableDataTypes={["date", "number", "", "date", "date", "string", "string", ""]}
                firstOrderBy='desc'
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
                    '$' + withdrawal.amount,
                    <span className={classes.status + ' ' + statusClass}><span>{status}</span></span>,
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
      </Grid>
    );
  }
}

MemberWithdrawals.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MemberWithdrawals);
