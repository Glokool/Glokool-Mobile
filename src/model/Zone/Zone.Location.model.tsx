const SET_ZONE_LOCATION = 'model/zone/set_zone_location' as const;

export const setZoneLocation = (title: string, index: number) => ({
    type: SET_ZONE_LOCATION,
    payload: title,
    zoneIndex: index,
})

type ZoneLocationAction =
    | ReturnType<typeof setZoneLocation>

type ZoneLocationState = {
    location: string;
    index: number;
}

const initialZoneLocation: ZoneLocationState = {
    location: "hongdae",
    index: 0
};

function ZoneLocationModel(
    state: ZoneLocationState = initialZoneLocation,
    action: ZoneLocationAction
): ZoneLocationState {
    switch (action.type) {
        case SET_ZONE_LOCATION:
            return {
                location: action.payload,
                index: action.zoneIndex,
            };
        default:
            return state
    }
}

export default ZoneLocationModel;