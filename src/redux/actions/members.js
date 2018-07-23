import * as actionTypes from 'redux/actionTypes'
import api from 'utils/api'

export const getMembers = () => async (dispatch) => {
    dispatch({ type: actionTypes.GET_MEMBERS_REQUEST })

    const response = await api.get('/members')

    if (response.status === 200) {
        dispatch({ type: actionTypes.GET_MEMBERS_SUCCESS, payload: response.data })
    } else {
        dispatch({ type: actionTypes.GET_MEMBERS_FAILURE, payload: response })
    }
}

export const getMember = (id) => async (dispatch) => {
    dispatch({ type: actionTypes.GET_MEMBER_REQUEST })

    const response = await api.get(`/members/${id}`)

    if (response.status === 200) {
        dispatch({ type: actionTypes.GET_MEMBER_SUCCESS, payload: response.data })
    } else {
        dispatch({ type: actionTypes.GET_MEMBER_FAILURE, payload: response })
    }
}

export const createMember = (member) => async (dispatch) => {
    dispatch({ type: actionTypes.CREATE_MEMBER_REQUEST })

    const response = await api.post('/members', member)

    if (response.status === 201) {
        dispatch({ type: actionTypes.CREATE_MEMBER_SUCCESS, payload: response.data })
    } else {
        dispatch({ type: actionTypes.CREATE_MEMBER_FAILURE, payload: response })
    }
}

export const updateMember = ({ id, ...member }) => async (dispatch) => {
    dispatch({ type: actionTypes.UPDATE_MEMBER_REQUEST })

    const response = await api.put(`/members/${id}`, member)

    if (response.status === 200) {
        dispatch({ type: actionTypes.UPDATE_MEMBER_SUCCESS, payload: response.data })
    } else {
        dispatch({ type: actionTypes.UPDATE_MEMBER_FAILURE, payload: response })
    }
}

export const deleteMember = (id) => async (dispatch) => {
    dispatch({ type: actionTypes.DELETE_MEMBER_REQUEST })

    const response = await api.delete(`/members/${id}`)

    if (response.status === 200) {
        dispatch({ type: actionTypes.DELETE_MEMBER_SUCCESS, payload: { id } })
    } else {
        dispatch({ type: actionTypes.DELETE_MEMBER_FAILURE, payload: response })
    }
}
