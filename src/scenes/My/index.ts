export { MYScreen } from './My.component'
export { PaidChatList } from './PaidChatList.component';
export { MySetting } from './My.Setting.component';

//Customer Service
export { CustomerService } from './CustomerService/CustomerService.component'
export { FAQ } from './CustomerService/FAQ.component'; 

//Privacy
export { Privacy } from './Privacy/Privacy.component';
export { PrivacyConfirm } from './Privacy/Privacy.confirm.component';
export { PrivacyLogin } from './Privacy/Privacy.login.component'


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