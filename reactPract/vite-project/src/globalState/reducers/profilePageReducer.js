const addPost = 'addPost';
const changePostDraft = 'changePostDraft';

export function profilePageReducer(state, action) {
    
    switch(action.type) {
        case addPost:
            return { ...state,
                myPostsArr: [...state.myPostsArr, {message: state.myPostsArrDraft, likes: 0, id: state.myPostsArr.length + 1}],
                myPostsArrDraft: ''
            }
        case changePostDraft: 
            return {
                ...state,
                myPostsArrDraft: action.payload
            };
        default:
            return state;
    }
}

export const addPostDispatcher = dispatch => () => dispatch({type: addPost});
export const changePostDispatcher = dispatch => text => dispatch({type: changePostDraft, payload: text})