import React from 'react';
import {
  faBars,
  faBookmark,
  faUser,
  faCommentDots,
} from '@fortawesome/free-solid-svg-icons';
import { NavigatorRoute, SceneRoute } from './app.route';
import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import BubbleTabBar, {
  IBubbleTabConfig,
  IIconRenderer,
} from 'react-native-bubble-tabbar';
import {FeedNavigator} from './feed.navigator';
import {MyTourNavigator} from './myTour.navigator';
import {MyPageNavigator} from './myPage.navigator'
import { NavigationContainer } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

const user = auth().currentUser

if (user != null || user != undefined){
  console.log('로그인 확인 완료')
}

const tabs: IBubbleTabConfig[] = [
  {
    activeColor: '#FFFFFF',
    activeBackgroundColor: '#FFD774',
    activeIcon: faBars,
    name: 'Feed'
  },
  {
    activeColor: '#FFFFFF',
    activeBackgroundColor: '#FFD774',
    activeIcon: faBookmark,
    name: 'My Tour'
  },
  {
    activeColor: '#FFFFFF',
    activeBackgroundColor: '#FFD774',
    activeIcon: faUser,
    name: 'My Page'
  },
];

const fontAwesomeIconRenderer = ({ icon, color }: IIconRenderer) =>
  <FontAwesomeIcon
    icon={icon}
    color={color}
    size={20}
  />;

const CustomTabBar: React.FC<BottomTabBarProps> = ({
  state, descriptors, navigation
}) => {

  const focusedOptions = descriptors[state.routes[state.index].key].options;
  
  if (focusedOptions.tabBarVisible === false) {
    return null;
  }
  
  return (
    <BubbleTabBar
      state={state}
      descriptors={descriptors}
      navigation={navigation}
      tabs={tabs}
      activeTabSize={200}
      iconRenderer={fontAwesomeIconRenderer}
      style={{zIndex: 1}}
    />
  );
};
const Tab = createBottomTabNavigator();

const getTabBarVisibility = (route) => {
  const routeName = route.state
  ? route.state.routes[route.state.index].name
  : '';

  if (routeName === 'Feed Preview' || routeName === 'Feed Book1' || routeName === 'Feed Book2' || routeName === 'Feed Book3' || routeName === 'Feed Book4' || routeName === 'Pay') {
    return false;
  }
  
  return true;
};

const getTabBarVisibility2 = (route) => {
  const routeName = route.state
  ? route.state.routes[route.state.index].name
  : '';

  console.log(routeName)

  if(routeName === 'My Tour'|| routeName === ''){
    return true;
  }

  else{
    return false;
  }
  
}



export const MainNavigator = (): React.ReactElement => (
    <Tab.Navigator
        tabBar={({ state, descriptors, navigation }) =>
          <CustomTabBar
            state={state}
            descriptors={descriptors}
            navigation={navigation}
          />
        }
    >
        <Tab.Screen name={NavigatorRoute.FEED} component={FeedNavigator} 
          options={({ route }) => ({
            tabBarVisible: getTabBarVisibility(route)
          })}
        />
        <Tab.Screen name={NavigatorRoute.MY_TOUR} component={MyTourNavigator} 
          options={({ route }) => ({
            tabBarVisible: getTabBarVisibility2(route)
          })}/>
        <Tab.Screen name={NavigatorRoute.MY_PAGE} component={MyPageNavigator} />
    </Tab.Navigator>
);