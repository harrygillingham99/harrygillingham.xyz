import SuspenseLoader from "@components/common/SuspenseLoader";
import React from "react";
import useGetBlog from "../../client/queries/useGetBlog";
import { useParams } from "react-router-dom";
import Helmet from "../components/common/Helmet";
import { Blog } from "../../client/client";
import { Urls } from "./urls";
import BlogForm from "form/BlogForm";
import BackButton from "@components/common/BackButton";

const AdminBlogEditRoute: React.FC<{ isCreate?: boolean }> = ({ isCreate }) => {
  const { slug } = useParams<"slug">();
  const { data, isError, isLoading } = !isCreate
    ? useGetBlog(slug)
    : {
        data: new Blog({
          id: undefined,
          markdownContent: undefined,
          slug: undefined,
          title: undefined,
          description: undefined,
          created: undefined,
        }),
        isError: false,
        isLoading: false,
      };

  if (isLoading) return <SuspenseLoader />;

  if (isError) return <p>Error loading blog post.</p>;

  return (
    <>
      <Helmet title={data.title} description={data.description} />
      <BackButton to={Urls.Landing} />
      <span className="prose lg:prose-xl mb-5">
        <h1>{`${isCreate ? "Create" : "Edit"} blog`}</h1>
      </span>
      <BlogForm isCreate={isCreate} data={data} />
    </>
  );
};

export default AdminBlogEditRoute;
