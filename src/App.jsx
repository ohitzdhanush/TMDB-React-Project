import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './Pages/Home';
import Upcoming from './Pages/Upcoming';

import Navbar from './UiLayout/Navbar/index';
import Footer from './UiLayout/Footer/index';
import Pagination from './Components/Pagination';

import {
  fetchPopularMovies,
  fetchUpcomingMovies
} from './Services';

const App = () => {
  const [data, setData] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchPopularMovies(currentPage)
      .then((res) => setData(res))
      .catch((err) => console.log(err));
  }, [currentPage]);

  useEffect(() => {
    fetchUpcomingMovies(currentPage)
      .then((res) => setUpcoming(res))
      .catch((err) => console.log(err));
  }, [currentPage]);

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

        <Navbar />

        <Routes>

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

        </Routes>

        <Footer />

      </div>
    </BrowserRouter>
  );
};

export default App;