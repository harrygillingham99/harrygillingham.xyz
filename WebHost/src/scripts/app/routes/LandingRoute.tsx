import SuspenseLoader from "@components/common/SuspenseLoader";
import React from "react";
import PaginationControls from "@components/blog/PaginationControls";
import useGetBlogSummaries from "../../client/queries/useGetBlogSumaries";
import Helmet from "@components/common/Helmet";
import BlogGrid from "@components/blog/BlogGrid";

const LandingRoute: React.FC = () => {
  const { isLoading, isError, data, ...paginationProps } =
    useGetBlogSummaries();

  if (isLoading) return <SuspenseLoader />;

  if (isError) return <p>Error loading latest blog posts.</p>;

  return (
    <>
      <Helmet title="Blog" />
      <BlogGrid summaries={data.summaries} />
      <PaginationControls hasNextPage={data.hasNextPage} {...paginationProps} />
    </>
  );
};

export default LandingRoute;
