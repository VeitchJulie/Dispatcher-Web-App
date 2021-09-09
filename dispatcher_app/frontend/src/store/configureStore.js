import {createStore, combineReducers} from 'redux'
import teamReducer from '../reducers/team'
// import sendReducer from '../reducers/operation'
import teamsReducer from '../reducers/teams'

const store  =  () => {
    const store = createStore(
        combineReducers({
            team: teamReducer,
            // teamState: sendReducer,
            teams: teamsReducer,
        })
    )

    return store
}

export default store
