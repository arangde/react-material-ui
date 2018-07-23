import * as actionTypes from 'redux/actionTypes'
import api from 'utils/api'
import jwtDecode from 'jwt-decode'
import { push } from 'react-router-redux'

export const authenticate = (token, isAdmin = false) => async (dispatch) => {
    const response = isAdmin ? await api.post('admin/authorize', { token }) : await api.post('authorize', { token })

    if (response.status === 200) {
        token = response.data.token
        const decoded = jwtDecode(token)

        localStorage.setItem('token', token)
        dispatch({ type: actionTypes.AUTH_LOGIN_SUCCESS, payload: { token: decoded, isAdmin } })
    } else {
        localStorage.removeItem('token')
        // push('/admin/login')
        dispatch({ type: actionTypes.AUTH_LOGIN_FAILURE, payload: { ...response, isAdmin } })
    }
}

export const login = (email, password, isAdmin = false) => async (dispatch) => {
    dispatch({ type: actionTypes.AUTH_LOGIN_REQUEST, payload: { isAdmin } })

    const response = isAdmin ? await api.post('admin/login', { email, password }) : await api.post('login', { email, password })

    if (response.status === 200) {
        const token = response.data.token
        const decoded = jwtDecode(token)

        localStorage.setItem('token', token)
        dispatch({ type: actionTypes.AUTH_LOGIN_SUCCESS, payload: { token: decoded, isAdmin } })
    } else {
        localStorage.removeItem('token')
        dispatch({ type: actionTypes.AUTH_LOGIN_FAILURE, payload: { ...response, isAdmin } })
    }
}

export const logout = () => async (dispatch) => {
    localStorage.removeItem('token')
    dispatch({ type: actionTypes.AUTH_LOGOUT_SUCCESS })
}
