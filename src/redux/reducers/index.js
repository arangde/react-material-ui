import { combineReducers } from 'redux'
// import { routerReducer } from 'react-router-redux'
import auth from './auth'
import members from './members'
import sales from './sales'
import withdrawals from './withdrawals'
import users from './users'
import settings from './settings'
import dashboard from './dashboard'
import profile from './profile'

const rootReducer = combineReducers({
    auth,
    members,
    sales,
    withdrawals,
    users,
    settings,
    dashboard,
    profile,
    // router: routerReducer,
})

export default rootReducer
