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

