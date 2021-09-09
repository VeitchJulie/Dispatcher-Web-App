const teamsDefaultState = [];

const teamsReducer =  (state = teamsDefaultState, action) => {
    switch(action.type){
        case 'DOWNLOAD_TEAMS':
            return [
                ...state, 
                action.payload
            ];
        default:
            return state
    }
}

export default teamsReducer

