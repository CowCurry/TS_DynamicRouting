type Split<S extends string, D extends string> =
    string extends S ? string[] :
    S extends '' ? [] :
    S extends `${infer T}${D}${infer U}` ? [T, ...Split<U, D>] :
    [S];

type IsDynamicSegment<S extends string> =
    S extends `[...${infer Param}]` ? 'rest' :
    S extends `[[...${infer Param}]]` ? 'optional_rest' :
    S extends `[${infer Param}]` ? 'param' :
    S extends `[[${infer Param}]]` ? 'optional_param' :
    'static';

type ExtractParamName<S extends string> =
    S extends `[...${infer Param}]` ? Param :
    S extends `[[...${infer Param}]]` ? Param :
    S extends `[${infer Param}]` ? Param :
    S extends `[[${infer Param}]]` ? Param :
    never;

type ConstructParam<S extends string, Segment extends string> =
    Segment extends 'param' ? { [K in S]: string } :
    Segment extends 'rest' ? { [K in S]: string[] } :
    Segment extends 'optional_rest' ? { [K in S]?: string[] } :
    Segment extends 'optional_param' ? { [K in S]?: string } :
    {};

type ValidateRoute<Segments extends string[]> =
    Segments extends [...infer Rest, infer Last]
        ? Last extends `[...${string}]` | `[[...${string}]]`
            ? Rest extends [...any, `[...${string}]` | `[[...${string}]]`]
                ? never
                : ValidateRoute<Rest>
            : ValidateRoute<Rest>
        : true;

type BuildParams<Segments extends string[], Acc extends object = {}> =
    Segments extends [infer Head, ...infer Tail]
        ? Head extends string
            ? Tail extends string[]
                ? BuildParams<Tail, Acc & ConstructParam<ExtractParamName<Head>, IsDynamicSegment<Head>>>
                : Acc
            : Acc
        : Acc;

export type DynamicRoute<T extends string> =
    Split<T, '/'> extends infer Segments extends string[]
        ? ValidateRoute<Segments> extends true
            ? BuildParams<Segments>
            : never
        : never;
