import { NavigatorRoute } from './navigation/app.route';

const config = {
    screens: {
        [NavigatorRoute.MAIN]: {
            path: "main",
            screens: {
                Home: {
                    path: "home",
                },
                Series: {
                    path: "series",
                    screens: {
                        Series_A: {
                            path: "series-a"
                        },
                        Series_B: {
                            path: "series-b"
                        }
                    }
                },
                Chat: "chat",
                My: {
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