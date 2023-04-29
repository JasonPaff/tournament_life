import { Outlet, useNavigate } from '@tanstack/router';
import { Button } from '../../../components';

export const TemplateBuilder = () => {
    const navigate = useNavigate();

    const onCreateTemplate = async () => await navigate({ to: '/template-builder/create' });

    return (
        <>
            <div
                className={
                    'border-b border-gray-300 pb-5 dark:border-gray-500 sm:flex sm:items-center sm:justify-between'
                }
            >
                <h3 className={'text-xl font-semibold leading-6'}>Tournament Templates</h3>
                <div className={'mt-3 flex sm:ml-4 sm:mt-0'}>
                    <Button onPress={onCreateTemplate}>Create New Template</Button>
                </div>
            </div>
            <Outlet />
        </>
    );
};
