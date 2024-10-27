export type WithChildren<T> =
  | (T & {
      children?: React.ReactNode;
    })
  | { children: React.ReactNode };

export type RouteParams<
  Params extends object | undefined,
  SeachParams extends object | undefined,
> = {
  params: Params extends object ? Promise<Params> : never;
  searchParams: SeachParams extends object ? Promise<SeachParams> : never;
};
