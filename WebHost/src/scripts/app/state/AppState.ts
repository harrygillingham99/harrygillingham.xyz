import { useSetState } from "react-use";
import { createContainer } from "unstated-next";
import { BlogConfig, Client } from "../../client/client";

const useAppState = () => {
  const client = new Client(window.location.origin);
  const [state] = useSetState<{ config: BlogConfig }>({
    config: (window as any).blogConfig as BlogConfig,
  });

  return {
    client,
    ...state,
  };
};

export default createContainer(useAppState);
