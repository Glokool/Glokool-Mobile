const SET_KEYBOARD_COMPONENT = 'model/chat/set_keyboard_component' as const;
const CLEAN_KEYBOARD_COMPONENT = 'model/chat/clean_keyboard_component' as const;
const SET_KEYBOARD_HEIGHT = 'model/chat/set_keyboard_height' as const;
const CLEAN_KEYBOARD_HEIGHT = 'model/chat/clean_keyboard_height' as const;
const SET_EMOJI_KEYBOARD_TRUE = 'model/chat/set_emoji_keyboard_true' as const;
const SET_EMOJI_KEYBOARD_FALSE = 'model/chat/set_emoji_keyboard_false' as const;


export const setKeyboardComponent = (diff: string) => ({
    type: SET_KEYBOARD_COMPONENT,
    payload: diff
})

export const cleanKeyboardComponent = () => ({
    type: CLEAN_KEYBOARD_COMPONENT
})

export const setKeyboardHeight = (diff: number) => ({
    type: SET_KEYBOARD_HEIGHT,
    payload: diff
})

export const cleanKeyboardHeight = () => ({
    type: CLEAN_KEYBOARD_HEIGHT
});

export const setEmojiKeyboardTrue = () => ({
    type : SET_EMOJI_KEYBOARD_TRUE
})

export const setEmojiKeyboardFalse = () => ({
    type : SET_EMOJI_KEYBOARD_FALSE
})

type ChatKeyboardAction =
    | ReturnType<typeof setKeyboardComponent>
    | ReturnType<typeof cleanKeyboardComponent>
    | ReturnType<typeof setKeyboardHeight>
    | ReturnType<typeof cleanKeyboardHeight>
    | ReturnType<typeof setEmojiKeyboardTrue>
    | ReturnType<typeof setEmojiKeyboardFalse>


type ChatKeyboardState = {
    keyboardComponent: string | undefined;
    keyboardHeight: number;
    emojiKeyboardVisiblity : boolean;
}

const initialChatKeyboardState: ChatKeyboardState = {
    keyboardComponent: undefined,
    keyboardHeight: 0,
    emojiKeyboardVisiblity : false
}

function ChatKeyboardModel(
    state: ChatKeyboardState = initialChatKeyboardState,
    action: ChatKeyboardAction
): ChatKeyboardState {

    switch (action.type) {

        case SET_KEYBOARD_COMPONENT: return { keyboardComponent: action.payload, keyboardHeight: state.keyboardHeight, emojiKeyboardVisiblity : state.emojiKeyboardVisiblity }
        case CLEAN_KEYBOARD_COMPONENT: return { keyboardComponent: undefined, keyboardHeight: state.keyboardHeight, emojiKeyboardVisiblity : state.emojiKeyboardVisiblity }
        case SET_KEYBOARD_HEIGHT: return { keyboardComponent: state.keyboardComponent, keyboardHeight: action.payload, emojiKeyboardVisiblity : state.emojiKeyboardVisiblity }
        case CLEAN_KEYBOARD_HEIGHT: return { keyboardComponent: state.keyboardComponent, keyboardHeight: 0, emojiKeyboardVisiblity : state.emojiKeyboardVisiblity }
        case SET_EMOJI_KEYBOARD_FALSE: return { keyboardComponent: state.keyboardComponent, keyboardHeight: state.keyboardHeight, emojiKeyboardVisiblity : false } 
        case SET_EMOJI_KEYBOARD_TRUE: return { keyboardComponent: state.keyboardComponent, keyboardHeight: state.keyboardHeight, emojiKeyboardVisiblity : true } 
        
        default: return state
    }

}

export default ChatKeyboardModel