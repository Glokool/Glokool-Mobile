import { combineReducers } from "redux";

// Chat
import AudioDurationModel from "./Chat/Chat.Audio.model";
import ChatDataModel from "./Chat/Chat.Data.model";
import ChatLoadingModel from "./Chat/Chat.Loading.model";
import ChatUIModel from "./Chat/Chat.UI.model";
import ZoneUIModel from "./Zone/Zone.UI.model";

// My
import MyLoadingModel from "./My/My.Loading.model";
import MyUIModel from "./My/My.UI.model";

const rootReducer = combineReducers({
    //Chat
    AudioDurationModel,
    ChatUIModel,
    ChatLoadingModel,
    ChatDataModel,
    //My
    MyLoadingModel,
    MyUIModel,
    //Zone
    ZoneUIModel
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>