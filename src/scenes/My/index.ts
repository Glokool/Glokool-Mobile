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
    uid: string, 
    name: string, 
    email: string, 
    contact: string,     
    refund: {
      check: boolean, 
      complete :  boolean | undefined,
      createdAt: Date | undefined,
      completedAt: Date | undefined, 
    },
    guide: {
        uid: string, 
        name: string,
        score: number, 
    },
    day: Date,
    lang: string,
    money: string,
    paymentID: string,
    paymentDate: Date,
    _id: string
}