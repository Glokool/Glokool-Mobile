import React from 'react';
import { Layout, } from '@ui-kitten/components';
import {
    StyleSheet,
    Text,
    Pressable
} from 'react-native';
import { HomeScreenProps } from '../../navigation/SceneNavigator/Home.navigator';
import { HomeTopTabBar } from '.';
import { HomeImage } from '../../assets/icon/Home';
import { Enter_Purple, Enter_LightPurple } from '../../assets/icon/Home';
import LinearGradient from 'react-native-linear-gradient';
import { windowWidth, windowHeight } from '../../Design.component';
import { NavigatorRoute } from '../../navigation/app.route';

export const HomeGlochatComponent = (props: HomeScreenProps) => {
    return (
        <Layout style={styles.GloChatContainer}>

            {/* top tab bar */}
            <HomeTopTabBar />

            <HomeImage style={styles.GloChatImage} />


            <Layout style={styles.GloChatTitleContainer}>
                <Text style={styles.GloChatTitleText}>Start your journey</Text>
                <Text style={styles.GloChatTitleText}>with <Text style={{ color: '#8B63FF' }}>GloChat</Text> today!</Text>
            </Layout>

            <Layout style={styles.GloChatSubTitleContainer}>
                <Text style={styles.GloChatSubTitleText}>A real-time</Text>
                <Text style={styles.GloChatSubTitleText}>travel assistance service</Text>
            </Layout>

            <Layout style={styles.GloChatButtonContainer}>
                <Pressable style={styles.HowItWorks}>
                    <Text style={styles.HowItWorksText}>How it Works?</Text>
                    <Enter_Purple width={windowWidth * 0.05} />
                </Pressable>

                <LinearGradient
                    style={styles.StartGloChat}
                    colors={['#7777ff', '#8946A1']}
                    start={{ x: 1, y: 0.5 }}
                    end={{ x: 0, y: 0.5 }}
                    onTouchEnd={() => props.navigation.navigate(NavigatorRoute.CHAT)}
                >
                    <Text style={styles.StartGloChatText}>Start GloChat</Text>
                    <Enter_LightPurple width={windowWidth * 0.05} />
                </LinearGradient>
            </Layout>

        </Layout>
    )
}

const styles = StyleSheet.create({
    GloChatContainer: {
        paddingHorizontal: windowWidth * 0.05,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
        shadowColor: '#7777ff',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 2,
    },
    GloChatImage: {
        position: 'absolute',
        right: 0,
        bottom: windowHeight * 0.05,
    },
    GloChatTitleContainer: {
        backgroundColor: '#0000',
    },
    GloChatTitleText: {
        fontFamily: 'Pretendard-ExtraBold',
        fontSize: 27,
        color: '#2F2073'
    },
    GloChatSubTitleContainer: {
        backgroundColor: '#0000',
        marginTop: windowHeight * 0.005
    },
    GloChatSubTitleText: {
        fontFamily: 'Pretendard-Medium',
        fontSize: 16,
        color: '#5454A5'
    },
    GloChatButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: windowHeight * 0.12,
        paddingBottom: windowHeight * 0.025,
        width: windowWidth * 0.9,
        backgroundColor: '#0000',
        elevation: 3,
    },
    StartGloChat: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: windowWidth * 0.43,
        paddingVertical: windowHeight * 0.01,
        borderRadius: 100,
        opacity: 0.84
    },
    StartGloChatText: {
        color: 'white',
        fontFamily: 'Pretendard-Medium',
        fontSize: windowWidth * 0.035,
        marginRight: 5
    },
    HowItWorks: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: windowWidth * 0.43,
        paddingVertical: windowHeight * 0.01,
        borderRadius: 100,
        borderWidth: 1.5,
        borderColor: '#9A94F6',
        backgroundColor: '#fff',
        opacity: 0.84,
    },
    HowItWorksText: {
        color: '#6969DF',
        fontFamily: 'Pretendard-Medium',
        fontSize: windowWidth * 0.035,
        marginRight: 5
    }
})