import { useRef, useEffect } from "react";
import { useQueryClient, useQuery } from "react-query";
import { useSetState } from "react-use";
import AppState from "state/AppState";

const useGetBlogSummaries = (startPage?: number, startPageSize?: number) => {
  const {
    client,
    config: { defaultPage, defaultPageSize },
  } = AppState.useContainer();
  const [state, setState] = useSetState<{ page: number; pageSize: number }>({
    page: startPage ?? defaultPage,
    pageSize: startPageSize ?? defaultPageSize,
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
    ...state,
    setPage: (page: number) => page >= 0 && setState({ page: page }),
    setPageSize: (pageSize: number) => setState({ pageSize: pageSize }),
  };
};

export default useGetBlogSummaries;
