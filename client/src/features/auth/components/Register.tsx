import { Button, FormInput } from '../../../components';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { DevTool } from '@hookform/devtools';
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
            email: z.string().min(1, 'An email address is required').email('Email address is not valid'),
            password: z.string().min(8, 'A password must be at least 8 characters'),
            confirmPassword: z.string().min(1, 'A confirm password is required'),
        })
        .refine((data) => data.password === data.confirmPassword, {
            path: ['confirmPassword'],
            message: 'The passwords do not match',
        });
    type ValidationSchema = z.infer<typeof validationSchema>;

    const firstNameRef = useRef<HTMLInputElement | null>(null);

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

    const { mutate: createUser, isLoading } = trpc.user.createUser.useMutation({
        onSuccess: () => {
            // TODO: automatically log the user in after registration
            toast.success('Account was created successfully!');
            reset();
        },
    });

    const { control, handleSubmit, reset } = formMethods;

    // Focus first name input on mount
    useEffect(() => firstNameRef?.current?.focus(), []);

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
                                options={{
                                    name: 'firstName',
                                    readOnly: isLoading,
                                    required: true,
                                }}
                                ref={firstNameRef}
                            />

                            {/* LAST NAME */}
                            <FormInput
                                label={'Last Name'}
                                options={{
                                    name: 'lastName',
                                    readOnly: isLoading,
                                    required: true,
                                }}
                            />

                            {/* DISPLAY NAME */}
                            <div className={'col-span-2'}>
                                <FormInput
                                    label={'Display Name'}
                                    options={{
                                        name: 'displayName',
                                        readOnly: isLoading,
                                        required: true,
                                    }}
                                />
                            </div>

                            {/* EMAIL ADDRESS */}
                            <div className={'col-span-2'}>
                                <FormInput
                                    label={'Email Address'}
                                    options={{
                                        name: 'email',
                                        readOnly: isLoading,
                                        required: true,
                                        type: 'email',
                                    }}
                                />
                            </div>

                            {/* PASSWORD */}
                            <FormInput
                                label={'Password'}
                                options={{
                                    name: 'password',
                                    readOnly: isLoading,
                                    required: true,
                                    type: 'password',
                                }}
                            />

                            {/* CONFIRM PASSWORD */}
                            <FormInput
                                label={'Confirm Password'}
                                options={{
                                    name: 'confirmPassword',
                                    readOnly: isLoading,
                                    required: true,
                                    type: 'password',
                                }}
                            />
                        </div>

                        {/* SUBMIT */}
                        <div className={'mt-6'}>
                            <Button isBusy={isLoading} options={{ isDisabled: isLoading, type: 'submit' }}>
                                Sign Up Today
                            </Button>
                        </div>
                    </form>
                </FormProvider>

                {/* FORM DEV TOOL */}
                <DevTool control={control} />
            </section>
        </div>
    );
};
