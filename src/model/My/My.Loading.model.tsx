// my page 에서 쓰일 loading 모델입니다

const SET_LOADING_TRUE = 'model/my/set_loading/true' as const;
const SET_LOADING_FALSE = 'model/my/set_loading/false' as const;

export const setMyLoadingTrue = () => ({
    type : SET_LOADING_TRUE
})

export const setMyLoadingFalse = () => ({
    type : SET_LOADING_FALSE
})

type MyLoadingAction = 
    | ReturnType<typeof setMyLoadingFalse>
    | ReturnType<typeof setMyLoadingTrue>

type MyLoadingState = {
    loading: boolean
}