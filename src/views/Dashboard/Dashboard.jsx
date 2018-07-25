import React from "react";
import moment from "moment";
import PropTypes from "prop-types";
// react plugin for creating charts
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
// @material-ui/icons
import ContentCopy from "@material-ui/icons/ContentCopy";
import Store from "@material-ui/icons/Store";
import InfoOutline from "@material-ui/icons/InfoOutline";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import Accessibility from "@material-ui/icons/Accessibility";

// core components
import GridItem from "components/Grid/GridItem.jsx";
import Table from "components/Table/Table.jsx";
import SortableTable from "components/Table/SortableTable.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

class Dashboard extends React.Component {
  componentWillMount() {
    this.props.getDashboardData();
  }

  handleRedirect(url) {
    this.props.push(url)
  }

  render() {
    const { classes, dashboard } = this.props;

    return dashboard && (
      <div>
        <Grid container>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="warning" stats icon>
                <CardIcon color="warning">
                  <ContentCopy />
                </CardIcon>
                <p className={classes.cardCategory}>Total Members</p>
                <h3 className={classes.cardTitle}>{dashboard.totalMembers}</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <a onClick={() => this.handleRedirect('/admin/members')}>
                    view all members
                  </a>
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="success" stats icon>
                <CardIcon color="success">
                  <Store />
                </CardIcon>
                <p className={classes.cardCategory}>Total Profits</p>
                <h3 className={classes.cardTitle}>${dashboard.totalIncomes.toFixed(2)}</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <DateRange />
                  <a onClick={() => this.handleRedirect('/admin/members')}>
                    view members history
                  </a>
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="danger" stats icon>
                <CardIcon color="danger">
                  <InfoOutline />
                </CardIcon>
                <p className={classes.cardCategory}>Total Sales</p>
                <h3 className={classes.cardTitle}>{dashboard.totalSales}</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <LocalOffer />
                  <a onClick={() => this.handleRedirect('/admin/sales')}>
                    view all sales
                  </a>
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="info" stats icon>
                <CardIcon color="info">
                  <Accessibility />
                </CardIcon>
                <p className={classes.cardCategory}>Withdrawal Requests</p>
                <h3 className={classes.cardTitle}>{dashboard.requestedWithdrawals.length}</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <Update />
                  <a onClick={() => this.handleRedirect('/admin/withdrawals')}>
                    view all requests
                  </a>
                </div>
              </CardFooter>
            </Card>
          </GridItem>
        </Grid>
        <Grid container>
          <GridItem xs={12} sm={12} md={6}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Sales</h4>
                <p className={classes.cardCategoryWhite}>
                  Last 10 Sales
                </p>
              </CardHeader>
              <CardBody>
                <Table
                  tableHeaderColor="primary"
                  tableHead={["Member", "Product", "Price", "Date"]}
                  tableData={dashboard.lastSales.map((sale) => ([
                    sale.member.name,
                    sale.product_name,
                    '$' + sale.product_price,
                    moment(sale.created_at).format('MM/DD/YYYY')
                  ]))}
                />
              </CardBody>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <Card>
              <CardHeader color="warning">
                <h4 className={classes.cardTitleWhite}>Withdrawal Requests</h4>
                <p className={classes.cardCategoryWhite}>
                  {dashboard.requestedWithdrawals.length} requests are in wating
                </p>
              </CardHeader>
              <CardBody>
                <SortableTable
                  tableHeaderColor="warning"
                  tableHead={["Date", "Member", "Amount"]}
                  tableDataTypes={["date", "string", "number"]}
                  tableData={dashboard.requestedWithdrawals.map((withdrawal) => ([
                    moment(withdrawal.created_at).format('MM/DD/YYYY'),
                    withdrawal.member.name,
                    '$' + withdrawal.amount
                  ]))}
                />
              </CardBody>
            </Card>
          </GridItem>
        </Grid>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Dashboard);
