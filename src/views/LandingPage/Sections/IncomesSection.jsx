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

class IncomesSection extends React.Component {
  render() {
    const { classes, incomes } = this.props;
    return (
      <div className={classes.section}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={8}>
            <h2 className={classes.title}>Your Incomes History</h2>
            <h5 className={classes.description}>
              This is the paragraph where you can write more details about your
              product. Keep you user engaged by providing meaningful
              information. Remember that by this time, the user is curious,
              otherwise he wouldn't scroll to get here. Add a button if you want
              the user to see more.
            </h5>
          </GridItem>
        </GridContainer>
        <div>
          <SortableTable
            tableHeaderColor="primary"
            tableHead={["Updated Date", "Previous Amount", "Recurring Amount", "Refers Amount", "Other Amount", "Current Amount", "Next Period Date", "Type", "Note"]}
            tableDataTypes={["date", "number", "number", "number", "number", "number", "date", "object", "string"]}
            firstOrderBy='desc'
            tableData={incomes.map((income) => {
              return [
                moment(income.created_at).format('MM/DD/YYYY'),
                '$' + income.old_amount,
                '$' + income.recurring_amount,
                '$' + income.refers_amount,
                '$' + income.direct_amount,
                '$' + income.new_amount,
                moment(income.next_period_date).format('MM/DD/YYYY'),
                income.type,
                income.note
              ]
            })}
          />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(IncomesSection);
