import * as actionTypes from 'redux/actionTypes'

const initialState = {
    status: null,
    error: '',
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
                error: action.payload.error ? action.payload.error : "Cound't find required member's data",
            }
        default:
            return state
    }
}

export default members
