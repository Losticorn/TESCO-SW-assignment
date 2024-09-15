import { useState, useEffect } from "react";

export default function useUserLanguage() {
  const [language, setLanguage] = useState("");

  useEffect(() => {
    const browserLanguage = navigator.language || navigator.userLanguage;
    const adjustedLanguage = browserLanguage === "cs" ? "cz" : browserLanguage;
    setLanguage(adjustedLanguage);
  }, []);

  return language;
}
