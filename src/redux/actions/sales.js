import * as actionTypes from 'redux/actionTypes'
import api from 'utils/api'

export const getSales = () => async (dispatch) => {
    dispatch({ type: actionTypes.GET_SALES_REQUEST })

    const response = await api.get('/sales')

    if (response.status === 200) {
        dispatch({ type: actionTypes.GET_SALES_SUCCESS, payload: response.data })
    } else {
        dispatch({ type: actionTypes.GET_SALES_FAILURE, payload: response })
    }
}

