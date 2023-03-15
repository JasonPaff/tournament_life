/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_REACT_APP_API: string;
    readonly VITE_REACT_APP_STYTCH_PUBLIC_TOKEN: string;
    readonly VITE_REACT_APP_STYTCH_LOGIN_REDIRECT_URL: string;
    readonly VITE_REACT_APP_STYTCH_PASSWORD_RESET_URL: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}