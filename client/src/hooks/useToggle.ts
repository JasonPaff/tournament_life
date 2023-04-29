import { useMemo, useState } from 'react';

export type ToggleSetter = {
    on: () => void;
    off: () => void;
    toggle: () => void;
};

type InitialState = boolean | (() => boolean);

export const useToggle = (initialState: InitialState = false) => {
    const [value, setValue] = useState<boolean>(initialState);

    // Memoize in case we pass down the component.
    const setters: ToggleSetter = useMemo(
        () => ({
            on: () => setValue(true),
            off: () => setValue(false),
            toggle: () => setValue((prev) => !prev),
        }),
        []
    );

    return [value, setters] as const;
};
