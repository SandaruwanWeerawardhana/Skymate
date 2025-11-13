import React, { useState } from "react";
import { Mail, Lock, User, Eye, EyeOff, ArrowRight } from "lucide-react";

interface RegisterFormProps {
  onSubmit: (name: string, email: string, password: string) => void;
  onToggleForm?: () => void;
  isLoading?: boolean;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({
  onSubmit,
  onToggleForm,
  isLoading = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<{ confirmPassword?: string }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setErrors({ confirmPassword: "Passwords do not match" });
      return;
    }
    
    setErrors({});
    onSubmit(formData.name, formData.email, formData.password);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error when user starts typing
    if (e.target.name === "confirmPassword" && errors.confirmPassword) {
      setErrors({});
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="group">
        <label
          htmlFor="name"
          className="block text-white/80 text-sm font-medium mb-2"
        >
          Full Name
        </label>
        <div className="relative">
          <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40 group-focus-within:text-purple-400 transition-colors" />
          <input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-white placeholder-white/40 focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all"
            placeholder="Enter your name"
            required
            disabled={isLoading}
          />
        </div>
      </div>

      <div className="group">
        <label
          htmlFor="email"
          className="block text-white/80 text-sm font-medium mb-2"
        >
          Email Address
        </label>
        <div className="relative">
          <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40 group-focus-within:text-purple-400 transition-colors" />
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-white placeholder-white/40 focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all"
            placeholder="Enter your email"
            required
            disabled={isLoading}
          />
        </div>
      </div>

      <div className="group">
        <label
          htmlFor="password"
          className="block text-white/80 text-sm font-medium mb-2"
        >
          Password
        </label>
        <div className="relative">
          <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40 group-focus-within:text-purple-400 transition-colors" />
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-12 py-3.5 text-white placeholder-white/40 focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all"
            placeholder="Enter your password"
            required
            minLength={8}
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/40 hover:text-white/80 transition-colors"
            aria-label={showPassword ? "Hide password" : "Show password"}
            disabled={isLoading}
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      <div className="group">
        <label
          htmlFor="confirmPassword"
          className="block text-white/80 text-sm font-medium mb-2"
        >
          Confirm Password
        </label>
        <div className="relative">
          <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40 group-focus-within:text-purple-400 transition-colors" />
          <input
            id="confirmPassword"
            type={showPassword ? "text" : "password"}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={`w-full bg-white/5 border ${
              errors.confirmPassword
                ? "border-red-400"
                : "border-white/10"
            } rounded-xl pl-12 pr-4 py-3.5 text-white placeholder-white/40 focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all`}
            placeholder="Confirm your password"
            required
            disabled={isLoading}
          />
        </div>
        {errors.confirmPassword && (
          <p className="text-red-400 text-xs mt-1">{errors.confirmPassword}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="group w-full bg-linear-to-r from-purple-500 to-pink-500 text-white font-semibold py-3.5 rounded-xl hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? "Creating Account..." : "Create Account"}
        {!isLoading && (
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        )}
      </button>

      {onToggleForm && (
        <div className="text-center mt-6">
          <p className="text-white/60 text-sm">
            Already have an account?{" "}
            <button
              type="button"
              onClick={onToggleForm}
              className="text-purple-400 hover:text-purple-300 font-semibold transition-colors"
              disabled={isLoading}
            >
              Sign in
            </button>
          </p>
        </div>
      )}
    </form>
  );
};

export default RegisterForm;
