import { connect } from 'react-redux'
import MemberDetail from './MemberDetail.jsx'
// import { createMember } from 'redux/actions'
import { push } from 'react-router-redux'

export default connect((state) => ({
    'members': state.members,
}), { push })(MemberDetail)