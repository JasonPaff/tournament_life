import type { FC, PropsWithChildren } from 'react';

declare global {
    type FCC<Type extends object = {}> = FC<PropsWithChildren<Type>>;
}
