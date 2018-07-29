import * as actionTypes from 'redux/actionTypes'

const initialState = {
    status: null,
    error: null,
    member: null,
    incomes: [],
    points: [],
    sales: [],
    referers: [],
    withdrawals: [],
}

function profile(state = initialState, action) {
    switch (action.type) {
        case actionTypes.GET_PROFILE_REQUEST:
            return {
                ...initialState,
                status: action.type,
            }
        case actionTypes.GET_PROFILE_SUCCESS:
            const { incomes, points, sales, referers, withdrawals, ...member } = action.payload
            return {
                status: action.type,
                incomes, points, sales, referers, withdrawals, member,
            }
        case actionTypes.GET_PROFILE_FAILURE:
            return {
                ...state,
                status: action.type,
                error: action.payload.error ? action.payload.error : "Cound't get profile data",
            }
        case actionTypes.SAVE_PROFILE_REQUEST:
            return {
                ...state,
                status: action.type,
                error: null,
            }
        case actionTypes.SAVE_PROFILE_SUCCESS:
            return {
                ...state,
                status: action.type,
                member: action.payload,
            }
        case actionTypes.SAVE_PROFILE_FAILURE:
            return {
                ...state,
                status: action.type,
                error: action.payload.error ? action.payload.error : "Cound't save profile data",
            }
        case actionTypes.CREATE_WITHDRAWAL_SUCCESS:
            return {
                ...state,
                withdrawals: [...state.withdrawals, action.payload],
            }

        default:
            return state
    }
}

export default profile