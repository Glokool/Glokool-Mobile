import { combineReducers } from "redux";
import AudioDurationModel from "./Chat/Chat.Audio.model";
import ChatDataModel from "./Chat/Chat.Data.model";
import ChatLoadingModel from "./Chat/Chat.Loading.model";
import ChatUIModel from "./Chat/Chat.UI.model";
import ZoneUIModel from "./Zone/Zone.UI.model";

const rootReducer = combineReducers({
    AudioDurationModel,
    ChatUIModel,
    ChatLoadingModel,
    ChatDataModel,
    ZoneUIModel
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>