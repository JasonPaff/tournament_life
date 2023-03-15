import { Control, Field, Label, Message, Root, Submit } from '@radix-ui/react-form';
import { trpc } from '../../../config';
import toast from 'react-hot-toast';
import clsx from 'clsx';

export const Register = () => {
    const { mutate: createUser } = trpc.user.createUser.useMutation({
        onSuccess: () => toast.success('Account created successfully!'),
    });

    //const onRegister = () => createUser({email, password, displayName});

    return (
        <div className={'rounded-lg bg-white p-24'}>
            <Root>
                <div className="grid grid-cols-2 gap-4">
                    <Field name={'firstName'}>
                        <div className={'flex items-baseline justify-between'}>
                            <Label className={'mb-2 block text-sm font-semibold text-gray-900'}>{'First Name'}</Label>
                            <Message className={'text-red-400'} match={'valueMissing'}>
                                required
                            </Message>
                        </div>
                        <Control asChild>
                            <input
                                className={clsx(
                                    'block w-full appearance-none rounded-lg border border-gray-200 bg-white py-[calc(theme(spacing.2)-1px)] px-[calc(theme(spacing.3)-1px)] text-gray-900 placeholder:text-gray-400 focus:border-cyan-500 focus:outline-none focus:ring-cyan-500 sm:text-sm'
                                )}
                                required
                            />
                        </Control>
                    </Field>

                    <Field name={'lastName'}>
                        <div className={'flex items-baseline justify-between'}>
                            <Label className={'mb-2 block text-sm font-semibold text-gray-900'}>{'Last Name'}</Label>
                            <Message className={'text-[13px] text-white opacity-[0.8]'} match={'valueMissing'}>
                                Please enter your last name
                            </Message>
                        </div>
                        <Control asChild>
                            <input
                                className={clsx(
                                    'block w-full appearance-none rounded-lg border border-gray-200 bg-white py-[calc(theme(spacing.2)-1px)] px-[calc(theme(spacing.3)-1px)] text-gray-900 placeholder:text-gray-400 focus:border-cyan-500 focus:outline-none focus:ring-cyan-500 sm:text-sm'
                                )}
                                required
                            />
                        </Control>
                    </Field>

                    <Field className={'col-span-full mb-4'} name={'email'}>
                        <div className={'flex items-baseline justify-between'}>
                            <Label className={'mb-2 block text-sm font-semibold text-gray-900'}>
                                {'Email Address'}
                            </Label>
                            <Message className={'text-[13px] text-white opacity-[0.8]'} match={'valueMissing'}>
                                Please enter your email address
                            </Message>
                        </div>
                        <Control asChild>
                            <input
                                className={clsx(
                                    'block w-full appearance-none rounded-lg border border-gray-200 bg-white py-[calc(theme(spacing.2)-1px)] px-[calc(theme(spacing.3)-1px)] text-gray-900 placeholder:text-gray-400 focus:border-cyan-500 focus:outline-none focus:ring-cyan-500 sm:text-sm'
                                )}
                                required
                            />
                        </Control>
                    </Field>
                    <Field name={'password'}>
                        <div className={'flex items-baseline justify-between'}>
                            <Label className={'mb-2 block text-sm font-semibold text-gray-900'}>{'Password'}</Label>
                            <Message className={'text-[13px] text-white opacity-[0.8]'} match={'valueMissing'}>
                                Please enter a password
                            </Message>
                        </div>
                        <Control asChild>
                            <input
                                className={clsx(
                                    'block w-full appearance-none rounded-lg border border-gray-200 bg-white py-[calc(theme(spacing.2)-1px)] px-[calc(theme(spacing.3)-1px)] text-gray-900 placeholder:text-gray-400 focus:border-cyan-500 focus:outline-none focus:ring-cyan-500 sm:text-sm'
                                )}
                                required
                            />
                        </Control>
                    </Field>
                    <Field name={'repeatPassword'}>
                        <div className={'flex items-baseline justify-between'}>
                            <Label className={'mb-2 block text-sm font-semibold text-gray-900'}>
                                {'Confirm Password'}
                            </Label>
                            <Message className={'text-[13px] text-white opacity-[0.8]'} match={'valueMissing'}>
                                Please enter a password
                            </Message>
                        </div>
                        <Control asChild>
                            <input
                                className={clsx(
                                    'block w-full appearance-none rounded-lg border border-gray-200 bg-white py-[calc(theme(spacing.2)-1px)] px-[calc(theme(spacing.3)-1px)] text-gray-900 placeholder:text-gray-400 focus:border-cyan-500 focus:outline-none focus:ring-cyan-500 sm:text-sm'
                                )}
                                required
                            />
                        </Control>
                    </Field>
                </div>

                <Submit
                    className={
                        'relative mt-8 inline-flex w-full justify-center overflow-hidden rounded-lg bg-cyan-500 py-2 px-3 text-sm font-semibold text-white outline-2 outline-offset-2 transition-colors before:absolute before:inset-0 before:transition-colors hover:before:bg-white/10 active:bg-cyan-600 active:text-white/80 active:before:bg-transparent'
                    }
                    type={'submit'}
                >
                    Sign Up Today
                </Submit>
            </Root>
        </div>
    );
};