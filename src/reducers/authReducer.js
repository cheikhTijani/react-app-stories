const INITIAL_STATE = {
    isSignedIn: sessionStorage.getItem('token'),
    userId: JSON.parse(sessionStorage.getItem('token'))?.sub,
    firstName: JSON.parse(sessionStorage.getItem('token'))?.given_name
};

const authReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'SIGN_IN':
            return {
                ...state, isSignedIn: true,
                userId: action.payload.sub,
                firstName: action.payload.given_name
            }
        case 'SIGN_OUT':
            return { ...state, isSignedIn: false, userId: null, firstName: null }
        default:
            return state;
    }
};

export default authReducer;