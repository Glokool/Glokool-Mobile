export { MYScreen } from './My.component'
export { PaidChatList } from './PaidChatList.component';
export { MySetting } from './My.Setting.component';
export { MyProfile} from './My.Profile.component';

//Customer Service
export { CustomerServiceComponent } from './CustomerService/CustomerService.component'
export { FAQ } from './CustomerService/FAQ.component'; 

//Privacy
export { Privacy } from './Privacy/privacy.component';
export { PrivacyConfirm } from './Privacy/privacy.confirm.component';
export { PrivacyLogin } from './Privacy/privacy.login.component'

//BookmarkList
export { BookmarkList } from './Bookmark/Bookmark.List.component';


export type ReservationInfo = {
    user: {
      uid: String, 
      name: String, 
      email: String, 
      contact: String, 
    },
    refund: {
      check: Boolean, 
      complete :  Boolean,
      createdAt: Date,
      completedAt: Date, 
    },
    guide: {
        uid: String, 
        name:  String,
        score: Number, 
    },
    day: Date,
    lang: String,
    money: String,
    paymentID: String,
    paymentDate: Date,
    _id: string
}