import * as actionTypes from 'redux/actionTypes'

const initialState = {
    status: null,
    error: null,
    users: [],
}

function users(state = initialState, action) {
    switch (action.type) {
        case actionTypes.GET_USERS_REQUEST:
            return {
                ...state,
                status: actionTypes.GET_USERS_REQUEST,
                error: null,
            }
        case actionTypes.GET_USERS_SUCCESS:
            return {
                status: actionTypes.GET_USERS_SUCCESS,
                users: action.payload,
                error: null,
            }
        case actionTypes.GET_USERS_FAILURE:
            return {
                ...initialState,
                status: actionTypes.GET_USERS_FAILURE,
                error: action.payload.error ? action.payload.error : "Cound't get users data",
            }
        default:
            return state
    }
}

export default users
