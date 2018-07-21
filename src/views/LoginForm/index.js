import { connect } from 'react-redux'
import LoginForm from './LoginForm'
import { login } from 'redux/actions'
import { push } from 'react-router-redux'
import { withRouter } from 'react-router'

export default connect((state) => ({
    'auth': state.auth,
}), { login, push })(withRouter(LoginForm))
