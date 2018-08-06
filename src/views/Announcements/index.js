import { connect } from 'react-redux'
import Announcements from './Announcements'
import { getProfile } from 'redux/actions'
import { push } from 'react-router-redux'

export default connect((state) => ({
    'profile': state.profile,
}), { push, getProfile })(Announcements)
