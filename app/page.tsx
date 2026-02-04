'use client';

import { ThemeToggle } from './components/theme-toggle';

export default function ComingSoon() {
  return (
    <main className="relative min-h-screen bg-[--color-background] overflow-hidden flex items-center justify-center transition-colors duration-500">
      <ThemeToggle />

      {/* Animated background gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-[--color-gradient-orb-1] via-transparent to-transparent rounded-full blur-3xl animate-pulse-glow" />
        <div
          className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-[--color-gradient-orb-2] via-transparent to-transparent rounded-full blur-3xl animate-pulse-glow"
          style={{ animationDelay: '1.5s' }}
        />
      </div>

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(var(--color-border) 1px, transparent 1px),
                           linear-gradient(90deg, var(--color-border) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-2xl mx-auto">
        {/* Logo/Brand */}
        <div className="animate-fade-in-up mb-6">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight flex justify-center">
            <span className="animate-breathe-out text-[--color-text] transition-colors duration-500">
              Modern
            </span>
            <span className="animate-breathe-in text-[--color-accent] transition-colors duration-500">
              Moto
            </span>
          </h1>
        </div>

        {/* Tagline */}
        <p className="animate-fade-in-up-delay-1 text-[--color-text-muted] text-lg md:text-xl mb-6 font-light transition-colors duration-500">
          The fantasy motocross experience
        </p>

        {/* Coming Soon */}
        <h2 className="animate-fade-in-up-delay-2 text-3xl md:text-4xl font-semibold text-[--color-text] tracking-wide uppercase mb-12 transition-colors duration-500">
          Coming Soon
        </h2>

        {/* Rotating phrases */}
        <div className="animate-fade-in-up-delay-3 h-16 md:h-20 relative mb-12">
          <p className="absolute inset-0 flex items-center justify-center text-[--color-text-muted] text-lg md:text-xl animate-phrase-1 transition-colors duration-500">
            Build your dream team.
          </p>
          <p className="absolute inset-0 flex items-center justify-center text-[--color-text-muted] text-lg md:text-xl animate-phrase-2 transition-colors duration-500">
            Compete with friends.
          </p>
          <p className="absolute inset-0 flex items-center justify-center text-[--color-text-muted] text-lg md:text-xl animate-phrase-3 transition-colors duration-500">
            Track every lap, every race, every championship.
          </p>
        </div>

        {/* Email signup */}
        <div className="animate-fade-in-up-delay-3">
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg bg-[--color-input-bg] border border-[--color-border] text-[--color-text] placeholder-[--color-text-subtle] focus:outline-none focus:border-[--color-accent]/50 focus:bg-[--color-input-bg] transition-all duration-300"
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-[--color-accent] to-[--color-accent-light] text-white font-medium hover:opacity-90 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-lg"
              style={{ boxShadow: '0 10px 25px -5px var(--color-accent-glow)' }}
            >
              Notify Me
            </button>
          </form>
          <p className="text-[--color-text-subtle] text-xs mt-3 transition-colors duration-500">
            Be the first to know when we launch.
          </p>
        </div>
      </div>

      {/* Animated lines decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[--color-accent]/50 to-transparent" />

      {/* Corner accents */}
      <svg className="absolute top-8 left-8 w-16 h-16 text-[--color-border]" viewBox="0 0 64 64" fill="none">
        <path d="M0 32 L0 0 L32 0" stroke="currentColor" strokeWidth="1" className="animate-line-draw" />
      </svg>
      <svg className="absolute bottom-8 right-8 w-16 h-16 text-[--color-border]" viewBox="0 0 64 64" fill="none">
        <path d="M64 32 L64 64 L32 64" stroke="currentColor" strokeWidth="1" className="animate-line-draw" style={{ animationDelay: '0.5s' }} />
      </svg>
    </main>
  );
}
