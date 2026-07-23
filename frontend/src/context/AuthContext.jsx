import {
  createContext,
  useEffect,
  useState,
} from "react";

export const AuthContext = createContext();

function getStoredUser() {
  try {
    const storedUser =
      localStorage.getItem("user");

    return storedUser
      ? JSON.parse(storedUser)
      : null;
  } catch (error) {
    console.error(
      "Could not read stored user:",
      error
    );

    localStorage.removeItem("user");

    return null;
  }
}

export default function AuthProvider({
  children,
}) {
  const [user, setUser] = useState(
    getStoredUser
  );

  const [token, setToken] = useState(
    localStorage.getItem("token")
  );

  const [authLoading, setAuthLoading] =
    useState(true);

  useEffect(() => {
    if (!token || !user) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      setToken(null);
      setUser(null);
    }

    setAuthLoading(false);
  }, []);

  const login = (userData, userToken) => {
    localStorage.setItem(
      "user",
      JSON.stringify(userData)
    );

    localStorage.setItem(
      "token",
      userToken
    );

    setUser(userData);
    setToken(userToken);
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        authLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}