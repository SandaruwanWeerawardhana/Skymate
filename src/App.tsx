import { useAuth0 } from '@auth0/auth0-react';
import WeatherDashboard from './pages/WeatherDashboard';
import RequireAuth from './components/auth/RequireAuth';

function App() {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-16 w-16 animate-spin rounded-full border-4 border-solid border-purple-500 border-r-transparent"></div>
          <p className="mt-6 text-white/80 text-xl">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <RequireAuth>
      <WeatherDashboard />
    </RequireAuth>
  );
}

export default App;
