import { combineReducers } from 'redux'
// import { routerReducer } from 'react-router-redux'
import auth from './auth'
import members from './members'
import sales from './sales'
import withdrawals from './withdrawals'
import settings from './settings'
import dashboard from './dashboard'

const rootReducer = combineReducers({
    auth,
    members,
    sales,
    withdrawals,
    settings,
    dashboard,
    // router: routerReducer,
})

export default rootReducer
