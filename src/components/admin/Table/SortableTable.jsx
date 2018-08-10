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
import Checkbox from '@material-ui/core/Checkbox';
// core components
import tableStyle from "assets/jss/material-dashboard-react/components/tableStyle";
import EnhancedTableToolBar from "./EnhancedTableToolBar.jsx";
import { getMessage } from 'utils/helpers';

const styles = theme => ({
  ...tableStyle(theme),
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
      checkedIds: [],
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

  isSelected = id => this.state.checkedIds.indexOf(id) !== -1

  rowData = (data, headData) => {
    if (window.innerWidth > 600 || window.location.pathname.includes("/admin")) return true
    this.props.rowDetail(data, headData)
  }

  clickCheckBox = (rowKey, id) => {
    const { selected } = this.state
    const { checkedIds } = this.state
    const selectedIndex = selected.indexOf(rowKey)
    let newSelected = []
    let newCheckedIds = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, rowKey);
      newCheckedIds = newCheckedIds.concat(checkedIds, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected);
      newCheckedIds = newCheckedIds.concat(checkedIds.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
      newCheckedIds = newCheckedIds.concat(checkedIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );

      newCheckedIds = newCheckedIds.concat(
        checkedIds.slice(0, selectedIndex),
        checkedIds.slice(selectedIndex + 1),
      );
    }

    this.setState({ selected: newSelected });
    this.setState({ checkedIds: newCheckedIds });
  }

  onSelectAllClick = (event, checked) => {
    if (checked) {
      let selectKey = []
      let selectIds = []
      this.props.tableData.forEach((row, key) => {
        if (row[2].props.role === this.props.usingCheckBox.role) {
          selectKey.push(key)
          selectIds.push(row[2].props.id)
        }
      })

      this.setState({ selected: selectKey })
      this.setState({ checkedIds: selectIds })
      return;
    }
    this.setState({ selected: [] });
    this.setState({ checkedIds: [] });
  }

  getNumAsQuery(data, query) {
    let output = data.filter((row) => row[2].props.role === query);
    return output.length
  }

  render() {
    const { classes, tableHeaderColor, tableHead, tableData, cellClassWidth, usingCheckBox } = this.props
    const { order, orderBy, page, rowsPerPage, selected, checkedIds } = this.state
    const unselected = this.getNumAsQuery(tableData, usingCheckBox.role)
    const hiddenKeys = []

    return (
      <div className={classes.tableResponsive}>
        {usingCheckBox.enable && unselected > 0 ?
          <EnhancedTableToolBar numSelected={selected.length} unSelected={unselected} checkedIds={checkedIds} /> : null
        }
        <Table className={classes.table}>
          <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
            <TableRow>
              {tableHead.map((columnTitle, orderKey) => {
                let mobileHide = ''
                if (columnTitle === '笔记' || columnTitle === '拒绝原因') {
                  hiddenKeys.push(orderKey)
                  mobileHide = classes.mobileHide
                }

                if (columnTitle === 'checkbox' && usingCheckBox.enable && unselected > 0)
                  return (
                    <TableCell
                      key={orderKey}
                      className={classes.tableCell + " " + classes.tableHeadCell}
                      style={{
                        width: cellClassWidth[orderKey] + '%'
                      }}
                    >
                      <Checkbox
                        indeterminate={selected.length > 0 && selected.length < tableData.length}
                        checked={selected.length > 0}
                        onChange={this.onSelectAllClick}
                      />
                    </TableCell>
                  );

                return columnTitle !== 'checkbox' ?
                  (
                    <TableCell
                      key={orderKey}
                      className={classes.tableCell + " " + classes.tableHeadCell + " " + mobileHide}
                      sortDirection={orderBy === orderKey ? order : false}
                      style={{
                        width: cellClassWidth[orderKey] + '%'
                      }}
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
                const isSelected = this.isSelected(rowData[2].props.id);
                return (
                  <TableRow
                    key={key}
                    hover
                    role="checkbox"
                    aria-checked={isSelected}
                    tabIndex={-1}
                    selected={isSelected}
                    className={classes.tableRow}
                    onClick={() => this.rowData(rowData, tableHead)}
                  >
                    {rowData.map((cellData, i) => {
                      let mobileHide = hiddenKeys.indexOf(i) !== -1 ? classes.mobileHide : ''
                      return (
                        <TableCell
                          key={i}
                          className={classes.tableCell + " " + mobileHide}
                          style={{
                            width: cellClassWidth[i] + '%'
                          }}
                        >{cellData}</TableCell>
                      )
                    })}
                    {usingCheckBox.enable && (usingCheckBox.role === rowData[2].props.role) ? (
                      <TableCell
                        className={classes.tableCell}
                        onClick={() => this.clickCheckBox(key, rowData[2].props.id)}
                        selected={isSelected}
                        style={{
                          width: cellClassWidth[rowData.length - 1] + '%'
                        }}
                      >
                        <Checkbox checked={isSelected} />
                      </TableCell>
                    ) : (
                        <TableCell></TableCell>
                      )}
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
  usingCheckBox: {},
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
  usingCheckBox: PropTypes.any
};

export default withStyles(styles)(SortableTable);
