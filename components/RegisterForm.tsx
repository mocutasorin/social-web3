import React, { Dispatch, SetStateAction, useState } from "react";
import { Field, Form, Formik } from "formik";
import DatePicker from "react-datepicker";
import DatePickerField from "./DatePickerField";

interface FormValues {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  birth_date: string;
  genre: string;
  agreement: boolean;
}

type Props = {
  showForm: boolean;
  setShowForm: Dispatch<SetStateAction<boolean>>;
};

const RegisterForm = ({ showForm, setShowForm }: Props) => {
  // Date input default values and setter
  const today = new Date().toISOString().substring(0, 10);
  const [date, setDate] = useState(today);
  const [isChecked, setIsChecked] = useState(false);

  // Form initial values
  const initialValues: FormValues = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    birth_date: date,
    genre: "",
    agreement: false,
  };

  //   Input handlers (Date and Checkbox)
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(!isChecked);
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
            <p className="mb-4 text-sm text-gray-500">Join awesome community</p>
            <Formik
              initialValues={initialValues}
              onSubmit={(values, actions) => {
                console.log({ values, actions });
                console.log("val", JSON.stringify(values, null, 2));
                actions.setSubmitting(false);
              }}
            >
              {({ values, setFieldValue }) => (
                <Form className="space-y-2" action="#">
                  <div className="grid gap-2 mb-6 md:grid-cols-2">
                    <div>
                      <input
                        type="text"
                        id="first_name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="First name"
                        required
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        id="last_name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Last name"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Field
                      type="email"
                      name="email"
                      id="email"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="E-mail"
                      required
                    />
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
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="birth_date"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Birth date
                    </label>
                    <DatePickerField />
                    <input
                      type="date"
                      id="birth_date"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                      value={values.birth_date}
                      onChange={() => setFieldValue}
                    />
                  </div>
                  <div>
                    <p className="text-sm mb-2 block font-medium text-gray-900 dark:text-white">
                      Genre:
                    </p>
                    <ul className="grid gap-2 w-full md:grid-cols-3">
                      <li>
                        <Field
                          type="radio"
                          id="female"
                          name="genre"
                          value="female"
                          className="hidden peer"
                          required
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
                          required
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
                          required
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
                          required
                          checked={values.agreement}
                        />
                      </div>
                      <label
                        htmlFor="remember"
                        className="ml-2 text-xs font-medium text-gray-900 dark:text-gray-300"
                      >
                        I agree to the terms and conditions of this website
                      </label>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full text-white bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:to-violet-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Register
                  </button>
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
