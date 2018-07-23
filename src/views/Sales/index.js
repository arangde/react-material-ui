import { connect } from 'react-redux'
import Sales from './Sales.jsx'
import { getSales } from 'redux/actions'
import { push } from 'react-router-redux'

// const SalesContainer = props => <Sales {...props} />

export default connect((state) => ({
    'sales': state.sales.sales,
}), { getSales, push })(Sales)