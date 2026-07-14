import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { Mail, Zap } from "lucide-react";
import toast from "react-hot-toast";
import { sendForgotPasswordOtp } from "../service/authService";

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (formData) => {
    try {
      setIsSubmitting(true);

      await sendForgotPasswordOtp(formData);

      sessionStorage.setItem("resetEmail", formData.email);

      toast.success("Reset code sent successfully");

      navigate("/reset-password", {
        state: {
          email: formData.email,
        },
      });
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Failed to send reset code.";

      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    "h-11 w-full rounded-xl border border-[var(--input-border)] bg-[var(--input-bg)] pl-11 pr-4 text-sm text-[var(--text)] outline-none placeholder:text-[var(--text-muted)] focus:border-[var(--input-focus)] focus:ring-2 focus:ring-[var(--input-focus)]/15";

  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--background)] px-4 py-10">
      <div className="w-full max-w-[500px]">
        <div className="mb-10 text-center">
          <div className="mb-3 flex items-center justify-center text-[var(--primary)]">
            <Zap size={44} strokeWidth={2.1} />
          </div>

          <h2 className="text-2xl font-semibold text-[var(--text)]">
            Forgot Password?
          </h2>

          <p className="mt-2 text-base text-[var(--text-secondary)]">
            Enter your email and we'll send you a reset code.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[var(--shadow)] sm:p-6"
          noValidate
        >
          <div className="mb-6">
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

          <button
            type="submit"
            disabled={isSubmitting}
            className="flex h-14 w-full items-center justify-center rounded-xl bg-[var(--primary)] text-lg font-semibold text-white transition hover:bg-[var(--primary-hover)] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Sending..." : "Send Reset Code"}
          </button>

          <p className="mt-6 text-center text-base text-[var(--text-secondary)]">
            Remember your password?{" "}
            <Link
              to="/login"
              className="font-semibold text-[var(--primary)] transition hover:text-[var(--primary-hover)]"
            >
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
}