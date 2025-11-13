import { useAuth0 } from "@auth0/auth0-react";
import { ArrowRight } from "lucide-react";

export const LoginButton = () => {
  const { loginWithRedirect, isLoading } = useAuth0();

  const handleLogin = () => {
    loginWithRedirect({
      appState: {
        returnTo: "/dashboard",
      },
    });
  };

  return (
    <button
      onClick={handleLogin}
      disabled={isLoading}
      className="group w-full bg-linear-to-r from-purple-500 to-pink-500 text-white font-semibold py-3.5 rounded-xl hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isLoading ? "Loading..." : "Sign In with Auth0"}
      {!isLoading && (
        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
      )}
    </button>
  );
};

export default LoginButton;
