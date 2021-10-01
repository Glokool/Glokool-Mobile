import { combineReducers } from "redux";
import AudioDurationModel from "./Chat/Chat.Audio.model";

const rootReducer = combineReducers({
    AudioDurationModel,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>