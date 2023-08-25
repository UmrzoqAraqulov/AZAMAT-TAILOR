import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "./states/auth";
import LoginPage from "./pages/loginPage";
import AdminPage from "./pages/AdminPage";
import TailorPage from "./pages/tailorPage";
import HistoryPage from "./pages/historyPage";

const App = () => {
  const { isAuthenticated, user } = useAuth();
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? (
              user === "admin" ? (
                <Navigate to="/admin" />
              ) : (
                <Navigate to="/tailor" />
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/tailor" element={<TailorPage />} />
        <Route path="/history" element={<HistoryPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
