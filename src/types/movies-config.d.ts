export interface MovieConfig {
  id: string;
  screening_date: string;
  hours?: string;
}

export interface MoviesData {
  movies: MovieConfig[];
}