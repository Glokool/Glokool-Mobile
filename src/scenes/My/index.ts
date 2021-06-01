export { MYScreen } from './My.component'
export { PaidChatList } from './PaidChatList.component';
export { MySetting } from './My.Setting.component';

//Customer Service
export {  }


export { MyPageProfileScreen } from './My.Profile.component';
export { MyPageFAQScreen } from './CustomerService/FAQ.component'; 


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