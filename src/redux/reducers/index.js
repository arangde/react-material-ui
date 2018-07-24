import { combineReducers } from 'redux'
// import { routerReducer } from 'react-router-redux'
import auth from './auth'
import members from './members'
import sales from './sales'
import withdrawals from './withdrawals'

const rootReducer = combineReducers({
    auth,
    members,
    sales,
    withdrawals,
    // router: routerReducer,
})

export default rootReducer
