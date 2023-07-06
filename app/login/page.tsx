"use client";

import axios from "axios";
import { useState } from "react";
import { Field, Form, Formik } from "formik";
import { AuthType, SubmitProps } from "@types";
import { useAuthProvider } from "@context/AuthProvider";
import { LoginValidationSchema, SignupValidationSchema } from "@utils/validation";
import { useRouter } from "next/navigation";

const Login = () => {
  const [currentForm, setCurrentForm] = useState("login");
  const from = { email: "", phoneNumber: "", password: "12345678", firstName: "", lastName: "" };

  const router = useRouter();

  const { setToken, setChecking, setLoader } = useAuthProvider() as AuthType;

  const login = async (props: SubmitProps) => {
    try {
      const res = await axios.post("api/users/login", {
        email: props.email,
        password: props.password,
      });
      setToken(res.data);
      setChecking(true);
      localStorage.setItem("token", res.data);
      location.reload();
    } catch (error: any) {
      setLoader(false);
      alert(error.response.data);
    } finally {
      setLoader(false);
    }
  };

  const signup = async (props: SubmitProps) => {
    try {
      const res = await axios.post("api/users/signup", {
        email: props.email,
        lastName: props.lastName,
        firstName: props.firstName,
        password: props.password,
        phoneNumber: props.phoneNumber,
      });
      setToken(res.data);
      setChecking(true);
      localStorage.setItem("token", res.data);
      location.reload();
    } catch (error: any) {
      setLoader(false);
      alert(error.response.data);
    }
  };

  const handleSubmit = async (props: SubmitProps) => {
    setLoader(true);
    if (currentForm === "login") {
      login(props);
    } else {
      signup(props);
    }
  };
  return (
    <div className="w-full h-screen relative flex items-center justify-center">
      <div className="w-[370px] bg-white rounded-lg px-8 py-6">
        <h1 className="text-center text-3xl pb-10 pt-2">{currentForm === "login" ? "Нэвтрэх" : "Бүртгүүлэх"}</h1>
        <Formik
          initialValues={from}
          validationSchema={currentForm === "login" ? LoginValidationSchema : SignupValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form className="flex flex-col gap-5">
              <label>
                <span className=" opacity-50">Имэйл</span>
                <Field name="email" type="email" className={`w-full rounded-md p-2 border`} />
                {errors.email && touched.email ? <div className="text-sm text-rose-600">{errors.email}</div> : null}
              </label>
              {currentForm === "signup" && (
                <>
                  <label>
                    <span className=" opacity-50">Овог</span>
                    <Field
                      name="lastName"
                      type="lastName"
                      className={`w-full rounded-md p-2 border-[1px] ${errors.lastName && touched.lastName ? "border-rose-600" : ""}`}
                    />
                    {errors.lastName && touched.lastName ? <div className="text-sm text-rose-600">{errors.lastName}</div> : null}
                  </label>
                  <label>
                    <span className=" opacity-50">Нэр</span>
                    <Field
                      name="firstName"
                      type="firstName"
                      className={`w-full rounded-md p-2 border-[1px] ${errors.firstName && touched.firstName ? "border-rose-600" : ""}`}
                    />
                    {errors.firstName && touched.firstName ? <div className="text-sm text-rose-600">{errors.firstName}</div> : null}
                  </label>
                  <label>
                    <span className=" opacity-50">Утасны дугаар</span>
                    <Field
                      name="phoneNumber"
                      type="phoneNumber"
                      className={`w-full rounded-md p-2 border-[1px] ${errors.phoneNumber && touched.phoneNumber ? "border-rose-600" : ""}`}
                    />
                    {errors.phoneNumber && touched.phoneNumber ? <div className="text-sm text-rose-600">{errors.phoneNumber}</div> : null}
                  </label>
                </>
              )}
              <label>
                <span className=" opacity-50">Нууц үг</span>
                <Field name="password" type="password" className={`w-full rounded-md p-2 border`} />
                {errors.password && touched.password ? <div className="text-sm text-rose-600">{errors.password}</div> : null}
              </label>
              <button type="submit" className="py-3 rounded-md mt-6 font-bold bg-[#1576ea] text-white click-btn">
                {currentForm === "login" ? "Нэвтрэх" : "Бүртгүүлэх"}
              </button>
              <div className="flex-end">
                <button type="button" className="underline" onClick={() => setCurrentForm(currentForm === "login" ? "signup" : "login")}>
                  {currentForm === "login" ? "Бүртгүүлэх" : "Нэвтрэх"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
