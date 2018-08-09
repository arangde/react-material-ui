import React from "react";
import moment from 'moment';
import PropTypes from 'prop-types';
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
// @material-ui/icons
import EditIcon from "@material-ui/icons/Edit";
import CloseIcon from "@material-ui/icons/Close";
import AddIcon from "@material-ui/icons/Add";
// core components
import GridItem from "components/admin/Grid/GridItem.jsx";
import SortableTable from "components/admin/Table/SortableTable.jsx";
import Card from "components/admin/Card/Card.jsx";
import CardHeader from "components/admin/Card/CardHeader.jsx";
import CardBody from "components/admin/Card/CardBody.jsx";

import cardStyle from "assets/jss/material-dashboard-react/components/cardStyle.jsx";
import tableStyle from "assets/jss/material-dashboard-react/components/tableStyle.jsx";
import buttonStyle from "assets/jss/material-dashboard-react/components/buttonStyle.jsx";
import { getMessage } from 'utils/helpers';

const styles = theme => ({
  ...tableStyle(theme),
  ...cardStyle,
  addButton: {
    ...buttonStyle.transparent
  }
});

class SaleList extends React.Component {
  componentWillMount() {
    this.props.getSales()
  }

  handleEdit(id) {
    this.props.push(`/admin/sales/${id}`)
  }

  handleAdd = () => {
    this.props.push(`/admin/sales/create`)
  }

  handleRemove(id) {
    if (window.confirm(getMessage('Are you sure to delete this sale?')))
      this.props.deleteSale(id)
  }

  render() {
    const { classes, sales } = this.props

    return (
      <Grid container>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary" className={classes.cardTitle}>
              <h4 className={classes.cardTitleWhite}>{getMessage('Sale List')}</h4>
              <Button variant="fab" mini aria-label="Add" className={classes.addButton} onClick={this.handleAdd}>
                <AddIcon />
              </Button>
            </CardHeader>
            <CardBody>
              <SortableTable
                tableHeaderColor="primary"
                tableHead={[getMessage('Date'), getMessage('Member'), getMessage('Product Name'), getMessage('Product Price'), getMessage('Note'), ""]}
                tableDataTypes={["date", "string", "string", "number", ""]}
                firstOrderBy='desc'
                tableData={sales.map((sale) => {
                  return [
                    moment(sale.created_at).format('MM/DD/YYYY'),
                    sale.member.name,
                    sale.product_name,
                    '¥' + sale.product_price,
                    sale.note,
                    <div>
                      <IconButton
                        aria-label="Edit"
                        className={classes.tableActionButton}
                        onClick={() => this.handleEdit(sale.id)}
                      >
                        <EditIcon
                          className={classes.tableActionButtonIcon + " " + classes.edit}
                        />
                      </IconButton>
                      <IconButton
                        aria-label="Close"
                        className={classes.tableActionButton}
                        onClick={() => this.handleRemove(sale.id)}
                      >
                        <CloseIcon
                          className={classes.tableActionButtonIcon + " " + classes.close}
                        />
                      </IconButton>
                    </div>
                  ]
                })}
                cellClassWidth={['15', '25', '20', '15', '15', '10']}
              />
            </CardBody>
          </Card>
        </GridItem>
      </Grid>
    );
  }
}

SaleList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SaleList);
