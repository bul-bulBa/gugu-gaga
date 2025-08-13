import globalState from './globalState'
import reducer from './reducer'
import {messagesPageReducer, addMessageDispatcher, changeMessageDraftDispatcher} from './reducers/messagesPageReduser'
import {profilePageReducer, addPostDispatcher, changePostDispatcher} from './reducers/profilePageReducer'
import { createContext, useContext, useReducer } from 'react'


const StateContext = createContext();

export function StateComponent({children}) {
    // const [state, dispatch] = useReducer(reducer, globalState);

    const [messagesState, messagesDispatch] = useReducer(messagesPageReducer, globalState.messagesArr);
    const [myPostsState, postsDispatch] = useReducer(profilePageReducer, globalState.postsObj);
    
    const actions = {
        postDraft: changePostDispatcher(postsDispatch),
        addPost: addPostDispatcher(postsDispatch),
        messageDraft: changeMessageDraftDispatcher(messagesDispatch),
        addMessage: addMessageDispatcher(messagesDispatch)
    }


    return (
        <StateContext.Provider value={{
            messagesState,
            myPostsState,
            actions
        }} >
            {children}
        </StateContext.Provider>
    )
}

export const useGlobalState = () => useContext(StateContext);