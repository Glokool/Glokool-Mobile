const SET_GUIDE_VISIBLITY_TRUE = 'model/chat/set_guide_visiblity/true' as const;
const SET_GUIDE_VISIBLITY_FALSE = 'model/chat/set_guide_visiblity/false' as const;

const SET_LOCATION_VISIBLITY_TRUE = 'model/chat/set_location_visiblity/true' as const;
const SET_LOCATION_VISIBLITY_FALSE = 'model/chat/set_location_visiblity/false' as const;

const SET_AUDIO_VISIBLITY_TRUE = 'model/chat/set_audio_visiblity/true' as const;
const SET_AUDIO_VISIBLITY_FALSE = 'model/chat/set_audio_visiblity/false' as const;

const SET_IMAGE_VISIBLITY_TRUE = 'model/chat/set_image_visiblity/true' as const;
const SET_IMAGE_VISIBLITY_FALSE = 'model/chat/clean_image_visiblity/false' as const;

const SET_IMAGEURL = 'model/chat/set_imageurl' as const;
const CLEAN_IMAGEURL = 'model/chat/clean_imageurl' as const;

const SET_MENU_VISIBLITY_TRUE = 'model/chat/set_menu_visiblity_true' as const;
const SET_MENU_VISIBLITY_FALSE = 'model/chat/set_menu_visiblity_false' as const;

export const setGuideVisiblityTrue = () => ({
    type: SET_GUIDE_VISIBLITY_TRUE
})

export const setGuideVisiblityFalse = () => ({
    type: SET_GUIDE_VISIBLITY_FALSE
})

export const setAudioVisiblityTrue = () => ({
    type: SET_AUDIO_VISIBLITY_TRUE
})

export const setAudioVisiblityFalse = () => ({
    type: SET_AUDIO_VISIBLITY_FALSE
})

export const setImageVisiblityTrue = () => ({
    type: SET_IMAGE_VISIBLITY_TRUE
})

export const setImageVisiblityFalse = () => ({
    type: SET_IMAGE_VISIBLITY_FALSE
})

export const setImageURL = (diff: string) => ({
    type: SET_IMAGEURL,
    payload: diff
})

export const cleanImageURL = () => ({
    type: CLEAN_IMAGEURL
})

export const setLocationVisiblityTrue = () => ({
    type: SET_LOCATION_VISIBLITY_TRUE
})

export const setLocationVisiblityFalse = () => ({
    type: SET_LOCATION_VISIBLITY_FALSE
})

export const setMenuVisiblityTrue = () => ({
    type: SET_MENU_VISIBLITY_TRUE
})

export const setMenuVisiblityFalse = () => ({
    type: SET_MENU_VISIBLITY_FALSE
})

type ChatUIAction =
    | ReturnType<typeof setGuideVisiblityFalse>
    | ReturnType<typeof setGuideVisiblityTrue>
    | ReturnType<typeof setAudioVisiblityTrue>
    | ReturnType<typeof setAudioVisiblityFalse>
    | ReturnType<typeof setImageVisiblityTrue>
    | ReturnType<typeof setImageVisiblityFalse>
    | ReturnType<typeof setImageURL>
    | ReturnType<typeof cleanImageURL>
    | ReturnType<typeof setLocationVisiblityTrue>
    | ReturnType<typeof setLocationVisiblityFalse>
    | ReturnType<typeof setMenuVisiblityTrue>
    | ReturnType<typeof setMenuVisiblityFalse>

type ChatUIState = {
    guideVisiblity: boolean,
    audioVisiblity: boolean,
    imageVisiblity: boolean,
    imageUrl: string,
    locationVisiblity: boolean,
    menuVisiblity: boolean
}

const InitialChatUIState: ChatUIState = {
    guideVisiblity: false,
    audioVisiblity: false,
    imageVisiblity: false,
    imageUrl: '',
    locationVisiblity: false,
    menuVisiblity: false
}

function ChatUIModel(
    state: ChatUIState = InitialChatUIState,
    action: ChatUIAction
): ChatUIState {

    switch (action.type) {
        case SET_GUIDE_VISIBLITY_TRUE: return { guideVisiblity: true, audioVisiblity: state.audioVisiblity, imageVisiblity: state.imageVisiblity, imageUrl: state.imageUrl, locationVisiblity: state.locationVisiblity, menuVisiblity: state.menuVisiblity }
        case SET_GUIDE_VISIBLITY_FALSE: return { guideVisiblity: false, audioVisiblity: state.audioVisiblity, imageVisiblity: state.imageVisiblity, imageUrl: state.imageUrl, locationVisiblity: state.locationVisiblity, menuVisiblity: state.menuVisiblity }
        case SET_AUDIO_VISIBLITY_FALSE: return { guideVisiblity: state.guideVisiblity, audioVisiblity: false, imageVisiblity: state.imageVisiblity, imageUrl: state.imageUrl, locationVisiblity: state.locationVisiblity, menuVisiblity: state.menuVisiblity }
        case SET_AUDIO_VISIBLITY_TRUE: return { guideVisiblity: state.guideVisiblity, audioVisiblity: true, imageVisiblity: state.imageVisiblity, imageUrl: state.imageUrl, locationVisiblity: state.locationVisiblity, menuVisiblity: state.menuVisiblity }
        case SET_IMAGEURL: return { guideVisiblity: state.guideVisiblity, audioVisiblity: state.audioVisiblity, imageVisiblity: state.imageVisiblity, imageUrl: action.payload, locationVisiblity: state.locationVisiblity, menuVisiblity: state.menuVisiblity }
        case CLEAN_IMAGEURL: return { guideVisiblity: state.guideVisiblity, audioVisiblity: state.audioVisiblity, imageVisiblity: state.imageVisiblity, imageUrl: '', locationVisiblity: state.locationVisiblity, menuVisiblity: state.menuVisiblity }
        case SET_IMAGE_VISIBLITY_TRUE: return { guideVisiblity: state.guideVisiblity, audioVisiblity: state.audioVisiblity, imageVisiblity: true, imageUrl: state.imageUrl, locationVisiblity: state.locationVisiblity, menuVisiblity: state.menuVisiblity }
        case SET_IMAGE_VISIBLITY_FALSE: return { guideVisiblity: state.guideVisiblity, audioVisiblity: state.audioVisiblity, imageVisiblity: false, imageUrl: state.imageUrl, locationVisiblity: state.locationVisiblity, menuVisiblity: state.menuVisiblity }
        case SET_LOCATION_VISIBLITY_FALSE: return { guideVisiblity: state.guideVisiblity, audioVisiblity: state.audioVisiblity, imageVisiblity: state.imageVisiblity, imageUrl: state.imageUrl, locationVisiblity: false, menuVisiblity: state.menuVisiblity }
        case SET_LOCATION_VISIBLITY_TRUE: return { guideVisiblity: state.guideVisiblity, audioVisiblity: state.audioVisiblity, imageVisiblity: state.imageVisiblity, imageUrl: state.imageUrl, locationVisiblity: true, menuVisiblity: state.menuVisiblity }
        case SET_MENU_VISIBLITY_FALSE: return { guideVisiblity: state.guideVisiblity, audioVisiblity: state.audioVisiblity, imageVisiblity: state.imageVisiblity, imageUrl: state.imageUrl, locationVisiblity: state.locationVisiblity, menuVisiblity: false }
        case SET_MENU_VISIBLITY_TRUE: return { guideVisiblity: state.guideVisiblity, audioVisiblity: state.audioVisiblity, imageVisiblity: state.imageVisiblity, imageUrl: state.imageUrl, locationVisiblity: state.locationVisiblity, menuVisiblity: true }

        default: return state
    }

}

export default ChatUIModel