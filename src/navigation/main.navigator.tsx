import React from 'react';
import {Layout} from '@ui-kitten/components'
import { NavigatorRoute } from './app.route';
import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BubbleTabBar, {
  IBubbleTabConfig,
  IIconRenderer,
} from 'react-native-bubble-tabbar';
import {FeedNavigator} from './feed.navigator';
import {GuideNavigator} from './guide.navigator';
import {MyPageNavigator} from './myPage.navigator'
import auth from '@react-native-firebase/auth';
import Feed from '../assets/icon/feed.svg'
import MyPage from '../assets/icon/MyPage.svg'
import Guide from '../assets/icon/guide.svg'
import FeedFull from '../assets/icon/feedFull.svg'
import MyPageFull from '../assets/icon/MyPageFull.svg'
import GuideFull from '../assets/icon/guideFull.svg'

const user = auth().currentUser

if (user != null || user != undefined){
  console.log('로그인 확인 완료')
}

const tabs: IBubbleTabConfig[] = [
  {
    activeColor: 'white',
    activeBackgroundColor: '#FFD774',
    activeIcon: 'guide',
    name: 'GUIDE'
  },
  {
    activeColor: 'white',
    activeBackgroundColor: '#FFD774',
    activeIcon: 'feed',
    name: 'FEED'
  },
  {
    activeColor: 'white',
    activeBackgroundColor: '#FFD774',
    activeIcon: 'myPage',
    name: 'MY PAGE'
  },
];

const fontAwesomeIconRenderer = ({ icon, color }: IIconRenderer) => {
   
  

  return(
    <Layout style={{backgroundColor: '#0000FF00', justifyContent: 'center', alignItems: 'center'}}>
    {(icon == 'feed')?
      <Layout style={{backgroundColor: '#0000FF00', justifyContent: 'center', alignItems: 'center'}}>
      {(color == 'white')? 
        <FeedFull width={20} height={15} style={{marginHorizontal: 5}} />
      :
        <Feed width={20} height={15} style={{marginHorizontal: 10}} />
      }
      </Layout>      
    :
      null
    }

    {(icon == 'myPage')?
      <Layout style={{backgroundColor: '#0000FF00', justifyContent: 'center', alignItems: 'center'}}>
      {(color == 'white')? 
        <MyPageFull width={20} height={15} style={{marginHorizontal: 5}} />
      :
        <MyPage width={20} height={15} style={{marginHorizontal: 10}} />
      }
      </Layout>      
    :
      null
    }

    {(icon == 'guide')?
      <Layout style={{backgroundColor: '#0000FF00', justifyContent: 'center', alignItems: 'center'}}>
      {(color == 'white')? 
        <GuideFull width={20} height={15} style={{marginHorizontal: 5}} />
      :
        <Guide width={20} height={15} style={{marginHorizontal: 10}} />
      }
      </Layout>      
    :
      null
    }
    
    
    
    </Layout>
  );
}


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
      activeTabSize={170}
      iconRenderer={fontAwesomeIconRenderer}
      style={{height: 50, borderColor: 'white'}}
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

  console.log(routeName);

  if(routeName == 'Feed' || routeName == ''){
    return true;
  }
  else{
    return false;
  }
}



export const MainNavigator = (): React.ReactElement => (
    <Tab.Navigator
        initialRouteName={'Feed'}
        tabBar={({ state, descriptors, navigation }) =>
          <CustomTabBar
            state={state}
            descriptors={descriptors}
            navigation={navigation}
          />
        }
    >        
        <Tab.Screen name={NavigatorRoute.GUIDE} component={GuideNavigator} 
          options={({ route }) => ({
            tabBarVisible: getTabBarVisibility2(route),
            unmountOnBlur : true
          })}/>
        <Tab.Screen name={NavigatorRoute.FEED} component={FeedNavigator} 
          options={({ route }) => ({
            tabBarVisible: FeedVisiblity(route),
            unmountOnBlur : true
          })}          
        />
        <Tab.Screen name={NavigatorRoute.MY_PAGE} component={MyPageNavigator} 
          options={({ route }) => ({
            unmountOnBlur : true
        })}/>
    </Tab.Navigator>
);