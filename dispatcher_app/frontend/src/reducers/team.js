const teamDefaultState = {
    id: '',
    sendTeam: false,
    showRouting: false,
    choseTeam: false,
}

const teamReducer = (state = teamDefaultState, action) => {
    switch(action.type){
        case 'SET_CURRENT_TEAM':
            return {
                ...state,
                id: action.team.id,
            }
        case 'SEND_TEAM':
            return{
                ...state,
                id: action.team.id,
                sendTeam: true,
            }
        case 'CANCEL_TEAM':
            return{
                ...state,
                id: action.team.id,
                sendTeam: false
            }
        case 'SHOW ROUTING':
            return{
                ...state,
                id: action.team.id,
                showRouting: true
            }
        case 'HIDE ROUTING':
            return{
                ...state,
                id:action.team.id,
                showRouting: false
            }
        case 'CHOSE_TEAM':
            return{
                ...state,
                id:action.team.id,
                choseTeam: true
            }
        default:
            return state
    }
}


// const locationDefaultState = {
//     id: '',
//     top_id: '',
//     lat: '',
//     long:  '',
//     endLat: '',
//     endLong: '',
//     state: '',
// };

// const locationReducer =  (state = locationDefaultState, action) => {
//     switch(action.type){
//         case 'SET_CURRENT_LOCATION':
//             return {
//                 ...state,
//                 id: action.location.id,
//                 top_id: action.location.top_id,
//                 lat: action.location.lat,
//                 long: action.location.long,
//                 state: action.location.state
//             }
//         case 'SET_END_LOCATION':
//             return {
//                 ...state,
//                 endLat: action.location.endLat,
//                 endLong: action.location.endLong
//             }
//         // case 'SET_CURRENT_STATE':
//         //     return {
//         //         ...state,
//         //         state: action.location.state
//         //     }
//         default:
//             return state
//     }
// }

export default teamReducer