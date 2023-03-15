import type { FC, ForwardRefExoticComponent, ReactNode, RefAttributes } from 'react';

// Generic props and a children prop.
export type PropsWithChildren<T = {}> = T & { children?: ReactNode };
// Generic props and a classname prop.
export type PropsWithClassName<T = {}> = T & { className?: string };
// Generic props, a children and a classname prop.
export type PropsWithChildrenClassName<T = {}> = T & PropsWithChildren & PropsWithClassName;

// Functional component with generic props and a children prop.
export type FCC<T = {}> = FC<PropsWithChildren<T>>;
// Functional component with generic props and a classname prop.
export type FCCN<T = {}> = FC<PropsWithClassName<T>>;
// Functional component with generic props, a children prop, and a className prop.
export type FCCCN<T = {}> = FC<PropsWithChildrenClassName<T>>;

// Functional component with generic props and a forwarded ref.
export type FCFR<T = {}> = ForwardRefExoticComponent<T>;
// Functional component with generic props, a children prop, and a forwarded ref.port type FCCFR<T = {}> = ForwardRefExoticComponent<T & PropsWithChildren<T>>;
// Functional component with generic props, a classname prop, and a forwarded ref.
export type FCCNFR<T = {}> = ForwardRefExoticComponent<T & PropsWithClassName<T>>;
// Functional component with generic props, a children prop, a classname prop, and a forwarded ref.
export type FCCCNFR<T = {}> = ForwardRefExoticComponent<T & PropsWithChildrenClassName<T>>;

// Functional component with generic props, a forwarded ref and an imperative handle.
export type FCFRH<T = {}, H = {}> = ForwardRefExoticComponent<T & RefAttributes<H>>;
// Functional component with generic props, a children prop, a forwarded ref and an imperative handle.
export type FCCFRH<T = {}, H = {}> = ForwardRefExoticComponent<T & RefAttributes<H> & PropsWithChildren<T>>;
// Functional component with generic props, a classname prop, a forwarded ref and an imperative handle.
export type FCCNFRH<T = {}, H = {}> = ForwardRefExoticComponent<T & RefAttributes<H> & PropsWithClassName<T>>;
// Functional component with generic props, a children prop,  a classname prop, a forwarded ref and an imperative handle.
export type FCCCNFRH<T = {}, H = {}> = ForwardRefExoticComponent<T & RefAttributes<H> & PropsWithChildrenClassName<T>>;