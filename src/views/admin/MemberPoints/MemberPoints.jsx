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
import { getMessage } from 'utils/helpers';

const styles = theme => ({
  ...tableStyle(theme),
  ...cardStyle,
});

class MemberPoints extends React.Component {
  constructor(props) {
    super(props)

    this.id = props.match.params.id
  }

  componentWillMount() {
    this.props.getMemberPoints(this.id)
  }

  render() {
    const { classes, points, member } = this.props

    return (
      <Grid container>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary" className={classes.cardTitle}>
              <h4 className={classes.cardTitleWhite}>
                {member ? member.name + " " + getMessage('Points History') : ''}
              </h4>
            </CardHeader>
            <CardBody>
              <SortableTable
                tableHeaderColor="primary"
                tableHead={[getMessage('Date'), getMessage('Old Point'), getMessage('New Point'), getMessage('Note')]}
                tableDataTypes={["date", "number", "number", "string"]}
                firstOrderBy='desc'
                tableData={points.map((point) => {
                  return [
                    moment(point.created_at).format('MM/DD/YYYY'),
                    point.old_point,
                    point.new_point,
                    point.note,
                  ]
                })}
                cellClassWidth={['25', '25', '25', '25']}
              />
            </CardBody>
          </Card>
        </GridItem>
      </Grid>
    );
  }
}

MemberPoints.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MemberPoints);
