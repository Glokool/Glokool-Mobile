const SET_ZONE_LOCATION = 'model/zone/set_zone_location' as const;

export const setZoneLocation = (diff: string) => ({
    type: SET_ZONE_LOCATION,
    payload: diff,
})

type ZoneLocationAction =
    | ReturnType<typeof setZoneLocation>

type ZoneLocationState = {
    location: string;
}

const initialZoneLocation: ZoneLocationState = {
    location: "hongdae"
};

function ZoneLocationModel(
    state: ZoneLocationState = initialZoneLocation,
    action: ZoneLocationAction
): ZoneLocationState {
    switch (action.type) {
        case SET_ZONE_LOCATION:
            return {
                location: action.payload
            };
        default:
            return state
    }
}

export default ZoneLocationModel;