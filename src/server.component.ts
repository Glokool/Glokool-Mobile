let serverAPI;

if (process.env.NODE_ENV === "development"){
    serverAPI = 'https://glokool-guide.com';
} else {
    serverAPI = 'https://glokool.info';
}

export const SERVER = serverAPI;

// export const SERVER = 'https://glokool.info'; // 배포 서버
// export const SERVER = 'https://glokool-guide.com'; // 테스트 서버 <- 배포 서버 copy
// export const SERVER = 'http://192.168.35.17:4000'; // 로컬 서버
export const WEATHERKEY = 'c4a19771440b12a904f1d698523b3037';