import React, { Dispatch, SetStateAction, useState } from "react";
import { useRouter } from "next/router";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import differenceInYears from "date-fns/differenceInYears";
import { parse } from "date-fns";
import { ScaleLoader } from "react-spinners";

// Components
import DatePickerField from "./DatePickerField";

// Types
import { TRegisterUser } from "../types";
import { registerUser } from "../actions/user";
import { useAppContext } from "../context/state";

type Props = {
  showForm: boolean;
  setShowForm: Dispatch<SetStateAction<boolean>>;
};

let RegisterSchema = Yup.object().shape({
  first_name: Yup.string().required("***required"),
  last_name: Yup.string().required("***required"),
  email: Yup.string().email().required("***required"),
  password: Yup.string()
    .min(8, "The password may contain at least 8 chars")
    .required("***required"),
  birth_date: Yup.string()
    .test("birth_date", "You should have 18 years", function (value) {
      if (value === undefined) {
        return false;
      }

      const parsedDate = parse(value, "dd/MM/yyyy", new Date());
      return differenceInYears(new Date(), parsedDate) >= 18;
    })
    .required("***required"),
  agreement: Yup.bool().oneOf(
    [true],
    "You need to accept our Terms and Conditions"
  ),
});

// Register Form component

const RegisterForm = ({ showForm, setShowForm }: Props) => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);
  const { user, setUser } = useAppContext();
  console.log("uappCont", user);

  // Get today date
  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1;
  let dd = today.getDate();
  // Format date
  const formatedToday = mm + "/" + dd + "/" + yyyy;
  // Set inital date
  const [date, setDate] = useState(formatedToday);

  const [message, setMessage] = useState("");
  // Form initial values
  const initialValues: TRegisterUser = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    birth_date: date,
    genre: "",
    agreement: false,
  };
  return (
    <div
      id="authentication-modal"
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 md:h-full flex items-center justify-center transition-all ease-in-out delay-1000"
    >
      <div className="w-full h-full bg-gray-500 opacity-90 absolute"></div>
      <div className="relative w-full h-full max-w-md md:h-auto">
        <div className="relative bg-white rounded-lg shadow">
          <button
            type="button"
            onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
              setShowForm(!showForm)
            }
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
          >
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
          <div className="px-6 py-6 lg:px-8 border border-gray-300 rounded-lg">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Register
            </h3>
            <p className="mb-4 text-sm text-gray-500">
              Join our Web3 community
            </p>
            <Formik
              validationSchema={RegisterSchema}
              initialValues={initialValues}
              onSubmit={async (values, { setSubmitting }) => {
                const parsedDate = parse(
                  values.birth_date,
                  "dd/MM/yyyy",
                  new Date()
                );

                // Reset previous error and show spinner
                setError("");
                setLoading(true);

                try {
                  // const newUser = await registerUser({
                  //   first_name: values.first_name,
                  //   last_name: values.last_name,
                  //   email: values.email,
                  //   genre: values.genre,
                  //   password: values.password,
                  //   birth_date: values.birth_date,
                  //   agreement: values.agreement,
                  // });

                  setUser({
                    first_name: values.first_name,
                    last_name: values.last_name,
                    email: values.email,
                    genre: values.genre,
                    password: values.password,
                    birth_date: values.birth_date,
                  });

                  // Hide form and display toaster
                  setShowForm(!showForm);

                  router.push("/");
                } catch (error: unknown) {
                  // User already exists or other error occurred
                  if (error instanceof Error) {
                    console.log(error);
                    setError(error.message);
                  } else {
                    // Handle other types of errors here
                    setError("An error occured");
                  }
                } finally {
                  // Hide spinner
                  setLoading(false);
                }

                // Throw error with status code in case Fetch API req failed

                // console.log("val", JSON.stringify(values, null, 2));
                // setSubmitting(false);
              }}
            >
              {({ errors, touched, values }) => (
                <Form className="space-y-2" action="#">
                  {error && <div className="text-red-700 text-xs">{error}</div>}
                  <div className="grid gap-2 mb-6 md:grid-cols-2">
                    <div className="xs: pb-4 md:pb-0">
                      <Field
                        type="text"
                        name="first_name"
                        id="first_name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="First name"
                      />
                      {errors.first_name && touched.first_name ? (
                        <div className="text-red-700 text-xs absolute">
                          {errors.first_name}
                        </div>
                      ) : null}
                    </div>
                    <div>
                      <Field
                        type="text"
                        name="last_name"
                        id="last_name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Last name"
                      />
                      {errors.last_name && touched.last_name ? (
                        <div className="text-red-700 text-xs absolute">
                          {errors.last_name}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div>
                    <Field
                      type="email"
                      name="email"
                      id="email"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="E-mail"
                    />
                    {errors.email && touched.email ? (
                      <div className="text-red-700 text-xs absolute mr-0 pr-9">
                        {errors.email}
                      </div>
                    ) : null}
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Password
                    </label>
                    <Field
                      type="password"
                      name="password"
                      id="password"
                      placeholder="••••••••"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    />
                    {errors.password && touched.password ? (
                      <div className="text-red-700 text-xs absolute">
                        {errors.password}
                      </div>
                    ) : null}
                  </div>
                  <div className="flex flex-row items-center w-full py-2">
                    <p className="text-sm font-medium text-gray-900 dark:text-white w-1/2">
                      Birth date
                    </p>
                    <div className="border-gray-300 border p-2 rounded-lg">
                      <DatePickerField name="birth_date" />
                      {errors.birth_date && touched.birth_date ? (
                        <div className="text-red-700 text-xs absolute right-9 pt-3">
                          {errors.birth_date}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="pt-2">
                    <ul className="grid gap-2 w-full md:grid-cols-3">
                      <li>
                        <Field
                          type="radio"
                          id="female"
                          name="genre"
                          value="female"
                          className="hidden peer"
                        />
                        <label
                          htmlFor="female"
                          className="inline-flex justify-center items-center p-2 w-full text-gray-500 bg-white rounded-lg border border-gray-200 cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
                        >
                          <div className="w-full">Female</div>
                        </label>
                      </li>
                      <li>
                        <Field
                          type="radio"
                          id="male"
                          name="genre"
                          value="male"
                          className="hidden peer"
                        />
                        <label
                          htmlFor="male"
                          className="inline-flex justify-center items-center p-2 w-full text-gray-500 bg-white rounded-lg border border-gray-200 cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
                        >
                          <div className="w-full">Male</div>
                        </label>
                      </li>
                      <li>
                        <Field
                          type="radio"
                          id="custom"
                          name="genre"
                          value="custom"
                          className="hidden peer"
                        />
                        <label
                          htmlFor="custom"
                          className="inline-flex justify-center items-center p-2 w-full text-gray-500 bg-white rounded-lg border border-gray-200 cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
                        >
                          <div className="w-full">Custom</div>
                        </label>
                      </li>
                    </ul>
                  </div>
                  <div className="flex justify-between py-3">
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <Field
                          name="agreement"
                          id="agreement"
                          type="checkbox"
                          value=""
                          className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                          checked={values.agreement}
                        />
                      </div>
                      <label
                        htmlFor="remember"
                        className="ml-2 text-xs font-medium text-gray-900 dark:text-gray-300"
                      >
                        I agree to the terms and conditions of this website
                      </label>
                      {errors.agreement && touched.agreement ? (
                        <div className="text-red-700 text-xs absolute pt-4 ml-6">
                          {errors.agreement}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full text-white bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:to-violet-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    {isLoading ? (
                      <ScaleLoader
                        color="#fff"
                        loading={isLoading}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                        height={10}
                        width={2}
                      />
                    ) : (
                      "Register"
                    )}
                  </button>
                  <p>{message}</p>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
