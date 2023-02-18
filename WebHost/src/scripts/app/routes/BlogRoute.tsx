import SuspenseLoader from "@components/common/SuspenseLoader";
import React from "react";
import useGetBlog from "../../client/queries/useGetBlog";
import ReactMarkdown from "react-markdown";
import { useParams } from "react-router-dom";
import Helmet from "../components/common/Helmet";
import { Urls } from "./urls";
import BackButton from "@components/common/BackButton";

const BlogRoute: React.FC = () => {
  const { slug } = useParams<"slug">();
  const { data, isError, isLoading } = useGetBlog(slug);

  if (isLoading) return <SuspenseLoader />;

  if (isError) return <p>Error loading blog post.</p>;

  return (
    <>
      <Helmet title={data.title} description={data.description} />
      <BackButton to={Urls.Landing} />
      <ReactMarkdown className="prose lg:prose-xl">
        {data.markdownContent}
      </ReactMarkdown>
    </>
  );
};

export default BlogRoute;
