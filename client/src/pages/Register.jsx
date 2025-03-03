import { useContext, useState } from "react";
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const {
    registerInfo,
    updateRegisterInfo,
    registerUser,
    registerError,
    isRegisterLoading,
  } = useContext(AuthContext);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    updateRegisterInfo({
      ...registerInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await registerUser();

    if (result === true) {
      alert("Registration successful! 🚀");

      updateRegisterInfo({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-900 via-blue-600 to-blue-400 p-6 md:p-10 flex flex-col lg:flex-row items-center justify-center">
      <div
        className="hidden lg:flex lg:w-[60%] h-screen bg-cover bg-center shadow-lg"
        style={{ backgroundImage: "url('/images/Registration.jpeg')" }}
      ></div>

      <div className="w-full lg:w-[40%] lg:h-screen flex items-center justify-center p-4 md:p-6 bg-gray-50">
        <div className="max-w-md w-full space-y-6 p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-center text-2xl font-semibold text-gray-900">
            Create Your Account
          </h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            {[
              {
                label: "Full Name",
                name: "name",
                type: "text",
                icon: <FaUser />,
              },
              {
                label: "Email Address",
                name: "email",
                type: "email",
                icon: <FaEnvelope />,
              },
            ].map(({ label, name, type, icon }) => (
              <div key={name}>
                <label className="block text-left text-sm font-medium mb-1 text-gray-700">
                  {label}
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-3 text-gray-400">
                    {icon}
                  </div>
                  <input
                    name={name}
                    type={type}
                    className="pl-10 w-full border rounded-md p-3 text-sm focus:ring focus:ring-green-300"
                    value={registerInfo[name] || ""}
                    onChange={handleChange}
                    placeholder={`Enter your ${label.toLowerCase()}`}
                  />
                </div>
              </div>
            ))}

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
                <label className="block text-left text-sm font-medium mb-1 text-gray-700">
                  {label}
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-3 text-gray-400">
                    <FaLock />
                  </div>
                  <input
                    name={name}
                    type={state ? "text" : "password"}
                    className="pl-10 pr-10 w-full border rounded-md p-3 text-sm focus:ring focus:ring-green-300"
                    value={registerInfo[name] || ""}
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
              disabled={isRegisterLoading}
              className="w-full bg-violet-600 cursor-pointer text-white py-3 text-sm font-medium rounded-md hover:bg-violet-700 disabled:bg-violet-400"
            >
              {isRegisterLoading ? "Registering..." : "Register"}
            </button>

            <p className="text-center text-gray-600 text-sm">
              Already have an account?{" "}
              <a
                href="/login"
                className="text-violet-600 font-medium hover:underline"
              >
                Login here
              </a>
            </p>
            {registerError && (
              <p className="text-center text-red-600 text-md mt-2">
                {registerError}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
