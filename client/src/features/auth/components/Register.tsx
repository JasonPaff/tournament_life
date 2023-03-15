import { Control, Field, Message, Root, Submit } from '@radix-ui/react-form';
import { InputField } from '../../../components';
import { trpc } from '../../../config';
import toast from 'react-hot-toast';

export const Register = () => {
    const { mutate: createUser } = trpc.user.createUser.useMutation({
        onSuccess: () => toast.success('Account created successfully!'),
    });

    // const onRegister = () => {createUser({email, password, displayName});

    return (
        <div className={'rounded-lg bg-white p-4 dark:bg-gray-900 sm:p-24'}>
            <Root>
                <div className="grid grid-cols-2 gap-4">
                    <InputField label={'First Name'} name={'firstName'} />
                    <InputField label={'Last Name'} name={'lastName'} />
                    <InputField fieldClassName={'col-span-2'} label={'Email Address'} name={'emailAddress'} />
                    <InputField label={'Password'} name={'password'} />
                    <InputField label={'Confirm Password'} name={'confirmPassword'} />
                </div>

                <Submit
                    className={
                        'relative mt-8 inline-flex w-full justify-center overflow-hidden rounded-md bg-cyan-500 py-2 px-3 text-sm font-semibold text-white outline-2 outline-offset-2 transition-colors before:absolute before:inset-0 before:transition-colors hover:before:bg-white/10 active:bg-cyan-600 active:text-white/80 active:before:bg-transparent'
                    }
                    type={'submit'}
                >
                    Sign Up Today
                </Submit>
            </Root>
        </div>
    );
};