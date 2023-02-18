import React from "react";
import { ChevronLeft } from "react-feather";
import { Link } from "react-router-dom";
import { Urls } from "routes/urls";

const BackButton: React.FC<{ to: Urls }> = ({ to }) => {
  return (
    <div className="flex flex-row justify-end">
      <Link className="btn btn-sm" to={to}>
        <ChevronLeft />
      </Link>
    </div>
  );
};

export default BackButton;
