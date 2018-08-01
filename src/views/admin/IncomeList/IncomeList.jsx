import React from "react";
import PropTypes from 'prop-types';
import moment from 'moment';
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
// core components
import GridItem from "components/admin/Grid/GridItem.jsx";
import SortableTable from "components/admin/Table/SortableTable.jsx";
import Card from "components/admin/Card/Card.jsx";
import CardHeader from "components/admin/Card/CardHeader.jsx";
import CardBody from "components/admin/Card/CardBody.jsx";

import typographyStyle from "assets/jss/material-dashboard-react/components/typographyStyle.jsx";
import tableStyle from "assets/jss/material-dashboard-react/components/tableStyle.jsx";
import { INCOME_TYPES } from "../../../constants";

const styles = theme => ({
  ...tableStyle(theme),
  ...typographyStyle,
  type: {
    fontSize: '0.8em',
    textTransform: 'uppercase',
  }
});

class IncomeList extends React.Component {
  componentWillMount() {
    this.props.getIncomes()
  }

  render() {
    const { classes, incomes } = this.props

    return (
      <Grid container>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary" className={classes.cardTitle}>
              <h4 className={classes.cardTitleWhite}>Income List</h4>
            </CardHeader>
            <CardBody>
              <SortableTable
                tableHeaderColor="primary"
                tableHead={["Date", "Member", "Old Amount", "New Amount", "Next Period Date", "Type", "Note"]}
                tableDataTypes={["date", "string", "number", "number", "date", "string", "string"]}
                firstOrderBy='desc'
                tableData={incomes.map((income) => {
                  const type = INCOME_TYPES[income.type] ? INCOME_TYPES[income.type] : ''
                  let typeClass = classes.warningText
                  if (type === 'recommends') {
                    typeClass = classes.successText
                  } else if (type === 'withdrawal') {
                    typeClass = classes.dangerText
                  } else if (type === 'recurring') {
                    typeClass = classes.infoText
                  }
                  return [
                    moment(income.created_at).format('MM/DD/YYYY'),
                    income.member.name,
                    '$' + income.old_amount,
                    '$' + income.new_amount,
                    type === 'recurring' ? moment(income.next_period_date).format('MM/DD/YYYY') : '',
                    <span className={classes.type + ' ' + typeClass}><span>{type}</span></span>,
                    income.note,
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

IncomeList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(IncomeList);
