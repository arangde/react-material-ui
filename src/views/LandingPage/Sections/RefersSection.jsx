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
    console.log(referers)
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
            tableHead={["Name", "Member ID", "Phone Number", "Card Number", "Entry Date", "Point", "Balance", "Next Period Date"]}
            tableDataTypes={["string", "string", "string", "string", "date", "string", "number", "date"]}
            firstOrderBy='desc'
            tableData={referers.map((referer) => {
              return [
                referer.member.name,
                referer.member.username,
                referer.member.phone_number,
                referer.member.card_number,
                moment(referer.member.entry_date).format('MM/DD/YYYY'),
                referer.member.point,
                '$' + referer.member.balance,
                referer.member.next_period_date !== "0000-00-00 00:00:00" ? moment(referer.member.next_period_date).format('MM/DD/YYYY') : "",
              ]
            })}
          />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(RefersSection);
