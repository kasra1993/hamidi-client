import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { providerLogin, clearError } from "../../redux/slices/providerSlice";
import { showToast } from "../../redux/slices/toastSlice"; // Replace with the Redux toast action
import { useNavigate, useLocation } from "react-router-dom";
import { providerBg } from "../../images";
import HomeIcon from "../../components/HomeIcon";

const ProviderLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  // Accessing the auth state from Redux
  const { provider, loading, error } = useSelector((state) => state.provider);

  // Handling form submission and login
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(providerLogin({ email, password }));
  };

  // Effect to handle post-login redirection and toast notifications
  useEffect(() => {
    if (provider) {
      dispatch(
        showToast({
          message: "تامین کننده عزیز خوش آمدید",
          type: "success",
        })
      );
      navigate("/");
    }

    if (error) {
      dispatch(
        showToast({
          message: error,
          type: "error",
        })
      );
      dispatch(clearError());
    }
  }, [provider, error, navigate, from, dispatch]);

  return (
    <form
      onSubmit={handleSubmit}
      className="min-h-screen bg-gray-100 text-gray-900 flex justify-center"
      style={{
        backgroundImage: `url(${providerBg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <HomeIcon />
      <div className="font-[sans-serif]">
        <div className="min-h-screen flex fle-col items-center justify-center py-6 px-4">
          <div className="grid md:grid-cols-1 items-center gap-4 max-w-6xl w-full">
            <div className="border border-gray-300 rounded-lg p-6 max-w-md shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] max-md:mx-auto">
              <div className="mb-8">
                <h3 className="text-white text-3xl font-extrabold mb-10">
                  ورود به حساب کاربری
                </h3>
                <p className="text-white text-sm mt-4 leading-relaxed">
                  با ورود به حساب کاربری خود از پایگاه جامع اطلاعاتی تامین
                  کنندگان صنعت تایر استفاده کنید
                </p>
              </div>

              <div>
                <label className="text-white text-sm mb-2 block text-right">
                  نام کاربری
                </label>
                <div className="relative flex items-center">
                  <input
                    name="email"
                    type="text"
                    required
                    className="w-full text-sm text-slate-800 border border-gray-300 px-4 py-3 rounded-lg outline-blue-600"
                    placeholder=" نام کاربری"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#bbb"
                    stroke="#bbb"
                    className="w-[18px] h-[18px] absolute right-4"
                    viewBox="0 0 24 24"
                  >
                    <circle cx="10" cy="7" r="6"></circle>
                    <path d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"></path>
                  </svg>
                </div>
              </div>

              <div>
                <label className="text-white text-sm mb-2 block text-right pt-4">
                  گذرواژه
                </label>
                <div className="relative flex items-center">
                  <input
                    name="password"
                    type="password"
                    required
                    className="w-full text-sm text-slate-800 border border-gray-300 px-4 py-3 rounded-lg outline-blue-600"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#bbb"
                    stroke="#bbb"
                    className="w-[18px] h-[18px] absolute right-4 cursor-pointer"
                    viewBox="0 0 128 128"
                  >
                    <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"></path>
                  </svg>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 mt-5">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-3 block text-sm text-white"
                  >
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a
                    href="/provider-forgot-password"
                    className="text-white hover:underline font-semibold underline hover:text-blue-400"
                  >
                    رمز عبور خود را فراموش کردم
                  </a>
                </div>
              </div>

              <div className="!mt-8">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full shadow-xl py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                >
                  {loading ? "در حال ورود" : "ورود"}
                </button>
              </div>

              <p className="text-sm !mt-8 text-center text-white">
                برای ایجاد حساب کاربری
                <a
                  href="/provider-registration"
                  className="text-blue-400 font-semibold hover:underline whitespace-nowrap px-2"
                >
                  اینجا
                </a>
                را کلیک کنید
              </p>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ProviderLogin;
