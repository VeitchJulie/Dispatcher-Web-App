import {createStore, combineReducers} from 'redux'
import teamReducer from '../reducers/team'

const store  =  () => {
    const store = createStore(
        combineReducers({
            team: teamReducer
        })
    )

    return store
}

export default store
