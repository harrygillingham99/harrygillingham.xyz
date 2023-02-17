import SuspenseLoader from "@components/common/SuspenseLoader";
import React from "react";
import useGetBlog from "../../client/queries/useGetBlog";
import { Link, useNavigate, useParams } from "react-router-dom";
import Helmet from "../components/common/Helmet";
import { Blog } from "../../client/client";
import MarkdownEditor from "@uiw/react-markdown-editor";
import { Field, FieldProps, Form, Formik } from "formik";
import { Urls } from "./urls";
import { ChevronLeft } from "react-feather";
import useMutateBlog from "../../client/queries/useMutateBlog";

const AdminBlogEditRoute: React.FC<{ isCreate?: boolean }> = ({ isCreate }) => {
  const { slug } = useParams<"slug">();
  const { data, isError, isLoading } = !isCreate
    ? useGetBlog(slug)
    : { data: new Blog(), isError: false, isLoading: false };

  const { mutate, isLoading: isUpdating } = useMutateBlog();
  const navigate = useNavigate();
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
      <span className="prose lg:prose-xl mb-5">
        <h1>{`${isCreate ? "Create" : "Edit"} blog`}</h1>
      </span>
      <Formik
        onSubmit={(values, helpers) => {
          mutate(values, {
            onSuccess: () => {
              navigate(Urls.Landing);
            },
          });
        }}
        initialValues={data}
      >
        {(formProps) => (
          <Form onSubmit={formProps.handleSubmit}>
            <>
              {["title", "description", "slug"].map((key, i) => (
                <div
                  className="form-control w-full max-w-md"
                  key={`input_${key}_${i}`}
                >
                  <label className="label">
                    <span className="label-text">
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </span>
                  </label>
                  <Field
                    type="text"
                    name={key}
                    placeholder="Type here..."
                    className="input input-bordered w-full"
                  />
                </div>
              ))}
              <div className="form-control w-full my-5">
                <Field name="markdownContent">
                  {({ field, form, meta }: FieldProps) => (
                    <MarkdownEditor
                      minHeight="50vh"
                      value={meta.value}
                      className="min-h-full"
                      onChange={(value) =>
                        form.setFieldValue(field.name, value)
                      }
                      onBlur={field.onBlur}
                    />
                  )}
                </Field>
              </div>
              <div className="flex flex-row justify-center">
                <button type="submit" className="btn" disabled={isUpdating}>
                  Submit
                </button>
              </div>
            </>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default AdminBlogEditRoute;
