import { Products, StytchUIClient } from '@stytch/vanilla-js';

export const stytchConfig = {
    passwordOptions: {
        loginExpirationMinutes: 30,
        loginRedirectURL: import.meta.env.VITE_REACT_APP_STYTCH_LOGIN_REDIRECT_URL,
        resetPasswordExpirationMinutes: 30,
        resetPasswordRedirectURL: import.meta.env.VITE_REACT_APP_STYTCH_PASSWORD_RESET_URL,
    },
    products: [Products.passwords],
};

// export const stytch = new StytchUIClient(import.meta.env.VITE_REACT_APP_STYTCH_PUBLIC_TOKEN);
export const stytch = new StytchUIClient('public-token-test-45360d86-40ca-447e-b844-be07fbfab6bc');