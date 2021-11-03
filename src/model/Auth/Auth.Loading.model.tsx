/* 
    로그인 정보를 관리하기 위한 Redux 모듈 (이메일 및 비밀번호)
    Formik 모듈과 연동하여 이메일 여부 및 8자 이상의 비밀번호인지 판단
*/
const LOADING_START = 'model/AUTH/LOADING_START' as const;
const LOADING_END = 'model/AUTH/LOADING_END' as const;

export const AuthLoadingStart = () => ({
    type : LOADING_START
});

export const AuthLoadingEnd = () => ({
    type : LOADING_END
});

type AuthLoadingAction = 
    | ReturnType<typeof AuthLoadingStart>
    | ReturnType<typeof AuthLoadingEnd>;

type AuthLoadingState = {   
    loading: boolean
}

const intialState : AuthLoadingState = {
    loading: false
}

function AuthLoadingModel(
    state : AuthLoadingState = intialState,
    action : AuthLoadingAction
) : AuthLoadingState {

    switch (action.type){
        case LOADING_START : 
            return { loading : true };
        case LOADING_END : 
            return { loading : false };
        default : 
            return state
    }
}

export default AuthLoadingModel;




