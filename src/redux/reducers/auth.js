import * as actionTypes from 'redux/actionTypes'

const initialState = {
    status: null,
    isAuthenticated: false,
    token: null,
    error: '',
}

function auth(state = initialState, action) {
    switch (action.type) {
        case actionTypes.ADMIN_LOGIN_REQUEST:
            return {
                ...state,
                status: actionTypes.ADMIN_LOGIN_REQUEST,
                error: null,
            }
        case actionTypes.ADMIN_LOGIN_SUCCESS:
            return {
                status: actionTypes.ADMIN_LOGIN_SUCCESS,
                isAuthenticated: true,
                token: action.payload.token,
                error: null,
            }
        case actionTypes.ADMIN_LOGIN_FAILURE:
            return {
                ...initialState,
                status: actionTypes.ADMIN_LOGIN_FAILURE,
                error: action.payload.error ? action.payload.error : 'Email or password is wrong.',
            }
        case actionTypes.ADMIN_LOGOUT_SUCCESS:
            return { ...initialState }
        default:
            return state
    }
}

export default auth
