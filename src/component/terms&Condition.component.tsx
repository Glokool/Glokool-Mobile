import React from 'react';
import {
    Layout,
    Text,
} from '@ui-kitten/components';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

export const TermsConditionCard = () => {
    return(
        <Layout>
        <ScrollView>

        <Text style={styles.terms}>
            Holeinone ("we", “us”, “our” and “Holeinone”) provides the glokool.com website including sub-sites, mobile properties (collectively, the "Website") and various related services (collectively, the "Services") to the user of this Website and/or contributing content on this Website (“user” or “you”) subject to your compliance with all the terms, conditions, and notices contained or referenced herein (collectively, the "Terms"). By accessing and using this Website, you agree to be bound by these Terms. In addition, when using particular services or any text, images, photos, location data, and other materials uploaded on this Website (collectively, the “Content”), users shall be subject to any posted rules applicable to such services or materials that may contain terms and conditions in addition to those in these Terms. All such guidelines or rules are hereby incorporated by reference into these Terms.
        </Text>

        <Text style={styles.termsTitle}>
            1. Eligibility
        </Text>
        <Text style={styles.terms}>
            By using the Services, you warrant that i) all information supplied by you is true, complete, accurate and up-to-date; ii) you are 13 years of age or older. You may not access our Services if you have been previously banned by us except for special cases that we have approved.
        </Text>

        <Text style={styles.termsTitle}>
            2. User Account
        </Text>
        <Text style={styles.terms}>
            You are required to create an account and provide certain information about yourself in order to use some of the features in the Services. You are fully responsible for any and all use of your account, including maintaining the confidentiality of your password. You agree not to disclose your password to any third party other than you nor access the account of another member at any time. We reserve the right to close your account at any time for any or no reason.                
        </Text>
        
        <Text style={styles.termsTitle}>
            3. Content
        </Text>
        <Text style={styles.terms}>
        You own your Content and information you post on the Services. By posting any content on or through the Services, you hereby irrevocably grant us worldwide, non-exclusive, royalty-free, transferable, sub-licensable rights to use your Content for any purpose. We may use, modify, translate, publicly display, reproduce, distribute in any media formats. We own the Holeinone Content and the Services, which are protected by copyright, trademark, patent, trade dress or other proprietary rights and laws. Thus, Holeinone grants you limited license to reproduce and display the Holeinone Content solely for your personal use in viewing the Website or using the Services. You may not modify, reproduce, distribute, create related works, publicly display or in any way exploit any of the Holeinone Content except when authorized by us.
        </Text>

        <Text style={styles.termsTitle}>
            4. Use of Services
        </Text>
        <Text style={styles.terms}>
            You agree to take full responsibility in checking all information given on our Website as well as in making sure that all information you submit to Holeinone and/or any third party including, but not limited to, option, date, time, and quantity, for using Services provided by Holeinone and/or any third party is correct and appropriate. Any losses or damages caused by not doing so will not be Holeinone’s or any third party’s responsibility. You must check all the information regarding the Services that you purchase provided on the Website and in the confirmation email you will receive upon completion of booking the Services. Any losses or damages caused by not doing so will not be Holeinone’s or any third party’s responsibility
        </Text>

        <Text style={styles.termsTitle}>
            {`5. Payments & Cancellations`}
        </Text>
        <Text style={styles.termsSmallTitle}>
            A. Payments
        </Text>
        <Text style={styles.terms}>                  
            There are four types of payment methods available on our Website; Credit Card, PayPal, Alipay, and Bank Transfer. Holeinone accepts the following credit cards: Mastercard, Visa, American Express, and Union pay. There is no charge or service fee for processing credit or debit card payments. Full payment by either bank transfer or credit/debit card is required to make a reservation. In the event you choose to pay via Bank Transfer, you are required to complete the payment within 24 hours of your booking attempt. Furthermore, you must send a copy of your bank transfer receipt to glokoolofficial@gmail.com to verify the payment. Failing to do so will result in cancellation of the payment process, and therefore in cancellation of the purchase of services. Any losses or damages resulted from this will be solely your responsibility.
        </Text>

        <Text style={styles.termsSmallTitle}>
            B. Cancellations
        </Text>
        <Text style={styles.terms}>                  
            No refunds are available once a tour or service has commenced, or in respect of any other services utilized. Canceling a reservation with Holeinone can result in cancellation fees being applied by Holeinone and/or third party supplier or tour operator. Refer to the pages of the tours or services that you have purchased on our Website for cancellation policies specific to each tour or service. When canceling any booking you will be notified via email or any other communication channels that Holeinone uses of the total cancellation fees.
            No exceptions are made to the cancellation policy of each tour or service for any reason, including neither personal or medical, weather or other forces of nature, terrorism, civil unrest, strikes, international or internal (domestic) flight cancellations, nor any other reason beyond our control. 
        </Text>

        <Text style={styles.termsTitle}>
            6. Restrictions
        </Text>
        <Text style={styles.terms}>
            We reserve the right at all times to investigate and take appropriate action at our sole discretion against anyone who violates this provision. Prohibited Content or Activity are as follows : {'\n'}
            i) violates or infringes other users’ rights, privacy or intellectual property{'\n'}
            ii) incites racism, sexual discrimination, or any type of offensive or malicious act against any group or individual{'\n'}
            iii) creates false, illusive, misleading information or activities{'\n'}
            iv) generates promotion or commercial information without Holeinone’s prior express written consent{'\n'}
            v) provides or provokes illegal or unlawful activities{'\n'}
            vi) uses other users’ or Holeinone Content or modifies the Content for commercial purpose{'\n'}
            vii) deliberately writes biased comments for the benefit of another party{'\n'}
            viii) solicits personal information from other users{'\n'}
        </Text>

        <Text style={styles.termsTitle}>
            7. Copyright Policy
        </Text>
        <Text style={styles.terms}>
            We respect the intellectual property rights of others and expect users of the Services to do the same. If you believe your work has been copied in a way that constitutes copyright infringement, please provide i) identification of the copyrighted work; ii) the location in Holeinone where you believe the infringement has happened, and please submit the notification to: glokoolofficial@gmail.com.
            In case of copyright infringement, we may contact the user to verify the infringement case and delete all property that may have been infringed. However, we do not hold responsibility of the user's infringement of the copyright of the intellectual property as a platform provider.
        </Text>

        <Text style={styles.termsTitle}>
            8. Privacy Policy
        </Text>
        <Text style={styles.terms}>
            Any information that you provide in order to use the Services is subject to our Privacy Policy. By agreeing to these Terms, you are also consenting to our use of your personal information in accordance with our Privacy Policy. 
        </Text>

        <Text style={styles.termsTitle}>
            9. Warranty Disclaimer
        </Text>
        <Text style={styles.terms}>
            ALL MATERIALS AND SERVICES ON THIS WEBSITE ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE, OR THE WARRANTY OF NON-INFRINGEMENT. WITHOUT LIMITING THE FOREGOING, WE MAKE NO WARRANTY THAT (I) THE SERVICES AND MATERIALS WILL MEET YOUR REQUIREMENTS, (II) THE SERVICES AND MATERIALS WILL BE UNINTERRUPTED, TIMELY, SECURE, OR ERROR-FREE, (III) THE RESULTS THAT MAY BE OBTAINED FROM THE USE OF THE SERVICES OR MATERIALS WILL BE EFFECTIVE, ACCURATE OR RELIABLE, OR (IV) THE QUALITY OF ANY PRODUCTS, SERVICES, OR INFORMATION PURCHASED OR OBTAINED BY YOU FROM THE WEBSITE FROM US OR OUR AFFILIATES WILL MEET YOUR EXPECTATIONS OR BE FREE FROM MISTAKES, ERRORS OR DEFECTS. THIS WEBSITE COULD INCLUDE TECHNICAL OR OTHER MISTAKES, INACCURACIES OR TYPOGRAPHICAL ERRORS. WE MAY CHANGE, ADD OR REMOVE MATERIALS AND SERVICES ON THE WEBSITE, INCLUDING THE PRICES AND DESCRIPTIONS OF ANY PRODUCTS LISTED HEREIN, AND ITS STRUCTURE AND FUNCTIONS AT ANY TIME AT OUR SOLE DISCRETION, WITHOUT SPECIFICALLY INFORMING OF ANY SUCH CHANGE. THE MATERIALS OR SERVICES ON THIS WEBSITE MAY BE OUT OF DATE, AND WE MAKE NO COMMITMENT TO UPDATE SUCH MATERIALS OR SERVICES. THE USE OF THE SERVICES OR THE DOWNLOADING OR OTHER ACQUISITION OF ANY MATERIALS THROUGH THIS WEBSITE IS DONE AT YOUR OWN DISCRETION AND RISK AND WITH YOUR AGREEMENT THAT YOU WILL BE SOLELY RESPONSIBLE FOR ANY DAMAGE TO YOUR COMPUTER SYSTEM OR LOSS OF DATA THAT RESULT FROM SUCH ACTIVITIES. WE MAKE NO WARRANTY REGARDING ANY TRANSACTIONS EXECUTED THROUGH, OR IN CONNECTION WITH THIS WEBSITE, AND YOU UNDERSTAND AND AGREE THAT SUCH TRANSACTIONS ARE CONDUCTED ENTIRELY AT YOUR OWN RISK. ANY WARRANTY THAT IS PROVIDED IN CONNECTION WITH ANY PRODUCTS, SERVICES MATERIALS, OR INFORMATION AVAILABLE ON OR THROUGH THIS WEBSITE FROM A THIRD PARTY IS PROVIDED SOLELY BY SUCH THIRD PARTY, AND NOT BY US OR ANY OTHER OF OUR AFFILIATES. Content available through this Website often represents the opinions and judgments of an information provider, Website user, or other person or entity not connected with us. We do not endorse, nor are we responsible for the accuracy or reliability of, any opinion, advice, or statement made by anyone other than an authorized Holeinone spokesperson speaking in his/her official capacity. Please refer to the specific editorial policies posted on various sections of this Website for further information, which policies are incorporated by reference into these Terms. You understand and agree that temporary interruptions of the Services available through this Website may occur as normal events. You further understand and agree that we have no control over third party networks you may access in the course of the use of this Website, and therefore, delays and disruption of other network transmissions are completely beyond our control. You understand and agree that the Services available on this Website are provided "AS IS" and that we assume no responsibility for the timeliness, deletion, mis-delivery or failure to store any user communications or personalization settings.
        </Text>

        <Text style={styles.termsTitle}>
            10. Limitation of Liability
        </Text>
        <Text style={styles.terms}>
            IN NO EVENT SHALL WE OR OUR AFFILIATES BE LIABLE TO YOU OR ANY THIRD PARTY FOR ANY SPECIAL, PUNITIVE, INCIDENTAL, INDIRECT OR CONSEQUENTIAL DAMAGES OF ANY KIND, OR ANY DAMAGES WHATSOEVER, INCLUDING, BUT NOT LIMITED TO, THOSE RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER OR NOT WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES, AND ON ANY THEORY OF LIABILITY, ARISING OUT OF OR IN CONNECTION WITH THE USE OF THIS WEBSITE OR OF ANY WEBSITE REFERENCED OR LINKED TO FROM THIS WEBSITE. FURTHER, WE SHALL NOT BE LIABLE IN ANY WAY FOR THIRD PARTY GOODS AND SERVICES OFFERED THROUGH THIS WEBSITE OR FOR ASSISTANCE IN CONDUCTING COMMERCIAL TRANSACTIONS THROUGH THIS WEBSITE, INCLUDING WITHOUT LIMITATION THE PROCESSING OF ORDERS.
        </Text>

        <Text style={styles.termsTitle}>
            11. Indemnification
        </Text>
        <Text style={styles.terms}>
            Upon a request by us, you agree to defend, indemnify, and hold us and our Affiliates harmless from all liabilities, claims, and expenses, including attorney’s fees that arise from i) your use or misuse of this Website; ii) your violation of any term of these Terms. We reserve the right, at our own expense, to assume the exclusive defense and control of any matter otherwise subject to indemnification by you, in which event you will cooperate with us in asserting any available defenses.
        </Text>

        <Text style={styles.termsTitle}>
            12. Termination of Use
        </Text>
        <Text style={styles.terms}>
            You agree that we may, in our sole discretion, terminate or suspend your access to all or part of the Website with or without notice and for any reason, including, without limitation, breach of these Terms. Any suspected fraudulent, abusive or illegal activity may be grounds for terminating your relationship and may be referred to appropriate law enforcement authorities. Upon termination or suspension, regardless of the reasons therefore, your right to use the Services available on this Website immediately ceases, and you acknowledge and agree that we may immediately deactivate or delete your account and all related information and files in your account and/or bar any further access to such files or this Website. We shall not be liable to you or any third party for any claims or damages arising out of any termination or suspension or any other actions taken by us in connection with such termination or suspension. You may terminate the Terms by closing your account or discontinuing your use of the Services, alerting Holeinone with a notice of termination. If you close your account, we may continue to display your Content in which it is considered a part of collective contribution.
        </Text>

        <Text style={styles.termsTitle}>
            13. Contact Information
        </Text>
        <Text style={styles.terms}>
            Should you notice that any user is violating these Terms or have questions, please contact us at glokoolofficial@gmail.com
            We expressly reserve the right to change these Terms from time to time. You acknowledge and agree that it is your responsibility to review this Website and these Terms from time to time and to familiarize yourself with any modifications. Your continued use of this Website after such modifications will constitute acknowledgement of the modified Terms and agreement to abide and be bound by the modified Terms.
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