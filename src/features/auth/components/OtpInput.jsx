import { useRef } from "react";

export default function OtpInput({ value, onChange }) {
  const inputsRef = useRef([]);

  const handleChange = (index, inputValue) => {
    if (!/^\d?$/.test(inputValue)) return;

    const updatedOtp = [...value];
    updatedOtp[index] = inputValue;
    onChange(updatedOtp);

    if (inputValue && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, event) => {
    if (event.key === "Backspace" && !value[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (event) => {
    event.preventDefault();

    const pastedValue = event.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);

    if (!pastedValue) return;

    const updatedOtp = Array(6).fill("");

    pastedValue.split("").forEach((digit, index) => {
      updatedOtp[index] = digit;
    });

    onChange(updatedOtp);

    const nextIndex = Math.min(pastedValue.length, 5);
    inputsRef.current[nextIndex]?.focus();
  };

  return (
    <div className="flex justify-center gap-2 sm:gap-3">
      {value.map((digit, index) => (
        <input
          key={index}
          ref={(element) => {
            inputsRef.current[index] = element;
          }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={(event) => handleChange(index, event.target.value)}
          onKeyDown={(event) => handleKeyDown(index, event)}
          onPaste={handlePaste}
          className="h-14 w-12 rounded-xl border border-[var(--input-border)] bg-[var(--input-bg)] text-center text-xl font-semibold text-[var(--text)] outline-none transition placeholder:text-[var(--text-muted)] focus:border-[var(--input-focus)] focus:ring-2 focus:ring-[var(--input-focus)]/15"
          aria-label={`OTP digit ${index + 1}`}
        />
      ))}
    </div>
  );
}