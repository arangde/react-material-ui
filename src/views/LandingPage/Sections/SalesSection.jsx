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

class SalesSection extends React.Component {
  render() {
    const { classes, sales } = this.props;
    return (
      <div className={classes.section}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={8}>
            <h2 className={classes.title}>Your Sales</h2>
            <h5 className={classes.description}>
            </h5>
          </GridItem>
        </GridContainer>
        <div>
          <SortableTable
            tableHeaderColor="primary"
            tableHead={["Date", "Product Name", "Product Price"]}
            tableDataTypes={["date", "string", "string"]}
            firstOrderBy='desc'
            tableData={sales.map((sale) => {
              return [
                moment(sale.created_at).format('MM/DD/YYYY'),
                sale.product_name,
                '$' + sale.product_price,
              ]
            })}
          />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(SalesSection);
