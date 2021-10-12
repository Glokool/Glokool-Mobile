const SET_ZONE_MAIN_BANNER = 'model/zone/set_zone_main_banner' as const;

type ZoneMainBannerType = {
    __v: any;
    _id: string;
    images: Array<string>;
    title: string;
}

export const setZoneMainBanner = (diff: ZoneMainBannerType) => ({
    type: SET_ZONE_MAIN_BANNER,
    payload: diff,
});

type ZoneDataAction =
    | ReturnType<typeof setZoneMainBanner>;

const initialZoneMainBanner: ZoneMainBannerType = {
    __v: 0,
    _id: "",
    images: [],
    title: "",
}

function ZoneDataModel(
    state: ZoneMainBannerType = initialZoneMainBanner,
    action: ZoneDataAction): ZoneMainBannerType {
    switch (action.type) {
        case SET_ZONE_MAIN_BANNER:
            return {
                __v: state.__v,
                _id: state._id,
                images: state.images,
                title: state.title,
            };
        default:
            return state;
    }
}

export default ZoneDataModel;