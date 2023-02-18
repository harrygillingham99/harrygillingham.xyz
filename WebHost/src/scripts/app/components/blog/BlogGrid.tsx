import React from "react";
import { BlogSummary } from "../../../client/client";
import BlogGridCard from "./BlogGridCard";

const BlogGrid: React.FC<{ summaries: BlogSummary[]; editable?: boolean }> = ({
  summaries,
  editable,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {summaries.map((summary, i) => (
        <React.Fragment key={`blogSummary_${i}`}>
          <BlogGridCard summary={summary} editable={editable} />
          <div className="divider md:hidden" />
        </React.Fragment>
      ))}
    </div>
  );
};

export default BlogGrid;
