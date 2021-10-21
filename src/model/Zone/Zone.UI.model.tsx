/*

*/

const SET_GUIDE_VISIBLITY_TRUE = 'model/zone/set_guide_visiblity/true' as const;
const SET_GUIDE_VISIBLITY_FALSE = 'model/zone/set_guide_visiblity/false' as const;

const SET_LOCATION_VISIBLITY_TRUE = 'model/zone/set_location_visiblity/true' as const;
const SET_LOCATION_VISIBLITY_FALSE = 'model/zone/set_location_visiblity/false' as const;

const SET_GLOSERVICE_VISIBILITY_TRUE = 'model/zone/set_gloService_visibility/true' as const;
const SET_GLOSERVICE_VISIBILITY_FALSE = 'model/zone/set_gloService_visibility/false' as const;

const SET_CATEGORY_INDEX = 'model/zone/set_category_index' as const;

export const setGuideVisiblityTrue = () => ({
    type: SET_GUIDE_VISIBLITY_TRUE
})

export const setGuideVisiblityFalse = () => ({
    type: SET_GUIDE_VISIBLITY_FALSE
})

export const setLocationVisiblityTrue = () => ({
    type: SET_LOCATION_VISIBLITY_TRUE
})

export const setLocationVisiblityFalse = () => ({
    type: SET_LOCATION_VISIBLITY_FALSE
})

export const setGloServiceVisibilityTrue = () => ({
    type: SET_GLOSERVICE_VISIBILITY_TRUE
})

export const setGloServiceVisibilityFalse = () => ({
    type: SET_GLOSERVICE_VISIBILITY_FALSE
})

export const setCategoryIndex = (diff: number) => ({
    type: SET_CATEGORY_INDEX,
    payload: diff
})

type ZoneUIAction =
    | ReturnType<typeof setGuideVisiblityFalse>
    | ReturnType<typeof setGuideVisiblityTrue>
    | ReturnType<typeof setLocationVisiblityTrue>
    | ReturnType<typeof setLocationVisiblityFalse>
    | ReturnType<typeof setGloServiceVisibilityTrue>
    | ReturnType<typeof setGloServiceVisibilityFalse>
    | ReturnType<typeof setCategoryIndex>


type ZoneUIState = {
    guideVisiblity: boolean,
    locationVisiblity: boolean,
    gloServiceVisibility: boolean,
    categoryIndex: number,
}

const InitialZoneUIState: ZoneUIState = {
    guideVisiblity: false,
    locationVisiblity: false,
    gloServiceVisibility: false,
    categoryIndex: 0,
}

function ZoneUIModel(
    state: ZoneUIState = InitialZoneUIState,
    action: ZoneUIAction
): ZoneUIState {

    switch (action.type) {
        case SET_GUIDE_VISIBLITY_TRUE:
            return {
                guideVisiblity: true,
                locationVisiblity: state.locationVisiblity,
                gloServiceVisibility: state.gloServiceVisibility,
                categoryIndex: state.categoryIndex
            }
        case SET_GUIDE_VISIBLITY_FALSE:
            return {
                guideVisiblity: false,
                locationVisiblity: state.locationVisiblity,
                gloServiceVisibility: state.gloServiceVisibility,
                categoryIndex: state.categoryIndex
            }
        case SET_LOCATION_VISIBLITY_TRUE:
            return {
                guideVisiblity: state.guideVisiblity,
                locationVisiblity: true,
                gloServiceVisibility: state.gloServiceVisibility,
                categoryIndex: state.categoryIndex
            }
        case SET_LOCATION_VISIBLITY_FALSE:
            return {
                guideVisiblity: state.guideVisiblity,
                locationVisiblity: false,
                gloServiceVisibility: state.gloServiceVisibility,
                categoryIndex: state.categoryIndex
            }
        case SET_GLOSERVICE_VISIBILITY_TRUE:
            return {
                guideVisiblity: state.guideVisiblity,
                locationVisiblity: state.locationVisiblity,
                gloServiceVisibility: true,
                categoryIndex: state.categoryIndex
            }
        case SET_GLOSERVICE_VISIBILITY_FALSE:
            return {
                guideVisiblity: state.guideVisiblity,
                locationVisiblity: state.locationVisiblity,
                gloServiceVisibility: false,
                categoryIndex: state.categoryIndex
            }
        case SET_CATEGORY_INDEX:
            return {
                guideVisiblity: state.guideVisiblity,
                locationVisiblity: state.locationVisiblity,
                gloServiceVisibility: state.gloServiceVisibility,
                categoryIndex: action.payload
            }
        default:
            return state
    }

}

export default ZoneUIModel