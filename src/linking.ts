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
                                id: (id: string) => `${id}`,
                            }
                        },
                        [SceneRoute.SERIES_B]: {
                            path: "series-b",
                            parse: {
                                id: (id: string) => `${id}`,
                            }
                        }
                    }
                },
                [NavigatorRoute.CHAT]: {
                    path: "chat",
                    screens: {
                        [SceneRoute.CHATROOM]: {
                            path: "chatroom/:id",
                            parse: {
                                id: (id: string) => `${id}`,
                            }
                        }
                    },
                },
                [NavigatorRoute.MY]: {
                    path: "my",
                    screens: {
                        BookmarkList: {
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
    prefixes: ["Glokool://app"],
    config,
};

export default linking;