import * as React from "react";
import "../../styles/index.scss";
import { createRoot } from "react-dom/client";
import Admin from "@components/Admin";

const container = document.getElementById("root");
const root = createRoot(container);
const Root = (): React.ReactElement => <Admin />;

root.render(<Root />);
