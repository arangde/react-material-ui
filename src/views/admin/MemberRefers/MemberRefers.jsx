import React from "react";
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
    this.props.getRefers(this.id)
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
                tableHead={["Name", "Email", "Phone Number"]}
                tableDataTypes={["string", "string", "string"]}
                firstOrderBy='desc'
                tableData={refers.map((refer) => {
                  return [
                    refer.member.name,
                    refer.member.email,
                    refer.member.phone_number
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
