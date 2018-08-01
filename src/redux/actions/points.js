import * as actionTypes from 'redux/actionTypes'
import api from 'utils/api'

export const getPoints = () => async (dispatch) => {
    dispatch({ type: actionTypes.GET_POINTS_REQUEST })

    const response = await api.get('/points')

    if (response.status === 200) {
        dispatch({ type: actionTypes.GET_POINTS_SUCCESS, payload: response.data })
    } else {
        dispatch({ type: actionTypes.GET_POINTS_FAILURE, payload: response })
    }
}
