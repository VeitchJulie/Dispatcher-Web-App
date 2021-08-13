const teamState = {
    sendTeam: false,
    teamId: '',
    searchLat: '',
    searchLong: '',
}

const sendReducer =  (state = teamState, action) => {
    switch(action.type){
        case 'SEND_TEAM':
            return {
                ...state,
                sendTeam: action.teamState.sendTeam,
                teamId: action.teamState.teamId,
                searchLat: action.teamState.searchLat,
                searchLong: action.teamState.searchLong,
            }
        default:
            return state
    }
}

export default sendReducer