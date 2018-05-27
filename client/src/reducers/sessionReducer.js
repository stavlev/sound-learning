const INITIAL_STATE = {
    authUser: null,
    dbUser: null,
};

const applySetAuthUser = (state, action) => ({
    ...state,
    authUser: action.authUser
});

const applySetdbUser = (state, action) => ({
    ...state,
    dbUser: action.dbUser
});

function sessionReducer(state = INITIAL_STATE, action) {
    switch(action.type) {
        case 'AUTH_USER_SET' : {
            return applySetAuthUser(state, action);
        }
        case 'DB_USER_SET': {
            return applySetdbUser(state, action);
        }
        default : return state;
    }
}

export default sessionReducer;