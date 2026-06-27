import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Upcoming from "./Pages/Upcoming";
import PopularMovies from "./Pages/Popular";
import About from "./Pages/About";
import MovieDetails from "./Pages/MovieDetails";
import Navbar from "./UiLayout/Navbar";
import Footer from "./UiLayout/Footer";
import Pagination from "./Components/Pagination";
import CastDetails from "./Pages/CastDetails";

import {fetchPopularMovies,fetchUpcomingMovies,fetchMoviesByLanguage,searchMovies,fetchMovieCast} from "./Services/Index";

const App = () => {
  const [data, setData] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [language, setLanguage] = useState("all");

  // Popular Movies / Language Filter
  useEffect(() => {
    if (language === "all") {
      fetchPopularMovies(currentPage)
        .then((res) => setData(res))
        .catch((err) => console.log(err));
    } else {
      fetchMoviesByLanguage(language)
        .then((res) => setData(res))
        .catch((err) => console.log(err));
    }
  }, [currentPage, language]);

  // Upcoming Movies
  useEffect(() => {
    fetchUpcomingMovies(currentPage)
      .then((res) => setUpcoming(res))
      .catch((err) => console.log(err));
  }, [currentPage]);

  // Search
  const handleSearch = async (query) => {
    if (!query.trim()) {
      if (language === "all") {
        fetchPopularMovies(currentPage).then((res) => setData(res));
      } else {
        fetchMoviesByLanguage(language).then((res) => setData(res));
      }
      return;
    }

    try {
      const result = await searchMovies(query);
      setData(result);
    } catch (error) {
      console.log(error);
    }
  };

  // Pagination
  const handleNext = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar
          onSearch={handleSearch}
          language={language}
          setLanguage={setLanguage}
        />
        <Routes>
          {/* Home */}
          <Route
            path="/"
            element={
              <>
                <Home data={data} />

                <Pagination
                  currentPage={currentPage}
                  handleNext={handleNext}
                  handlePrev={handlePrev}
                />
              </>
            }
          />
          {/* Popular */}
          <Route
            path="/popular"
            element={
              <>
                <PopularMovies data={data} />
                <Pagination
                  currentPage={currentPage}
                  handleNext={handleNext}
                  handlePrev={handlePrev}
                />
              </>
            }
          />
          <Route
  path="/person/:id"
  element={<CastDetails />}
/>
          {/* Upcoming */}
          <Route
            path="/upcoming"
            element={
              <>
                <Upcoming upcoming={upcoming} />
                <Pagination
                  currentPage={currentPage}
                  handleNext={handleNext}
                  handlePrev={handlePrev}
                />
              </>
            }
          />
          {/* About */}
          <Route
            path="/about"
            element={<About />}
          />
          {/* Movie Details */}
          <Route
            path="/movie/:id"
            element={<MovieDetails />}
          />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
};
export default App;