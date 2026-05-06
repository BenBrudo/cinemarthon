import Head from "next/head";
import Router from "next/router";
import { useEffect } from "react";

// NProgress
import NProgress from "nprogress";
import "nprogress/nprogress.css";

// Import global CSS
import "../styles/tailwind.css";
import "react-tippy/dist/tippy.css";

// Types
import type { AppProps } from "next/app";

// Components
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Meta
const meta = {
  title: "Le Silverado - Cinéma Art et Essai",
  description: "Le Silverado : cinéma art et essai proposant le Cinémarthon, des films pour jeune public et programmation École et Cinéma. Découvrez notre sélection de films de qualité.",
  keywords: "cinéma, marthon, cinémarthon, silverado, art et essai, jeune public, école et cinéma, films, programmation",
};

// NProgress settings and events
NProgress.configure({
  showSpinner: true,
  parent: "body",
});

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done(true));
Router.events.on("routeChangeError", () => NProgress.done(true));

function MovieApp({ Component, pageProps }: AppProps) {
  // Register Service Worker for PWA
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('Service Worker enregistré avec succès:', registration.scope);
        })
        .catch((error) => {
          console.log('Échec de l\'enregistrement du Service Worker:', error);
        });
    }
  }, []);

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="description" content={meta.description} />
        <meta name="keywords" content={meta.keywords} />
        <meta name="theme-color" content="#1D556F" />
        <link rel="icon" href="/favicon.png" />

        {/* Open-Graph */}
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="fr_FR" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
      </Head>

      <div className="min-h-screen bg-white/90 backdrop-blur-md flex flex-col">
        <Navbar />

        <div className="container py-10 mx-auto flex-grow">
          <Component {...pageProps} />
        </div>

        <Footer />
      </div>
    </>
  );
}

export default MovieApp;
