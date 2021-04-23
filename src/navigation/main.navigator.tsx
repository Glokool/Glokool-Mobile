import React from 'react';
import { NavigatorRoute } from './app.route';
import { BottomTabBarOptions, BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {FeedNavigator} from './feed.navigator';
import {GuideNavigator} from './guide.navigator';
import {MyPageNavigator} from './myPage.navigator';
import {BoardNavigator} from './board.navigator';
import {HomeNavigator} from './home.navigator';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';

import BoardFull from '../assets/icon/BottomBar/BoardFull.svg';
import Board from '../assets/icon/BottomBar/Board.svg';
import HomeFull from '../assets/icon/BottomBar/HomeFull.svg';
import Home from '../assets/icon/BottomBar/Home.svg';
import FeedFull from '../assets/icon/BottomBar/FeedFull.svg';
import Feed from '../assets/icon/BottomBar/Feed.svg';
import MyPageFull from '../assets/icon/BottomBar/MyPageFull.svg';
import MyPage from '../assets/icon/BottomBar/MyPage.svg';
import TravelFull from '../assets/icon/BottomBar/TravelFull.svg';
import Travel from '../assets/icon/BottomBar/Travel.svg';
import { getTabBarHeight } from '@react-navigation/bottom-tabs/lib/typescript/src/views/BottomTabBar';

const Tab = createBottomTabNavigator();

function MyTabBar({ state, descriptors, navigation } : BottomTabBarProps<BottomTabBarOptions>) {
  
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <SafeAreaView>
    <View 
      style={{ 
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        backgroundColor: 'white',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        borderTopColor: "#fff",
        borderTopWidth: 0.5,
        shadowColor: "rgba(0, 0, 0, 0.19)",
        shadowOffset: {
          width: 0,
          height: 6
        },
        shadowRadius: 30,
        elevation: 5,
        shadowOpacity: 1,
      }}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1 , justifyContent : 'center', alignItems: 'center' , margin : 10}}
          >
            <View style={{ borderRadius: 25, backgroundColor : isFocused ? '#FFD774' : 'white', width: 70, height: 35, justifyContent : 'center', alignItems: 'center'}}>
              {
                (label === 'TRAVEL')?
                  (isFocused)?
                  <TravelFull />
                  :
                  <Travel />
                :
                (label === 'FEED')?
                  (isFocused)?
                  <FeedFull />
                  :
                  <Feed />
                :
                (label === 'HOME')?
                  (isFocused)?
                  <HomeFull />
                  :
                  <Home />
                :
                (label === 'BOARD')?
                  (isFocused)?
                  <BoardFull />
                  :
                  <Board />
                :
                (label === 'MY PAGE')?
                  (isFocused)?
                  <MyPageFull />
                  :
                  <MyPage />
                :
                null
              }
            </View>
            

            <Text style={{ color: isFocused ? '#FFD774' : '#C6C6C6' , textAlign: 'center', fontSize : 11, fontWeight: 'bold'}}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
    </SafeAreaView >
  );
}


const GuideVisiblity = (route) => {
  const routeName = route.state
  ? route.state.routes[route.state.index].name
  : '';


  if(routeName === 'Guide'|| routeName === ''){
    return true;
  }

  else{
    return false;
  }
  
}

const FeedVisiblity = (route) => {
  const routeName = route.state
  ? route.state.routes[route.state.index].name
  : '';

  if(routeName == 'Feed' || routeName == ''){
    return true;
  }
  else{
    return false;
  }
}

export const MainNavigator = (): React.ReactElement => (
    
      <Tab.Navigator
        tabBar={props => <MyTabBar {...props}/>}
        initialRouteName={'HOME'}
        sceneContainerStyle={{
          marginBottom: 50
        }}
      >
        <Tab.Screen name={'TRAVEL'} component={GuideNavigator} 
          options={({ route }) => ({
            tabBarVisible: GuideVisiblity(route),
            unmountOnBlur : true
          })}/>
        <Tab.Screen name={'FEED'} component={FeedNavigator} 
          options={({ route }) => ({
            tabBarVisible: FeedVisiblity(route),
            unmountOnBlur : true
          })}          
        />
        <Tab.Screen 
          name={'HOME'} 
          component={HomeNavigator} 
          options={({ route }) => ({
            unmountOnBlur : true
          })}
        />
        <Tab.Screen 
          name={'BOARD'}          
          component={BoardNavigator} 
          options={({ route }) => ({
            unmountOnBlur : true
          })}
        />
        <Tab.Screen name={'MY PAGE'} component={MyPageNavigator} 
          options={({ route }) => ({
            unmountOnBlur : true
        })}/>
    </Tab.Navigator>
);