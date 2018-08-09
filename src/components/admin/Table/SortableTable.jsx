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
import { getMessage } from 'utils/helpers';

const styles = theme => ({
  ...tableStyle(theme),
  tableCell5: {
    width: "5%"
  },
  tableCell7: {
    width: "7%"
  },
  tableCell8: {
    width: "8%"
  },
  tableCell9: {
    width: "9%"
  },
  tableCell10: {
    width: "10%"
  },
  tableCell11: {
    width: "11%"
  },
  tableCell12: {
    width: "12%"
  },
  tableCell13: {
    width: "13%"
  },
  tableCell14: {
    width: "14%"
  },
  tableCell15: {
    width: "15%"
  },
  tableCell16: {
    width: "16%"
  },
  tableCell20: {
    width: "20%"
  },
  tableCell22: {
    width: "22%"
  },
  tableCell23: {
    width: "23%"
  },
  tableCell24: {
    width: "24%"
  },
  tableCell25: {
    width: "25%"
  },
  tableCell27: {
    width: "27%"
  },
  tableCell28: {
    width: "28%"
  },
  tableCell30: {
    width: "30%"
  },
  tableCell33: {
    width: "33%"
  },
  tableCell40: {
    width: "40%"
  },
  tableCell50: {
    width: "50%"
  },
  tableCell60: {
    width: "60%"
  },
  tableCell67: {
    width: "67%"
  },
  tableCell70: {
    width: "70%"
  },
  tableCell75: {
    width: "75%"
  },
  tableCell80: {
    width: "80%"
  },
  tableCell90: {
    width: "90%"
  },
  tableHeadCell: {
    ...tableStyle(theme).tableHeadCell,
    "@media (max-width: 600px)": {
      fontSize: "14px"
    }
  },
  tableRow: {
    "@media (max-width: 600px)": {
      height: "30px"
    }
  },
  tableSortlabel: {
    color: "#9c27b0",
    '&:hover, &:focus': {
      color: "#9c27b0",
    }
  },
  tableResponsive: {
    margin: "0",
    overflowX: "auto",
  },
  pageNationToolBar: {
    '& > div': {
      "@media (max-width: 767px)": {
        paddingLeft: "0",
        '& > div:first-child': {
          display: "none",
        },
      },
      '& > div': {
        fontSize: "13px"
      }
    },
    '& button': {
      "@media (max-width: 600px)": {
        width: "42px"
      }
    }
  },
  mobileHide: {
    "@media (max-width: 767px)": {
      display: "none"
    }
  },
  mobileReason: {
    "@media (max-width: 767px)": {
      display: "none"
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
      noteKey: null,
      reasonKey: null,
      open: false,
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

  rowData = (data, headData) => {
    if (window.innerWidth > 600 || window.location.pathname.includes("/admin")) return true
    this.props.rowDetail(data, headData)
  }

  render() {
    const { classes, tableHeaderColor, tableHead, tableData, cellClassWidth } = this.props
    const { order, orderBy, page, rowsPerPage } = this.state
    const hiddenKeys = []

    return (
      <div className={classes.tableResponsive}>
        <Table className={classes.table}>
          <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
            <TableRow>
              {tableHead.map((columnTitle, orderKey) => {
                let mobileHide = ''
                if (columnTitle === '笔记' || columnTitle === '拒绝原因') {
                  hiddenKeys.push(orderKey)
                  mobileHide = classes.mobileHide
                }
                let customCell = classes['tableCell' + cellClassWidth[orderKey]] + ' ' + classes.tableHeadCell
                return columnTitle !== '' ?
                  (
                    <TableCell
                      key={orderKey}
                      className={classes.tableCell + " " + customCell + " " + mobileHide}
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
                    <TableCell key={orderKey} className={classes.tableCell + " " + cellClassWidth}></TableCell>
                  )
              }, this)}
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.sort(this.getSorting(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((rowData, key) => {
                return (
                  <TableRow
                    key={key}
                    hover
                    tabIndex={-1}
                    className={classes.tableRow}
                    onClick={() => this.rowData(rowData, tableHead)}
                  >
                    {rowData.map((cellData, i) => {
                      let mobileHide = hiddenKeys.indexOf(i) !== -1 ? classes.mobileHide : ''
                      let customCell = classes.tableCell + ' ' + classes['tableCell' + cellClassWidth[i]]
                      return (
                        <TableCell key={i} className={customCell + " " + mobileHide}>{cellData}</TableCell>
                      )
                    })}
                  </TableRow>
                );
              })}
            {tableData.length === 0 && (
              <TableRow><TableCell colSpan={tableHead.length}>{getMessage('No data to display.')}</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
        {tableData.length > 10 && (
          <TablePagination
            className={classes.pageNationToolBar}
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
  rowDetail: PropTypes.func,
  cellClassWidth: PropTypes.arrayOf(PropTypes.string),
};

export default withStyles(styles)(SortableTable);
