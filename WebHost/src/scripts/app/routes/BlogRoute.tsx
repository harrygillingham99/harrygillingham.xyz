import SuspenseLoader from "@components/common/SuspenseLoader";
import React from "react";
import useGetBlog from "../../client/queries/useGetBlog";
import ReactMarkdown from "react-markdown";
import { Link, useParams } from "react-router-dom";
import Helmet from "../components/common/Helmet";
import { ChevronLeft } from "react-feather";
import { Urls } from "./urls";

const BlogRoute: React.FC = () => {
  const { slug } = useParams<"slug">();
  const { data, isError, isLoading } = useGetBlog(slug);

  if (isLoading) return <SuspenseLoader />;

  if (isError) return <p>Error loading blog post.</p>;

  return (
    <>
      <Helmet title={data.title} description={data.description} />
      <div className="flex flex-row justify-end">
        <Link className="btn btn-sm" to={Urls.Landing}>
          <ChevronLeft />
        </Link>
      </div>
      <ReactMarkdown className="prose lg:prose-xl">
        {data.markdownContent}
      </ReactMarkdown>
    </>
  );
};

export default BlogRoute;
