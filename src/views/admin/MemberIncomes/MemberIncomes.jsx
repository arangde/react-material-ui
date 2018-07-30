import React from "react";
import moment from 'moment';
import PropTypes from 'prop-types';
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
// core components
import GridItem from "components/admin/Grid/GridItem.jsx";
import SortableTable from "components/admin/Table/SortableTable.jsx";
import Card from "components/admin/Card/Card.jsx";
import CardHeader from "components/admin/Card/CardHeader.jsx";
import CardBody from "components/admin/Card/CardBody.jsx";

import cardStyle from "assets/jss/material-dashboard-react/components/cardStyle.jsx";
import tableStyle from "assets/jss/material-dashboard-react/components/tableStyle.jsx";
import { INCOME_TYPES } from "../../../constants";

const styles = theme => ({
  ...tableStyle(theme),
  ...cardStyle,
});

class MemberIncomes extends React.Component {
  constructor(props) {
    super(props)

    this.id = props.match.params.id
  }

  componentWillMount() {
    this.props.getMemberIncomes(this.id)
  }

  render() {
    const { classes, incomes, member } = this.props

    return (
      <Grid container>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary" className={classes.cardTitle}>
              <h4 className={classes.cardTitleWhite}>
                {member ? member.name + '\'s Incoming History' : 'Incoming History'}
              </h4>
            </CardHeader>
            <CardBody>
              <SortableTable
                tableHeaderColor="primary"
                tableHead={["Date", "Previous Amount", "Recurring Amount", "Refers Amount", "Other Amount", "Current Amount", "Next Period Date", "Type", "Note"]}
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
                    INCOME_TYPES[income.type],
                    income.note,
                  ]
                })}
              />
            </CardBody>
          </Card >
        </GridItem >
      </Grid >
    );
  }
}

MemberIncomes.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MemberIncomes);
