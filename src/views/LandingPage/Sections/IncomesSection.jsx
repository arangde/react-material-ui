import React from "react";
import moment from 'moment';
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import SortableTable from "components/admin/Table/SortableTable.jsx";

import productStyle from "assets/jss/material-kit-react/views/landingPageSections/productStyle.jsx";
import typographyStyle from "assets/jss/material-dashboard-react/components/typographyStyle.jsx";
import RowModal from "components/Alert/RowModal.jsx"

import { INCOME_TYPES } from "../../../constants"

const styles = theme => ({
  ...typographyStyle,
  ...productStyle,
  type: {
    fontSize: '0.8em',
    textTransform: 'uppercase',
  }
});

class IncomesSection extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      headData: [],
      data: [],
      open: false,
    }
  }

  rowDetailModal = (rowData, tableHead) => {
    this.setState({ data: rowData, headData: tableHead })
    this.setState({ open: true });
  }

  handleClose = () => {
    this.setState({ open: false });
  }

  render() {
    const { classes, incomes } = this.props;
    return (
      <div className={classes.section}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={8}>
            <h2 className={classes.title}>Your Incomes History</h2>
            <h5 className={classes.description}>
            </h5>
          </GridItem>
        </GridContainer>
        <div>
          <SortableTable
            tableHeaderColor="primary"
            tableHead={["Date", "Previous Amount", "Current Amount", "Next Period Date", "Type", "Note"]}
            tableDataTypes={["date", "number", "number", "date", "object", "string"]}
            firstOrderBy='desc'
            tableData={incomes.map((income) => {
              const type = INCOME_TYPES[income.type] ? INCOME_TYPES[income.type] : ''
              let typeClass = classes.infoText
              if (type === 'recommends') {
                typeClass = classes.successText
              } else if (type === 'withdrawal') {
                typeClass = classes.warningText
              }
              return [
                moment(income.created_at).format('MM/DD/YYYY'),
                '$' + income.old_amount,
                '$' + income.new_amount,
                type === 'recurring' ? moment(income.next_period_date).format('MM/DD/YYYY') : "",
                <span className={classes.type + ' ' + typeClass}><span>{type}</span></span>,
                income.note,
              ]
            })}
            rowDetail={this.rowDetailModal}
            cellClassWidth={['11', '16', '16', '16', '11', '30']}
          />
          <RowModal
            rowData={this.state.data}
            headData={this.state.headData}
            open={this.state.open}
            onClose={this.handleClose}
          />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(IncomesSection);
