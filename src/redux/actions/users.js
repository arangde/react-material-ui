import * as actionTypes from 'redux/actionTypes'
import api from 'utils/api'

export const getUsers = () => async (dispatch) => {
    dispatch({ type: actionTypes.GET_USERS_REQUEST })

    const response = await api.get('/users')

    if (response.status === 200) {
        dispatch({ type: actionTypes.GET_USERS_SUCCESS, payload: response.data })
    } else {
        dispatch({ type: actionTypes.GET_USERS_FAILURE, payload: response })
    }
}
