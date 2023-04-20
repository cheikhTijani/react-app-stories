import _ from "lodash";

const storyReducer = (state = {}, action) => {
    switch (action.type) {
        case 'CREATE_STORY':
            return { ...state, [action.payload.id]: action.payload };
        case 'FETCH_STORIES':
            return { ...state, ..._.mapKeys(action.payload, 'id') };
        case 'FETCH_STORY':
            return { ...state, [action.payload.id]: action.payload };
        case 'EDIT_STORY':
            return { ...state, [action.payload.id]: action.payload };
        case 'DELETE_STORY':
            return _.omit(state, action.payload);
        default:
            return state;
    }
}

export default storyReducer;