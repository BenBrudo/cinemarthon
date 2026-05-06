export interface MovieConfig {
  id: string;
  screening_date: string;
  hours?: string;
  titre?: string;
}

export interface MoviesData {
  movies: MovieConfig[];
}