import * as actionTypes from 'redux/actionTypes'
import api from 'utils/api'
import jwtDecode from 'jwt-decode'

export const authenticate = (token) => async (dispatch) => {
    console.log('Authenticate', token)

    const response = await api.post('admin/authorize', { token })

    if (response.status === 200) {
        token = response.data.token
        localStorage.setItem('token', token)
        const decoded = jwtDecode(token)
        dispatch({ type: actionTypes.ADMIN_LOGIN_SUCCESS, payload: { token: decoded } })
    } else {
        localStorage.removeItem('token')
        console.log(response);
        dispatch({ type: actionTypes.ADMIN_LOGIN_FAILURE, payload: response })
    }
}

export const login = (email, password) => async (dispatch) => {
    dispatch({ type: actionTypes.ADMIN_LOGIN_REQUEST })

    const response = await api.post('admin/login', { email, password })

    if (response.status === 200) {
        const token = response.data.token
        const decoded = jwtDecode(token)

        localStorage.setItem('token', token)
        dispatch({ type: actionTypes.ADMIN_LOGIN_SUCCESS, payload: { token: decoded } })
    } else {
        localStorage.removeItem('token')
        dispatch({ type: actionTypes.ADMIN_LOGIN_FAILURE, payload: response })
    }
}

export const logout = () => async (dispatch) => {
    localStorage.removeItem('token')
    dispatch({ type: actionTypes.ADMIN_LOGOUT_SUCCESS })
}
