import BlogGridCard from "@components/blog/BlogGridCard";
import SuspenseLoader from "@components/common/SuspenseLoader";
import React from "react";
import { useGetBlogSummaries } from "../../client/queries";
import PaginationControls from "@components/blog/PaginationControls";

const LandingRoute: React.FC = () => {
  const { isLoading, isError, data, ...paginationProps } =
    useGetBlogSummaries();

  if (isLoading) return <SuspenseLoader />;

  if (isError) return <p>Error loading latest blog posts.</p>;

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data.summaries.map((summary, i) => (
          <BlogGridCard summary={summary} key={`blogSummary_${i}`} />
        ))}
      </div>
      <PaginationControls hasNextPage={data.hasNextPage} {...paginationProps} />
    </>
  );
};

export default LandingRoute;
