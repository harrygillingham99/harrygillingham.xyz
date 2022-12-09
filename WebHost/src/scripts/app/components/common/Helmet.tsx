import React from "react";
import { Helmet as ReactHelmet } from "react-helmet";

const Helmet: React.FC<{
  title: string;
  description?: string;
}> = ({ title, description }) => {
  return (
    <ReactHelmet titleTemplate="%s | harrygillingham.xyz">
      <title>{title}</title>
      {description && <meta name="description" content={description} />}
    </ReactHelmet>
  );
};

export default Helmet;
