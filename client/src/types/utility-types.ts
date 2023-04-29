declare type OptionalNever<Type extends object> = {
    [Key in keyof Type]?: never;
};

declare type DynamicProp<Type extends object> = Type | OptionalNever<Type>;

declare type DynamicProps<
    Type1 extends object,
    Type2 extends object = {},
    Type3 extends object = {},
    Type4 extends object = {}
> = DynamicProp<Type1> & DynamicProp<Type2> & DynamicProp<Type3> & DynamicProp<Type4>;

declare type DynamicUnionProps<
    Type1 extends object,
    Type2 extends object,
    Type3 extends object = {},
    Type4 extends object = {}
> =
    | (DynamicProps<Type1> & OptionalNever<Type2> & OptionalNever<Type3> & OptionalNever<Type4>)
    | (DynamicProps<Type2> & OptionalNever<Type1> & OptionalNever<Type3> & OptionalNever<Type4>)
    | (DynamicProps<Type3> & OptionalNever<Type1> & OptionalNever<Type2> & OptionalNever<Type4>)
    | (DynamicProps<Type4> & OptionalNever<Type1> & OptionalNever<Type2> & OptionalNever<Type3>);
