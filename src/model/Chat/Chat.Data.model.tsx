import { FirebaseDatabaseTypes } from "@react-native-firebase/database";

const SET_CHATDB = 'model/chat/set_CHATDB' as const;
const CLEAN_CHATDB = 'model/chat/clean_CHATDB' as const;

const SET_ROOMNAME = 'model/chat/set_roomName' as const;
const CLEAN_ROOMNAME = 'model/chat/clean_roomName' as const;

const SET_GUIDEUID = 'model/chat/set_guideuid' as const;
const CLEAN_GUIDEUID = 'model/chat/clean_guideuid' as const;

const SET_CHAT_TIME = 'model/chat/set_chat_time' as const;
const CLEAN_CHAT_TIME = 'model/chat/clean_chat_time' as const;

export const setChatDB = (diff: FirebaseDatabaseTypes.Reference) => ({
    type : SET_CHATDB,
    payload: diff
})

export const cleanChatDB = () => ({
    type : CLEAN_CHATDB
})

export const setGuideUID = (diff : string) => ({
    type : SET_GUIDEUID,
    payload : diff
})

export const cleanGuideUID = () => ({
    type : CLEAN_GUIDEUID
})

export const setChatTime = (diff : Date) => ({
    type : SET_CHAT_TIME,
    payload : diff
})

export const cleanChatTime = () => ({
    type : CLEAN_CHAT_TIME
})

export const setRoomName = (diff : string) => ({
    type : SET_ROOMNAME,
    payload : diff
});

export const cleanRoomName = () => ({
    type : CLEAN_ROOMNAME
})

type ChatDataAction = 
    | ReturnType<typeof setChatDB>
    | ReturnType<typeof cleanChatDB>
    | ReturnType<typeof setGuideUID>
    | ReturnType<typeof cleanGuideUID>
    | ReturnType<typeof setChatTime>
    | ReturnType<typeof cleanChatTime>
    | ReturnType<typeof setRoomName>
    | ReturnType<typeof cleanRoomName>

type ChatDataState = {
    DB : FirebaseDatabaseTypes.Reference | undefined,
    guideUID : string,
    time : Date,
    roomName : string
}

const InitialChatLoadingState : ChatDataState = {
    DB : undefined,
    guideUID : '',
    time : new Date(),
    roomName : ''
}

function ChatDataModel  (
    state: ChatDataState = InitialChatLoadingState,
    action: ChatDataAction
): ChatDataState {

    switch(action.type) {
        
        case SET_CHATDB :       return { DB : action.payload, guideUID : state.guideUID, time : state.time, roomName : state.roomName }
        case CLEAN_CHATDB :     return { DB : undefined, guideUID : state.guideUID, time : state.time, roomName : state.roomName }
        case SET_GUIDEUID :     return { DB : state.DB, guideUID : action.payload, time : state.time, roomName : state.roomName }
        case CLEAN_GUIDEUID :   return { DB : state.DB, guideUID : '', time : state.time, roomName : state.roomName }
        case SET_CHAT_TIME :    return { DB : state.DB, guideUID : state.guideUID, time : action.payload, roomName : state.roomName }
        case CLEAN_CHAT_TIME :  return { DB : state.DB, guideUID : state.guideUID, time : new Date(), roomName : state.roomName }
        case SET_ROOMNAME :     return { DB : state.DB, guideUID : state.guideUID, time : state.time, roomName : action.payload }
        case CLEAN_ROOMNAME :   return { DB : state.DB, guideUID : state.guideUID, time : state.time, roomName : '' }

        default : return state
    }

}

export default ChatDataModel