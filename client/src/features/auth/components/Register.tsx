import { Button, FormInput } from '../../../components';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { DevTool } from '@hookform/devtools';
import { useToggle } from '../../../hooks';
import { useEffect, useRef } from 'react';
import { trpc } from '../../../config';
import toast from 'react-hot-toast';
import { z } from 'zod';

export const Register = () => {
    const validationSchema = z
        .object({
            firstName: z.string().min(1, 'A first name is required'),
            lastName: z.string().min(1, 'A last name is required'),
            displayName: z.string().min(1, 'A display name is required'),
            email: z.string().min(1, 'An email address is required').email('Email is not valid'),
            password: z.string().min(8, 'A password must be at least 8 characters'),
            confirmPassword: z.string().min(1, 'A confirm password is required'),
        })
        .refine((data) => data.password === data.confirmPassword, {
            path: ['confirmPassword'],
            message: 'The passwords do not match',
        });
    type ValidationSchema = z.infer<typeof validationSchema>;

    const firstNameRef = useRef<HTMLInputElement | null>(null);

    const [isSaving, setIsSaving] = useToggle();

    const formMethods = useForm<ValidationSchema>({
        defaultValues: {
            firstName: '',
            lastName: '',
            displayName: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
        resolver: zodResolver(validationSchema),
    });

    const { mutate: createUser } = trpc.user.createUser.useMutation({
        onMutate: setIsSaving.on,
        onSuccess: () => {
            // TODO: automatically log the user in after registration
            toast.success('Account was created successfully!');
            reset();
        },
        onSettled: setIsSaving.off,
    });

    const { handleSubmit, reset } = formMethods;

    // Focus first name input on mount
    useEffect(() => firstNameRef?.current?.focus(), []);

    // Create user on valid submission
    const onSubmit = async (data: ValidationSchema) => createUser(data);

    return (
        <div className={'rounded-lg bg-white p-4 dark:bg-gray-800 sm:p-24'}>
            <section>
                <FormProvider {...formMethods}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className={'grid grid-cols-2 gap-4'}>
                            {/* FIRST NAME */}
                            <FormInput
                                label={'First Name'}
                                name={'firstName'}
                                options={{
                                    disabled: isSaving,
                                    required: true,
                                }}
                                ref={firstNameRef}
                            />

                            {/* LAST NAME */}
                            <FormInput
                                label={'Last Name'}
                                name={'lastName'}
                                options={{
                                    disabled: isSaving,
                                    required: true,
                                }}
                            />

                            {/* DISPLAY NAME */}
                            <div className={'col-span-2'}>
                                <FormInput
                                    label={'Display Name'}
                                    name={'displayName'}
                                    options={{
                                        disabled: isSaving,
                                        required: true,
                                    }}
                                />
                            </div>

                            {/* EMAIL ADDRESS */}
                            <div className={'col-span-2'}>
                                <FormInput
                                    label={'Email Address'}
                                    name={'email'}
                                    options={{
                                        disabled: isSaving,
                                        required: true,
                                    }}
                                    type={'email'}
                                />
                            </div>

                            {/* PASSWORD */}
                            <div className={'col-span-2'}>
                                <FormInput
                                    label={'Password'}
                                    name={'password'}
                                    options={{
                                        disabled: isSaving,
                                        required: true,
                                    }}
                                    type={'password'}
                                />
                            </div>

                            {/* CONFIRM PASSWORD */}
                            <div className={'col-span-2'}>
                                <FormInput
                                    label={'Confirm Password'}
                                    name={'confirmPassword'}
                                    options={{
                                        disabled: isSaving,
                                        required: true,
                                    }}
                                    type={'password'}
                                />
                            </div>
                        </div>

                        {/* SUBMIT */}
                        <div className={'mt-6'}>
                            <Button isBusy={isSaving} options={{ isDisabled: isSaving, type: 'submit' }}>
                                Sign Up Today
                            </Button>
                        </div>
                    </form>
                </FormProvider>
                <DevTool control={formMethods.control} />
            </section>
        </div>
    );
};
