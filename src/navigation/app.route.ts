export enum NavigatorRoute {
    AUTH = 'Auth',
    EMAIL = 'Email',
    MAIN = 'Main',
    FEED = 'Feed',
    GUIDE = 'Guide',
    MY_PAGE = 'MyPage',
    PAY = 'Pay',
    ATTRACTION = 'Attraction',
    RESTAURANT = 'Restaurant',
    CAFE = 'Cafe',
    COURSE = 'Course',
    COURSE_DETAIL = 'Course Detail',
    BOOK = 'Book',
    BOOK_CONFIRM = 'Book Confirm',
    BOARD = 'Board',

    HOME = 'Home',
    CHAT = 'Chat',
    SERIES = 'Series',
    MY = 'My',
    BOOKMARK = 'Bookmark',
    ZONE = 'Zone'
}

export enum SceneRoute {
    //Book Navigator
    BOOK_FIRST = 'Book First',
    BOOK_SECOND = 'Book Second',
    BOOK_THIRD = 'Book Third',
    PAYMENT = 'Payment',
    BOOK_FOUTH = 'Book Fouth',
    REFUND_POLICY2 = 'Refund Policy2',

    // Pay Navigator
    PAY_FIRST = 'Pay First',
    PAY_SECOND = 'Pay Second',
    PAY_FAILED = 'Pay Failed',
    PAY_CANCELLATION = 'Pay Cancellation',
    PAY_PROCESS = 'Pay Process',

    //Home Navigator
    HOME = 'HomeScreen',

    //Chat Navigator
    CHAT = 'Chat',
    CHATROOM = 'Chatroom',
    CHAT_HELP = 'Chat Help',
    CHAT_REPORT = 'Chat Report',
    CHAT_ROOM = 'Chat Room',
    CHAT_ROOM_SETTING = 'Chat Room Setting',
    CHAT_ERROR_REPORT = 'Chat Error Report',
    CHAT_QUICK_SEARCH = 'Chat Quick Search',
    CHAT_QUICK_RECOMMENDATION = 'Chat Quick Recommendation',

    //Series Navigator
    SERIES = 'Series',
    SERIES_HIDDEN_GEM = 'Series Hidden Gem',
    SERIES_HIDDEN_GEM_DETAIL = 'Series Hidden Gem Detail',

    SERIES_HIDDEN_GEM_DETAIL_ATTR = 'Series Hidden Gem Detail Attr',
    SERIES_HIDDEN_GEM_DETAIL_REST = 'Series Hidden Gem Detail Rest',
    SERIES_HIDDEN_GEM_DETAIL_CAFE = 'Series Hidden Gem Detail Cafe',

    SERIES_A = 'Series_A',
    SERIES_A_DETAIL = 'Series_A Detail',
    SERIES_B = 'Series_B',
    SERIES_B_DETAIL = 'Series_B Detail',

    SUBCATEGORY_DETAIL = 'SubCategory Detail',
    GUIDEBOOK_DETAIL = 'Guidebook Detail',

    //Auth Navigator
    SIGN_IN = 'Sign In',
    SIGN_UP = 'Sign Up',
    SNS_SIGN_UP = 'Sns Sign Up',
    EMAIL_VERIFICATION = 'Email Verification',
    EMAIL_FAIL = 'Email Fail',
    PASSWORD = 'Password',

    //My Navigator
    MY = 'My',
    MY_PROFILE = 'My Profile',
    MY_SETTING = 'My Setting',
    REFUND_POLICY = 'Refund Policy',
    PAID_CHAT_LIST = 'Paid Chat List',
    BOOKMARK_LIST = 'Bookmark List',
    HISTORY = 'History',

    // Bookmark list
    BOOKMARK_SERIES = 'Bookmark Series',
    BOOKMARK_SERIES_A = 'Bookmark Series A',
    BOOKMARK_SERIES_B = 'Bookmark Series B',

    //My - Privacy
    PRIVACY = 'Privacy',
    PRIVACY_CONFIRM = 'Privacy Confirm',
    PRIVACY_LOGIN = 'Privacy Login',

    //My - Customer Service
    CUSTOMER_SERVICE = 'Customer Service',
    FAQ = 'FAQ',

    MY_PAGE = 'My Page',
    MY_PAGE_SETTING = 'My Page Setting',
    MY_PAGE_CUSTOMERSERVICE = 'My Page CurstomerService',
    MY_PAGE_NOTIFICATION = 'My Page Notification',
    MY_PAGE_PRIVACY = 'My Page Privacy',
    MY_PAGE_PRIVACY_LOGIN = 'My Page Privacy Login',
    MY_PAGE_PRIVACY_CONFIRM = 'My Page Privacy Confirm',
    MY_PAGE_PROFILE = 'My Page Profile',
    MY_PAGE_FAQ = 'My Page FAQ',

    //공통 인수
    LOGIN_CHECK = 'Login Check',

    PAY = 'Pay',

    BOOK_DATE = 'Book Date',
    BOOK_PAY = 'Book Pay',
    BOOK_PROFILE = 'Book Profile',

    //Zone Navigator용 route
    ZONE_MAIN = 'Zone Main',
    ZONE_CONTENTS = 'Zone Contents',
}
