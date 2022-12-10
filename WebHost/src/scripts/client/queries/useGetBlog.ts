import { useQuery } from "react-query";
import AppState from "state/AppState";

const useGetBlog = (slug: string) => {
  const { client } = AppState.useContainer();
  const query = useQuery(["blog", slug], () => client.blog_ArticleGET(slug));
  return { ...query };
};

export default useGetBlog;
