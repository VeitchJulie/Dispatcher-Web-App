export const setCurrentTeam = (
    {
        id = null,
    } = {}
) => ({
    type: 'SET_CURRENT_TEAM',
    team: {
        id,
    }
})

export const sendTeam = (
    {
        id = null,
        sendTeam = true,
    } = {}
) => ({
    type: 'SEND_TEAM',
    team: {
        id, 
        sendTeam
    }
})

export const choseTeam = (
    {
        id = null,
        choseTeam = true,
    } = {}
) => ({
    type: 'CHOSE_TEAM',
    team: {
        id,
        choseTeam
    }
})

export const cancelTeam = (
    {
        id = null,
        sendTeam = false,
        choseTeam = false,
    } = {}
) => ({
    type: 'CANCEL_TEAM',
    team: {
        id, 
        sendTeam,
        choseTeam
    }
})

export const showRouting = (
    {
        id = null,
        showRouting = true,
    }= {}
) =>  ({
    type: 'SHOW ROUTING',
    team: {
        id,
        showRouting
    }
})

export const hideRouting = (
    {
        id = null,
        showRouting = false,
    }= {}
) =>  ({
    type: 'HIDE ROUTING',
    team: {
        id,
        showRouting
    }
})

// export const setLocation =  (
//     {
//         id = 123,
//         top_id = 'ID1111',
//         lat = 52.198,
//         long = 20.998,
//         state = 'Busy'
//         } = {}
// ) => ({
//     type: 'SET_CURRENT_LOCATION',
//     location : {
//         id,
//         top_id,
//         lat,
//         long,
//         state
//     }
// })

// export const setOperation =  (
//     {
//         id = 123,
//         endLat = 52.198,
//         endLong = 20.998,
//         } = {}
// ) => ({
//     type: 'SET_END_LOCATION',
//     location : {
//         id,
//         endLat,
//         endLong
//     }
// })

// export const setState =  (
//     {
//         state = ''
//         } = {}
// ) => ({
//     type: 'SET_CURRENT_STATE',
//     location : {
//         state
//     }
// })