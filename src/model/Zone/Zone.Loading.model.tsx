/*

*/

const SET_LOADING_TRUE = 'model/zone/set_loading/true' as const;
const SET_LOADING_FALSE = 'model/zone/set_loading/false' as const;

export const setZoneLoadingTrue = () => ({
    type: SET_LOADING_TRUE
})

export const setZoneLoadingFalse = () => ({
    type: SET_LOADING_FALSE
})


type ZoneLoadingAction =
    | ReturnType<typeof setZoneLoadingFalse>
    | ReturnType<typeof setZoneLoadingTrue>

type ZoneLoadingState = {
    loading: boolean
}

const InitialZoneLoadingState: ZoneLoadingState = {
    loading: false
}

function ZoneLoadingModel(
    state: ZoneLoadingState = InitialZoneLoadingState,
    action: ZoneLoadingAction
): ZoneLoadingState {

    switch (action.type) {
        case SET_LOADING_TRUE: return { loading: true }
        case SET_LOADING_FALSE: return { loading: false }
        default: return state
    }

}

export default ZoneLoadingModel