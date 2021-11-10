let serverAPI;
let cdnURL;

if (process.env.NODE_ENV === "development") {
    serverAPI = 'https://api.glokool.com/v3'; 
    cdnURL = 'https://img.glokool.com';
} else {
    serverAPI = 'https://api.glokool.com/v3';
    cdnURL = 'https://img.glokool.com';
}

export const SERVER = serverAPI;
export const CDN = cdnURL;
export const WEATHERKEY = 'c4a19771440b12a904f1d698523b3037';