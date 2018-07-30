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

import cardStyle from "assets/jss/material-dashboard-react/components/cardStyle.jsx";
import tableStyle from "assets/jss/material-dashboard-react/components/tableStyle.jsx";

const styles = theme => ({
  ...tableStyle(theme),
  ...cardStyle,
});

class MemberRefers extends React.Component {
  constructor(props) {
    super(props)

    this.id = props.match.params.id
  }

  componentWillMount() {
    this.props.getMemberRefers(this.id)
  }

  render() {
    const { classes, refers, member } = this.props

    return (
      <Grid container>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary" className={classes.cardTitle}>
              <h4 className={classes.cardTitleWhite}>
                {member ? member.name + '\'s Refered Members' : 'Refered Members'}
              </h4>
            </CardHeader>
            <CardBody>
              <SortableTable
                tableHeaderColor="primary"
                tableHead={["Name", "Email", "Phone Number", "Card Number", "Entry Date", "Point", "Balance", "Next Period Date"]}
                tableDataTypes={["string", "string", "string", "string", "date", "string", "number", "date"]}
                firstOrderBy='desc'
                tableData={refers.map((refer) => {
                  return [
                    refer.member.name,
                    refer.member.email,
                    refer.member.phone_number,
                    refer.member.card_number,
                    moment(refer.entry_date).format('MM/DD/YYYY'),
                    refer.member.point,
                    '$' + refer.member.balance,
                    moment(refer.next_period_date).format('MM/DD/YYYY'),
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

MemberRefers.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MemberRefers);

