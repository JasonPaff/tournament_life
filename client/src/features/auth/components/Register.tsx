import { FormError, FormInput, FormLabel } from '../../../components';
import { Field, Message, Root, Submit } from '@radix-ui/react-form';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToggle } from '../../../hooks';
import { trpc } from '../../../config';
import toast from 'react-hot-toast';
import clsx from 'clsx';
import { z } from 'zod';

export const Register = () => {
    const validationSchema = z
        .object({
            firstName: z.string().min(1, 'First name is required'),
            lastName: z.string().min(1, 'Last name is required'),
            displayName: z.string().min(1, 'Display name is required'),
            email: z.string().min(1, 'Email is required').email('Email is not valid'),
            password: z.string().min(8, 'Password must be at least 8 characters'),
            confirmPassword: z.string().min(1, 'Confirm password is required'),
        })
        .refine((data) => data.password === data.confirmPassword, {
            path: ['confirmPassword'],
            message: 'Passwords do not match',
        });
    type ValidationSchema = z.infer<typeof validationSchema>;

    const formMethods = useForm<ValidationSchema>({ resolver: zodResolver(validationSchema) });
    const {
        formState: { errors },
        handleSubmit,
        reset: resetForm,
    } = formMethods;

    const [isSaving, setIsSaving] = useToggle();

    const { mutate: createUser } = trpc.user.createUser.useMutation({
        onMutate: setIsSaving.on,
        onSuccess: () => {
            toast.success('Account created successfully!');
            resetForm();
        },
        onSettled: setIsSaving.off,
    });

    const onSubmit = async (data: ValidationSchema) => createUser(data);

    return (
        <div className={'rounded-lg bg-white p-4 dark:bg-gray-800 sm:p-24'}>
            <FormProvider {...formMethods}>
                <Root onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-2 gap-4">
                        {/* FIRST NAME */}
                        <Field name={'firstName'}>
                            <FormLabel required>First Name</FormLabel>
                            <FormInput
                                errorMessage={errors.firstName?.message}
                                name={'firstName'}
                                registerOptions={{ disabled: isSaving, required: true }}
                            />
                        </Field>

                        {/* LAST NAME */}
                        <Field name={'lastName'}>
                            <FormLabel required>Last Name</FormLabel>
                            <FormInput
                                errorMessage={errors.lastName?.message}
                                name={'lastName'}
                                registerOptions={{ disabled: isSaving, required: true }}
                            />
                        </Field>

                        {/* DISPLAY NAME */}
                        <Field className={'col-span-2'} name={'displayName'}>
                            <FormLabel required>Display Name</FormLabel>
                            <FormInput
                                errorMessage={errors.displayName?.message}
                                name={'displayName'}
                                registerOptions={{ disabled: isSaving, required: true }}
                            />
                        </Field>

                        {/* EMAIL */}
                        <Field className={'col-span-2'} name={'email'}>
                            <FormLabel required>Email Address</FormLabel>
                            <FormInput
                                errorMessage={errors.email?.message}
                                name={'email'}
                                registerOptions={{ disabled: isSaving, required: true }}
                                type={'email'}
                            />
                        </Field>

                        {/* PASSWORD */}
                        <Field className={'col-span-2'} name={'password'}>
                            <FormLabel required>Password</FormLabel>
                            <FormInput
                                errorMessage={errors.password?.message}
                                name={'password'}
                                registerOptions={{ disabled: isSaving, required: true }}
                                type={'password'}
                            />
                        </Field>

                        {/* CONFIRM PASSWORD */}
                        <Field className={'col-span-2'} name={'confirmPassword'}>
                            <FormLabel required>Confirm Password</FormLabel>
                            <FormInput
                                errorMessage={errors.confirmPassword?.message}
                                name={'confirmPassword'}
                                registerOptions={{ disabled: isSaving, required: true }}
                                type={'password'}
                            />
                        </Field>
                    </div>

                    {/* SUBMIT */}
                    <Submit asChild>
                        <button
                            className={clsx(
                                'relative mt-8 inline-flex w-full justify-center overflow-hidden rounded-md bg-cyan-500 py-2 px-3 dark:bg-cyan-700',
                                'text-sm font-semibold text-white outline-2 outline-offset-2 transition-colors',
                                'before:absolute before:inset-0 before:transition-colors hover:before:bg-white/10',
                                'active:bg-cyan-600 active:text-white/80 active:before:bg-transparent'
                            )}
                            disabled={isSaving}
                            type={'submit'}
                        >
                            Sign Up Today
                        </button>
                    </Submit>
                </Root>
            </FormProvider>
        </div>
    );
};