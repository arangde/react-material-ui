import * as actionTypes from 'redux/actionTypes'

const initialState = {
    status: null,
    authenticated: false,
    adminAuthenticated: false,
    token: null,
    error: '',
}

function auth(state = initialState, action) {
    switch (action.type) {
        case actionTypes.AUTH_LOGIN_REQUEST:
            return {
                ...initialState,
                status: actionTypes.AUTH_LOGIN_REQUEST,
            }
        case actionTypes.AUTH_LOGIN_SUCCESS:
            return {
                status: actionTypes.AUTH_LOGIN_SUCCESS,
                authenticated: action.payload.isAdmin ? false : true,
                adminAuthenticated: action.payload.isAdmin ? true : false,
                token: action.payload.token,
                error: null,
            }
        case actionTypes.AUTH_LOGIN_FAILURE:
            return {
                ...initialState,
                status: actionTypes.AUTH_LOGIN_FAILURE,
                error: action.payload.error ? action.payload.error : 'Email or password is wrong.',
            }
        case actionTypes.AUTH_LOGOUT_SUCCESS:
            return initialState
        default:
            return state
    }
}

export default auth
