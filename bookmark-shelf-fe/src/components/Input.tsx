import { forwardRef, useState } from "react";

interface InputProps {
  label?: string;
  placeholder: string;
  type?: "text" | "password" | "email";
  error?: string;
}

export const InputComp = forwardRef<HTMLInputElement, InputProps>(
  ({ label, placeholder, type = "text", error }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    const isPassword = type === "password";
    const inputType = isPassword ? (showPassword ? "text" : "password") : type;

    return (
      <div className="mb-4">
        {label && <label className="block mb-1 font-medium text-gray-700">{label}</label>}

        <div className="relative">
          <input
            ref={ref}
            type={inputType}
            placeholder={placeholder}
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
              error ? "border-red-500" : "border-gray-300"
            }`}
          />

          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute inset-y-0 right-2 flex items-center text-sm text-gray-500 hover:text-gray-800"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          )}
        </div>

        {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
      </div>
    );
  }
);

InputComp.displayName = "InputComp";
