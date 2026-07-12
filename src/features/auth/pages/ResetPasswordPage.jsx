import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { Zap } from "lucide-react";
import toast from "react-hot-toast";
import OtpInput from "../components/OtpInput";
import {
  sendForgotPasswordOtp,
  verifyForgotPasswordOtp,
} from "../service/authService";

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const email =
    location.state?.email || sessionStorage.getItem("resetEmail") || "";

  const [otp, setOtp] = useState(Array(6).fill(""));
  const [newPassword, setNewPassword] = useState("");
  const [secondsLeft, setSecondsLeft] = useState(59);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);

  useEffect(() => {
    if (!email) {
      navigate("/forgot-password", { replace: true });
    }
  }, [email, navigate]);

  useEffect(() => {
    if (secondsLeft <= 0) return;

    const timer = setInterval(() => {
      setSecondsLeft((previousSeconds) => previousSeconds - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [secondsLeft]);

  const handleVerify = async (event) => {
    event.preventDefault();

    const otpCode = otp.join("");

    if (otpCode.length !== 6) {
      toast.error("Please enter the 6-digit OTP");
      return;
    }

    if (newPassword.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    try {
      setIsVerifying(true);

      await verifyForgotPasswordOtp({
        email,
        otp: otpCode,
        newPassword,
      });

      sessionStorage.removeItem("resetEmail");

      toast.success("Password updated successfully");

      navigate("/login", { replace: true });
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Invalid or expired OTP.";

      toast.error(errorMessage);
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResend = async () => {
    try {
      setIsResending(true);

      await sendForgotPasswordOtp({
        email,
      });

      setOtp(Array(6).fill(""));
      setSecondsLeft(59);

      toast.success("Reset code sent successfully");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Failed to resend code.";

      toast.error(errorMessage);
    } finally {
      setIsResending(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--background)] px-4 py-10">
      <div className="w-full max-w-[500px]">
        <div className="mb-8 text-center">
          <div className="mb-5 flex justify-center text-[var(--primary)]">
            <Zap size={46} strokeWidth={2.3} />
          </div>

          <h1 className="text-3xl font-bold text-[var(--text)]">
            Verify Your Email
          </h1>

          <p className="mt-3 text-base text-[var(--text-secondary)]">
            We sent a 6-digit code to{" "}
            <span className="font-medium text-[var(--text)]">
              {email}
            </span>
          </p>
        </div>

        <form
          onSubmit={handleVerify}
          className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[var(--shadow)] sm:p-8"
        >
          <OtpInput value={otp} onChange={setOtp} />

          <div className="mt-6">
            <label className="mb-2 block text-sm font-semibold text-[var(--text-secondary)]">
              New Password
            </label>

            <input
              type="password"
              value={newPassword}
              onChange={(event) => setNewPassword(event.target.value)}
              placeholder="Enter new password"
              className="h-13 w-full rounded-xl border border-[var(--input-border)] bg-[var(--input-bg)] px-4 text-[var(--text)] outline-none transition placeholder:text-[var(--text-muted)] focus:border-[var(--input-focus)] focus:ring-2 focus:ring-[var(--input-focus)]/15"
            />
          </div>

          <button
            type="submit"
            disabled={isVerifying}
            className="mt-8 flex h-14 w-full items-center justify-center rounded-xl bg-[var(--primary)] text-lg font-semibold text-white transition hover:bg-[var(--primary-hover)] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isVerifying ? "Resetting..." : "Reset Password"}
          </button>

          <p className="mt-7 text-center text-base text-[var(--text-secondary)]">
            Didn&apos;t receive the code?{" "}
            {secondsLeft > 0 ? (
              <span className="text-[var(--text-muted)]">
                Resend in {secondsLeft}s
              </span>
            ) : (
              <button
                type="button"
                onClick={handleResend}
                disabled={isResending}
                className="font-semibold text-[var(--primary)] transition hover:text-[var(--primary-hover)] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isResending ? "Resending..." : "Resend OTP"}
              </button>
            )}
          </p>
        </form>
      </div>
    </main>
  );
}