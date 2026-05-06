import type { MovieInfo } from './movie-info';

export type MovieWithScreening = MovieInfo & {
  screening_date?: string;
  hours?: string;
  titre?: string;
}

export interface MovieWithScreening extends MovieInfo {
  screening_date: string;
}