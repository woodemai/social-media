export type WithChildren<T> =
  | (T & {
      children?: React.ReactNode;
    })
  | { children: React.ReactNode };

export type RouteParams<Params, SeachParams> = {
  params: Promise<Params>;
  searchParams: Promise<SeachParams>;
};
