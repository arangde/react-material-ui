import React from "react";
import PropTypes from "prop-types";
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
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: "300",
    lineHeight: "1.5em",
    fontSize: "1em",
  },
  tableCell: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: "300",
    lineHeight: "1.42857143",
    padding: "12px 8px",
    verticalAlign: "middle"
  },
  tableCellWide: {
    width: '25%'
  },
  tableSortlabel: {
    color: "#9c27b0",
    '&:hover, &:focus': {
      color: "#9c27b0",
    }
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
});

class SortableTable extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      order: 'asc',
      orderBy: props.tableHead[0].toLowerCase().split(" ").join("_"),
      selected: [],
      page: 0,
      rowsPerPage: 10,
    }
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
    const { classes, tableHeaderColor, tableHead, tableData } = this.props
    const { order, orderBy, rowsPerPage, page } = this.state
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, tableData.length - page * rowsPerPage)
    console.log(classes);
    return (
      <div className={classes.tableResponsive}>
        <Table className={classes.table}>
          <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
            <TableRow>
              {tableHead.map((columnTitle, i) => {
                let orderKey = columnTitle.toLowerCase().split(" ").join("_")
                return columnTitle !== '' ?
                  (
                    <TableCell
                      key={i}
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
                    <TableCell key={i} className={classes.tableCell + " " + classes.tableHeadCell}></TableCell>
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
                        console.log(cellData.length, cellData)
                        cellClassName = classes.tableCell + ' ' + classes.tableCellWide
                      }
                      return (
                        <TableCell key={i} className={cellClassName}>{cellData}</TableCell>
                      )
                    })}
                  </TableRow>
                );
              })}
            {emptyRows > 0 && (
              <TableRow style={{ height: 49 * emptyRows }}>
                <TableCell colSpan={tableHead.length} />
              </TableRow>
            )}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={tableData.length}
          rowsPerPage={rowsPerPage}
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
      </div>
    );
  }
}

SortableTable.defaultProps = {
  tableHeaderColor: "gray"
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
  tableData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.any)).isRequired
};

export default withStyles(styles)(SortableTable);
