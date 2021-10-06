// Home
export type HomeCarousel_Item = {
    title: string;
    type: string;
    image: string;
    _id: string;
};

// Chat
export type GloChatData = {
    _id: string;
    day: Date;
    guide: {
        name: string;
        score: number;
        uid: string;
        token?: string;
        avatar?: string;
    };
    paymentID: string;
}

export type WeatherInfo = {
    main: string;
    temp: string;
    temp_min: string;
    temp_max: string;
}

export type PriceData = {
    active: boolean;
    discountedPrice: number;
    price: number;
    discount: number;
}

export type messageType = {
    _id: string;
    text?: string;
    location?: string;
    createdAt: number;
    user: {
        _id: string;
    };
    image?: string;
    audio?: string;
    messageType: string;
}

export type GuideInfoType = {
    __v?: any;
    _id?: string;
    avatar?: string;
    birthDate?: string;
    contact?: string;
    country?: string;
    email?: string;
    gender?: string;
    intro?: string;
    keyword?: Array<string>;
    lang?: Array<boolean>;
    name?: string;
    oneLineIntro?: string;
    rate?: Array<any>;
    report?: Array<any>;
    signupDate?: string;
    token?: string;
    uid?: string;
    withdrawal?: boolean;
};

// Series
export type image = {
    width: number,
    height: number
}

export type IntroData = {
    _id: string;
    author: string;
    img: string;
}

export type photoSpot = {
    _id: string;
    desc: string;
    images: Array<photoSpotImage>;
    location: string;
}

export type photoSpotImage = {
    _id: string;
    author: string;
    img: string;
}

export type GridItem = {
    image: string,
    title: string,
    id: string,
    type: string,
}

export type SignatureMenu = {
    _id: string;
    author: string;
    img: string;
    money: string;
    title: string;
}

export type recommendation_Item = {
    _id: string;
    image: string;
    title: string;
};

export type Comments_Item = {
    _id: string;
    writer: {
        uid: string;
        name: string;
        avatar: string;
        grade: string;
    };
    comment: string;
    createdAt: Date;
    plus: Array<string>;
};

export type Comments_Item_Blog = {
    writer: {
        uid: string;
        name: string;
        avatar: string;
        grade: string;
    };
    comment: string;
    parentComment: string;
    isDeleted: Boolean;
    createdAt: Date;
    updatedAt: Date;
    plus: Array<string>;
}

export type ContentImg_Item = {
    _id: string;
    author: string;
    img: string;
};

export type Content_Item = {
    _id: string;
    desc: string;
    images: Array<ContentImg_Item>;
    title: string;
};

export type Series_Item = {
    images: Array<string>;
    comments: Array<Comments_Item>;
    _id: string;
    count: string;
    desc: string;
    gloPick: string;
    plus: Array<string>;
    title: string;
    createdAt: Date;
    recommendation: Array<recommendation_Item>;
};

export type Series_Item_Blog = {
    count: string;
    cover: string;
    createdAt: Date;
    desc: string;
    plus: Array<string>;
    smallTitle: string;
    title: string;
    _id: string;
    comments: Array<Comments_Item_Blog>;
    content: Array<Content_Item>;
    recommendation: Array<recommendation_Item>;
};

export type AttractionData = {
    _id: string;
    banner: string;
    count: number;
    cover: string;
    cretedAt: Date;
    desc: string;
    editorNote: Array<string>;
    entryFee: string;
    glokoolService: Array<string>;
    intro: Array<IntroData>;
    lat: string;
    lon: string;
    loc: string;
    note: string;
    phone: string;
    plus: Array<string>;
    sns: string;
    tag: Array<string>;
    time: {
        breakTime: string;
        everyTime: string;
    };
    title: string;
    visible: boolean;
    photoSpot: Array<photoSpot>;
};

export type CafeData = {
    _id: string;
    banner: string;
    count: number;
    cover: string;
    cretedAt: Date;
    desc: string;
    editorNote: Array<string>;
    entryFee: string;
    glokoolService: Array<string>;
    intro: Array<IntroData>;
    lat: string;
    lon: string;
    loc: string;
    note: string;
    phone: string;
    menu: Array<string>;
    plus: Array<string>;
    sns: string;
    tag: Array<string>;
    time: {
        breakTime: string;
        everyTime: string;
    };
    title: string;
    visible: boolean;
    sgntMenu: Array<SignatureMenu>;
};

export type RestaurantData = {
    _id: string;
    banner: string;
    count: number;
    cover: string;
    cretedAt: Date;
    desc: string;
    editorNote: Array<string>;
    entryFee: string;
    glokoolService: Array<string>;
    intro: Array<IntroData>;
    lat: string;
    lon: string;
    loc: string;
    note: string;
    phone: string;
    menu: Array<string>;
    plus: Array<string>;
    sns: string;
    tag: Array<string>;
    time: {
        breakTime: string;
        everyTime: string;
    };
    title: string;
    visible: boolean;
    sgntMenu: Array<SignatureMenu>;
}

export type ShareItem = {
    title: string;
    message: string;
    url?: string;
};

export type FacebookShareItem = {
    contentType: any;
    contentUrl: string;
    quote?: string;
}

export type TourData = {
    tourCode: string;
    title: string;
    cover: string;
    desc: string;
    tag: Array<string>;
    plus: Array<string>;
    lat: string;
    lon: string;
};

export type DetailData = {
    banner: string;
    desc: string;
    visible: boolean;
    title: string;
    placeCode: string;
    lat: string;
    lon: string;
};

export type GlokoolTourData = {
    tour: TourData;
    attraction: Array<DetailData>;
    restaurant: Array<DetailData>;
    cafe: Array<DetailData>;
    lat: string;
    lon: string;
};

// My
export type Detail_Item = {
    _id: string;
    id: string;
    image: string;
    title: string;
};

export type Bookmark_Item = {
    _id: string;
    tours: Array<Detail_Item>;
    blog: Array<Detail_Item>;
    contents: Array<Detail_Item>;
    createdAt: string;
    uid: string;
};

export type ReservationInfo = {
    uid: string,
    name: string,
    email: string,
    contact: string,
    refund: {
        check: boolean,
        complete: boolean | undefined,
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

export type FirebaseUserInfo = {
    type: string;
    avatar: string;
    birthDate: Date;
    country: string;
    email: string;
    gender: string;
    name: string;
    signupDate: Date;
};

export type userInfoType = {
    avatar: string;
    birthDate: {
        nanoseconds: number;
        seconds: number;
    },
    country: string;
    email: string;
    gender: string;
    name: string;
    signupDate: {
        nanoseconds: number;
        seconds: number;
    },
    tokens: Array<string>;
    type: string;
}

export type authContextType = {
    access_token: string;
    displayName: string;
    email: string;
    photoURL: string;
    uid: string;
}