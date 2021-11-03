let serverAPI;
let cdnURL;

if (process.env.NODE_ENV === "development") {
    serverAPI = 'http://192.168.35.241:4000/v3'; //'https://api.glokool.com/v3';
    cdnURL = 'https://img.glokool.com';
} else {
    serverAPI = 'https://glokool.info'; 
    cdnURL = 'https://img.glokool.com';
}

export const SERVER = serverAPI;
export const CDN = cdnURL;

// export const CDN = 'https://img.glokool.com'; // 배포 CDN
// export const CDN = 'https://img.glokool-guide.com'; // 테스트 CDN

// export const SERVER = 'https://glokool.info'; // 배포 서버
// export const SERVER = 'https://glokool-guide.com'; // 테스트 서버 <- 배포 서버 copy
// export const SERVER = 'http://192.168.35.17:4000'; // 로컬 서버

export const WEATHERKEY = 'c4a19771440b12a904f1d698523b3037';