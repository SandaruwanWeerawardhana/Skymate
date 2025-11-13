import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";

interface LoginFormProps {
  onSubmit: (email: string, password: string) => void;
  onToggleForm?: () => void;
  isLoading?: boolean;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  onSubmit,
  onToggleForm,
  isLoading = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData.email, formData.password);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
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

     

      <button
        type="submit"
        disabled={isLoading}
        className="group w-full bg-linear-to-r from-purple-500 to-pink-500 text-white font-semibold py-3.5 rounded-xl hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? "Signing In..." : "Sign In"}
        {!isLoading && (
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        )}
      </button>

      {onToggleForm && (
        <div className="text-center mt-6">
          <p className="text-white/60 text-sm">
            Don't have an account?{" "}
            <button
              type="button"
              onClick={onToggleForm}
              className="text-purple-400 hover:text-purple-300 font-semibold transition-colors"
              disabled={isLoading}
            >
              Sign up
            </button>
          </p>
        </div>
      )}
    </form>
  );
};

export default LoginForm;
