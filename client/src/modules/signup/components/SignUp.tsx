import { Center, Stack, useToast } from "@chakra-ui/react";
import { useFormik } from "formik";
import * as yup from "yup";
import InputField from "../../../components/InputField";
import SubmitButton from "../../../components/SubmitButton";
import { ToastId } from "@chakra-ui/react";
import { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SignUpInfo, signUpUser } from "../api/signUpUser";
import { Status } from "../../../api/constants";
import { Text } from "@chakra-ui/layout";

let signUpFormSchema = yup.object().shape({
  name: yup
    .string()
    .required("Required")
    .matches(/^[a-zA-Z]/, "name must contain characters")
    .max(8, "name contain atleast 8 characters"),
  email: yup.string().required("Required").email(),
  password: yup
    .string()
    .required("Required")
    .min(8, "password must contain 8 and 20 characters")
    .max(20, "password must contain 8 and 20 characters"),
  confirmPassword: yup
    .string()
    .required("Required")
    .oneOf([yup.ref("password"), null], "passwords must match"),
});

let initialSignUpFormData = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

function SignUp() {
  const toast = useToast();
  const [signUpInfo, setSignUpInfo] = useState<SignUpInfo | null>(null);
  const [disabled, setDisabled] = useState(false);
  const signUpToast = useRef<ToastId | null>(null);
  const errorToast = useRef<ToastId | null>(null);
  const successToast = useRef<ToastId | null>(null);
  const navigation = useNavigate();

  useEffect(() => {
    if (!signUpInfo) return;

    signUpService();
  }, [signUpInfo]);

  const removeSignUpToast = () => {
    if (!signUpToast.current) return;
    toast.close(signUpToast.current as ToastId);
    signUpToast.current = null;
  };

  const removeErrorToast = () => {
    if (!errorToast.current) return;
    toast.close(errorToast.current as ToastId);
    errorToast.current = null;
  };

  const signUpService = async () => {
    const result = await signUpUser(signUpInfo);

    setDisabled(false);
    setSignUpInfo(null);

    if (result.status === Status.ERROR) {
      removeSignUpToast();
      showErrorToast(result.error!!);
      navigation("/login", {
        replace: true,
      });
      return;
    }

    removeSignUpToast();
    showSuccessToast();
    navigation("/login");
  };

  const showSuccessToast = () => {
    successToast.current = toast({
      status: "success",
      description: "Successfully Registered",
      position: "bottom",
      duration: 2000,
    });
  };

  const showSignUpToast = () => {
    signUpToast.current = toast({
      status: "loading",
      description: "Processing",
      position: "bottom",
      duration: null,
    });
  };

  const showErrorToast = (message: string) => {
    errorToast.current = toast({
      status: "error",
      description: message,
      position: "bottom",
    });
  };

  const onSubmit = (signUpInfo: SignUpInfo) => {
    removeErrorToast();
    showSignUpToast();
    setSignUpInfo(signUpInfo);
    setDisabled(true);
  };

  const { values, handleChange, errors, touched, handleBlur, handleSubmit } =
    useFormik({
      initialValues: initialSignUpFormData,
      onSubmit,
      validationSchema: signUpFormSchema,
    });

  return (
    <Center bg="blue.400" h="100vh" color="white">
      <Stack
        justifyContent="center"
        alignItems="center"
        boxShadow="lg"
        rounded="md"
        padding="5"
        bg="blue.300"
      >
        <Text fontSize="20px">Sign Up</Text>
        <form onSubmit={handleSubmit}>
          <InputField
            label="Name"
            name="name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.name}
            touched={touched.name}
          />

          <InputField
            label="Email"
            name="email"
            onChange={handleChange}
            value={values.email}
            onBlur={handleBlur}
            error={errors.email}
            touched={touched.email}
          />

          <InputField
            type="password"
            label="Password"
            name="password"
            onChange={handleChange}
            value={values.password}
            onBlur={handleBlur}
            error={errors.password}
            touched={touched.password}
          />

          <InputField
            type="password"
            label="Confirm Password"
            name="confirmPassword"
            onChange={handleChange}
            value={values.confirmPassword}
            onBlur={handleBlur}
            error={errors.confirmPassword}
            touched={touched.confirmPassword}
          />
          <SubmitButton title="Sign Up" disabled={disabled} />
        </form>
        <Link to="/login">Already have an account ?</Link>
      </Stack>
    </Center>
  );
}

export default SignUp;
