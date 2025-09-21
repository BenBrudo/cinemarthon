import Image from "next/image";
import Link from "next/link";

// Types
import type { NextPage } from "next";

// Hooks
import useHomeData from "../hooks/useHomeData";

// Components
import Heading from "../components/Heading";
import LinkText from "../components/LinkText";
import MovieCard from "../components/Card/Movie";
import PersonCard from "../components/Card/Person";
import LoaderCard from "../components/Card/Loader";
import FeaturedCard from "../components/Card/Featured";
import { SearchInput } from "./search";
import useHomeMovie from "../hooks/useHomeMovie";
import FeaturedMoviedCard from "../components/Card/FeaturedMovie";

const Home: NextPage = () => {
  const { data, loading, error } = useHomeData();
  const { movieData, movieLoading, movieError } = useHomeMovie('1364904', '1320414-the-witness', '1147205-ugolin', '1108782-le-sang-et-la-boue');

  return (
    <div className="relative px-6 space-y-10 md:px-0">

      <div className="space-y-24">
        <section className="space-y-6">
          <Heading>Programmation de la semaine</Heading>

          {error && (
            <p className="opacity-50">
              Something went wrong! Please try again later.
            </p>
          )}
          <div className="grid gap-6 md:grid-cols-4">
            {movieLoading || movieError ? (
              console.log(movieLoading),
              <LoaderCard count={4} type="card-large" />
            ) : (
              console.log(movieData),
              movieData?.map((item) => (
                console.log(item),
                <FeaturedMoviedCard key={item?.id} movie={item!} />
              ))
            )}
          </div>
        </section>

        <section
          className="flex flex-col items-start gap-6 p-16 text-white bg-center bg-cover rounded-md bg-brand-blue md:flex-row md:justify-between md:items-center"
          style={{
            backgroundImage: `url('/search-container-background.svg')`,
          }}
        >
          <div className="flex flex-col space-y-2">
            <h2 className="text-xl font-semibold">Recherche</h2>

            <p className="opacity-75">
              Rechercher votre film préféré, réalisateur ou acteur.
            </p>
          </div>

          <div className="w-full text-gray-100/40 md:w-3/6">
            <SearchInput />
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex items-center justify-between space-x-2">
            <Heading>Films tendances</Heading>
          </div>

          {error && (
            <p className="opacity-50">
              Something went wrong! Please try again later.
            </p>
          )}

          <div className="grid grid-cols-2 gap-4 md:grid-cols-6">
            {loading || error ? (
              <LoaderCard count={6} />
            ) : (
              data?.trending?.movie.map((item) => (
                <MovieCard key={item.id} movie={item} />
              ))
            )}
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex items-center justify-between space-x-2">
            <Heading>Séries à la mode</Heading>
          </div>

          {error && (
            <p className="opacity-50">
              Something went wrong! Please try again later.
            </p>
          )}

          <div className="grid grid-cols-2 gap-4 md:grid-cols-6">
            {loading || error ? (
              <LoaderCard count={6} />
            ) : (
              data?.trending?.tv.map((item) => (
                <MovieCard key={item.id} type="tv" movie={item} />
              ))
            )}
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex items-center justify-between space-x-2">
            <Heading>Acteurs à la cool</Heading>
          </div>

          {error && (
            <p className="opacity-50">
              Something went wrong! Please try again later.
            </p>
          )}

          <div className="grid grid-cols-2 gap-4 md:grid-cols-6">
            {loading || error ? (
              <LoaderCard count={6} />
            ) : (
              data?.trending?.person.map((item) => (
                <PersonCard key={item.id} person={item} />
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
