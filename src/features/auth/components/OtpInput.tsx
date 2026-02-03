"use client";

import { useRef, KeyboardEvent, ClipboardEvent, ChangeEvent } from "react";
import { OTP_LENGTH } from "../constants";

interface OtpInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  disabled?: boolean;
}

export function OtpInput({ value, onChange, error, disabled }: OtpInputProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, inputValue: string) => {
    if (!/^\d*$/.test(inputValue)) return;

    const newOtp = value.split("");
    newOtp[index] = inputValue;
    const updatedOtp = newOtp.join("");

    onChange(updatedOtp);

    if (inputValue && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !value[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain").slice(0, OTP_LENGTH);
    
    if (!/^\d+$/.test(pastedData)) return;

    onChange(pastedData.padEnd(OTP_LENGTH, ""));
    
    const nextIndex = Math.min(pastedData.length, OTP_LENGTH - 1);
    inputRefs.current[nextIndex]?.focus();
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold font-poppins text-text-primary">
        Enter OTP
      </label>
      <div className="flex gap-2 justify-center">
        {Array.from({ length: OTP_LENGTH }).map((_, index) => (
          <input
            key={index}
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={value[index] || ""}
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(index, e.target.value)}
            onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            disabled={disabled}
            className={`w-12 h-12 text-center text-lg font-semibold font-poppins border-2 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary ${
              error
                ? "border-red-500 bg-red-50"
                : "border-border bg-white hover:border-secondary/50"
            } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
            aria-label={`OTP digit ${index + 1}`}
          />
        ))}
      </div>
      {error && (
        <p className="text-sm font-poppins text-red-600 mt-2">{error}</p>
      )}
    </div>
  );
}
