import classNames from "classnames";
import dayjs from "dayjs";
import React from "react";
import { Edit, X } from "react-feather";
import { Link, useNavigate } from "react-router-dom";
import { addUrlParameters, Urls } from "routes/urls";
import { BlogSummary } from "../../../client/client";
import useDeleteBlog from "../../../client/queries/useDeleteBlog";

const BlogGridCard: React.FC<{ summary: BlogSummary; editable?: boolean }> = ({
  summary: { title, slug, description, created },
  editable,
}) => {
  const navigate = useNavigate();
  const { mutate, isLoading: isDeleting } = useDeleteBlog();
  return (
    <div
      className={classNames(
        "hero rounded-2xl transition duration-300 ease-out hover:ease-in py-5",
        !editable && "cursor-pointer hover:shadow-2xl"
      )}
      onClick={() =>
        !editable && navigate(addUrlParameters(Urls.Blog, { slug: slug }))
      }
    >
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">{title}</h1>
          <p className="py-6">{description}</p>
          <small className="py-6">{dayjs(created).format("DD-MM-YYYY")}</small>
          {editable && (
            <div className="flex flex-row justify-center mt-5">
              <button
                className="btn rounded-xl"
                onClick={() => mutate(slug)}
                disabled={isDeleting}
              >
                <X />
              </button>
              <div className="divider divider-horizontal" />
              <Link
                to={
                  isDeleting ? "#" : addUrlParameters(Urls.Blog, { slug: slug })
                }
                className="btn rounded-xl"
              >
                <Edit />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogGridCard;
