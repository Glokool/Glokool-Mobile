import { combineReducers } from "redux";
import AudioDurationModel from "./Chat/Chat.Audio.model";
import ChatUIModel from "./Chat/Chat.UI.model";

const rootReducer = combineReducers({
    AudioDurationModel,
    ChatUIModel
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>