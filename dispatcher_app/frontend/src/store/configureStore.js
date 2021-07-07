import {createStore, combineReducers} from 'redux'
import locationReducer from '../reducers/location'
// import teamReducer from '../reducers/teams'

const store  =  () => {
    const store = createStore(
        combineReducers({
            location: locationReducer,
            // teams: teamReducer,
        })
    )

    return store
}

export default store
