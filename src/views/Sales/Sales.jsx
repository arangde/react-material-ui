import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
// core components
import GridItem from "components/Grid/GridItem.jsx";

import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";

import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
// @material-ui/icons
import Edit from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close";

// core components
import {
  warningColor,
  primaryColor,
  dangerColor,
  successColor,
  infoColor,
  roseColor,
  grayColor,
  defaultFont
} from "assets/jss/material-dashboard-react.jsx";
import tooltipStyle from "assets/jss/material-dashboard-react/tooltipStyle.jsx";

import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";

const styles  = theme => ({
  ...tooltipStyle,
  warningTableHeader: {
    color: warningColor
  },
  primaryTableHeader: {
    color: primaryColor
  },
  dangerTableHeader: {
    color: dangerColor
  },
  successTableHeader: {
    color: successColor
  },
  infoTableHeader: {
    color: infoColor
  },
  roseTableHeader: {
    color: roseColor
  },
  grayTableHeader: {
    color: grayColor
  },
  table: {
    marginBottom: "0",
    width: "100%",
    maxWidth: "100%",
    backgroundColor: "transparent",
    borderSpacing: "0",
    borderCollapse: "collapse"
  },
  tableHeadCell: {
    color: "inherit",
    ...defaultFont,
    fontSize: "1em"
  },
  tableCell: {
    ...defaultFont,
    lineHeight: "1.42857143",
    padding: "12px 8px",
    verticalAlign: "middle"
  },
  tableResponsive: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  tableActions: {
    textAlign: "right"
  },
  tableActionButton: {
    width: "27px",
    height: "27px"
  },
  tableActionButtonIcon: {
    width: "17px",
    height: "17px"
  },
  edit: {
    backgroundColor: "transparent",
    color: primaryColor,
    boxShadow: "none"
  },
  close: {
    backgroundColor: "transparent",
    color: dangerColor,
    boxShadow: "none"
  },
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
});
 
class Sales extends React.Component {
  constructor(props) {
    super(props)
    const tableHead = ["Product Name", "Product Price", "Created At", "Upodated At", ""]
    const tableHeaderColor = "primary"

    this.state = {
      tableHead: tableHead,
      tableHeaderColor: tableHeaderColor,
      error: '',
    }
    
  }
  
  componentWillMount() {
    this.props.getSales()
  }

  saleEdit(id) {
    console.log(id)
  }
  saleRemove(id) {
    console.log(id)
  }

  render() {
    const { classes, sales } = this.props
    const { tableHead, tableHeaderColor } = this.state

    return (
      <Grid container>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Member List</h4>
              <p className={classes.cardCategoryWhite}>
                Here is a subtitle for this table
              </p>
            </CardHeader>
            <CardBody>
              <div className={classes.tableResponsive}>
                <Table className={classes.table}>
                  {tableHead !== undefined ? (
                    <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
                      <TableRow>
                        {tableHead.map((prop, key) => {
                          return (
                            <TableCell
                              className={classes.tableCell + " " + classes.tableHeadCell}
                              key={key}
                            >
                              {prop}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    </TableHead>
                  ) : null}
                  <TableBody>
                  {sales.map((sale, key) => {
                      return (
                        <TableRow key={key}>
                          {Object.keys(sale).map((key) => {
                            if(key === "id" || key === "member_id" || key === "note")
                              return null;
                            else
                              return (
                                <TableCell className={classes.tableCell} key={key}>
                                  {sale[key]}
                                </TableCell>
                              );
                          })}

                          <TableCell className={classes.tableActions}>
                            <Tooltip
                              id="tooltip-top"
                              title="Edit Task"
                              placement="top"
                              classes={{ tooltip: classes.tooltip }}
                            >
                              <IconButton
                                aria-label="Edit"
                                className={classes.tableActionButton}
                              >
                                <Edit
                                  className={
                                    classes.tableActionButtonIcon + " " + classes.edit
                                  }
                                  onClick={() => this.saleEdit(sale.member_id)}
                                />
                              </IconButton>
                            </Tooltip>
                            <Tooltip
                              id="tooltip-top-start"
                              title="Remove"
                              placement="top"
                              classes={{ tooltip: classes.tooltip }}
                            >
                              <IconButton
                                aria-label="Close"
                                className={classes.tableActionButton}
                              >
                                <Close
                                  className={
                                    classes.tableActionButtonIcon + " " + classes.close
                                  }
                                  onClick={() => this.saleRemove(sale.member_id)}
                                />
                              </IconButton>
                            </Tooltip>
                          </TableCell>

                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </CardBody>
          </Card>
        </GridItem>
      </Grid>
    );
  }
}

export default withStyles(styles)(Sales);
