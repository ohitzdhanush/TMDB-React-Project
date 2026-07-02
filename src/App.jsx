import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import Home from "./Pages/Home";
import Upcoming from "./Pages/Upcoming";
import PopularMovies from "./Pages/Popular";
import About from "./Pages/About";
import MovieDetails from "./Pages/MovieDetails";
import CastDetails from "./Pages/CastDetails";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import Profile from "./Pages/Profile";

import Navbar from "./UiLayout/Navbar";
import Footer from "./UiLayout/Footer";

import Pagination from "./Components/Pagination";
import ProtectedRoute from "./Components/ProtectedRoute";

import {
  fetchPopularMovies,
  fetchUpcomingMovies,
  fetchMoviesByLanguage,
  searchMovies,
} from "./Services/Index";

const AppContent = () => {
  const location = useLocation();

  const hideLayout =
    location.pathname === "/login" ||
    location.pathname === "/signup";

  const [data, setData] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [language, setLanguage] = useState("all");

  useEffect(() => {
    const loadMovies = async () => {
      try {
        if (language === "all") {
          const res = await fetchPopularMovies(currentPage);
          setData(res);
        } else {
          const res = await fetchMoviesByLanguage(language);
          setData(res);
        }
      } catch (err) {
        console.log(err);
      }
    };

    loadMovies();
  }, [currentPage, language]);

  useEffect(() => {
    fetchUpcomingMovies(currentPage)
      .then((res) => setUpcoming(res))
      .catch(console.log);
  }, [currentPage]);

  const handleSearch = async (query) => {
    if (!query.trim()) {
      if (language === "all") {
        const res = await fetchPopularMovies(currentPage);
        setData(res);
      } else {
        const res = await fetchMoviesByLanguage(language);
        setData(res);
      }
      return;
    }

    try {
      const result = await searchMovies(query);
      setData(result);
    } catch (err) {
      console.log(err);
    }
  };

  const handleNext = () => setCurrentPage((prev) => prev + 1);

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <>
      {!hideLayout && (
        <Navbar
          onSearch={handleSearch}
          language={language}
          setLanguage={setLanguage}
        />
      )}

      <Routes>

        {/* Default Route */}
        <Route
          path="/"
          element={
            localStorage.getItem("user")
              ? <Navigate to="/home" replace />
              : <Navigate to="/login" replace />
          }
        />

        {/* Login */}
        <Route
          path="/login"
          element={
            localStorage.getItem("user")
              ? <Navigate to="/home" replace />
              : <Login />
          }
        />

        {/* Signup */}
        <Route
          path="/signup"
          element={
            localStorage.getItem("user")
              ? <Navigate to="/home" replace />
              : <SignUp />
          }
        />

        {/* Home */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <>
                <Home data={data} />
                <Pagination
                  currentPage={currentPage}
                  handleNext={handleNext}
                  handlePrev={handlePrev}
                />
              </>
            </ProtectedRoute>
          }
        />

        {/* Popular */}
        <Route
          path="/popular"
          element={
            <ProtectedRoute>
              <>
                <PopularMovies data={data} />
                <Pagination
                  currentPage={currentPage}
                  handleNext={handleNext}
                  handlePrev={handlePrev}
                />
              </>
            </ProtectedRoute>
          }
        />

        {/* Upcoming */}
        <Route
          path="/upcoming"
          element={
            <ProtectedRoute>
              <>
                <Upcoming upcoming={upcoming} />
                <Pagination
                  currentPage={currentPage}
                  handleNext={handleNext}
                  handlePrev={handlePrev}
                />
              </>
            </ProtectedRoute>
          }
        />

        {/* Movie */}
        <Route
          path="/movie/:id"
          element={
            <ProtectedRoute>
              <MovieDetails />
            </ProtectedRoute>
          }
        />

        {/* Cast */}
        <Route
          path="/person/:id"
          element={
            <ProtectedRoute>
              <CastDetails />
            </ProtectedRoute>
          }
        />

        {/* About */}
        <Route
          path="/about"
          element={
            <ProtectedRoute>
              <About />
            </ProtectedRoute>
          }
        />

        {/* Profile */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

      </Routes>

      {!hideLayout && <Footer />}
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

export default App;