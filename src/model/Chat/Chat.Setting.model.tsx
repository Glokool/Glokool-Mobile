const SET_SETTING_GUIDE_VISIBLITY_TRUE = 'model/chat/set_setting_guide_visiblity/true' as const;
const SET_SETTING__GUIDE_VISIBLITY_FALSE = 'model/chat/set_setting_guide_visiblity/false' as const;

export const setGuideVisiblityTrue = () => ({
    type: SET_SETTING_GUIDE_VISIBLITY_TRUE
})

export const setGuideVisiblityFalse = () => ({
    type: SET_SETTING__GUIDE_VISIBLITY_FALSE
})

type ChatSettingUIAction =
    | ReturnType<typeof setGuideVisiblityFalse>
    | ReturnType<typeof setGuideVisiblityTrue>

type ChatSettingUIState = {
    guideVisiblity: boolean
}

const InitialChatSettingUIState: ChatSettingUIState = {
    guideVisiblity : false
}

function ChatSettingUIModel(
    state: ChatSettingUIState = InitialChatSettingUIState,
    action: ChatSettingUIAction
): ChatSettingUIState {

    switch (action.type) {
        case SET_SETTING_GUIDE_VISIBLITY_TRUE : return { guideVisiblity : true }
        case SET_SETTING__GUIDE_VISIBLITY_FALSE : return { guideVisiblity: false }
        default : return state
    }
}

export default ChatSettingUIModel