import * as actionTypes from 'redux/actionTypes'
import * as R from 'ramda'

const initialState = {
    status: null,
    error: null,
    points: [],
    items: [],
    item: null,
    pointSales: [],
    pointSale: null
}

function points(state = initialState, action) {
    let index

    switch (action.type) {
        case actionTypes.GET_POINTS_REQUEST:
        case actionTypes.CREATE_POINTITEM_REQUEST:
        case actionTypes.UPDATE_POINTITEM_REQUEST:
        case actionTypes.GET_POINTITEM_REQUEST:
        case actionTypes.DELETE_POINTITEM_REQUEST:
        case actionTypes.GET_POINTITEMS_REQUEST:
        case actionTypes.GET_POINTSALE_REQUEST:
        case actionTypes.GET_POINTSALES_REQUEST:
            return {
                ...state,
                status: action.type,
                error: null,
            }
        case actionTypes.GET_POINTS_SUCCESS:
            return {
                ...state,
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
        case actionTypes.GET_POINTITEMS_SUCCESS:
            return {
                ...state,
                status: actionTypes.GET_POINTITEMS_SUCCESS,
                items: action.payload,
                error: null,
            }
        case actionTypes.GET_POINTITEMS_FAILURE:
            return {
                ...initialState,
                status: actionTypes.GET_POINTITEMS_FAILURE,
                error: action.payload.error ? action.payload.error : "Cound't get point items data",
            }
        case actionTypes.GET_POINTITEM_SUCCESS:
            return {
                ...state,
                status: actionTypes.GET_POINTITEM_SUCCESS,
                item: action.payload,
                error: null,
            }
        case actionTypes.GET_POINTITEM_FAILURE:
            return {
                ...initialState,
                status: actionTypes.GET_POINTITEMS_FAILURE,
                error: action.payload.error ? action.payload.error : "Cound't get point item data",
            }
        case actionTypes.GET_POINTSALE_SUCCESS:
            return {
                ...state,
                status: actionTypes.GET_POINTSALE_SUCCESS,
                pointSale: action.payload,
                error: null,
            }
        case actionTypes.GET_POINTSALE_FAILURE:
            return {
                ...initialState,
                status: actionTypes.GET_POINTSALE_FAILURE,
                error: action.payload.error ? action.payload.error : "Cound't get point sale data",
            }
        case actionTypes.GET_POINTSALES_SUCCESS:
            return {
                ...state,
                status: actionTypes.GET_POINTSALES_SUCCESS,
                pointSales: action.payload,
                error: null,
            }
        case actionTypes.GET_POINTSALES_FAILURE:
            return {
                ...initialState,
                status: actionTypes.GET_POINTSALES_FAILURE,
                error: action.payload.error ? action.payload.error : "Cound't get point sales data",
            }
        case actionTypes.CREATE_POINTITEM_SUCCESS:
            return {
                ...state,
                status: action.type,
                user: action.payload,
                items: [...state.items, action.payload],
                error: null,
            }
        case actionTypes.CREATE_POINTITEM_FAILURE:
            return {
                ...state,
                status: action.type,
                error: action.payload.error ? action.payload.error : "Cound't create point item",
            }
        case actionTypes.UPDATE_POINTITEM_SUCCESS:
            index = R.findIndex(R.propEq('id', action.payload.id))(state.points)
            if (index === -1) {
                return {
                    ...state,
                    status: action.type,
                    item: action.payload,
                }
            } else {
                state.items[index] = action.payload
                return {
                    ...state,
                    status: action.type,
                    item: action.payload,
                    items: [...state.items]
                }
            }
        case actionTypes.UPDATE_POINTITEM_FAILURE:
            return {
                ...state,
                status: action.type,
                error: action.payload.error ? action.payload.error : "Cound't update user data",
            }
        case actionTypes.DELETE_POINTITEM_SUCCESS:
            index = R.findIndex(R.propEq('id', action.payload.id))(state.items)
            if (index === -1) {
                return {
                    ...state,
                    status: action.type,
                }
            } else {
                return {
                    ...state,
                    status: action.type,
                    item: action.payload,
                    items: R.remove(index, 1, state.items)
                }
            }
        case actionTypes.DELETE_POINTITEM_FAILURE:
            return {
                ...state,
                status: action.type,
                error: action.payload.error ? action.payload.error : "Cound't delete user data",
            }
        case actionTypes.PROCESS_POINTSALE_SUCCESS:
            index = R.findIndex(R.propEq('id', action.payload.id))(state.points)
            if (index === -1) {
                return {
                    ...state,
                    status: action.type,
                    pointSale: action.payload.pointSale,
                }
            } else {
                state.pointSales[index] = action.payload.pointSale
                return {
                    ...state,
                    status: action.type,
                    pointSale: action.payload.pointSale,
                    pointSales: [...state.pointSales]
                }
            }
        case actionTypes.PROCESS_POINTSALE_FAILURE:
            return {
                ...state,
                status: action.type,
                error: action.payload.error ? action.payload.error : "Cound't update pointSale data",
            }
        default:
            return state
    }
}

export default points
