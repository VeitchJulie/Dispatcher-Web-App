const teamsDefaultState = [];

const teamReducer =  (state = teamsDefaultState, action) => {
    switch(action.type){
        case 'DOWNLOAD_TEAMS':
            return [
                ...state, 
                action.teams
            ];
        default:
            return state
    }
}

export default teamReducer

