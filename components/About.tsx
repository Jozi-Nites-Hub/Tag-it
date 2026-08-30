"use client";

import { useState } from "react";

export default function About() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For now just show success (no backend yet)
    console.log({ name, email, message });
    setSubmitted(true);
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <section id="about" className="mx-auto max-w-4xl px-6 py-20">
      <div className="rounded-2xl border border-tag-yellow/20 bg-tag-surface/80 p-8 backdrop-blur-xl sm:p-12">
        <h2 className="text-3xl font-black sm:text-4xl">
          What is <span className="text-tag-yellow">TAGit</span>?
        </h2>

        <div className="mt-6 space-y-4 text-gray-300 leading-relaxed">
          <p>
            <strong className="text-white">TAGit</strong> is a free, browser-based watermark studio.
          </p>
          <p>
            Upload your logo + any image, choose a position, tweak size / opacity / rotation,
            and download the tagged version — ready to post.
          </p>
          <p>
            It’s never been easier to watermark or tag your content before you share it.
          </p>
          <p className="text-tag-yellow font-medium">
            100% Free · No sign-up · Files stay in your browser
          </p>
        </div>

        {/* Comment / Feedback Form */}
        <div className="mt-12 border-t border-white/10 pt-10">
          <h3 className="text-xl font-bold text-white">Leave a comment</h3>
          <p className="mt-1 text-sm text-gray-400">
            Feedback, ideas or just say hi — we’d love to hear from you.
          </p>

          {submitted ? (
            <div className="mt-6 rounded-xl border border-tag-green/40 bg-tag-green/10 px-5 py-4 text-tag-green">
              ✓ Thanks! Your message has been received.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder-gray-500 outline-none focus:border-tag-yellow"
                />
                <input
                  type="email"
                  placeholder="Email (optional)"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder-gray-500 outline-none focus:border-tag-yellow"
                />
              </div>
              <textarea
                placeholder="Your comment or feedback..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                rows={4}
                className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder-gray-500 outline-none focus:border-tag-yellow resize-none"
              />
              <button
                type="submit"
                className="rounded-full bg-gradient-to-r from-tag-yellow to-tag-yellow-light px-8 py-3 text-sm font-bold text-black shadow-lg shadow-tag-yellow/20 transition-transform hover:-translate-y-0.5"
              >
                Send Comment
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
