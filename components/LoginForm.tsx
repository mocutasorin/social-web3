import { Field, Form, Formik } from "formik";

interface FormValues {
  email: string;
  password: string;
}

const LoginForm = () => {
  const initialValues: FormValues = { email: "", password: "" };
  return (
    <div className="flex flex-col w-1/2">
      <h1 className="text-3xl font-semibold pb-2">Welcome</h1>
      <p className="text-gray-500">Please enter your details</p>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, actions) => {
          console.log({ values, actions });
          console.log("val", JSON.stringify(values, null, 2));
          actions.setSubmitting(false);
        }}
      >
        <Form>
          <Field id="email" name="email" placeholder="E-mail address" />
          <Field id="password" name="password" placeholder="Password" />
          <button type="submit">Login</button>
        </Form>
      </Formik>
    </div>
  );
};

export default LoginForm;
