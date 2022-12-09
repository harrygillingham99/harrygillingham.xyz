import SuspenseLoader from "@components/common/SuspenseLoader";
import React from "react";
import { useParams } from "react-router-dom";
import { useGetBlog } from "../../client/queries";

type BlogRouteParams = "slug" | "id";

const BlogRoute: React.FC = () => {
  const { slug, id } = useParams<BlogRouteParams>();
  const { data, isError, isLoading } = useGetBlog(id);

  if (isLoading) return <SuspenseLoader />;

  if (isError) return <p>Error loading blog post :(</p>;

  return <>Blog!</>;
};

export default BlogRoute;
