import Link from "next/link";
import { motion } from "framer-motion";
import { MovieWithScreening } from "../../types/movie-with-screening";

export const FeaturedMoviedCard: React.FC<{ movie: MovieWithScreening }> = ({
  movie,
}) => {
  const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  const backdropUrl = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;

  return (
    <Link href={`/movies/${movie.id}?language=fr-FR`} passHref>
      <motion.div
        whileHover={{
          scale: 1.05,
        }}
        className="relative w-full overflow-hidden rounded-md h-80"
      >
        <div
          className="absolute inset-0 bg-center bg-cover rounded-md"
          style={{
            backgroundImage: `url('${backdropUrl}')`,
          }}
        />

        <div className="absolute inset-x-0 bottom-0 px-6 py-4 text-white bg-gradient-to-t from-black via-black to-transparent">
          <div className="flex flex-col gap-4">
            <div className="text-lg font-bold leading-tight line-clamp-2">
              {movie.title}
            </div>

            <div className="flex flex-col gap-4 md:flex-row md:items-end">
              <div
                className="flex-shrink-0 w-24 bg-center bg-cover rounded-md h-36"
                style={{
                  backgroundImage: `url('${posterUrl}')`,
                }}
              />

              <div className="flex flex-col items-start gap-4">
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 font-medium py-1 space-x-1 text-base rounded-lg bg-white/10 backdrop-blur-sm">
                    {new Date(movie.screening_date).toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short' })}
                  </span>
                  {movie.hours && (
                    <span className="px-2 font-medium py-1 space-x-1 text-base rounded-lg bg-blue-500/20 backdrop-blur-sm">
                      🕐 {movie.hours}
                    </span>
                  )}
                </div>

                <div className="flex flex-col items-start gap-2 overflow-hidden">
                  <div>
                    {Math.floor(movie.runtime /60)}h {movie.runtime % 60}m
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default FeaturedMoviedCard;
