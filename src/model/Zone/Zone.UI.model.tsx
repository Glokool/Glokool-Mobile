/*

*/

const SET_GUIDE_VISIBLITY_TRUE = 'model/zone/set_guide_visiblity/true' as const;
const SET_GUIDE_VISIBLITY_FALSE = 'model/zone/set_guide_visiblity/false' as const;

const SET_LOCATION_VISIBLITY_TRUE = 'model/zone/set_location_visiblity/true' as const;
const SET_LOCATION_VISIBLITY_FALSE = 'model/zone/set_location_visiblity/false' as const;

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

export const setCategoryIndex = (diff: number) => ({
    type: SET_CATEGORY_INDEX,
    payload: diff
})

type ZoneUIAction =
    | ReturnType<typeof setGuideVisiblityFalse>
    | ReturnType<typeof setGuideVisiblityTrue>
    | ReturnType<typeof setLocationVisiblityTrue>
    | ReturnType<typeof setLocationVisiblityFalse>
    | ReturnType<typeof setCategoryIndex>


type ZoneUIState = {
    guideVisiblity: boolean,
    locationVisiblity: boolean,
    categoryIndex: number,
}

const InitialZoneUIState: ZoneUIState = {
    guideVisiblity: false,
    locationVisiblity: false,
    categoryIndex: 0,
}

function ZoneUIModel(
    state: ZoneUIState = InitialZoneUIState,
    action: ZoneUIAction
): ZoneUIState {

    switch (action.type) {
        case SET_GUIDE_VISIBLITY_TRUE: return { guideVisiblity: true, locationVisiblity: state.locationVisiblity, categoryIndex: state.categoryIndex }
        case SET_GUIDE_VISIBLITY_FALSE: return { guideVisiblity: false, locationVisiblity: state.locationVisiblity, categoryIndex: state.categoryIndex }
        case SET_LOCATION_VISIBLITY_TRUE: return { guideVisiblity: state.guideVisiblity, locationVisiblity: true, categoryIndex: state.categoryIndex }
        case SET_LOCATION_VISIBLITY_FALSE: return { guideVisiblity: state.guideVisiblity, locationVisiblity: false, categoryIndex: state.categoryIndex }
        case SET_CATEGORY_INDEX: return { guideVisiblity: state.guideVisiblity, locationVisiblity: state.locationVisiblity, categoryIndex: action.payload }
        default: return state
    }

}

export default ZoneUIModel