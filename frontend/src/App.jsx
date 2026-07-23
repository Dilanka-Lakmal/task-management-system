import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";

import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route
            path="/"
            element={<Login />}
          />

          <Route
            path="/register"
            element={<Register />}
          />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route
            path="/dashboard"
            element={<Dashboard />}
          />
        </Route>

        <Route
          path="*"
          element={
            <Navigate
              to="/"
              replace
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;