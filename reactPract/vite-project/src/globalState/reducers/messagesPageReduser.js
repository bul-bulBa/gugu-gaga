const addMessage = 'addMessage';
const changeMessageDraft = 'changeMessageDraft';


export function messagesPageReducer(state, action) {

    switch(action.type) {
        case addMessage:
            return {
                ...state,
                [action.payload]: {
                    ...state[action.payload],
                    mes:[
                    ...state[action.payload].mes, 
                    state[action.payload].draft],
                    draft: ''
                }
            };
        case changeMessageDraft:
            return {
                ...state,
                [action.payload.id]: {
                    ...state[action.payload.id],
                    draft: action.payload.message
                }
            }
    }
}

export const addMessageDispatcher = dispatch => (id) => dispatch({type: addMessage, payload: id})
export const changeMessageDraftDispatcher = dispatch => (id, text) =>
    dispatch({type: changeMessageDraft, payload: {id: id, message: text}} )