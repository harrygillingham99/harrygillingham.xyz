import * as React from "react";
import { App } from "@components/App";
import "../../styles/index.scss";
import { createRoot } from "react-dom/client";

const container = document.getElementById("root");
const root = createRoot(container);
const Root = (): React.ReactElement => <App />;

root.render(<Root />);
