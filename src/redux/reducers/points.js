import * as actionTypes from 'redux/actionTypes'

const initialState = {
    status: null,
    error: null,
    points: [],
}

function points(state = initialState, action) {
    switch (action.type) {
        case actionTypes.GET_POINTS_REQUEST:
            return {
                ...state,
                status: actionTypes.GET_POINTS_REQUEST,
                error: null,
            }
        case actionTypes.GET_POINTS_SUCCESS:
            return {
                status: actionTypes.GET_POINTS_SUCCESS,
                points: action.payload,
                error: null,
            }
        case actionTypes.GET_POINTS_FAILURE:
            return {
                ...initialState,
                status: actionTypes.GET_POINTS_FAILURE,
                error: action.payload.error ? action.payload.error : "Cound't get points data",
            }
        default:
            return state
    }
}

export default points
