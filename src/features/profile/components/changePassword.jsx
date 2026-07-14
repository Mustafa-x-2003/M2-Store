import { useState } from "react";
import { Lock } from "lucide-react";
import toast from "react-hot-toast";
import { sendPasswordResetOtp, resetPassword } from "../service/passwordService";

export default function ChangePassword({ userEmail }) {
  const [step, setStep] = useState("button"); // button -> otp -> password
  const [email, setEmail] = useState(userEmail || "");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendOtp = async () => {
    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    setIsLoading(true);
    try {
      await sendPasswordResetOtp(email);
      toast.success("OTP sent to your email");
      setStep("password");
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Failed to send OTP");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!otp || !newPassword) {
      toast.error("Please fill all fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setIsLoading(true);
    try {
      await resetPassword(email, otp, newPassword);
      toast.success("Password changed successfully!");
      setStep("button");
      setOtp("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Invalid or expired OTP");
    } finally {
      setIsLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-lg border border-[var(--border)] bg-[var(--input-bg)] px-4 py-3 text-sm text-[var(--text)] outline-none placeholder:text-[var(--text-muted)] focus:border-[var(--primary)]";

  return (
    <div className="mt-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm">
      <div className="mb-3 flex items-center gap-2">
        <Lock size={18} className="text-[var(--primary)]" />
        <h3 className="text-lg font-bold text-[var(--text)]">Change Password</h3>
      </div>

      {step === "button" && (
        <button
          onClick={() => setStep("otp")}
          className="rounded-lg border border-[var(--primary)] px-4 py-2 text-sm font-semibold text-[var(--primary)] transition hover:bg-[var(--primary)] hover:text-[var(--text-inverse)]"
        >
          Change Password
        </button>
      )}

      {step === "otp" && (
        <div className="space-y-3">
          <p className="text-sm text-[var(--text-muted)]">
            We'll send an OTP to your email to verify your identity.
          </p>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@gmail.com"
            className={inputClass}
          />
          <div className="flex gap-2">
            <button
              onClick={handleSendOtp}
              disabled={isLoading}
              className="rounded-lg bg-[var(--primary)] px-4 py-2 text-sm font-semibold text-[var(--text-inverse)] transition hover:opacity-90 disabled:opacity-50"
            >
              {isLoading ? "Sending..." : "Send OTP"}
            </button>
            <button
              onClick={() => setStep("button")}
              className="rounded-lg border border-[var(--border)] px-4 py-2 text-sm font-semibold text-[var(--text-secondary)]"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {step === "password" && (
        <div className="space-y-3">
          <input
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            className={inputClass}
          />
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="New password"
            className={inputClass}
          />
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm new password"
            className={inputClass}
          />
          <div className="flex gap-2">
            <button
              onClick={handleResetPassword}
              disabled={isLoading}
              className="rounded-lg bg-[var(--primary)] px-4 py-2 text-sm font-semibold text-[var(--text-inverse)] transition hover:opacity-90 disabled:opacity-50"
            >
              {isLoading ? "Saving..." : "Reset Password"}
            </button>
            <button
              onClick={() => setStep("button")}
              className="rounded-lg border border-[var(--border)] px-4 py-2 text-sm font-semibold text-[var(--text-secondary)]"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}