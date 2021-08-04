import {createStore, combineReducers} from 'redux'
import locationReducer from '../reducers/location'
import sendReducer from '../reducers/operation'
// import teamReducer from '../reducers/teams'

const store  =  () => {
    const store = createStore(
        combineReducers({
            location: locationReducer,
            teamState: sendReducer,
            // teams: teamReducer,
        })
    )

    return store
}

export default store
