import { connect } from 'react-redux'
import MemberSales from './MemberSales.jsx'
import { getSales } from 'redux/actions'
import { push } from 'react-router-redux'

export default connect((state) => ({
    'sales': state.members.sales,
    'member': state.members.member,
}), { getSales, push })(MemberSales)