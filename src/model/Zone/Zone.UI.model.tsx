/*

*/

const SET_GUIDE_VISIBLITY_TRUE = 'model/zone/set_guide_visiblity/true' as const;
const SET_GUIDE_VISIBLITY_FALSE = 'model/zone/set_guide_visiblity/false' as const;
const SET_LOCATION_VISIBLITY_TRUE = 'model/zone/set_location_visiblity/true' as const;
const SET_LOCATION_VISIBLITY_FALSE = 'model/zone/set_location_visiblity/false' as const;  

export const setGuideVisiblityTrue = () => ({
    type : SET_GUIDE_VISIBLITY_TRUE
})

export const setGuideVisiblityFalse = () => ({
    type : SET_GUIDE_VISIBLITY_FALSE
})

export const setLocationVisiblityTrue = () => ({
    type : SET_LOCATION_VISIBLITY_TRUE
})

export const setLocationVisiblityFalse = () => ({
    type : SET_LOCATION_VISIBLITY_FALSE
})

type ZoneUIAction = 
    | ReturnType<typeof setGuideVisiblityFalse>
    | ReturnType<typeof setGuideVisiblityTrue>
    | ReturnType<typeof setLocationVisiblityTrue>
    | ReturnType<typeof setLocationVisiblityFalse>

type ZoneUIState = {
    guideVisiblity : boolean,
    locationVisiblity : boolean
}

const InitialZoneUIState : ZoneUIState = {
    guideVisiblity : false,
    locationVisiblity : false
}

function ZoneUIModel  (
    state: ZoneUIState = InitialZoneUIState,
    action: ZoneUIAction
): ZoneUIState {

    switch(action.type) {
        case SET_GUIDE_VISIBLITY_TRUE : return { guideVisiblity : true, locationVisiblity : state.locationVisiblity }
        case SET_GUIDE_VISIBLITY_FALSE: return { guideVisiblity : false, locationVisiblity : state.locationVisiblity }
        case SET_LOCATION_VISIBLITY_TRUE: return { guideVisiblity : state.guideVisiblity, locationVisiblity : true }
        case SET_LOCATION_VISIBLITY_FALSE : return { guideVisiblity : state.guideVisiblity, locationVisiblity : false }
        default : return state
    }

}

export default ZoneUIModel