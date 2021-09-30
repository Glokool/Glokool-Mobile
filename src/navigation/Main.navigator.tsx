/*
    바텀 네비게이션 스타일 및 기능을 위한 네비게이터 파일

    Tab navigator 사용 (스택 중첩 방식)
    

*/


import React, { useContext } from 'react';
import {
    BottomTabBarOptions,
    BottomTabBarProps,
    createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import {
    Keyboard,
    Platform,
    Text,
    TouchableOpacity,
    View,
    StyleSheet,
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
    Zone,
    Zone_S
} from '../assets/icon/BottomNavigation';
import { NavigatorRoute } from './app.route';
import { ChatContext } from '../context/ChatContext';
import { SafeAreaView } from 'react-native-safe-area-context';

const Tab = createBottomTabNavigator();

const MyTabBar = ({ state, descriptors, navigation }: BottomTabBarProps<BottomTabBarOptions>) => {

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
                    keyboardEventListeners.forEach((eventListener: any) =>
                        eventListener.remove(),
                    );
            }
        };
    }, []);

    if (focusedOptions.tabBarVisible === false) return null;
    if (!visible && Platform.OS === 'android') return null;

    return (
        <View style={styles.TabbarContainer} >

            {state.routes.map((route, id) => {

                const { options } = descriptors[route.key];
                const label = route.name;
                // const label =
                //     options.tabBarLabel !== undefined
                //         ? options.tabBarLabel
                //         : options.title !== undefined
                //             ? options.title
                //             : route.name;

                const isFocused = state.index === id;

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
                        key={id}
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
                        style={styles.ButtonContainer}>

                        <View style={styles.TabbarIconContainer}>
                            {label === NavigatorRoute.HOME ? (
                                isFocused ? (
                                    <Home_S />
                                ) : (
                                    <Home />
                                )
                            ) : label === NavigatorRoute.SERIES ? (
                                isFocused ? (
                                    <Zone_S />
                                ) : (
                                    <Zone />
                                )
                            ) : label === NavigatorRoute.CHAT ? (
                                isFocused ? (
                                    <Chat_S />
                                ) : (onChat ?
                                    <Chat_Alert /> : <Chat />
                                )
                            ) : label === NavigatorRoute.MY ? (
                                isFocused ? (
                                    <MyPage_S />
                                ) : (
                                    <MyPage />
                                )
                            ) : null}
                        </View>

                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

const GuideVisiblity = (route: any) => {

    const routeName = getFocusedRouteNameFromRoute(route);

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
        tabBar={(props) => <MyTabBar {...props}/>}
        tabBarOptions={{
            keyboardHidesTabBar: true,
        }}
        initialRouteName={'HOME'}
    >
        <Tab.Screen
            name={NavigatorRoute.HOME}
            component={HomeNavigator}
            options={({ route }) => ({
                unmountOnBlur: false

            })}
        />

        <Tab.Screen
            name={NavigatorRoute.SERIES}
            component={SeriesNavigator}
            options={({ route }) => ({
                unmountOnBlur: true,
            })}
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
            name={NavigatorRoute.MY}
            component={MyNavigator}
            options={({ route }) => ({
                unmountOnBlur: false,
            })}
        />
    </Tab.Navigator>
);

const styles = StyleSheet.create({

    ButtonContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginHorizontal: 10,
        marginTop: 15,
        marginBottom: 15,

    },

    TabbarContainer: {
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        paddingHorizontal: 15,
        paddingBottom: Platform.OS === 'ios' ? 20 : 0,
        paddingTop: Platform.OS === 'ios' ? 5 : 0,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
    },

    TabbarIconContainer: {
        borderRadius: 25,
        width: 70,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
    }
})