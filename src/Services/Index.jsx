import axios from 'axios';

const baseUrl = import.meta.env.VITE_BASE_URL;
const api_key = import.meta.env.VITE_TMDB_API_KEY;

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
// Languages
export async function fetchMoviesByLanguage(language) {
  const response = await axios.get(`${baseUrl}/discover/movie`,
    {
      params: {
        api_key,
        with_original_language: language,
      },
    }
  );
  return response.data.results;
}

export const fetchPersonDetails = async (id) => {
  const response = await axios.get(
    `${baseUrl}/person/${id}`,
    {
      params: {
        api_key,
      },
    }
  );

  return response.data;
};