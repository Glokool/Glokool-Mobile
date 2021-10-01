/*

*/

const SET_GUIDE_VISIBLITY_TRUE = 'model/chat/set_guide_visiblity/true' as const;
const SET_GUIDE_VISIBLITY_FALSE = 'model/chat/set_guide_visiblity/false' as const;
const SET_AUDIO_VISIBLITY_TRUE = 'model/chat/set_audio_visiblity/true' as const;
const SET_AUDIO_VISIBLITY_FALSE = 'model/chat/set_audio_visiblity/false' as const;

export const setGuideVisiblityTrue = () => ({
    type : SET_GUIDE_VISIBLITY_TRUE
})

export const setGuideVisiblityFalse = () => ({
    type : SET_GUIDE_VISIBLITY_FALSE
})

export const setAudioVisiblityTrue = () => ({
    type : SET_AUDIO_VISIBLITY_TRUE
})

export const setAudioVisiblityFalse = () => ({
    type : SET_AUDIO_VISIBLITY_FALSE
})

type ChatUIAction = 
    | ReturnType<typeof setGuideVisiblityFalse>
    | ReturnType<typeof setGuideVisiblityTrue>
    | ReturnType<typeof setAudioVisiblityTrue>
    | ReturnType<typeof setAudioVisiblityFalse>

type ChatUIState = {
    guideVisiblity : boolean,
    audioVisiblity : boolean
}

const InitialChatUIState : ChatUIState = {
    guideVisiblity : false,
    audioVisiblity : false
}

function ChatUIModel  (
    state: ChatUIState = InitialChatUIState,
    action: ChatUIAction
): ChatUIState {

    switch(action.type) {
        case SET_GUIDE_VISIBLITY_TRUE : return { guideVisiblity : true, audioVisiblity : state.audioVisiblity }
        case SET_GUIDE_VISIBLITY_FALSE: return { guideVisiblity : false, audioVisiblity : state.audioVisiblity }
        case SET_AUDIO_VISIBLITY_FALSE: return { guideVisiblity : state.guideVisiblity, audioVisiblity : false }
        case SET_AUDIO_VISIBLITY_TRUE : return { guideVisiblity : state.guideVisiblity, audioVisiblity : true }
        default : return state
    }

}

export default ChatUIModel