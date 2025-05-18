import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { themeSettings } from "./core/themes/theme";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import MainPage from "./pages/MainPage";
import NotAuthorized from "./pages/NotAuthorized";
import ProfilePage from "./pages/ProfilePage";
import RecommendationsPage from "./pages/RecommendationsPage";
import RecommendationDetailsPage from "./pages/RecommendationDetailsPage";

const App = () => {
  const isAuthenticated = useSelector((state) => state.accessToken) != null;
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<MainPage />}
          />
          <Route
            path="/login"
            element={<AuthPage />}
          />
          <Route
            path="/home"
            element={isAuthenticated ? <HomePage /> : <NotAuthorized />}
          />
          <Route
            path="/recommendations"
            element={
              isAuthenticated ? <RecommendationsPage /> : <NotAuthorized />
            }
          />
          <Route
            path="/profile"
            element={isAuthenticated ? <ProfilePage /> : <NotAuthorized />}
          />
          <Route
            path="/recommendations/:id"
            element={
              isAuthenticated ? (
                <RecommendationDetailsPage />
              ) : (
                <NotAuthorized />
              )
            }
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
