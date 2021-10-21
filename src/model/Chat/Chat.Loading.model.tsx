/*

*/

const SET_LOADING_TRUE = 'model/chat/set_loading/true' as const;
const SET_LOADING_FALSE = 'model/chat/set_loading/false' as const;

export const setChatLoadingTrue = () => ({
    type: SET_LOADING_TRUE
})

export const setChatLoadingFalse = () => ({
    type: SET_LOADING_FALSE
})


type ChatLoadingAction =
    | ReturnType<typeof setChatLoadingFalse>
    | ReturnType<typeof setChatLoadingTrue>

type ChatLoadingState = {
    loading: boolean
}

const InitialChatLoadingState: ChatLoadingState = {
    loading: false
}

function ChatLoadingModel(
    state: ChatLoadingState = InitialChatLoadingState,
    action: ChatLoadingAction
): ChatLoadingState {

    switch (action.type) {
        case SET_LOADING_TRUE: return { loading: true }
        case SET_LOADING_FALSE: return { loading: false }
        default: return state
    }

}

export default ChatLoadingModel