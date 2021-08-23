export const setLocation =  (
    {
        id = 123,
        top_id = 'ID1111',
        lat = 52.198,
        long = 20.998,
        state = 'Busy'
        } = {}
) => ({
    type: 'SET_CURRENT_LOCATION',
    location : {
        id,
        top_id,
        lat,
        long,
        state
    }
})

export const setOperation =  (
    {
        id = 123,
        endLat = 52.198,
        endLong = 20.998,
        } = {}
) => ({
    type: 'SET_END_LOCATION',
    location : {
        id,
        endLat,
        endLong
    }
})

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