import { trpc } from '../../../config';
import toast from 'react-hot-toast';
import { useState } from 'react';

export const Register = () => {
    const { mutate: createUser } = trpc.user.createUser.useMutation({
        onSuccess: () => toast.success('Account created successfully!'),
    });

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [displayName, setDisplayName] = useState('');

    const onRegister = () => createUser({ email, password, displayName });

    return (
        <div className={'flex flex-col space-y-2'}>
            <div className={'grid grid-cols-2 gap-y-2'}>
                <label htmlFor={'username'}>Username</label>
                <input
                    className={'outline-none'}
                    id={'username'}
                    onChange={(e) => setDisplayName(e.target.value)}
                    type="text"
                />

                <label htmlFor={'email'}>Email Address</label>
                <input
                    className={'outline-none'}
                    id={'email'}
                    onChange={(e) => setEmail(e.target.value)}
                    type={'email'}
                />

                <label htmlFor={'password'}>Password</label>
                <input
                    className={'outline-none'}
                    id={'password'}
                    onChange={(e) => setPassword(e.target.value)}
                    type={'password'}
                />

                <button className={'col-span-2 pt-5'} onClick={onRegister}>
                    Register
                </button>
            </div>
        </div>
    );
};