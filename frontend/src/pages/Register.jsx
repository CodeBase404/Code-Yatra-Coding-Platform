import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router";
import { z } from "zod";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../features/auth/authThunks";
import toast from "react-hot-toast";
import logo from "/avatar.avif";
import panda from "/panda2.png";
import { setShowPassword } from "../features/ui/uiSlice";

const registerSchema = z
  .object({
    firstName: z.string().min(3, "Name should contain at least 3 characters"),
    emailId: z.string().email("Enter a valid email address"),
    password: z
      .string()
      .min(8, "Password should contain at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const showPassword = useSelector((state) => state.ui.showPassword);
  const { isAuthenticated, loading } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated, navigate]);

  const onSubmit = async (data) => {
    const toastId = toast.loading("Registering...");
    try {
      const res = await dispatch(registerUser(data)).unwrap();
      toast.success(res.message || "Registered successfully", { id: toastId });
      navigate("/");
    } catch (err) {
      toast.error(err || "Register Failed", { id: toastId });
    }
  };

  return (
    <div className="pt-41 relative flex items-center justify-center h-screen mx-2">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative flex flex-col justify-center gap-4 bg-white dark:bg-white/5 backdrop-blur-lg border border-gray-500/20 min-h-[66%] w-full max-w-md mx-2 md:mx-auto p-6 shadow rounded-3xl"
      >
        <div className="relative text-black/80 dark:text-white">
          <svg
            className="h-[1em] opacity-50 fixed mt-4 ml-3.5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </g>
          </svg>
          <input
            {...register("firstName")}
            className="w-full px-4 py-3 border border-black/10 dark:border-white/10 placeholder:text-sm rounded-md pl-10 outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Name"
          />
          {errors.firstName && (
            <p className="text-red-500 pl-1 text-sm">
              {errors.firstName.message}
            </p>
          )}
        </div>

        <div className="relative text-black/80 dark:text-white">
          <svg
            className="h-[1em] opacity-50 fixed mt-4.5 ml-3.5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <rect width="20" height="16" x="2" y="4" rx="2"></rect>
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
            </g>
          </svg>
          <input
            type="email"
            {...register("emailId")}
            className="w-full px-4 py-3 border border-black/10 dark:border-white/10 placeholder:text-sm rounded-md pl-10 outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="mail@site.com"
          />
          {errors.emailId && (
            <p className="text-red-500 pl-1 text-sm">
              {errors.emailId.message}
            </p>
          )}
        </div>

        <div className="relative text-black/80 dark:text-white">
          <svg
            className="h-[1em] opacity-50 fixed mt-4.5 ml-3.5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
              <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
            </g>
          </svg>
          <input
            type={showPassword ? "text" : "password"}
            {...register("password")}
            className="w-full px-4 py-3 border border-black/10 dark:border-white/10 placeholder:text-sm rounded-md pl-10 outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Password"
          />
          {errors.password && (
            <p className="text-red-500 pl-1 text-sm">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="relative text-black/80 dark:text-white">
          <svg
            className="h-[1em] opacity-50 fixed mt-4.5 ml-3.5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
              <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
            </g>
          </svg>
          <input
            type={showPassword ? "text" : "password"}
            {...register("confirmPassword")}
            className="w-full px-4 py-3 border border-black/10 dark:border-white/10 placeholder:text-sm rounded-md pl-10 outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Confirm password"
          />
          <span
            className="absolute top-4 right-3 text-xl cursor-pointer"
            onClick={() => dispatch(setShowPassword(!showPassword))}
          >
            {showPassword === true ? (
              <EyeOff
                className="text-gray-700/70 hover:text-black/80"
                size={20}
              />
            ) : (
              <Eye className="text-gray-700/70 hover:text-black/80" size={20} />
            )}
          </span>
          {errors.confirmPassword && (
            <p className="text-red-500 pl-1 text-sm">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`btn btn-soft btn-primary flex items-center text-[17px] rounded-md p-6 transition 
          ${
            loading
              ? "opacity-50 border border-white/10 cursor-not-allowed"
              : ""
          }`}
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-black/10 border-t-black rounded-full animate-spin" />
          ) : (
            <>
              Register
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>

        <p className="text-center select-none mt-6 text-black/40 dark:text-white p-0.5 text-[16px] active:text-[15.8px]">
          Already have an account ?{" "}
          <span
            onClick={() => navigate("/login")}
            className="cursor-pointer py-2 pr-2 font-bold text-[#137de7] hover:text-blue-800"
          >
            Log in
          </span>
        </p>

          <div className="absolute -top-42 w-100">
        <img src={panda} alt="panda" />
        <div className="absolute top-20 left-23 font-bold text-center">
          Welcome! Let's get you started <br /> please fill in your details to
          register. <br /> <span className="text-2xl">😊❤️</span>
        </div>
      </div>
      </form>
    </div>
  );
}

export default Register;
