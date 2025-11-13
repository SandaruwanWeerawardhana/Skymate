import WeatherDashboard from "./pages/WeatherDashboard";
import ProtectedRoute from "./components/auth/ProtectedRoute";

function App() {
  return (
    <ProtectedRoute>
      <WeatherDashboard />
    </ProtectedRoute>
  );
}

export default App;
