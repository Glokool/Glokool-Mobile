import { NavigatorRoute, SceneRoute } from './navigation/app.route';

const config = {
    screens: {
        [NavigatorRoute.MAIN]: {
            path: "main",
            screens: {
                [NavigatorRoute.HOME]: {
                    path: "home",
                },
                [NavigatorRoute.SERIES]: {
                    path: "series",
                    screens: {
                        [SceneRoute.SERIES_A]: {
                            path: "series-a/:id",
                            parse: {
                                id: (id) => `${id}`,
                            }
                        },
                        [SceneRoute.SERIES_B]: {
                            path: "series-b",
                        }
                    }
                },
                [NavigatorRoute.CHAT]: "chat",
                [NavigatorRoute.MY]: {
                    path: "my",
                    screens: {
                        BookmarkList:{
                            path: "bookmarklist",
                        }
                    }
                },
            }
        },
        NotFound: '*',
    }
};

const linking = {
    prefixes: ["glokool://app"],
    config,
};

export default linking;