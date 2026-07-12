import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { Mail, LockKeyhole, Zap } from "lucide-react";
import toast from "react-hot-toast";
import { loginUser } from "../service/authService";
import { useAuth } from "../../../context/AuthContext";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (formData) => {
    try {
      setIsSubmitting(true);

      const data = await loginUser(formData);

      login(data.user, data.token);

      toast.success("Login successful");

      navigate("/home", { replace: true });
    } catch (error) {
      console.error("LOGIN ERROR:", error);

      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Login failed. Please check your credentials.";

      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    "h-11 w-full rounded-xl border border-[var(--input-border)] bg-[var(--input-bg)] pl-11 pr-4 text-sm text-[var(--text)] outline-none transition placeholder:text-[var(--text-muted)] focus:border-[var(--input-focus)] focus:ring-2 focus:ring-[var(--input-focus)]/15";

  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--background)] px-4 py-10">
      <div className="w-full max-w-[500px]">
        <div className="mb-10 text-center">
          <div className="mb-3 flex items-center justify-center gap-2 text-[var(--primary)]">
            <Zap size={34} strokeWidth={2.4} />

            <h1 className="text-3xl font-bold">M2-Store</h1>
          </div>

          <h2 className="text-2xl font-semibold text-[var(--text)]">
            Welcome back
          </h2>

          <p className="mt-2 text-base text-[var(--text-secondary)]">
            Sign in to your account
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[var(--shadow)] sm:p-6"
          noValidate
        >
          <div className="mb-5">
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-semibold text-[var(--text-secondary)]"
            >
              Email
            </label>

            <div className="relative">
              <Mail
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
              />

              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                className={inputClass}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email address",
                  },
                })}
              />
            </div>

            {errors.email && (
              <p className="mt-2 text-sm text-[var(--danger)]">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="mb-3">
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-semibold text-[var(--text-secondary)]"
            >
              Password
            </label>

            <div className="relative">
              <LockKeyhole
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
              />

              <input
                id="password"
                type="password"
                placeholder="••••••••"
                className={inputClass}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                })}
              />
            </div>

            {errors.password && (
              <p className="mt-2 text-sm text-[var(--danger)]">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="mb-6 flex justify-end">
            <Link
              to="/forgot-password"
              className="font-medium text-[var(--primary)] transition hover:text-[var(--primary-hover)]"
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="flex h-14 w-full items-center justify-center rounded-xl bg-[var(--primary)] text-lg font-semibold text-[var(--text-inverse)] transition hover:bg-[var(--primary-hover)] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Signing in..." : "Sign In"}
          </button>

          <p className="mt-6 text-center text-base text-m text-[var(--text-secondary)]">
            Don&apos;t have an account?{" "}
            <Link
              to="/register"
              className="font-semibold text-[var(--primary)] transition hover:text-[var(--primary-hover)]"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
}