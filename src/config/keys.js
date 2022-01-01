const keys = {
    REACT_APP_BACKEND_URL: process.env.REACT_APP_BACKEND_URL,
    REACT_APP_BACKEND_URL_NETLIFY:
        process.env.REACT_APP_BACKEND_URL + '/.netlify/functions/api',
    REACT_APP_ENV: process.env.NODE_ENV,
    REACT_APP_CUSTOM_ENV: process.env.REACT_APP_CUSTOM_ENV,

    REACT_APP_GOOGLE_ANALYTICS: process.env.REACT_APP_GOOGLE_ANALYTICS,

    REACT_APP_IMAGEKIT_ID: process.env.REACT_APP_IMAGEKIT_ID,
    REACT_APP_IMAGEKIT_PUBLICKEY: process.env.REACT_APP_IMAGEKIT_PUBLICKEY
};

export default keys;
