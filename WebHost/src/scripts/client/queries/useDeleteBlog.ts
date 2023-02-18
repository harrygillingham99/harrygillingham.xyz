import { useMutation, useQueryClient } from "react-query";
import AppState from "state/AppState";

const useDeleteBlog = () => {
  const { client } = AppState.useContainer();
  const queryClient = useQueryClient();
  const mutation = useMutation(
    async (slug: string) => {
      const result = await client.blog_DeleteArticle(slug);
      if (!result) throw new Error("Delete blog failed");
      return slug;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries();
      },
    }
  );
  return { ...mutation };
};

export default useDeleteBlog;
