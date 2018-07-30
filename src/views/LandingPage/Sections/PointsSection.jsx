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

class PointsSection extends React.Component {
  render() {
    const { classes, points } = this.props;
    return (
      <div className={classes.section}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={8}>
            <h2 className={classes.title}>Your Points History</h2>
            <h5 className={classes.description}>
            </h5>
          </GridItem>
        </GridContainer>
        <div>
          <SortableTable
            tableHeaderColor="primary"
            tableHead={["Created Date", "Old Point", "New Point", "Note", "Updated Date"]}
            tableDataTypes={["date", "number", "number", "string", "date"]}
            firstOrderBy='desc'
            tableData={points.map((point) => {
              return [
                moment(point.created_at).format('MM/DD/YYYY'),
                point.old_point,
                point.new_point,
                point.note,
                moment(point.updated_at).format('MM/DD/YYYY'),
              ]
            })}
          />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(PointsSection);
