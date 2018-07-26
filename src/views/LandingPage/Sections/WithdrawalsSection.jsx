import React from "react";
import moment from 'moment';
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import SortableTable from "components/admin/Table/SortableTable.jsx";

import productStyle from "assets/jss/material-kit-react/views/landingPageSections/productStyle.jsx";
import tableStyle from "assets/jss/material-dashboard-react/components/tableStyle.jsx";
import typographyStyle from "assets/jss/material-dashboard-react/components/typographyStyle.jsx";

import { WITHDRAWAL_STATUS } from '../../../constants';

const styles = theme => ({
  ...tableStyle(theme),
  ...typographyStyle,
  ...productStyle,
  status: {
    fontSize: '0.8em',
    textTransform: 'uppercase',
  }
});

class WithdrawalsSection extends React.Component {
  render() {
    const { classes, withdrawals } = this.props;
    return (
      <div className={classes.section}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={8}>
            <h2 className={classes.title}>Your Withdrawals</h2>
            <h5 className={classes.description}>
            </h5>
          </GridItem>
        </GridContainer>
        <div>
          <SortableTable
            tableHeaderColor="primary"
            tableHead={["Requested Date", "Amount", "Status", "Accepted Date", "Rejected Date", "Reject Reason", "Note"]}
            tableDataTypes={["date", "number", "", "date", "date", "string", "string"]}
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
              ]
            })}
          />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(WithdrawalsSection);
