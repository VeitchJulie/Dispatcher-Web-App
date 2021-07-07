const locationDefaultState = {
    id: '',
    lat: '',
    long: '',
};

const locationReducer =  (state = locationDefaultState, action) => {
    switch(action.type){
        case 'SET_CURRENT_LOCATION':
            return {
                ...state,
                id: action.location.id,
                lat: action.location.lat,
                long: action.location.long
            }
        default:
            return state
    }
}

export default locationReducer