import { connect } from 'react-redux'
import MemberWithdrawals from './MemberWithdrawals.jsx'
import { getWithdrawals } from 'redux/actions'
import { push } from 'react-router-redux'

export default connect((state) => ({
    'member': state.members.member,
    'withdrawals': state.members.withdrawals,
}), { getWithdrawals, push })(MemberWithdrawals)