const SET_KEYBOARD_COMPONENT = 'model/chat/set_keyboard_component' as const;
const CLEAN_KEYBOARD_COMPONENT = 'model/chat/clean_keyboard_component' as const;
const SET_KEYBOARD_HEIGHT = 'model/chat/set_keyboard_height' as const;
const CLEAN_KEYBOARD_HEIGHT = 'model/chat/clean_keyboard_height' as const;


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
})

type ChatKeyboardAction =
    | ReturnType<typeof setKeyboardComponent>
    | ReturnType<typeof cleanKeyboardComponent>
    | ReturnType<typeof setKeyboardHeight>
    | ReturnType<typeof cleanKeyboardHeight>


type ChatKeyboardState = {
    keyboardComponent: string | undefined;
    keyboardHeight: number;
}

const initialChatKeyboardState: ChatKeyboardState = {
    keyboardComponent: undefined,
    keyboardHeight: 0
}

function ChatKeyboardModel(
    state: ChatKeyboardState = initialChatKeyboardState,
    action: ChatKeyboardAction
): ChatKeyboardState {

    switch (action.type) {

        case SET_KEYBOARD_COMPONENT: return { keyboardComponent: action.payload, keyboardHeight: state.keyboardHeight }
        case CLEAN_KEYBOARD_COMPONENT: return { keyboardComponent: undefined, keyboardHeight: state.keyboardHeight }
        case SET_KEYBOARD_HEIGHT: return { keyboardComponent: state.keyboardComponent, keyboardHeight: action.payload }
        case CLEAN_KEYBOARD_HEIGHT: return { keyboardComponent: state.keyboardComponent, keyboardHeight: 0 }

        default: return state
    }

}

export default ChatKeyboardModel