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

class PointRedeemsSection extends React.Component {
  render() {
    const { classes, redeems } = this.props;
    return (
      <div className={classes.section}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={8}>
            <h2 className={classes.title}>Your Point Redeems</h2>
            <h5 className={classes.description}>
            </h5>
          </GridItem>
        </GridContainer>
        <div>
          <SortableTable
            tableHeaderColor="primary"
            tableHead={["Requested Date", "Point", "Status", "Accepted Date", "Rejected Date", "Reject Reason", "Note"]}
            tableDataTypes={["date", "string", "", "date", "date", "string", "string"]}
            firstOrderBy='desc'
            tableData={redeems.map((redeem) => {
              const status = WITHDRAWAL_STATUS[redeem.status] ? WITHDRAWAL_STATUS[redeem.status] : ''
              let statusClass = ''
              if (status === 'accepted') {
                statusClass = classes.successText
              } else if (status === 'rejected') {
                statusClass = classes.dangerText
              }
              return [
                moment(redeem.created_at).format('MM/DD/YYYY'),
                redeem.point,
                <span className={classes.status + ' ' + statusClass}><span>{status}</span></span>,
                status === 'accepted' ? moment(redeem.accepted_date).format('MM/DD/YYYY') : '',
                status === 'rejected' ? moment(redeem.rejected_date).format('MM/DD/YYYY') : '',
                redeem.reject_reason,
                redeem.note,
              ]
            })}
          />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(PointRedeemsSection);
