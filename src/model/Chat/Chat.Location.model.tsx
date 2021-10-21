/*
    GPS 기능을 위한 Lat Lon 저장 모듈
    한 번에 하나의 지도만 출력 가능
*/

const SET_LOCATION = 'model/chat/set_location' as const;
const CLEAN_LOCATION = 'model/chat/clean_location' as const;

export const setLocation = (diff: { lat: string, lon: string }) => ({
    type: SET_LOCATION,
    payload: diff
});

export const cleanLocation = () => ({
    type: CLEAN_LOCATION
})


type ChatLocationAction =
    | ReturnType<typeof setLocation>
    | ReturnType<typeof cleanLocation>;

type ChatLocationState = {
    lat: string;
    lon: string;
}

const initialAudioDuration: ChatLocationState = {
    lat: '',
    lon: ''
}

function ChatLocationModel(
    state: ChatLocationState = initialAudioDuration,
    action: ChatLocationAction
): ChatLocationState {

    switch (action.type) {
        case SET_LOCATION:
            return { lat: action.payload.lat, lon: action.payload.lon };
        case CLEAN_LOCATION:
            return { lat: '', lon: '' };
        default:
            return state;
    }
}

export default ChatLocationModel;