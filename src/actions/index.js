// import { formValues } from "redux-form";
import stories from "../api/stories";
import history from "../history";

export const signIn = (userId) => {
    return {
        type: 'SIGN_IN',
        payload: userId
    }
}

export const signOut = () => {
    return {
        type: 'SIGN_OUT'
    }
}
// CREATE
export const createStory = formValues => async (dispatch, getState) => {
    const { userId, firstName } = getState().auth;
    const response = await stories.post('/stories', { ...formValues, userId, firstName });
    dispatch({ type: 'CREATE_STORY', payload: response.data });
    history.push('/');
}
// READ ALL
export const fetchStories = () => async dispatch => {
    const response = await stories.get('/stories');
    dispatch({ type: 'FETCH_STORIES', payload: response.data });
}
//READ ONE
export const fetchStory = (id) => async dispatch => {
    const response = await stories.get(`/stories/${id}`);
    dispatch({ type: 'FETCH_STORY', payload: response.data });
}
//EDIT
export const editStory = (id, formValues) => async dispatch => {
    const response = await stories.patch(`/stories/${id}`, formValues);
    dispatch({ type: 'EDIT_STORY', payload: response.data });
    history.push('/');
}
//DELETE
export const deleteStory = (id) => async dispatch => {
    await stories.delete(`/stories/${id}`);
    dispatch({ type: 'DELETE_STORY', payload: id });
    history.push('/');
}
