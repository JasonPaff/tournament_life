import { Alert, Button, FormInput } from '../../../components';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { DevTool } from '@hookform/devtools';
import { useEffect, useRef } from 'react';
import { trpc } from '../../../config';
import toast from 'react-hot-toast';
import { z } from 'zod';
import { useToggle } from '../../../hooks';

export const Register = () => {
    const validationSchema = z
        .object({
            firstName: z.string().min(1, 'First name is required'),
            lastName: z.string().min(1, 'Last name is required'),
            displayName: z.string().min(1, 'Display name is required'),
            email: z.string().min(1, 'Email address is required').email('Email address is not valid'),
            password: z.string().min(8, 'Password must be at least 8 characters'),
            confirmPassword: z.string().min(1, 'Confirm password is required'),
        })
        .refine((data) => data.password === data.confirmPassword, {
            path: ['confirmPassword'],
            message: 'The passwords do not match',
        });
    type ValidationSchema = z.infer<typeof validationSchema>;

    const emailSchema = z.string().email('Email address is not valid');

    const firstNameRef = useRef<HTMLInputElement | null>(null);

    const [isPasswordFocused, setIsPasswordFocused] = useToggle(false);

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

    const {
        control,
        formState: { errors },
        handleSubmit,
        reset,
    } = formMethods;

    const isFormInvalid = Object.keys(errors).length > 0;

    // Create user mutation
    const { mutate: createUser, isLoading: isCreatingUser } = trpc.user.createUser.useMutation({
        onSuccess: () => {
            // TODO: automatically log the user in after registration
            toast.success('Account was created successfully!');
            reset();
        },
        onError: (error) => {
            console.log('error', error);
        },
    });

    // Verify display name query
    const {
        refetch: verifyDisplayName,
        isFetching: isValidatingDisplayName,
        isRefetching: isReValidatingDisplayName,
    } = trpc.user.verifyDisplayName.useQuery(
        {
            displayName: formMethods.getValues('displayName'),
        },
        { enabled: false }
    );

    // Verify email address query
    const {
        refetch: verifyEmailAddress,
        isFetching: isValidatingEmailAddress,
        isRefetching: isReValidatingEmailAddress,
    } = trpc.user.verifyEmailAddress.useQuery(
        {
            email: formMethods.getValues('email'),
        },
        { enabled: false }
    );

    // Verify password strength query
    const {
        refetch: verifyPassword,
        isFetching: isValidatingPassword,
        isRefetching: isReValidatingPassword,
    } = trpc.user.passwordStrength.useQuery(
        {
            email: formMethods.getValues('email'),
            password: formMethods.getValues('password'),
        },
        { enabled: false }
    );

    // Focus first name input on mount
    useEffect(() => firstNameRef?.current?.focus(), []);

    // Submit the form
    const onSubmit = async (data: ValidationSchema) => {
        createUser(data);
    };

    // verify the display name when the input loses focus
    const onDisplayNameBlur = () => {
        if (!formMethods.getValues('displayName')) return;
        else formMethods.clearErrors('displayName');

        verifyDisplayName().then((response) => {
            if (response.data?.isDisplayNameValid) return;
            // If the display name is already taken, set an error message
            formMethods.setError('displayName', {
                type: 'manual',
                message: 'Display name is already taken',
            });
        });
    };

    // verify the email address when the input loses focus
    const onEmailAddressBlur = () => {
        if (!formMethods.getValues('email')) return;

        try {
            emailSchema.parse(formMethods.getValues('email'));
        } catch (error) {
            formMethods.setError('email', {
                type: 'manual',
                message: 'Email address is not valid',
            });
            return;
        }

        formMethods.clearErrors('email');

        verifyEmailAddress().then((response) => {
            if (response.data?.isEmailAddressValid) return;
            // If the email address is already taken, set an error message
            formMethods.setError('email', {
                type: 'manual',
                message: 'Email address is already in use',
            });
        });
    };

    // check the password strength when the input loses focus
    const onPasswordBlur = () => {
        setIsPasswordFocused.off();
        // if (!formMethods.getValues('password')) return;
        // verifyPassword().then((response) => {
        //     const feedback = response.data?.feedback.warning;
        //     console.log(response.data);
        //     console.log(feedback);
        // });
    };

    return (
        <div className={'sm:py:10 w-full max-w-2xl rounded-lg bg-white p-4 dark:bg-gray-800 sm:px-10'}>
            <section>
                <h1 className={'mb-4 text-center text-3xl'}>Create a new account</h1>
                <FormProvider {...formMethods}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className={'grid grid-cols-2 gap-4'}>
                            {/* FIRST NAME */}
                            <FormInput
                                label={'First Name'}
                                options={{
                                    name: 'firstName',
                                    readOnly: isCreatingUser,
                                    required: true,
                                }}
                                ref={firstNameRef}
                            />

                            {/* LAST NAME */}
                            <FormInput
                                label={'Last Name'}
                                options={{
                                    name: 'lastName',
                                    readOnly: isCreatingUser,
                                    required: true,
                                }}
                            />

                            {/* DISPLAY NAME */}
                            <div className={'col-span-2'}>
                                <FormInput
                                    busyMessage={'Validating display name...'}
                                    isBusy={isValidatingDisplayName || isReValidatingDisplayName}
                                    label={'Display Name'}
                                    options={{
                                        name: 'displayName',
                                        onBlur: onDisplayNameBlur,
                                        readOnly:
                                            isCreatingUser || isValidatingDisplayName || isReValidatingDisplayName,
                                        required: true,
                                    }}
                                />
                            </div>

                            {/* EMAIL ADDRESS */}
                            <div className={'col-span-2'}>
                                <FormInput
                                    busyMessage={'Validating email address...'}
                                    isBusy={isValidatingEmailAddress || isReValidatingEmailAddress}
                                    label={'Email Address'}
                                    options={{
                                        name: 'email',
                                        onBlur: onEmailAddressBlur,
                                        readOnly:
                                            isCreatingUser || isValidatingEmailAddress || isReValidatingEmailAddress,
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
                                    onBlur: onPasswordBlur,
                                    onFocus: setIsPasswordFocused.on,
                                    readOnly: isCreatingUser,
                                    required: true,
                                    type: 'password',
                                }}
                            />

                            {/* CONFIRM PASSWORD */}
                            <FormInput
                                label={'Confirm Password'}
                                options={{
                                    name: 'confirmPassword',
                                    onBlur: setIsPasswordFocused.off,
                                    onFocus: setIsPasswordFocused.on,
                                    readOnly: isCreatingUser,
                                    required: true,
                                    type: 'password',
                                }}
                            />
                        </div>

                        {/* PASSWORD REQUIREMENTS */}
                        {isPasswordFocused && (
                            <div className={'mt-4'}>
                                <Alert
                                    message={
                                        'Password must be at least 8 characters and include at least one lowercase character, one uppercase character, one symbol, and one number.'
                                    }
                                    type={'info'}
                                />
                            </div>
                        )}

                        {/* SUBMIT */}
                        <div className={'mt-6'}>
                            <Button
                                isBusy={isCreatingUser}
                                options={{
                                    isDisabled:
                                        isCreatingUser ||
                                        isFormInvalid ||
                                        isValidatingDisplayName ||
                                        isReValidatingDisplayName ||
                                        isValidatingEmailAddress ||
                                        isReValidatingEmailAddress,
                                    type: 'submit',
                                }}
                            >
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
