import { Center, Stack, ToastId, useToast } from "@chakra-ui/react";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import InputField from "../../../components/InputField";
import SubmitButton from "../../../components/SubmitButton";
import { useEffect, useRef, useState } from "react";
import { LoginInfo, loginUser } from "../api/loginUser";
import { Status } from "../../../api/constants";
import { Text } from "@chakra-ui/layout";

let loginFormData = yup.object().shape({
  email: yup.string().required("Required").email(),
  password: yup.string().required("Required").min(8).max(20),
});

let iniitalLoginFormData = {
  email: "",
  password: "",
};

function Login() {
  const toast = useToast();

  const [loginInfo, setLoginInfo] = useState<LoginInfo | null>(null);
  const [disabled, setDisabled] = useState(false);

  const loginToast = useRef<ToastId | null>(null);
  const errorToast = useRef<ToastId | null>(null);
  const successToast = useRef<ToastId | null>(null);

  const navigation = useNavigate();

  useEffect(() => {
    if (!loginInfo) return;

    setTimeout(() => {
      loginService(loginInfo);
    }, 500);
  }, [loginInfo]);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigation("/dashboard");
      return;
    }
  }, []);

  const loginService = async (loginInfo: LoginInfo | null) => {
    const result = await loginUser(loginInfo);

    setDisabled(false);
    setLoginInfo(null);

    if (result.statusCode === 401) {
      removeLoginToast();
      showErrorToast("email is not registered");
      navigation("/signup", {
        replace: true,
      });
      return;
    }

    if (result.status == Status.ERROR) {
      removeLoginToast();
      showErrorToast("Invalid email or password");
      return;
    }

    removeLoginToast();
    showSuccessToast();
    localStorage.setItem("token", result.data.accessToken);
    navigation("/dashboard");
  };

  const removeLoginToast = () => {
    if (!loginToast.current) return;
    toast.close(loginToast.current as ToastId);
    loginToast.current = null;
  };

  const removeErrorToast = () => {
    if (!errorToast.current) return;
    toast.close(errorToast.current as ToastId);
    errorToast.current = null;
  };

  const showSuccessToast = () => {
    successToast.current = toast({
      status: "success",
      description: "logged in",
      position: "bottom",
      duration: 1000,
    });
  };

  const showLoginToast = () => {
    loginToast.current = toast({
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

  const onSubmit = (loginInfo: LoginInfo) => {
    removeErrorToast();
    showLoginToast();
    setLoginInfo(loginInfo);
    setDisabled(true);
  };

  const { values, handleChange, errors, touched, handleBlur, handleSubmit } =
    useFormik({
      initialValues: iniitalLoginFormData,
      onSubmit,
      validationSchema: loginFormData,
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
        <Text fontSize="20px">Login</Text>
        <form onSubmit={handleSubmit}>
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
            label="Password"
            type="password"
            name="password"
            onChange={handleChange}
            value={values.password}
            onBlur={handleBlur}
            error={errors.password}
            touched={touched.password}
          />

          <SubmitButton title="Login" disabled={disabled} />
        </form>
        <Link to="/signup">Don't have an account ?</Link>
      </Stack>
    </Center>
  );
}

export default Login;
