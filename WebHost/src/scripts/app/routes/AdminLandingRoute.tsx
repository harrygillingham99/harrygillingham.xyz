import BlogGridCard from "@components/blog/BlogGridCard";
import SuspenseLoader from "@components/common/SuspenseLoader";
import React from "react";
import PaginationControls from "@components/blog/PaginationControls";
import useGetBlogSummaries from "../../client/queries/useGetBlogSumaries";
import Helmet from "@components/common/Helmet";
import { Link } from "react-router-dom";
import { Urls } from "./urls";

const AdminLandingRoute: React.FC = () => {
  const { isLoading, isError, data, ...paginationProps } =
    useGetBlogSummaries();

  if (isLoading) return <SuspenseLoader />;

  if (isError) return <p>Error loading latest blog posts.</p>;

  return (
    <>
      <Helmet title="Blog" />
      <div className="flex flex-row justify-end">
        <Link className="btn btn-sm" to={Urls.NewBlog}>
          New Blog
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data.summaries.map((summary, i) => (
          <React.Fragment key={`blogSummary_${i}`}>
            <BlogGridCard summary={summary} editable />
            <div className="divider md:hidden" />
          </React.Fragment>
        ))}
      </div>
      <PaginationControls hasNextPage={data.hasNextPage} {...paginationProps} />
    </>
  );
};

export default AdminLandingRoute;
