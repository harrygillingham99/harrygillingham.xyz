import { createContainer } from "unstated-next";
import { Client } from "../../client/client";

const useAppState = () => {
  const client = new Client(window.location.origin);

  return { client };
};

export default createContainer(useAppState);
