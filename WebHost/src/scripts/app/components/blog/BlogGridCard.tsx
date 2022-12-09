import dayjs from "dayjs";
import React from "react";
import { useNavigate } from "react-router-dom";
import { addUrlParameters, Urls } from "routes/urls";
import { BlogSummary } from "../../../client/client";

const BlogGridCard: React.FC<{ summary: BlogSummary }> = ({
  summary: { title, slug, description, created },
}) => {
  const navigate = useNavigate();
  return (
    <div
      className="hero rounded-2xl hover:shadow-2xl transition duration-300 ease-out hover:ease-in py-5 cursor-pointer"
      onClick={() => navigate(addUrlParameters(Urls.Blog, { slug: slug }))}
    >
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">{title}</h1>
          <p className="py-6">{description}</p>
          <small className="py-6">{dayjs(created).format("DD-MM-YYYY")}</small>
        </div>
      </div>
    </div>
  );
};

export default BlogGridCard;
