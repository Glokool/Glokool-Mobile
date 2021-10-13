const SET_KEYBOARD_HEIGHT = 'model/chat/set_keyboard_height' as const;
const CLEAN_KEYBOARD_HEIGHT = 'model/chat/clean_keyboard_height as const' as const;

const SET_KEYBOARD_TRUE = 'model/chat/set_keyboard_true' as const;
const SET_KEYBOARD_FALSE = 'model/chat/set_keyboard_false' as const;


export const setKeyboardHeight = (diff : number) => ({
    type: SET_KEYBOARD_HEIGHT,
    payload : diff
})

export const cleanKeyboardHeight = () => ({
    type : CLEAN_KEYBOARD_HEIGHT
})

export const setKeyboardTrue = () => ({
    type : SET_KEYBOARD_TRUE
})

export const setKeyboardFalse = () => ({
    type : SET_KEYBOARD_FALSE
})

type ChatKeyboardAction = 
    | ReturnType <typeof setKeyboardHeight>
    | ReturnType <typeof cleanKeyboardHeight>
    | ReturnType <typeof setKeyboardTrue>
    | ReturnType <typeof setKeyboardFalse>

type ChatKeyboardState = {
    keyboardOpen : boolean;
    keyboardHeight : number;
}

const initialChatKeyboardState : ChatKeyboardState = {
    keyboardHeight : 0,
    keyboardOpen : false
}

function ChatKeyboardModel  (
    state: ChatKeyboardState = initialChatKeyboardState,
    action: ChatKeyboardAction
): ChatKeyboardState {

    switch(action.type) {

        case SET_KEYBOARD_FALSE : return { keyboardOpen : false, keyboardHeight : state.keyboardHeight }
        case SET_KEYBOARD_TRUE  : return { keyboardOpen : true, keyboardHeight : state.keyboardHeight }
        case SET_KEYBOARD_HEIGHT  : return { keyboardOpen : state.keyboardOpen, keyboardHeight : action.payload }
        case CLEAN_KEYBOARD_HEIGHT  : return { keyboardOpen : state.keyboardOpen, keyboardHeight : 0 }

        default : return state
    }

}

export default ChatKeyboardModel