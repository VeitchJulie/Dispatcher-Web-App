const teamState = {
    sendTeam: false,
    teamId: '',
}

const sendReducer =  (state = teamState, action) => {
    switch(action.type){
        case 'SEND_TEAM':
            return {
                ...state,
                sendTeam: action.teamState.sendTeam,
                teamId: action.teamState.teamId,
            }
        default:
            return state
    }
}

export default sendReducer