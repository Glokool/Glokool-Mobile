import React, { useContext } from 'react';
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
    Series,
    Series_S,
} from '../assets/icon/BottomNavigation';
import { NavigatorRoute, SceneRoute } from './app.route';
import { ChatContext } from '../context/ChatContext';
import { AuthContext } from '../context/AuthContext';
import { alertWindow } from '../component/Common/LoginCheck.component';

const Tab = createBottomTabNavigator();

function MyTabBar({
    state,
    descriptors,
    navigation,
}: BottomTabBarProps<BottomTabBarOptions>) {
    const { onChat } = useContext(ChatContext);
    const { currentUser } = useContext(AuthContext);
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
        <View
            style={{
                position: 'absolute',
                bottom: 0,
                flexDirection: 'row',
                borderTopLeftRadius: 15,
                borderTopRightRadius: 15,
                backgroundColor: 'white',
                borderTopColor: '#fff',
                borderTopWidth: 0.5,
                shadowColor: 'rgba(0, 0, 0, 1)',
                shadowOffset: {
                    width: 0,
                    height: 6,
                },
                shadowRadius: 5,
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
                    if (route.name == 'My' && !currentUser) {
                        alertWindow(navigation);
                    }
                    else {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                            canPreventDefault: true,
                        });

                        if (!isFocused && !event.defaultPrevented) {
                            navigation.navigate(route.name);
                        }
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
                        style={index != 1 ? styles.ButtonContainer : styles.ChatButtonContainer}>
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
                                ) : (onChat ?
                                    <Chat_Alert /> : <Chat />
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
    );
}

const GuideVisiblity = (route) => {
    const routeName = route.state
        ? route.state.routes[route.state.index].name
        : '';

    if (
        routeName === 'Chatroom' ||
        routeName === 'Chat Help' ||
        routeName === 'Chat Report' ||
        routeName === SceneRoute.PAID_CHAT_LIST
    ) {
        return false;
    }

    return true;
};

export const MainNavigator = (): React.ReactElement => (
    <Tab.Navigator
        tabBar={(props) => <MyTabBar {...props} />}
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
                unmountOnBlur: true,
            })}
        />
        <Tab.Screen
            name={NavigatorRoute.MY}
            component={MyNavigator}
            options={({ route }) => ({
                tabBarVisible: GuideVisiblity(route),
                unmountOnBlur: false,
            })}
        />
    </Tab.Navigator>
);

const styles = StyleSheet.create({
    ButtonContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10,
        marginBottom: 20,
        paddingBottom: 10,
        paddingTop: 10,
    },
    ChatButtonContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10,
        marginBottom: 20,
        paddingBottom: 10,
        paddingTop: 10,
        // backgroundColor: 'white',
        // borderBottomLeftRadius: 20,
        // borderBottomRightRadius: 20,
        // shadowColor: 'rgba(0, 0, 0, 1)',
        // shadowOffset: {
        //     width: 0,
        //     height: 1,
        // },
        // shadowRadius: 5,
        // elevation: 1,
        // shadowOpacity: 0.11,
    }
})