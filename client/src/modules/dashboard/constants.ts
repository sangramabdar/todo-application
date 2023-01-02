import * as yup from "yup";
const taskSchema = yup.object().shape({
  title: yup
    .string()
    .min(3, "name must contain atleast 3 characters")
    .required("Required"),

  description: yup.string().required("Required"),
});

const initialTaskValues = {
  title: "",
  description: "",
};

export { taskSchema, initialTaskValues };
