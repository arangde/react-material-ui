import React from "react";
import moment from 'moment';
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
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
// @material-ui/icons
import EditIcon from "@material-ui/icons/Edit";
import CloseIcon from "@material-ui/icons/Close";
import AddIcon from "@material-ui/icons/Add";
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
import buttonStyle from "assets/jss/material-dashboard-react/components/buttonStyle.jsx";

import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";

const styles = theme => ({
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
  cardTitle: {
    display: 'flex',
    justifyContent: 'space-between',
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
  },
  addButton: {
    ...buttonStyle.transparent
  }
});

class MemberList extends React.Component {
  constructor(props) {
    super(props)
    const tableHead = ["Name", "Email", "Phone Number", "Card Number", "Entry Date", "Points", "Balance", ""]
    const tableHeaderColor = "primary"

    this.state = {
      tableHead: tableHead,
      tableHeaderColor: tableHeaderColor,
      error: '',
    }
  }

  componentWillMount() {
    this.props.getMembers()
  }

  handleEdit(id) {
    this.props.push(`/admin/members/${id}`)
  }

  handleAdd = () => {
    this.props.push(`/admin/members/create`)
  }

  handleRemove(id) {

  }

  render() {
    const { classes, members } = this.props
    const { tableHead, tableHeaderColor } = this.state

    return (
      <Grid container>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary" className={classes.cardTitle}>
              <h4 className={classes.cardTitleWhite}>Member List</h4>
              <Button variant="fab" mini aria-label="Add" className={classes.addButton} onClick={this.handleAdd}>
                <AddIcon />
              </Button>
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
                    {members.map((member, key) => {
                      return (
                        <TableRow key={key}>
                          {Object.keys(member).map((key) => {
                            if (key === "id" || key === "created_at" || key === "updated_at" || key === "next_period_date") {
                              return null;
                            } else if (key === "entry_date") {
                              const entry_date = moment(member[key]).format('MM/DD/YYYY')
                              return (
                                <TableCell className={classes.tableCell} key={key}>
                                  {entry_date}
                                </TableCell>
                              );
                            } else {
                              return (
                                <TableCell className={classes.tableCell} key={key}>
                                  {member[key]}
                                </TableCell>
                              );
                            }
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
                                onClick={() => this.handleEdit(member.id)}
                              >
                                <EditIcon
                                  className={classes.tableActionButtonIcon + " " + classes.edit}
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
                                onClick={() => this.handleRemove(member.id)}
                              >
                                <CloseIcon
                                  className={classes.tableActionButtonIcon + " " + classes.close}
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

export default withStyles(styles)(MemberList);
