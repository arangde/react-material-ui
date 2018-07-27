import { connect } from 'react-redux'
import MemberRefers from './MemberRefers.jsx'
import { getRefers } from 'redux/actions'
import { push } from 'react-router-redux'

export default connect((state) => ({
    'refers': state.members.refers,
    'member': state.members.member,
}), { getRefers, push })(MemberRefers)