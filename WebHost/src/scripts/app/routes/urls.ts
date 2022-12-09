export enum Urls {
  Landing = "/",
  Blog = "/blog/:slug/:id",
  About = "/about",
}

export const addUrlParameters = (
  route: string,
  params: { [key: string]: string }
): string => {
  let routeWithParams = route as string;
  Object.keys(params).forEach((key) => {
    routeWithParams = routeWithParams.replace(`:${key}`, params[key]);
  });
  return routeWithParams;
};
