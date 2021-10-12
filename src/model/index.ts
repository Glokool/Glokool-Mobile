import { combineReducers } from "redux";

// Chat
import AudioDurationModel from "./Chat/Chat.Audio.model";
import ChatDataModel from "./Chat/Chat.Data.model";
import ChatLoadingModel from "./Chat/Chat.Loading.model";
import ChatUIModel from "./Chat/Chat.UI.model";

// My
import MyLoadingModel from "./My/My.Loading.model";
import MyUIModel from "./My/My.UI.model";

// Zone
import ZoneDataModel from "./Zone/Zone.data.model";
import ZoneUIModel from "./Zone/Zone.UI.model";
import ZoneLoadingModel from "./Zone/Zone.Loading.model";

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
    ZoneUIModel,
    ZoneDataModel,
    ZoneLoadingModel,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>