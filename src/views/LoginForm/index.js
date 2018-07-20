import React from 'react'
import { connect } from 'react-redux'
import LoginForm from './LoginForm'
import { login } from 'redux/actions'
import { push } from 'react-router-redux'

// const LoginContainer = props => <Login {...props} />

export default connect((state) => ({
    'auth': state.auth,
}), { login, push })(LoginForm)
