import { combineReducers } from "redux";
import AudioDurationModel from "./Chat/Chat.Audio.model";
import ChatLoadingModel from "./Chat/Chat.Loading.model";
import ChatUIModel from "./Chat/Chat.UI.model";

const rootReducer = combineReducers({
    AudioDurationModel,
    ChatUIModel,
    ChatLoadingModel
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>