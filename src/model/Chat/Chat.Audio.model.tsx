/*
    오디오파일 길이 UI를 위한 CHAT AUDIO REDUX 모델
    한 번에 하나의 오디오 파일만 렌더링 가능 (재생 가능)
*/

const SET_AUDIOFILE_LENGTH = 'model/chat/SET_AUDIOFILE_LENGTH' as const;
const INIT_AUDIOFILE = 'model/chat/INIT_AUDIOFILE' as const;
const SET_AUDIO_START = 'model/chat/SET_AUDIO_START' as const;
const SET_AUDIO_STOP = 'model/chat/SET_AUDIO_STOP' as const;

const COUNT_AUDIO_DURATION = 'model/chat/COUNT_AUDIO_DURATION' as const;
const RESET_AUDIO_DURATION = 'model/chat/RESET_AUDIO_DURATU+ION' as const;

export const setAudiofileLength = (diff: string) => ({
    type: SET_AUDIOFILE_LENGTH,
    payload: diff
});

export const initAudiofile = () => ({
    type: INIT_AUDIOFILE
})

export const setAudioStart = () => ({
    type: SET_AUDIO_START
})

export const setAudioStop = () => ({
    type: SET_AUDIO_STOP
})

// 오디오 길이 
export const countAudioDuration = () => ({
    type: COUNT_AUDIO_DURATION
})

export const resetAudioDuration = () => ({
    type: RESET_AUDIO_DURATION
})

type AudioDurationAction =
    | ReturnType<typeof countAudioDuration>
    | ReturnType<typeof resetAudioDuration>;

type AudioDurationState = {
    duration: number;
}

const initialAudioDuration: AudioDurationState = {
    duration: 0,
}

function AudioDurationModel  (
    state: AudioDurationState = initialAudioDuration,
    action: AudioDurationAction
): AudioDurationState {

    switch (action.type) {
        case COUNT_AUDIO_DURATION:
            return { duration : state.duration + 1 };
        case RESET_AUDIO_DURATION:
            return { duration : 0 };
        default:
            return state;
    }
}

export default AudioDurationModel;