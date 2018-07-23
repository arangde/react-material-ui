import { connect } from 'react-redux'
import MemberList from './MemberList.jsx'
import { getMembers } from 'redux/actions'
import { push } from 'react-router-redux'

// const MemberListContainer = props => <MemberList {...props} />

export default connect((state) => ({
    'members': state.members.members,
}), { getMembers, push })(MemberList)