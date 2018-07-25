import { connect } from 'react-redux'
import LandingPage from './LandingPage'
import { getProfile } from 'redux/actions'
import { push } from 'react-router-redux'
// import { withRouter } from 'react-router-dom'

export default connect((state) => ({
    'auth': state.auth,
}), { push, getProfile })(LandingPage)
