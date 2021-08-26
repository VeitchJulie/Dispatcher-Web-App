import {createStore, combineReducers} from 'redux'
import teamReducer from '../reducers/team'
// import sendReducer from '../reducers/operation'
// import teamReducer from '../reducers/teams'

const store  =  () => {
    const store = createStore(
        combineReducers({
            team: teamReducer,
            // teamState: sendReducer,
            // teams: teamReducer,
        })
    )

    return store
}

export default store
