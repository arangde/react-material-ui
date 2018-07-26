import React from "react";
import PropTypes from 'prop-types';
import moment from 'moment';
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

const styles = theme => ({
  ...tableStyle(theme),
  ...cardStyle,
  addButton: {
    ...buttonStyle.transparent
  }
});

class MemberList extends React.Component {
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
    this.props.deleteMember(id)
  }

  getSorting = (order, orderBy) => {
    return order === 'desc'
      ? (a, b) => (b[orderBy] < a[orderBy] ? -1 : 1)
      : (a, b) => (a[orderBy] < b[orderBy] ? -1 : 1)
  }

  handleRequestSort = property => event => {
    const orderBy = property
    let order = 'desc'

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc'
    }

    this.setState({ order, orderBy })
  };

  handleChangePage = (event, page) => {
    this.setState({ page })
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value })
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1

  render() {
    const { classes, members } = this.props

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
              <SortableTable
                tableHeaderColor="primary"
                tableHead={["Name", "Email", "Phone Number", "Card Number", "Entry Date", "Point", "Balance", ""]}
                tableDataTypes={["string", "string", "string", "string", "date", "number", "number", ""]}
                tableData={members.map((member) => {
                  return [
                    member.name,
                    member.email,
                    member.phone_number,
                    member.card_number,
                    moment(member.entry_date).format('MM/DD/YYYY'),
                    member.point,
                    '$' + member.balance,
                    <div>
                      <IconButton
                        aria-label="Edit"
                        className={classes.tableActionButton}
                        onClick={() => this.handleEdit(member.id)}
                      >
                        <EditIcon
                          className={classes.tableActionButtonIcon + " " + classes.edit}
                        />
                      </IconButton>
                      <IconButton
                        aria-label="Close"
                        className={classes.tableActionButton}
                        onClick={() => this.handleRemove(member.id)}
                      >
                        <CloseIcon
                          className={classes.tableActionButtonIcon + " " + classes.close}
                        />
                      </IconButton>
                    </div>
                  ]
                })}
              />
            </CardBody >
          </Card >
        </GridItem >
      </Grid >
    );
  }
}

MemberList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MemberList);
