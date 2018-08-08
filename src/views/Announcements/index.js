import { connect } from 'react-redux'
import Announcements from './Announcements'
import { getAnnouncements, getProfile } from 'redux/actions'
import { push } from 'react-router-redux'

export default connect((state) => ({
    'profile': state.profile,
    'announcements': state.announcements,
}), { push, getAnnouncements, getProfile })(Announcements)
