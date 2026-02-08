/* 😻 github copilot */
export const getGenreEmoji = (genre: string): string => {
  switch (genre) {
    case "Action":
    case "Crime":
      return "🗡️";
    case "Action & Adventure":
      return "🗡️🗺️";
    case "Adventure":
    case "Aventure":
      return "🗺️";
    case "Animation":
      return "🎭";
    case "Adult":
      return "🔞";
    case "Sci-Fi":
    case "Science Fiction":
      return "🔬";
    case "Sci-Fi & Fantasy":
      return "🔬";
    case "Documentary":
    case "Documentaire":
      return "🎥";
    case "Comedy":
    case "Comédie":
      return "🤣";
    case "Drama":
    case "Drame":
      return "😢";
    case "Fantasy":
    case "Fantastique":
      return "🧙‍♂️";
    case "Historical":
    case "Histoire":
      return "🏛️";
    case "Horror":
    case "Horreur":
      return "🔪";
    case "Mystery":
    case "Mystère":  
      return "🕵️‍♀️";
    case "Romance":
    case "Romantique":
      return "💑";
    case "Thriller":
      return "😱";
    case "Western":
      return "🤠";
    default:
      return "🎬";
  }
};

export default getGenreEmoji;
