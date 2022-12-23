import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import AuthLayout from "../layouts/AuthLayout";

const auth = () => (
  <AuthLayout>
    <LoginForm />
    {/* <RegisterForm /> */}
  </AuthLayout>
);

export default auth;
