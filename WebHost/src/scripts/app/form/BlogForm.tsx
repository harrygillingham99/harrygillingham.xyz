import MarkdownEditor from "@uiw/react-markdown-editor";
import { Field, FieldProps, Form, Formik } from "formik";
import useBlogValidator from "hooks/useBlogValidator";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Urls } from "routes/urls";
import { Blog } from "../../client/client";
import useMutateBlog from "../../client/queries/useMutateBlog";

const BlogForm: React.FC<{ data: Blog; isCreate?: boolean }> = ({
  data,
  isCreate,
}) => {
  const { mutate, isLoading: isUpdating } = useMutateBlog();
  const navigate = useNavigate();
  const { validator } = useBlogValidator(!!isCreate);
  return (
    <Formik
      onSubmit={(values, helpers) => {
        mutate(values, {
          onSuccess: () => {
            navigate(Urls.Landing);
          },
        });
      }}
      initialValues={data}
      validationSchema={validator}
    >
      {(formProps) => (
        <Form>
          {["title", "description", "slug"].map((key, i) => (
            <React.Fragment key={`input_${key}_${i}`}>
              <div className="form-control w-full max-w-md">
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
              {formProps.errors[key] && formProps.touched[key] && (
                <div className="text-red-600">
                  {formProps.errors[key] as string}
                </div>
              )}
            </React.Fragment>
          ))}
          <div className="form-control w-full mt-5">
            <Field name="markdownContent">
              {({ field, form, meta }: FieldProps) => (
                <MarkdownEditor
                  minHeight="50vh"
                  value={meta.value}
                  className="min-h-full"
                  onChange={(value) => form.setFieldValue(field.name, value)}
                  onBlur={() => form.setFieldTouched(field.name)}
                />
              )}
            </Field>
          </div>
          {formProps.errors.markdownContent &&
            formProps.touched.markdownContent && (
              <div className="text-red-600">
                {formProps.errors.markdownContent}
              </div>
            )}
          <div className="flex flex-row justify-center mt-5">
            <button
              onClick={formProps.submitForm}
              type="submit"
              className="btn"
              disabled={isUpdating || formProps.isSubmitting}
            >
              Submit
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default BlogForm;
