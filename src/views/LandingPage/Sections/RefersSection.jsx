import React from "react";
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
            tableHead={["Name", "Email", "Phone Number"]}
            tableDataTypes={["date", "string", "string"]}
            firstOrderBy='desc'
            tableData={referers.map((referer) => {
              return [
                referer.member.name,
                referer.member.email,
                referer.member.phone_number,
              ]
            })}
          />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(RefersSection);
