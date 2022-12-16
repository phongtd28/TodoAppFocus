import { combineReducers } from 'redux'
import homePageReducer from '../HomepageReducer'
import loginPageReducer from '../LoginReducer'
import registerPageReducer from '../RegisterReducer'

const rootReducer = combineReducers({
    homePageReducer,
    loginPageReducer,
    registerPageReducer
})
export default rootReducer
