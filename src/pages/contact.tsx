// Types
import type { NextPage } from "next";
import { useState, FormEvent } from "react";
import Image from "next/image";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const Contact: NextPage = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<{
    type: "success" | "error" | "loading" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus({ type: "loading", message: "Envoi en cours..." });

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({
          type: "success",
          message: "Message envoyé avec succès ! Nous vous répondrons bientôt.",
        });
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus({
          type: "error",
          message: data.error || "Une erreur est survenue. Veuillez réessayer.",
        });
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi:", error);
      setStatus({
        type: "error",
        message: "Erreur de connexion. Veuillez réessayer plus tard.",
      });
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <div className="absolute inset-0 shadow-md bg-gradient-to-r from-brand-dark-blue to-brand-blue h-40 md:h-60 -z-10" />

      <div className="px-4 md:px-8 lg:px-12 space-y-8">
        <div className="py-4 md:py-6">
          <h1 className="text-2xl md:text-4xl font-semibold text-white text-center md:text-left">
            Nous Contacter
          </h1>
        </div>

        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6 md:p-8">
          {/* Avertissement travaux */}
          <div className="mb-8 p-6 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-semibold text-yellow-800">
                  Formulaire en cours de configuration
                </h3>
                <p className="mt-2 text-yellow-700">
                  Le formulaire de contact est temporairement désactivé. 
                  En attendant, vous pouvez nous contacter directement par email.
                </p>
              </div>
            </div>
          </div>

          {/* Contact direct */}
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Contactez-nous par email
            </h2>
            <p className="text-gray-600 mb-6">
              Pour toute question ou suggestion, n&apos;hésitez pas à nous écrire.
            </p>
            <a
              href="mailto:cinemarthon@gmail.com?subject=Contact depuis Le Silverado"
              title="Envoyer un email à cinemarthon@gmail.com"
              className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white text-lg font-medium rounded-lg transition-colors shadow-md hover:shadow-lg"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              cinemarthon@gmail.com
            </a>
          </div>

          {/* Formulaire désactivé */}
          <div className="opacity-50 pointer-events-none">
            <div className="border-t border-gray-200 pt-6 mt-6">
              <h3 className="text-lg font-medium text-gray-500 mb-4">
                Formulaire de contact (bientôt disponible)
              </h3>
            </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Nom *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  placeholder="Votre nom"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  placeholder="votre@email.com"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="subject"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Sujet *
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                required
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                placeholder="Objet de votre message"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                required
                value={formData.message}
                onChange={handleChange}
                rows={6}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none"
                placeholder="Votre message..."
              />
            </div>

            {status.type && (
              <div
                className={`p-4 rounded-md ${
                  (() => {
                    if (status.type === "success") {
                      return "bg-green-50 text-green-800 border border-green-200";
                    }
                    if (status.type === "loading") {
                      return "bg-blue-50 text-blue-800 border border-blue-200";
                    }
                    return "bg-red-50 text-red-800 border border-red-200";
                  })()
                }`}
              >
                {status.message}
              </div>
            )}

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={status.type === "loading"}
                className={`px-6 py-3 rounded-md font-medium transition-colors ${
                  status.type === "loading"
                    ? "bg-gray-400 cursor-not-allowed text-white"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
              >
                {status.type === "loading" ? "Envoi..." : "Envoyer le message"}
              </button>
            </div>
          </form>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Informations de contact
            </h3>
            <div className="space-y-2 text-gray-600">
              <p className="flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <strong>Email :</strong>{" "}
                <a
                  href="mailto:cinemarthon@gmail.com"
                  className="text-blue-600 hover:underline"
                >
                  cinemarthon@gmail.com
                </a>
              </p>
              <p className="flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <strong>Cinéma :</strong> Le Silverado
              </p>
            </div>
          </div>

          {/* Carte de localisation */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
              Comment nous trouver ?
            </h3>
            <div className="flex justify-center">
              <a
                href="https://maps.app.goo.gl/pwg3nZeo8JGxQqsU8"
                target="_blank"
                rel="noopener noreferrer"
                title="Ouvrir dans Google Maps"
                className="block rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
              >
                <Image
                  src="./cinema-map.png"
                  alt="Carte de localisation du Cinéma Le Silverado - Cliquez pour ouvrir Google Maps"
                  width={600}
                  height={450}
                  className="hover:opacity-90 transition-opacity duration-300"
                  unoptimized
                />
              </a>
            </div>
            <p className="text-center text-gray-600 mt-3 text-sm">
              Cliquez sur la carte pour ouvrir dans Google Maps
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
