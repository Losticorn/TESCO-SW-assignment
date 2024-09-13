import { useState, useEffect } from "react";

export default function useUserLanguage() {
  const [language, setLanguage] = useState({});

  useEffect(() => {
    const browserLanguage = navigator.language || navigator.userLanguage;
    setLanguage(browserLanguage);
  }, []);

  return language;
}
