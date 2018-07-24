import * as actionTypes from 'redux/actionTypes'
import api from 'utils/api'

export const getWithdrawalList = () => async (dispatch) => {
    dispatch({ type: actionTypes.GET_WITHDRAWALS_REQUEST })

    const response = await api.get('/withdrawals')

    if (response.status === 200) {
        dispatch({ type: actionTypes.GET_WITHDRAWALS_SUCCESS, payload: response.data })
    } else {
        dispatch({ type: actionTypes.GET_WITHDRAWALS_FAILURE, payload: response })
    }
}