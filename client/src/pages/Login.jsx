import { useContext, useState } from "react";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { loginInfo, updateLoginInfo, loginUser, loginError, isLoginLoading } =
    useContext(AuthContext);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    updateLoginInfo({
      ...loginInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await loginUser();

    if (result === true) {
      updateLoginInfo({
        email: "",
        password: "",
        confirmPassword: "",
      });

      navigate("/chat");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-900 via-blue-600 to-blue-400 p-6 md:p-10 flex flex-col lg:flex-row items-center justify-center">
      <div
        className="hidden lg:flex lg:w-[60%] h-screen bg-cover bg-center shadow-lg"
        style={{ backgroundImage: "url('/images/Login.jpeg')" }}
      ></div>

      <div className="w-full lg:w-[40%] lg:h-screen flex items-center justify-center p-4 md:p-6 bg-gray-50">
        <div className="max-w-md w-full space-y-6 p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-center text-2xl font-semibold text-gray-900">
            Login to Your Account
          </h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-left text-sm font-medium mb-1 text-gray-700">
                Email Address
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
                <input
                  name="email"
                  type="email"
                  className="pl-10 w-full border rounded-md p-3 text-sm focus:ring focus:ring-green-300"
                  value={loginInfo.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {[
              {
                label: "Password",
                name: "password",
                state: showPassword,
                setState: setShowPassword,
              },
              {
                label: "Confirm Password",
                name: "confirmPassword",
                state: showConfirmPassword,
                setState: setShowConfirmPassword,
              },
            ].map(({ label, name, state, setState }) => (
              <div key={name}>
                <label className="block text-left text-sm mb-1 font-medium text-gray-700">
                  {label}
                </label>
                <div className="relative">
                  <FaLock className="absolute left-3 top-3 text-gray-400" />
                  <input
                    name={name}
                    type={state ? "text" : "password"}
                    className="pl-10 pr-10 w-full border rounded-md p-3 text-sm focus:ring focus:ring-green-300"
                    value={loginInfo[name]}
                    onChange={handleChange}
                    placeholder={label}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-3 text-gray-400"
                    onClick={() => setState(!state)}
                  >
                    {state ? <FaEye /> : <FaEyeSlash />}
                  </button>
                </div>
              </div>
            ))}

            <button
              type="submit"
              disabled={isLoginLoading}
              className="w-full bg-violet-600 cursor-pointer text-white py-3 text-sm font-medium rounded-md hover:bg-violet-700 disabled:bg-violet-400"
            >
              {isLoginLoading ? "Logging in..." : "Login"}
            </button>

            <p className="text-center text-gray-600 text-sm">
              Don't have an account?{" "}
              <a
                href="/register"
                className="text-violet-600 font-medium hover:underline"
              >
                Register here
              </a>
            </p>
          </form>

          {loginError && (
            <p className="text-center text-red-600 text-md mt-2">
              {loginError}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
