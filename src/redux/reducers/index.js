import { combineReducers } from 'redux'
// import { routerReducer } from 'react-router-redux'
import auth from './auth'
import members from './members'
import sales from './sales'

const rootReducer = combineReducers({
    auth,
    members,
    sales,
    // router: routerReducer,
})

export default rootReducer
