"use client";

import { ThemeToggle } from "./components/theme-toggle";

export default function ComingSoon() {
  return (
    <main className="relative min-h-screen bg-background overflow-hidden flex items-center justify-center transition-colors duration-500">
      <ThemeToggle />

      {/* Animated background gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-linear-to-br from-orb-1 via-transparent to-transparent rounded-full blur-3xl animate-pulse-glow" />
        <div
          className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-linear-to-tl from-orb-2 via-transparent to-transparent rounded-full blur-3xl animate-pulse-glow"
          style={{ animationDelay: "1.5s" }}
        />
      </div>

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(var(--border) 1px, transparent 1px),
                           linear-gradient(90deg, var(--border) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-2xl mx-auto">
        {/* Logo/Brand */}
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-2">
            <div className="animate-fade-in-up">
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight flex justify-center">
                <span className="animate-breathe-in text-foreground transition-colors duration-500">
                  Modern
                </span>
                <span className="delay-250 animate-breathe-out text-primary transition-colors duration-500">
                  Moto
                </span>
              </h1>
            </div>

            {/* Tagline */}
            <p className="animate-fade-in-up-delay-1 text-foreground-muted text-lg md:text-xl mb-6 font-light transition-colors duration-500">
              The fantasy motocross experience
            </p>
          </div>

          {/* Coming Soon */}
          <h2 className="animate-fade-in-up-delay-2 text-primary text-3xl md:text-4xl font-semibold tracking-wide uppercase transition-colors duration-500">
            Coming Soon
          </h2>
        </div>

        {/* Rotating phrases */}
        <div className="animate-fade-in-up-delay-3 h-16 md:h-20 relative mb-12">
          <p className="absolute inset-0 flex items-center justify-center text-foreground-muted text-lg md:text-xl animate-phrase-1 transition-colors duration-500">
            Build your dream team.
          </p>
          <p className="absolute inset-0 flex items-center justify-center text-foreground-muted text-lg md:text-xl animate-phrase-2 transition-colors duration-500">
            Compete with friends.
          </p>
          <p className="absolute inset-0 flex items-center justify-center text-foreground-muted text-lg md:text-xl animate-phrase-3 transition-colors duration-500">
            Track every lap
          </p>
          <p className="absolute inset-0 flex items-center justify-center text-foreground-muted text-lg md:text-xl animate-phrase-4 transition-colors duration-500">
            Study every race
          </p>
          <p className="absolute inset-0 flex items-center justify-center text-foreground-muted text-lg md:text-xl animate-phrase-5 transition-colors duration-500">
            Earn every championship
          </p>
        </div>

        {/* Email signup */}
        <div className="animate-fade-in-up-delay-3">
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg bg-input border border-border text-foreground placeholder-foreground-subtle focus:outline-none focus:border-primary/50 transition-all duration-300"
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-lg bg-linear-to-r from-primary to-primary-light text-white font-medium hover:opacity-90 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-lg shadow-primary-glow"
            >
              Notify Me
            </button>
          </form>
          <p className="text-foreground-subtle text-xs mt-3 transition-colors duration-500">
            Be the first to know when we launch.
          </p>
        </div>
      </div>

      {/* Animated lines decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-primary/50 to-transparent" />
    </main>
  );
}
