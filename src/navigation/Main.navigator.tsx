import React,{useContext} from 'react';
import {
    BottomTabBarOptions,
    BottomTabBarProps,
    createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {
    Keyboard,
    Platform,
    SafeAreaView,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import {
    HomeNavigator,
    ChatNavigator,
    SeriesNavigator,
    MyNavigator,
} from './ScreenNavigator';
import {
    Chat,
    Chat_S,
    Chat_Alert,
    Home,
    Home_S,
    MyPage,
    MyPage_S,
    Series,
    Series_S,
} from '../assets/icon/BottomNavigation';
import { NavigatorRoute } from './app.route';
import { ChatContext } from '../context/ChatContext';

const Tab = createBottomTabNavigator();

function MyTabBar({
    state,
    descriptors,
    navigation,
}: BottomTabBarProps<BottomTabBarOptions>) {
    const { onChat } = useContext(ChatContext);

    const [visible, setVisible] = React.useState(true);

    const focusedOptions = descriptors[state.routes[state.index].key].options;

    React.useEffect(() => {
        let keyboardEventListeners: any;
        if (Platform.OS === 'android') {
            keyboardEventListeners = [
                Keyboard.addListener('keyboardDidShow', () =>
                    setVisible(false),
                ),
                Keyboard.addListener('keyboardDidHide', () => setVisible(true)),
            ];
        }
        return () => {
            if (Platform.OS === 'android') {
                keyboardEventListeners &&
                    keyboardEventListeners.forEach((eventListener) =>
                        eventListener.remove(),
                    );
            }
        };
    }, []);

    if (focusedOptions.tabBarVisible === false) return null;
    if (!visible && Platform.OS === 'android') return null;

    return (
        <View style={{ marginTop: -10 }}>
            <View
                style={{
                    flexDirection: 'row',
                    borderTopLeftRadius: 15,
                    borderTopRightRadius: 15,
                    backgroundColor: 'white',
                    borderTopColor: '#fff',
                    borderTopWidth: 0.5,
                    shadowColor: 'rgba(0, 0, 0, 0.19)',
                    shadowOffset: {
                        width: 0,
                        height: 6,
                    },
                    shadowRadius: 30,
                    elevation: 5,
                    shadowOpacity: 1,
                }}>
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
                            accessibilityState={
                                isFocused ? { selected: true } : {}
                            }
                            accessibilityLabel={
                                options.tabBarAccessibilityLabel
                            }
                            testID={options.tabBarTestID}
                            onPress={onPress}
                            onLongPress={onLongPress}
                            style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                                margin: 10,
                            }}>
                            <View
                                style={{
                                    borderRadius: 25,
                                    width: 70,
                                    height: 35,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                {label === NavigatorRoute.HOME ? (
                                    isFocused ? (
                                        <Home_S />
                                    ) : (
                                        <Home />
                                    )
                                ) : label === NavigatorRoute.CHAT ? (
                                    isFocused ? (
                                        <Chat_S />
                                    ) : ( onChat ?
                                            <Chat_Alert/> : <Chat />
                                    )
                                ) : label === NavigatorRoute.SERIES ? (
                                    isFocused ? (
                                        <Series_S />
                                    ) : (
                                        <Series />
                                    )
                                ) : label === NavigatorRoute.MY ? (
                                    isFocused ? (
                                        <MyPage_S />
                                    ) : (
                                        <MyPage />
                                    )
                                ) : null}
                            </View>

                            <Text
                                style={{
                                    color: isFocused ? '#7777FF' : '#C6C6C6',
                                    textAlign: 'center',
                                    fontSize: 11,
                                    fontWeight: 'bold',
                                }}>
                                {label}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
            <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }} />
        </View>
    );
}

const GuideVisiblity = (route) => {
    const routeName = route.state
        ? route.state.routes[route.state.index].name
        : '';

    if (
        routeName === 'Chatroom' ||
        routeName === 'Chat Help' ||
        routeName === 'Chat Report'
    ) {
        return false;
    }

    return true;
};

export const MainNavigator = (): React.ReactElement => (
    <Tab.Navigator
        tabBar={(props) => <MyTabBar {...props} />}
        tabBarOptions={{ keyboardHidesTabBar: true }}
        initialRouteName={'HOME'}>
        <Tab.Screen
            name={NavigatorRoute.HOME}
            component={HomeNavigator}
            options={({ route }) => ({ unmountOnBlur: false })}
        />
        <Tab.Screen
            name={NavigatorRoute.CHAT}
            component={ChatNavigator}
            options={({ route }) => ({
                tabBarVisible: GuideVisiblity(route),
                unmountOnBlur: true,
            })}
        />
        <Tab.Screen
            name={NavigatorRoute.SERIES}
            component={SeriesNavigator}
            options={({ route }) => ({
                unmountOnBlur: false,
            })}
        />
        <Tab.Screen
            name={NavigatorRoute.MY}
            component={MyNavigator}
            options={({ route }) => ({
                unmountOnBlur: false,
            })}
        />
    </Tab.Navigator>
);
