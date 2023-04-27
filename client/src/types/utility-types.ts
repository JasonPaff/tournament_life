export {};

declare global {
    type OptionalNever<Type extends object> = {
        [Key in keyof Type]?: never;
    };

    type Dynamic<Type extends object> = Type | OptionalNever<Type>;
}
