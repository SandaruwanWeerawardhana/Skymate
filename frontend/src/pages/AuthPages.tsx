import { useAuth0 } from "@auth0/auth0-react";
import { Lock } from "lucide-react";
import LoginButton from "@/components/auth/LoginButton";

export default function AuthPages() {
  const { isLoading } = useAuth0();

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
              Welcome to Weather App
            </h1>
            <p className="text-white/60 text-sm">
              Sign in with Auth0 to access real-time weather data
            </p>
          </div>

          {/* Auth0 Login */}
          <LoginButton />
          
          <div className="text-center mt-6">
            <p className="text-white/60 text-xs">
              Secure authentication powered by Auth0
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
