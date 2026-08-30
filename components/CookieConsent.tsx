"use client";

import { useState, useEffect } from "react";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem("tagit-cookies");
    if (!accepted) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem("tagit-cookies", "accepted");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] border-t border-tag-yellow/30 bg-black/95 p-4 backdrop-blur-xl sm:p-6">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-sm text-gray-300 text-center sm:text-left">
          We use cookies to improve your experience. By continuing you accept our use of cookies.
          Your files stay in your browser — we never upload them.
        </p>
        <button
          onClick={accept}
          className="shrink-0 rounded-full bg-gradient-to-r from-tag-yellow to-tag-yellow-light px-6 py-2.5 text-sm font-bold text-black"
        >
          Accept Cookies
        </button>
      </div>
    </div>
  );
}
