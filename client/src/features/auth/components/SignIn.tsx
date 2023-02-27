import { stytchConfig } from '../../../config';
import { StytchLogin } from '@stytch/react';

export const SignIn = () => {
    return <StytchLogin config={stytchConfig} />;
};