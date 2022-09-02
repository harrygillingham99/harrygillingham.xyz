import React from "react";
import Spinner from "react-bootstrap/esm/Spinner";

const SuspenseLoader: React.FC = () => {
  return (
    <div className="m-auto">
      <Spinner animation="grow" className=" h-40 w-40" />
    </div>
  );
};

export default SuspenseLoader;
