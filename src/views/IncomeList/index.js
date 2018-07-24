import { connect } from 'react-redux'
import IncomeList from './IncomeList.jsx'
import { getIncomes } from 'redux/actions'
import { push } from 'react-router-redux'

export default connect((state) => ({
    'incomes': state.members.incomes,
}), { getIncomes,push })(IncomeList)