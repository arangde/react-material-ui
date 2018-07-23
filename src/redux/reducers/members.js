import * as actionTypes from 'redux/actionTypes'

const initialState = {
    status: null,
    error: null,
    members: [],
}

function members(state = initialState, action) {
    switch (action.type) {
        case actionTypes.GET_MEMBERS_REQUEST:
            return {
                ...state,
                status: actionTypes.GET_MEMBERS_REQUEST,
                error: null,
            }
        case actionTypes.GET_MEMBERS_SUCCESS:
            return {
                status: actionTypes.GET_MEMBERS_SUCCESS,
                members: action.payload,
                error: null,
            }
        case actionTypes.GET_MEMBERS_FAILURE:
            return {
                ...initialState,
                status: actionTypes.GET_MEMBERS_FAILURE,
                error: action.payload.error ? action.payload.error : "Cound't get members data",
            }
        default:
            return state
    }
}

export default members
