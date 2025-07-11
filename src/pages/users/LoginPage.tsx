import LoginForm from "./LoginForm";

const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300">
      <div className="bg-white shadow-2xl rounded-xl p-8 w-full max-w-md mx-4">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
