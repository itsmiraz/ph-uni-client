import RootLayout from "./components/layouts/RootLayout";
import ProtectedRoute from "./routes/ProtectedRoute.routes";

function App() {
  return (
    <ProtectedRoute role={undefined}>
      <RootLayout />
    </ProtectedRoute>
  );
}

export default App;
