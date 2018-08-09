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

import tableStyle from "assets/jss/material-dashboard-react/components/tableStyle.jsx";
import typographyStyle from "assets/jss/material-dashboard-react/components/typographyStyle.jsx";
import { INCOME_TYPES } from "../../../constants";
import { getMessage } from 'utils/helpers';

const styles = theme => ({
  ...tableStyle(theme),
  ...typographyStyle,
  type: {
    fontSize: '13px',
    textTransform: 'uppercase',
  }
});


class PointList extends React.Component {
  componentWillMount() {
    this.props.getPoints()
  }

  render() {
    const { classes, points } = this.props

    return (
      <Grid container>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary" className={classes.cardTitle}>
              <h4 className={classes.cardTitleWhite}>{getMessage('Point List')}</h4>
            </CardHeader>
            <CardBody>
              <SortableTable
                tableHeaderColor="primary"
                tableHead={[getMessage('Date'), getMessage('Member'), getMessage('Old Point'), getMessage('New Point'), getMessage('Type'), getMessage('Note')]}
                tableDataTypes={["date", "string", "string", "string", "string", "string"]}
                firstOrderBy='desc'
                tableData={points.map((point) => {
                  const type = INCOME_TYPES[point.type] ? INCOME_TYPES[point.type] : ''
                  let typeClass = classes.infoText
                  if (type === 'recommends') {
                    typeClass = classes.successText
                  } else if (type === 'withdrawal') {
                    typeClass = classes.warningText
                  }
                  return [
                    moment(point.created_at).format('MM/DD/YYYY'),
                    point.member.name,
                    point.old_point,
                    point.new_point,
                    <span className={classes.type + ' ' + typeClass}><span>{getMessage(type)}</span></span>,
                    point.note,
                  ]
                })}
                cellClassWidth={['15', '20', '15', '15', '15', '20']}
              />
            </CardBody>
          </Card>
        </GridItem>
      </Grid>
    );
  }
}

PointList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PointList);
