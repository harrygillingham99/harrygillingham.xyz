import { date, string, object } from "yup";

const REQUIRED_FIELD = "This field is required.";

const useBlogValidator = (isCreate: boolean) => {
  return {
    validator: object({
      markdownContent: string().required(REQUIRED_FIELD),
      title: string().required(REQUIRED_FIELD),
      description: string().required(REQUIRED_FIELD),
      slug: string().required(REQUIRED_FIELD),
      id: string()
        .notRequired()
        .when(() => (isCreate ? string().notRequired() : string().required())),
    }),
  };
};

export default useBlogValidator;
