export type GloChatData = {
    _id : string;
    day: Date;
    guide : {
        name : string;
        score: number;
        uid : string;
    };
    paymentID : string;
}