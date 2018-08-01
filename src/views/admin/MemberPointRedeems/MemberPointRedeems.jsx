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
import typographyStyle from "assets/jss/material-dashboard-react/components/typographyStyle.jsx";
import { WITHDRAWAL_STATUS } from '../../../constants';

const styles = theme => ({
  ...tableStyle(theme),
  ...typographyStyle,
  ...cardStyle,
  status: {
    fontSize: '0.8em',
    textTransform: 'uppercase',
  },
});

class MemberPointRedeems extends React.Component {
  constructor(props) {
    super(props)

    this.id = props.match.params.id
  }

  componentWillMount() {
    this.props.getMemberPointRedeems(this.id)
  }

  render() {
    const { classes, redeems, member } = this.props

    return (
      <Grid container>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary" className={classes.cardTitle}>
              <h4 className={classes.cardTitleWhite}>
                {member ? member.name + '\'s Point Redeems History' : 'Point Redeems History'}
              </h4>
            </CardHeader>
            <CardBody>
              <SortableTable
                tableHeaderColor="primary"
                tableHead={["Date", "Point", "Status", "Aceepted Date", "Rejected Date", "Reject Reason", "Note"]}
                tableDataTypes={["date", "number", "number", "date", "date", "string", "string"]}
                firstOrderBy='desc'
                tableData={redeems.map((redeem) => {
                  const status = WITHDRAWAL_STATUS[redeem.status] ? WITHDRAWAL_STATUS[redeem.status] : ''
                  let statusClass = ''
                  if (status === 'accepted') {
                    statusClass = classes.successText
                  } else if (status === 'rejected') {
                    statusClass = classes.dangerText
                  }
                  return [
                    moment(redeem.created_at).format('MM/DD/YYYY'),
                    redeem.point,
                    <span className={classes.status + ' ' + statusClass}><span>{status}</span></span>,
                    status === 'accepted' ? moment(redeem.accepted_date).format('MM/DD/YYYY') : '',
                    status === 'rejected' ? moment(redeem.rejected_date).format('MM/DD/YYYY') : '',
                    redeem.reject_reason,
                    redeem.note,
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

MemberPointRedeems.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MemberPointRedeems);