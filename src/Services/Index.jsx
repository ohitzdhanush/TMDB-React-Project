import axios from 'axios';

const baseUrl = 'https://api.themoviedb.org/3';
const api_key = '999eb2f1492df5dbc3ccd2cb20aebd39';

// Popular Movies
export async function fetchPopularMovies(page = 1) {
  const response = await axios.get(`${baseUrl}/movie/popular`, {
    params: {
      api_key,
      page,
    },
  });

  return response.data.results;
}

// Upcoming Movies
export async function fetchUpcomingMovies(page = 1) {
  const response = await axios.get(`${baseUrl}/movie/upcoming`, {
    params: {
      api_key,
      page,
    },
  });

  return response.data.results;
}

// Search Movies
export async function searchMovies(query, page = 1) {
  const response = await axios.get(`${baseUrl}/search/movie`, {
    params: {
      api_key,
      query,
      page,
    },
  });

  return response.data.results;
}

// Movie Details
export async function fetchMovieDetails(id) {
  const response = await axios.get(`${baseUrl}/movie/${id}`,
    {
      params: {
        api_key,
      },
    }
  );

  return response.data;
}

//Movie Trailer
export async function fetchMovieTrailer(id) {
  const response = await axios.get(`${baseUrl}/movie/${id}/videos`,
    {
      params: {
        api_key,
      },
    }
  );
  return response.data.results;
}
//Movie Cast
export async function fetchMovieCast(id) {
  const response = await axios.get(`${baseUrl}/movie/${id}/credits`,
    {
      params: {
        api_key,
      },
    }
  );
  return response.data.cast;
}
