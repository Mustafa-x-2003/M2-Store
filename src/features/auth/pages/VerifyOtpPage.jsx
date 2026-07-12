import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { Zap } from "lucide-react";
import toast from "react-hot-toast";
import OtpInput from "../components/OtpInput";
import {
  sendRegisterOtp,
  verifyRegisterOtp,
} from "../service/authService";

export default function VerifyOtpPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const email =
    location.state?.email || sessionStorage.getItem("registerEmail") || "";

  const [otp, setOtp] = useState(Array(6).fill(""));
  const [secondsLeft, setSecondsLeft] = useState(59);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);

  useEffect(() => {
    if (!email) {
      navigate("/register", { replace: true });
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

    try {
      setIsVerifying(true);

      await verifyRegisterOtp({
        email,
        otp: otpCode,
      });

      sessionStorage.removeItem("registerEmail");
      sessionStorage.removeItem("pendingRegistration");

      toast.success("Account created successfully");

      navigate("/login", { replace: true });
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Invalid or expired OTP. Please try again.";

      toast.error(errorMessage);
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResend = async () => {
    const pendingRegistration = sessionStorage.getItem("pendingRegistration");

    if (!pendingRegistration) {
      toast.error("Registration data is missing. Please register again.");
      navigate("/register");
      return;
    }

    try {
      setIsResending(true);

      const registrationData = JSON.parse(pendingRegistration);

      await sendRegisterOtp(registrationData);

      setOtp(Array(6).fill(""));
      setSecondsLeft(59);

      toast.success("OTP sent to your email");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to resend OTP.";

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

          <button
            type="submit"
            disabled={isVerifying}
            className="mt-8 flex h-14 w-full items-center justify-center rounded-xl bg-[var(--primary)] text-lg font-semibold text-[var(--text-inverse)] transition hover:bg-[var(--primary-hover)] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isVerifying ? "Verifying..." : "Verify & Create Account"}
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