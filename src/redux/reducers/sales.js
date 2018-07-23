import * as actionTypes from 'redux/actionTypes'

const initialState = {
    status: null,
    error: '',
    sales: [],
}

function sales(state = initialState, action) {
    switch (action.type) {
        case actionTypes.GET_SALES_REQUEST:
            return {
                ...state,
                status: actionTypes.GET_SALES_REQUEST,
                error: null,
            }
        case actionTypes.GET_SALES_SUCCESS:
            return {
                status: actionTypes.GET_SALES_SUCCESS,
                sales: action.payload,
                error: null,
            }
        case actionTypes.GET_SALES_FAILURE:
            return {
                ...initialState,
                status: actionTypes.GET_SALES_FAILURE,
                error: action.payload.error ? action.payload.error : "Cound't find required sales data",
            }
        default:
            return state
    }
}

export default sales
