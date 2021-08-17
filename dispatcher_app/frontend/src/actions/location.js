export const setLocation =  (
    {
        id = 123,
        lat = 52.198,
        long = 20.998,
        state = 'Busy'
        } = {}
) => ({
    type: 'SET_CURRENT_LOCATION',
    location : {
        id,
        lat,
        long,
        state
    }
});