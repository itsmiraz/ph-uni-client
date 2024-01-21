import RootLayout from "./components/layouts/RootLayout";
import ProtectedRoute from "./routes/ProtectedRoute.routes";

function App() {
  return (
    <ProtectedRoute>
      <RootLayout />
    </ProtectedRoute>
  );
}

export default App;
