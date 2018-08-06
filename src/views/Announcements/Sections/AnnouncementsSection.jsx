import React from "react";
import moment from 'moment';
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import SortableTable from "components/admin/Table/SortableTable.jsx";

import productStyle from "assets/jss/material-kit-react/views/landingPageSections/productStyle.jsx";
import typographyStyle from "assets/jss/material-dashboard-react/components/typographyStyle.jsx";
import tableStyle from "assets/jss/material-dashboard-react/components/tableStyle.jsx";
import RowModal from "components/Alert/RowModal.jsx"

const styles = theme => ({
  ...tableStyle(theme),
  ...typographyStyle,
  ...productStyle,
  status: {
    fontSize: '0.8em',
    textTransform: 'uppercase',
  },
  formControl: {
    minWidth: 120,
    width: "100%",
    margin: "27px 0 0",
    position: "relative",
    paddingBottom: "10px",
  },
  inputLabel: {
    color: "#aaa !important",
    fontSize: "14px !important",
    transformOrigin: "top left !important",
    transform: "translate(0, 1.5px) scale(0.75) !important"
  },
  saleSelect: {
    textTransform: "capitalize",
    '&:after': {
      borderBottom: "2px solid #8e24aa",
    },
    '&:before, &:hover:before': {
      borderBottom: "1px solid rgba(0, 0, 0, 0.2) !important",
    }
  },
  optionSelect: {
    textTransform: "capitalize",
  }
});

class AnnouncementsSection extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      headData: [],
      data: [],
      rowopen: false,
      status: 'all',
      filteredRedeems: [],
    }
  }

  rowDetailModal = (rowData, tableHead) => {
    this.setState({ data: rowData, headData: tableHead })
    this.setState({ rowopen: true });
  }

  rowHandleClose = () => {
    this.setState({ rowopen: false });
  }

  handleChange = (event) => {
    this.setState({ status: event.target.value })
  }

  filterAsQuery(data, query) {
    let output
    if (query === 'all') output = data
    else if (query === 'checked') {
      output = data.filter((row) => !!row.view);
    } else {
      output = data.filter((row) => !row.view);
    }
    return output;
  }

  render() {
    const { classes } = this.props;
    const { announcements } = this.props.announcements;
    const filteredRedeems = this.filterAsQuery(announcements, this.state.status)

    return (
      <div className={classes.section}>
        <GridContainer justify="center">
          <Grid container>
            <GridItem xs={12} sm={12} md={2}>
              <FormControl className={classes.formControl}>
                <InputLabel className={classes.inputLabel}>Filter By Status</InputLabel>
                <Select
                  className={classes.saleSelect}
                  inputProps={{
                    name: "status",
                    open: this.state.open,
                    onClose: this.handleClose,
                    onOpen: this.handleOpen,
                    onChange: this.handleChange,
                    value: this.state.status,
                  }}
                >
                  <MenuItem value="all">All</MenuItem>
                  <MenuItem value='checked' className={classes.optionSelect}>Checked</MenuItem>
                  <MenuItem value='unchecked' className={classes.optionSelect}>Unchecked</MenuItem>
                </Select>
              </FormControl>
            </GridItem>
            <GridItem xs={12} sm={12} md={8}>
              <h2 className={classes.title}>Announcement List</h2>
              <h5 className={classes.description}>
              </h5>
            </GridItem>
          </Grid>
        </GridContainer>
        {filteredRedeems !== undefined ? (
          <div>
            <SortableTable
              tableHeaderColor="primary"
              tableHead={["Date", "Content", "Status"]}
              tableDataTypes={["date", "string", "string"]}
              firstOrderBy='desc'
              tableData={filteredRedeems.map((announcement) => {
                let status = announcement.view !== undefined ? 'Checked' : 'Unchecked'
                let statusClass = classes.successText
                if (status === 'Unchecked') {
                  statusClass = classes.mutedText
                }
                return [
                  moment(announcement.created_at).format('MM/DD/YYYY'),
                  announcement.content,
                  <span className={classes.status + ' ' + statusClass}><span>{status}</span></span>,
                ]
              })}
              rowDetail={this.rowDetailModal}
              cellClassWidth={['20', '60', '20']}
            />
            <RowModal
              rowData={this.state.data}
              headData={this.state.headData}
              open={this.state.rowopen}
              onClose={this.rowHandleClose}
            />
          </div>
        ) : null}
      </div>
    );
  }
}

export default withStyles(styles)(AnnouncementsSection);

