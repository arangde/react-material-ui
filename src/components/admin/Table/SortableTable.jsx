import React from "react";
import PropTypes from "prop-types";
import moment from 'moment';
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TablePagination from '@material-ui/core/TablePagination';
import TableSortLabel from '@material-ui/core/TableSortLabel';

// core components
import tableStyle from "assets/jss/material-dashboard-react/components/tableStyle";

const styles = theme => ({
  ...tableStyle(theme),
  tableCellWide: {
    width: '25%'
  },
  tableSortlabel: {
    color: "#9c27b0",
    '&:hover, &:focus': {
      color: "#9c27b0",
    }
  }
});

class SortableTable extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      order: props.firstOrderBy ? props.firstOrderBy : 'asc',
      orderBy: 0,
      selected: [],
      page: 0,
      rowsPerPage: 10,
    }
  }

  getSorting = (order, orderBy) => {
    return order === 'desc'
      ? (a, b) => (this.getFormatValue(a[orderBy], orderBy) < this.getFormatValue(b[orderBy], orderBy) ? 1 : -1)
      : (a, b) => (this.getFormatValue(a[orderBy], orderBy) < this.getFormatValue(b[orderBy], orderBy) ? -1 : 1)
  }

  getFormatValue = (value, orderBy) => {
    const { tableDataTypes } = this.props

    if (tableDataTypes) {
      if (tableDataTypes[orderBy]) {
        if (tableDataTypes[orderBy] === 'date') {
          if (value) {
            return moment(value, 'MM/DD/YYYY').format('YYYYMMDD')
          }
        }
      }
    }

    return value;
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
    const { classes, tableHeaderColor, tableHead, tableData } = this.props
    const { order, orderBy, page, rowsPerPage } = this.state

    return (
      <div className={classes.tableResponsive}>
        <Table className={classes.table}>
          <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
            <TableRow>
              {tableHead.map((columnTitle, orderKey) => {
                return columnTitle !== '' ?
                  (
                    <TableCell
                      key={orderKey}
                      className={classes.tableCell + " " + classes.tableHeadCell}
                      sortDirection={orderBy === orderKey ? order : false}
                    >
                      <TableSortLabel
                        active={orderBy === orderKey}
                        direction={order}
                        onClick={this.handleRequestSort(orderKey)}
                        className={classes.tableSortlabel}
                      >
                        {columnTitle}
                      </TableSortLabel>
                    </TableCell>
                  ) : (
                    <TableCell key={orderKey} className={classes.tableCell + " " + classes.tableHeadCell}></TableCell>
                  )
              }, this)}
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.sort(this.getSorting(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((rowData, key) => {
                const isSelected = this.isSelected(key);
                return (
                  <TableRow
                    key={key}
                    hover
                    role="checkbox"
                    aria-checked={isSelected}
                    tabIndex={-1}
                    selected={isSelected}
                  >
                    {rowData.map((cellData, i) => {
                      let cellClassName = classes.tableCell;
                      if (typeof cellData === 'string' && cellData.length > 60) {
                        cellClassName = classes.tableCell + ' ' + classes.tableCellWide
                      }
                      return (
                        <TableCell key={i} className={cellClassName}>{cellData}</TableCell>
                      )
                    })}
                  </TableRow>
                );
              })}
            {tableData.length === 0 && (
              <TableRow><TableCell colSpan={tableHead.length}>No data to display</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
        {tableData.length > 10 && (
          <TablePagination
            component="div"
            count={tableData.length}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[10, 25, 50, 100]}
            page={page}
            backIconButtonProps={{
              'aria-label': 'Previous Page',
            }}
            nextIconButtonProps={{
              'aria-label': 'Next Page',
            }}
            onChangePage={this.handleChangePage}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
          />
        )}
      </div>
    );
  }
}

SortableTable.defaultProps = {
  tableHeaderColor: "gray",
};

SortableTable.propTypes = {
  classes: PropTypes.object.isRequired,
  tableHeaderColor: PropTypes.oneOf([
    "warning",
    "primary",
    "danger",
    "success",
    "info",
    "rose",
    "gray"
  ]),
  tableHead: PropTypes.arrayOf(PropTypes.string).isRequired,
  tableData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.any)).isRequired,
  tableDataTypes: PropTypes.arrayOf(PropTypes.string),
};

export default withStyles(styles)(SortableTable);
