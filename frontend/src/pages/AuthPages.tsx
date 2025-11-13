import { useState } from "react";
import { Lock } from "lucide-react";
import LoginForm from "@/components/LoginForm";
import RegisterForm from "@/components/RegisterForm";

export default function AuthPages() {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      console.log("Login submitted:", { email, password });
      // TODO: Implement actual login logic
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (
    name: string,
    email: string,
    password: string
  ) => {
    setIsLoading(true);
    try {
      console.log("Register submitted:", { name, email, password });
      // TODO: Implement actual registration logic
    } catch (error) {
      console.error("Register error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Auth card */}
      <div className="relative w-full max-w-md">
        <div className="absolute inset-0 bg-linear-to-r from-purple-500/20 to-pink-500/20 rounded-4xl blur-xl" />

        <div className="relative backdrop-blur-2xl bg-white/10 rounded-4xl border border-white/20 p-8 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-linear-to-br from-purple-500 to-pink-500 mb-4 shadow-lg">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">
              {isLogin ? "Welcome Back" : "Create Account"}
            </h1>
            <p className="text-white/60 text-sm">
              {isLogin
                ? "Sign in to continue to your account"
                : "Sign up to get started"}
            </p>
          </div>

          {/* Form */}
          {isLogin ? (
            <LoginForm
              onSubmit={handleLogin}
              onToggleForm={() => setIsLogin(false)}
              isLoading={isLoading}
            />
          ) : (
            <RegisterForm
              onSubmit={handleRegister}
              onToggleForm={() => setIsLogin(true)}
              isLoading={isLoading}
            />
          )}
        </div>
      </div>
    </div>
  );
}
