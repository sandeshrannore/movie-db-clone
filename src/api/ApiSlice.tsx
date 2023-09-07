import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

interface MovieResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

const authToken =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZjA4N2ExZTViMDFjMWYwMGIyZWVhOTRkYjYwZWFjOCIsInN1YiI6IjVmYTUyOGY1MWI3Mjk0MDAzZThlZTc3NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-BiBuT7uQtwaS1mgkqu4SyOIv-qDQ0eXtmmguQpVrok";

export const dataApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.themoviedb.org/3",
    prepareHeaders: (headers) => {
      // Add your authentication header here
      headers.set("Authorization", authToken);
      // Add the accept header here
      headers.set("accept", "application/json");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getPopularMovies: builder.query<MovieResponse, void>({
      query: () => "movie/popular?language=en-US&page=1",
    }),
    getTrendingMovies: builder.query<MovieResponse, void>({
      query: () => "trending/movie/day?language=en-US",
    }),

    searchMoviesByTitle: builder.query<MovieResponse, string>({
      query: (title) =>
        `search/movie?query=${encodeURIComponent(title)}&language=en-US&page=1`,
    }),
  }),
});

export const {
  useGetPopularMoviesQuery,
  useSearchMoviesByTitleQuery,
  useGetTrendingMoviesQuery,
} = dataApi;
