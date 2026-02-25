import Document, { Html, Head, Main, NextScript } from "next/document";

class MovieAppDocument extends Document {
  render() {
    return (
      <Html lang="fr">
        <Head>
          {/* Favicon */}
          <link rel="icon" href="/cinema/favicon.png" />

          {/* Load fonts */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />

          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
          />

          <link
            href="https://fonts.googleapis.com/css2?family=Futura+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&family=Monoton&display=swap"
            rel="stylesheet"
          />

          {/* PWA Manifest */}
          <link rel="manifest" href="/cinema/manifest.json" />
          <link rel="apple-touch-icon" href="/cinema/icon-192x192.png" />

          {/* PWA Meta Tags */}
          <meta name="application-name" content="Le Silverado" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="default" />
          <meta name="apple-mobile-web-app-title" content="Le Silverado" />
          <meta name="mobile-web-app-capable" content="yes" />
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MovieAppDocument;
