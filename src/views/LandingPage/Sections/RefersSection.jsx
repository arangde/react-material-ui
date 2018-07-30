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

const styles = theme => ({
  ...tableStyle(theme),
  ...productStyle,
});

class RefersSection extends React.Component {
  render() {
    const { classes, referers } = this.props;
    return (
      <div className={classes.section}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={8}>
            <h2 className={classes.title}>Who are recommended by You</h2>
            <h5 className={classes.description}>
            </h5>
          </GridItem>
        </GridContainer>
        <div>
          <SortableTable
            tableHeaderColor="primary"
            tableHead={["Created Date", "Name", "Email", "Phone Number", "Card Number", "Entry Date", "Balance", "Point", "Next Period Date", "Updated Date"]}
            tableDataTypes={["date", "string", "string", "string", "string", "date", "number", "string", "date", "date"]}
            firstOrderBy='desc'
            tableData={referers.map((referer) => {
              return [
                moment(referer.member.created_at).format('MM/DD/YYYY'),
                referer.member.name,
                referer.member.email,
                referer.member.phone_number,
                referer.member.card_number,
                moment(referer.member.entry_date).format('MM/DD/YYYY'),
                '$' + referer.member.balance,
                referer.member.point,
                moment(referer.member.next_period_date).format('MM/DD/YYYY'),
                moment(referer.member.updated_date).format('MM/DD/YYYY'),
              ]
            })}
          />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(RefersSection);
