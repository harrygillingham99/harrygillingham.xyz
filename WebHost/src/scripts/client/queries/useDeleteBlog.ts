import { useMutation, useQueryClient } from "react-query";
import AppState from "state/AppState";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { noop } from "lodash";

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

  const confirmMutate = (slug: string) => {
    confirmAlert({
      title: "Are you sure?",
      message: "Are you sure you want to delete this blog?",
      buttons: [
        {
          label: "Yes",
          className: "!btn",
          onClick: () => mutation.mutate(slug),
        },
        {
          label: "No",
          className: "!btn",
          onClick: noop,
        },
      ],
      overlayClassName:
        "!modal !modal-middle !modal-open !opacity-90 !prose !w-full !h-full !shadow-xl !max-w-full",
    });
  };

  return { ...mutation, mutate: confirmMutate };
};

export default useDeleteBlog;
