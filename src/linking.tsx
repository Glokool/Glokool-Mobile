import React from 'react';
import { SceneRoute } from './navigation/app.route';

const config = {
    screens: {
      // [SceneRoute.SERIES_HIDDEN_GEM_DETAIL]: {
      // path: "hiddengem/:TourCode",
      // parse: {
      //     TourCode: (TourCode) => `${TourCode}`,
      // },
      // },
      // [SceneRoute.SERIES_B]: {
      //   path: "seriesb",
      // },
      // [SceneRoute.SERIES_B_DETAIL]: {
      //   path: "seriesb/:Id",
      //   parse: {
      //       Id: String,
      //   },
      // },
          My: "my",
  
      // Notifications: "notifications",
      // Settings: "settings",
    },
  };
  
  const linking = {
    prefixes: ["Glokool://"],
    config,
  };
  
  export default linking;