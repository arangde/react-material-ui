import { connect } from 'react-redux'
import MemberIncomes from './MemberIncomes.jsx'
import { getIncomes } from 'redux/actions'
import { push } from 'react-router-redux'

export default connect((state) => ({
    'incomes': state.members.incomes,
}), { getIncomes, push })(MemberIncomes)
