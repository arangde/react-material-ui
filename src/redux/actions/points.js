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

export const getPointItem = (id) => async (dispatch) => {
    dispatch({ type: actionTypes.GET_POINTITEM_REQUEST })

    const response = await api.get(`/items/${id}`)

    if (response.status === 200) {
        dispatch({ type: actionTypes.GET_POINTITEM_SUCCESS, payload: response.data })
    } else {
        dispatch({ type: actionTypes.GET_POINTITEM_FAILURE, payload: response })
    }
}

export const getPointItems = () => async (dispatch) => {
    dispatch({ type: actionTypes.GET_POINTITEMS_REQUEST })

    const response = await api.get('/items')
    if (response.status === 200) {
        dispatch({ type: actionTypes.GET_POINTITEMS_SUCCESS, payload: response.data })
    } else {
        dispatch({ type: actionTypes.GET_POINTITEMS_FAILURE, payload: response })
    }
}

export const getPointSale = (id) => async (dispatch) => {
    dispatch({ type: actionTypes.GET_POINTSALE_REQUEST })

    const response = await api.get(`/pointSales/${id}`)

    if (response.status === 200) {
        dispatch({ type: actionTypes.GET_POINTSALE_SUCCESS, payload: response.data })
    } else {
        dispatch({ type: actionTypes.GET_POINTSALE_FAILURE, payload: response })
    }
}

export const getPointSales = () => async (dispatch) => {
    dispatch({ type: actionTypes.GET_POINTSALES_REQUEST })

    const response = await api.get('/pointSales')
    if (response.status === 200) {
        dispatch({ type: actionTypes.GET_POINTSALES_SUCCESS, payload: response.data })
    } else {
        dispatch({ type: actionTypes.GET_POINTSALES_FAILURE, payload: response })
    }
}

export const createPointItem = (item) => async (dispatch) => {
    dispatch({ type: actionTypes.CREATE_POINTITEM_REQUEST })

    const response = await api.post('/items', item)

    if (response.status === 201) {
        dispatch({ type: actionTypes.CREATE_POINTITEM_SUCCESS, payload: response.data })
    } else {
        dispatch({ type: actionTypes.CREATE_POINTITEM_FAILURE, payload: response })
    }
}

export const updatePointItem = ({ id, ...item }) => async (dispatch) => {
    dispatch({ type: actionTypes.UPDATE_POINTITEM_REQUEST })

    const response = await api.put(`/items/${id}`, item)

    if (response.status === 200) {
        dispatch({ type: actionTypes.UPDATE_POINTITEM_SUCCESS, payload: response.data })
    } else {
        dispatch({ type: actionTypes.UPDATE_POINTITEM_FAILURE, payload: response })
    }
}

export const deletePointItem = (id) => async (dispatch) => {
    dispatch({ type: actionTypes.DELETE_POINTITEM_REQUEST })

    const response = await api.delete(`/items/${id}`)

    if (response.status === 200) {
        dispatch({ type: actionTypes.DELETE_POINTITEM_SUCCESS, payload: { id } })
    } else {
        dispatch({ type: actionTypes.DELETE_POINTITEM_FAILURE, payload: response })
    }
}

export const processpointSale = (id, accepted, options) => async (dispatch) => {
    dispatch({ type: actionTypes.PROCESS_POINTSALE_REQUEST })

    const url = accepted ? `/pointSales/${id}/accept` : `/pointSales/${id}/reject`
    const response = await api.post(url, options)

    if (response.status === 200) {
        const { member, ...pointSale } = response.data
        dispatch({ type: actionTypes.PROCESS_POINTSALE_SUCCESS, payload: { member, pointSale } })
    } else {
        dispatch({ type: actionTypes.PROCESS_POINTSALE_FAILURE, payload: response })
    }
}