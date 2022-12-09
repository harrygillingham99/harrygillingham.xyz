import { useEffect, useRef } from "react";
import { useQuery, useQueryClient } from "react-query";
import { useSetState } from "react-use";
import AppState from "state/AppState";

export const useGetBlogSummaries = (startPage = 0, startPageSize = 25) => {
  const { client } = AppState.useContainer();
  const [state, setState] = useSetState<{ page: number; pageSize: number }>({
    page: startPage,
    pageSize: startPageSize,
  });
  const firstUpdate = useRef(false);
  const queryClient = useQueryClient();
  const query = useQuery(["blog", state.page, state.pageSize], () =>
    client.blog_Summary(state.page, state.pageSize)
  );

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    queryClient.invalidateQueries(["blog", state.page, state.pageSize]);
  }, [state.page, state.pageSize]);
  return {
    ...query,
    page: state.page,
    pageSize: state.pageSize,
    setPage: (page: number) => page >= 0 && setState({ page: page }),
    setPageSize: (pageSize: number) => setState({ pageSize: pageSize }),
  };
};

export const useGetBlog = (id: string) => {
  const { client } = AppState.useContainer();
  const query = useQuery(["blog", id], () => client.blog_Article(id));
  return { ...query };
};
