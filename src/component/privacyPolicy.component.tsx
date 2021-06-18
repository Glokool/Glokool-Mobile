import React from 'react';
import {
    Layout,
    Text,
} from '@ui-kitten/components';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

export const privacyPolicycard = () => {
    return(
        <Layout>
            <ScrollView>

            <Text style={styles.terms}>
                This Privacy Policy describes how Glokol (“We”) collects, uses and shares your information on our website at glokool.com (the “Site”) and various relates services (collectively, the “Services”).
            </Text>

            <Text style={styles.termsTitle}>
                1. Information Collection and Use
            </Text>

            <Text style={styles.termsSmallTitle}>
                A. Account Information
            </Text>
            <Text style={styles.terms}>
                We ask for and store personally identifiable information about you when you create an account on the Site, such as your first, last name, email address, gender and date of birth. We use your name to create your account name and your email address to send you updates and messages regarding the Services. With date of birth, we provide age-appropriate content to users. If you choose to connect your account with Facebook, Twitter or any other service, we will receive and keep basic account registration data from the service, such as name, email address and user ID. Except as otherwise stated in this Privacy statement, we do not disclose your account information to other users of the Service. Should you provide them, we may also use your current location, status and travel preferences in order to supply you with accurate information or for advertising purposes later on. 
            </Text>

            <Text style={styles.termsSmallTitle}>
                B. Site Activity Information
            </Text>
            <Text style={styles.terms}>
                We keep track of your Site activities such as your connections and bookmarks, postings, etc.
            </Text>

            <Text style={styles.termsSmallTitle}>
                C. Content
            </Text>
            <Text style={styles.terms}>
                Our Services are designed to enable users to share information with the world. You can participate in the Site and Application by writing comments, tips & reviews, uploading pictures, completing your profile information, clicking buttons that show your interests and thoughts, and filling out and editing spot information. Such information is to be displayed to other users in public.
            </Text>

            <Text style={styles.termsSmallTitle}>
                D. Log Data
            </Text>
            <Text style={styles.terms}>
                Our servers automatically record information from your browser and phone, such as your IP addresses, browser type, Internet Service Provider, referring/exit pages, platform type, date/time stamp, number of clicks, pages visited, and search terms. This information may be used in order to track user movements, analyze broad trends and gather statistical information.
            </Text>

            <Text style={styles.termsSmallTitle}>
                E. Cookies and Web Beacons
            </Text>
            <Text style={styles.terms}>
                Like many other sites, we use “cookies” to make Glokool easier to use. Cookies are small pieces of data places on your computer. You can set your Web browser to accept or decline cookies. Some sections of our Site may not function properly if you decline cookies. “Web beacons” (also known as “Pixel Tags” and “Clear GIFs”) are small transparent graphic images (on a web page or in an email) that are usedin combination with cookies in order to monitor some of your activities on our Site and personalize our Site for the users.        
            </Text>

            <Text style={styles.termsSmallTitle}>
                F. Account Deactivation
            </Text>
            <Text style={styles.terms}>
                When you deactivate your account, the reviews, tips, comments and images that you have posted will not be shown to other users. Only the contribution you have made to spot information, which is considered a part of aggregated and collective intelligence along with other users’ contributions, will remain as anonymous. Your account will automatically be deleted after a year of no reactivation. The account can be deleted immediately at your request.
                {'\n'}
                You are required to create an account and provide certain information about yourself in order to use some of the features in the Services. You are fully responsible for any and all use of your account, including maintaining the confidentiality of your password. You agree not to disclose your password to any third party other than you nor access the account of another member at any time. We reserve the right to close your account at any time for any or no reason.
            </Text>

            <Text style={styles.termsTitle}>
                2. User Account
            </Text>

            <Text style={styles.termsSmallTitle}>
                A. Disclosure to the Public
            </Text>
            <Text style={styles.terms}>
                We may share your non personal or public content to a broader audience such as other websites or media platforms.
            </Text>

            <Text style={styles.termsSmallTitle}>
                B. Disclosure to Third Party Service Providers
            </Text>
            <Text style={styles.terms}>
                We may use third party service providers that may be associated with us to perform certain functions on our behalf, including technical operation and customer support. We may share your information so that they perform the services, but they will not be authorized to use the information for any other purpose.
            </Text>

            <Text style={styles.termsSmallTitle}>
                C. Disclosure to Investigations
            </Text>
            <Text style={styles.terms}>
                We may disclose information about you if we believe that disclosure is reasonable to i) establish our or a third party’s legal rights ii) defend against legal claims iii) take action against suspected illegal activities.
            </Text>

            <Text style={styles.termsTitle}>
                3. Information Management
            </Text>

            <Text style={styles.termsSmallTitle}>
                4. Contact Information
            </Text>
            <Text style={styles.terms}>
                Should you have any questions, comments or concerns about this Privacy Policy or the practices of the Site, please contact us at glokoolofficial@gmail.com
            </Text>
            <Layout style={{height: 100}}/>
            </ScrollView>
        </Layout>          
    );
}

const styles = StyleSheet.create({
    terms:{
      fontSize: 12,
      textAlign: 'left'
    },
    termsTitle: {
      fontSize: 14,
      textAlign: 'left',
      fontWeight: 'bold',
      marginVertical: 4,
    },
    termsSmallTitle: {
      fontSize: 13,
      textAlign: 'left',
      fontWeight: 'bold',
      marginVertical: 2,
    },
});