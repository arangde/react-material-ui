import * as actionTypes from 'redux/actionTypes'
import * as R from 'ramda'

const initialState = {
    status: null,
    error: null,
    announcements: [],
    announcement: null,
}

function announcements(state = initialState, action) {
    let index

    switch (action.type) {
        case actionTypes.CHECKED_ANNOUNCEMENT_REQUEST:
            return {
                ...state,
                status: action.type,
                error: null,
            }
        case actionTypes.CHECKED_ANNOUNCEMENT_SUCCESS:
            return {
                status: action.type,
                error: null,
            }
        case actionTypes.CHECKED_ANNOUNCEMENT_FAILURE:
            return {
                ...initialState,
                status: action.type,
                error: action.payload.error ? action.payload.error : "waiting for...",
            }
        case actionTypes.GET_ANNOUNCEMENTS_REQUEST:
            return {
                ...state,
                status: action.type,
                error: null,
            }
        case actionTypes.GET_ANNOUNCEMENTS_SUCCESS:
            return {
                status: action.type,
                announcements: action.payload,
                error: null,
            }
        case actionTypes.GET_ANNOUNCEMENTS_FAILURE:
            return {
                ...initialState,
                status: action.type,
                error: action.payload.error ? action.payload.error : "Cound't get announcements data",
            }
        case actionTypes.GET_ANNOUNCEMENT_SUCCESS:
            return {
                ...state,
                status: action.type,
                announcement: action.payload,
            }
        case actionTypes.GET_ANNOUNCEMENT_FAILURE:
            return {
                ...state,
                status: action.type,
                error: action.payload.error ? action.payload.error : "Cound't get announcement data",
            }
        case actionTypes.CREATE_ANNOUNCEMENT_REQUEST:
        case actionTypes.GET_ANNOUNCEMENT_REQUEST:
        case actionTypes.UPDATE_ANNOUNCEMENT_REQUEST:
        case actionTypes.DELETE_ANNOUNCEMENT_REQUEST:
            return {
                ...state,
                status: action.type,
                announcement: null,
                error: null,
            }
        case actionTypes.CREATE_ANNOUNCEMENT_SUCCESS:
            return {
                ...state,
                status: action.type,
                announcement: action.payload,
                announcements: [...state.announcements, action.payload],
                error: null,
            }
        case actionTypes.CREATE_ANNOUNCEMENT_FAILURE:
            return {
                ...state,
                status: action.type,
                error: action.payload.error ? action.payload.error : "Cound't create announcement",
            }
        case actionTypes.UPDATE_ANNOUNCEMENT_SUCCESS:
            index = R.findIndex(R.propEq('id', action.payload.id))(state.announcements)
            if (index === -1) {
                return {
                    ...state,
                    status: action.type,
                    announcement: action.payload,
                }
            } else {
                state.announcements[index] = action.payload
                return {
                    ...state,
                    status: action.type,
                    announcement: action.payload,
                    announcements: [...state.announcements]
                }
            }
        case actionTypes.UPDATE_ANNOUNCEMENT_FAILURE:
            return {
                ...state,
                status: action.type,
                error: action.payload.error ? action.payload.error : "Cound't update announcement data",
            }
        case actionTypes.DELETE_ANNOUNCEMENT_SUCCESS:
            index = R.findIndex(R.propEq('id', action.payload.id))(state.announcements)
            if (index === -1) {
                return {
                    ...state,
                    status: action.type,
                }
            } else {
                return {
                    ...state,
                    status: action.type,
                    announcement: action.payload,
                    announcements: R.remove(index, 1, state.announcements)
                }
            }
        case actionTypes.DELETE_ANNOUNCEMENT_FAILURE:
            return {
                ...state,
                status: action.type,
                error: action.payload.error ? action.payload.error : "Cound't delete announcement data",
            }
        default:
            return state
    }
}

export default announcements
