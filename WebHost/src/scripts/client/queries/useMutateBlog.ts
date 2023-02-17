import { useMutation, useQueryClient } from "react-query";
import AppState from "state/AppState";
import { Blog } from "../client";

const useMutateBlog = () => {
  const { client } = AppState.useContainer();
  const queryClient = useQueryClient();
  const mutation = useMutation<Blog, unknown, Blog>(
    async (blog: Blog) => {
      const result = await client.blog_ArticlePOST(blog);
      if (!result) throw new Error("Upsert blog failed");
      return blog;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries();
      },
    }
  );
  return { ...mutation };
};

export default useMutateBlog;
