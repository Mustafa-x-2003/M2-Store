import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { Mail, LockKeyhole, Phone, User, Zap } from "lucide-react";
import toast from "react-hot-toast";
import { sendRegisterOtp } from "../service/authService";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      phone: "",
    },
  });

  const onSubmit = async (formData) => {
    try {
      setIsSubmitting(true);

      await sendRegisterOtp(formData);

      sessionStorage.setItem("registerEmail", formData.email);

      sessionStorage.setItem(
        "pendingRegistration",
        JSON.stringify(formData),
      );

      toast.success("OTP sent successfully");

      navigate("/verify-otp", {
        state: {
          email: formData.email,
        },
      });
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Registration failed. Please try again.";

      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    "h-11 w-full rounded-xl border border-[var(--input-border)] bg-[var(--input-bg)] pl-11 pr-4 text-sm text-[var(--text)] outline-none transition placeholder:text-[var(--text-muted)] focus:border-[var(--input-focus)] focus:ring-2 focus:ring-[var(--input-focus)]/15";

  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--background)] px-4 py-5 transition-colors">
      <div className="w-full max-w-[500px]">
        <div className="mb-5 text-center">
          <div className="mb-2 flex items-center justify-center gap-2">
            <Zap
              size={29}
              strokeWidth={2.4}
              className="text-[var(--primary)]"
            />

            <h1 className="text-3xl font-bold text-[var(--primary)]">
              M2-Store
            </h1>
          </div>

          <h2 className="text-xl font-semibold text-[var(--text)]">
            Create an account
          </h2>

          <p className="mt-1 text-sm text-[var(--text-secondary)]">
            Join us and start shopping
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[var(--shadow)] transition-colors sm:p-6"
          noValidate
        >
          <div className="mb-4">
            <label
              htmlFor="username"
              className="mb-1.5 block text-sm font-semibold text-[var(--text-secondary)]"
            >
              Username
            </label>

            <div className="relative">
              <User
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
              />

              <input
                id="username"
                type="text"
                placeholder="johndoe"
                className={inputClass}
                {...register("username", {
                  required: "Username is required",
                  minLength: {
                    value: 3,
                    message: "Username must be at least 3 characters",
                  },
                })}
              />
            </div>

            {errors.username && (
              <p className="mt-1.5 text-xs text-[var(--danger)]">
                {errors.username.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="mb-1.5 block text-sm font-semibold text-[var(--text-secondary)]"
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
              <p className="mt-1.5 text-xs text-[var(--danger)]">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="phone"
              className="mb-1.5 block text-sm font-semibold text-[var(--text-secondary)]"
            >
              Phone
            </label>

            <div className="relative">
              <Phone
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
              />

              <input
                id="phone"
                type="tel"
                placeholder="+201234567890"
                className={inputClass}
                {...register("phone", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^\+?[0-9]{10,15}$/,
                    message: "Enter a valid phone number",
                  },
                })}
              />
            </div>

            {errors.phone && (
              <p className="mt-1.5 text-xs text-[var(--danger)]">
                {errors.phone.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="mb-1.5 block text-sm font-semibold text-[var(--text-secondary)]"
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
              <p className="mt-1.5 text-xs text-[var(--danger)]">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="flex h-12 w-full items-center justify-center rounded-xl bg-[var(--primary)] text-base font-semibold text-[var(--text-inverse)] transition hover:bg-[var(--primary-hover)] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Creating account..." : "Create Account"}
          </button>

          <p className="mt-4 text-center  text-m text-[var(--text-secondary)]">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-[var(--primary)] transition hover:text-[var(--primary-hover)]"
            >
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
}