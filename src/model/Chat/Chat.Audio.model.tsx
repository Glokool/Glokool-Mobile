/*
    오디오파일 길이 UI를 위한 CHAT AUDIO REDUX 모델
    한 번에 하나의 오디오 파일만 렌더링 가능 (재생 가능)
*/

const SET_AUDIOFILE_LENGTH = 'model/chat/SET_AUDIOFILE_LENGTH' as const;
const INIT_AUDIOFILE = 'model/chat/INIT_AUDIOFILE' as const;
const SET_AUDIO_START = 'model/chat/SET_AUDIO_START' as const;
const SET_AUDIO_STOP = 'model/chat/SET_AUDIO_STOP' as const;

export const setAudiofileLength = (diff : string) => ({
    type : SET_AUDIOFILE_LENGTH,
    payload : diff
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



    
