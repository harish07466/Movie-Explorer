// src/App.jsx
import { Routes, Route } from "react-router-dom";
import LoginPage from "./Pages/LoginPage.jsx";
import MoviesPage from "./Pages/MoviesPage.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />

      {/* Protected /movies route */}
      <Route
        path="/movies"
        element={
          <ProtectedRoute>
            <MoviesPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
