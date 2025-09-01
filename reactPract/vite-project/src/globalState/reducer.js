// reduser це функція яка приймає 2 параметри(state(об'єтк з grobal state), action(це подія (onClick наприклад)
//  яка приймає у себе значення з стрілкової функції яку дію потрібно зробити)
// в середині знаходиться перевірка switch яка перевіряє значення action.type, в ній є такі варіанти: case: 'addPost' яка
// повертає об'єкт state з новим значенням або default(не вказано type події) повертає минулий об'єкт


export default function reducer(state, action) {
    
    switch(action.type) {
        case 'addPost':
            return { ...state,
                myPostsArr: [...state.myPostsArr, {message: state.myPostsArrDraft, likes: 0, id: state.myPostsArr.length + 1}],
                myPostsArrDraft: ''
            }
        case 'addMessage':
            return {
                ...state,
                messagesArr: {
                    ...state.messagesArr,
                    [action.payload]: {
                        ...state.messagesArr[action.payload],
                        mes:[
                        ...state.messagesArr[action.payload].mes, 
                        state.messagesArr[action.payload].draft],
                        draft: ''
                    }
                }
            };
        case 'changePostDraft': 
            return {...state,
                myPostsArrDraft: action.payload
            };
        case 'changeMessageDraft':
            return {...state,
                messagesArr: {
                    ...state.messagesArr,
                    [action.payload.id]: {
                        ...state.messagesArr[action.payload.id],
                        draft: action.payload.message
                    }
                }
            }
        default:
            return state;
    }
    
}