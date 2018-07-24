import * as actionTypes from 'redux/actionTypes'
import * as R from 'ramda'

const initialState = {
    status: null,
    error: null,
    members: [],
    member: null,
    incomes: [],
    points: [],
    withdrawals: [],
}

function members(state = initialState, action) {
    let index

    switch (action.type) {
        case actionTypes.GET_MEMBERS_REQUEST:
            return {
                ...state,
                status: action.type,
                members: [],
                error: null,
            }
        case actionTypes.GET_MEMBERS_SUCCESS:
            return {
                ...state,
                status: action.type,
                members: action.payload,
            }
        case actionTypes.GET_MEMBERS_FAILURE:
            return {
                ...state,
                status: action.type,
                error: action.payload.error ? action.payload.error : "Cound't get members data",
            }
        case actionTypes.GET_MEMBER_REQUEST:
        case actionTypes.CREATE_MEMBER_REQUEST:
        case actionTypes.UPDATE_MEMBER_REQUEST:
        case actionTypes.DELETE_MEMBER_REQUEST:
            return {
                ...state,
                status: action.type,
                member: null,
                error: null,
            }
        case actionTypes.GET_MEMBER_SUCCESS:
            return {
                ...state,
                status: action.type,
                member: action.payload,
            }
        case actionTypes.GET_MEMBER_FAILURE:
            return {
                ...state,
                status: action.type,
                error: action.payload.error ? action.payload.error : "Cound't get member data",
            }
        case actionTypes.CREATE_MEMBER_SUCCESS:
            return {
                ...state,
                status: action.type,
                member: action.payload,
                members: [...state.members, action.payload],
                error: null,
            }
        case actionTypes.CREATE_MEMBER_FAILURE:
            return {
                ...state,
                status: action.type,
                error: action.payload.error ? action.payload.error : "Cound't create member",
            }
        case actionTypes.UPDATE_MEMBER_SUCCESS:
            index = R.findIndex(R.propEq('id', action.payload.id))(state.members)
            if (index === -1) {
                return {
                    ...state,
                    status: action.type,
                    member: action.payload,
                }
            } else {
                state.members[index] = action.payload
                return {
                    ...state,
                    status: action.type,
                    member: action.payload,
                    members: [...state.members]
                }
            }
        case actionTypes.UPDATE_MEMBER_FAILURE:
            return {
                ...state,
                status: action.type,
                error: action.payload.error ? action.payload.error : "Cound't update member data",
            }
        case actionTypes.DELETE_MEMBER_SUCCESS:
            index = R.findIndex(R.propEq('id', action.payload.id))(state.members)
            if (index === -1) {
                return {
                    ...state,
                    status: action.type,
                }
            } else {
                return {
                    ...state,
                    status: action.type,
                    member: action.payload,
                    members: R.remove(index, 1, state.members)
                }
            }
        case actionTypes.DELETE_MEMBER_FAILURE:
            return {
                ...state,
                status: action.type,
                error: action.payload.error ? action.payload.error : "Cound't delete member data",
            }
        case actionTypes.GET_MEMBER_INCOMES_REQUEST:
            return {
                ...state,
                status: action.type,
                incomes: [],
                error: null,
            }
        case actionTypes.GET_MEMBER_INCOMES_SUCCESS:
            return {
                ...state,
                status: action.type,
                member: action.payload.member,
                incomes: action.payload.incomes,
            }
        case actionTypes.GET_MEMBER_INCOMES_FAILURE:
            return {
                ...state,
                status: action.type,
                error: action.payload.error ? action.payload.error : "Cound't get incomes data",
            }
        case actionTypes.GET_MEMBER_POINTS_REQUEST:
            return {
                ...state,
                status: action.type,
                points: [],
                error: null,
            }
        case actionTypes.GET_MEMBER_POINTS_SUCCESS:
            return {
                ...state,
                status: action.type,
                member: action.payload.member,
                points: action.payload.points,
            }
        case actionTypes.GET_MEMBER_POINTS_FAILURE:
            return {
                ...state,
                status: action.type,
                error: action.payload.error ? action.payload.error : "Cound't get points data",
            }
        case actionTypes.GET_MEMBER_WITHDRAWALS_REQUEST:
            return {
                ...state,
                status: action.type,
                withdrawals: [],
                error: null,
            }
        case actionTypes.GET_MEMBER_WITHDRAWALS_SUCCESS:
            return {
                ...state,
                status: action.type,
                member: action.payload.member,
                withdrawals: action.payload.withdrawals,
            }
        case actionTypes.GET_MEMBER_WITHDRAWALS_FAILURE:
            return {
                ...state,
                status: action.type,
                error: action.payload.error ? action.payload.error : "Cound't get withdrawals data",
            }
        case actionTypes.GET_WITHDRAWAL_SUCCESS:
            return {
                ...state,
                member: action.payload.member,
            }
        case actionTypes.PROCESS_WITHDRAWAL_SUCCESS:
            index = R.findIndex(R.propEq('id', action.payload.withdrawal.id))(state.withdrawals)
            if (index === -1) {
                return state
            } else {
                state.withdrawals[index] = action.payload.withdrawal
                return {
                    ...state,
                    member: action.payload.member,
                    withdrawals: [...state.withdrawals]
                }
            }
        default:
            return state
    }
}

export default members