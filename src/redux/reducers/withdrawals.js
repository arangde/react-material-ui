import * as actionTypes from 'redux/actionTypes'

const initialState = {
    status: null,
    error: null,
    withdrawals: [],
}

function withdrawals(state = initialState, action) {
    switch (action.type) {
        case actionTypes.GET_WITHDRAWALS_REQUEST:
            return {
                ...state,
                status: action.type,
                withdrawals: [],
                error: null,
            }
        case actionTypes.GET_WITHDRAWALS_SUCCESS:
            return {
                ...state,
                status: action.type,
                withdrawals: action.payload,
            }
        case actionTypes.GET_WITHDRAWALS_FAILURE:
            return {
                ...state,
                status: action.type,
                error: action.payload.error ? action.payload.error : "Cound't get withdrawals data",
            }
        default:
            return state
    }
}

export default withdrawals
