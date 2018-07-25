import { connect } from 'react-redux'
import UserList from './UserList.jsx'
import { getUsers } from 'redux/actions'
import { push } from 'react-router-redux'

export default connect((state) => ({
    'users': state.users.users,
}), { getUsers, push })(UserList)