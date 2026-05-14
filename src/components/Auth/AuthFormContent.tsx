import { Link } from "react-router-dom";

type Props = {
  // Form state
  email: string;
  password: string;
  error: string | null;
  loading: boolean;
  // Handlers
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onGoogleLogin: () => void;
  // Optional display name field (Sign Up only)
  displayName?: string;
  onDisplayNameChange?: (value: string) => void;
  // Text configuration
  title: string;
  subtitle: string;
  buttonLabel: string;
  footerText: string;
  footerLinkLabel: string;
  footerLinkHref: string;
};

export default function AuthFormContent({
  email,
  password,
  error,
  loading,
  onEmailChange,
  onPasswordChange,
  onSubmit,
  onGoogleLogin,
  displayName,
  onDisplayNameChange,
  title,
  subtitle,
  buttonLabel,
  footerText,
  footerLinkLabel,
  footerLinkHref,
}: Props) {
  return (
    <>
      {/* Page */}
      <main className="flex-1 flex items-center justify-center px-6 py-12 relative overflow-hidden">

        {/* Ambient glow centered behind the card */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 pointer-events-none z-0"
          style={{ background: "radial-gradient(circle, rgba(0,255,148,0.04) 0%, rgba(19,19,24,0) 70%)" }}
        />

        {/* Auth card */}
        <div className="relative z-10 w-full max-w-110">
          <div className="bg-surface-container-low p-10 md:p-12 shadow-2xl backdrop-blur-sm">

            {/* Header */}
            <header className="mb-10 text-center">
              <h1 className="font-headline text-3xl font-black text-on-background mb-2 tracking-[-0.02em]">
                {title}
              </h1>
              <p className="font-body text-on-surface-variant text-sm font-medium">
                {subtitle}
              </p>
            </header>

            {/* Email / password form */}
            <form className="space-y-6" onSubmit={onSubmit}>

              {/* Display name field (Sign Up only) */}
              {onDisplayNameChange && (
                <div className="space-y-1.5">
                  <label
                    className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant font-bold px-1"
                    htmlFor="displayName"
                  >
                    Display name
                  </label>
                  <div className="focus-within:shadow-[0_0_20px_rgba(0,255,148,0.05)] transition-all">
                    <input
                      className="w-full bg-surface-container text-on-surface placeholder:text-outline-variant py-4 px-5 focus:ring-1 focus:ring-primary-container focus:outline-none transition-all font-body text-sm"
                      id="displayName"
                      placeholder="Summoner name"
                      type="text"
                      value={displayName ?? ""}
                      onChange={(e) => onDisplayNameChange(e.target.value)}
                    />
                  </div>
                </div>
              )}

              {/* Email field */}
              <div className="space-y-1.5">
                <label
                  className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant font-bold px-1"
                  htmlFor="email"
                >
                  Email address
                </label>
                <div className="focus-within:shadow-[0_0_20px_rgba(0,255,148,0.05)] transition-all">
                  <input
                    className="w-full bg-surface-container text-on-surface placeholder:text-outline-variant py-4 px-5 focus:ring-1 focus:ring-primary-container focus:outline-none transition-all font-body text-sm"
                    id="email"
                    placeholder="summoner@riftly.com"
                    type="email"
                    value={email}
                    onChange={(e) => onEmailChange(e.target.value)}
                  />
                </div>
              </div>

              {/* Password field */}
              <div className="space-y-1.5">
                <label
                  className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant font-bold px-1"
                  htmlFor="password"
                >
                  Password
                </label>
                <div className="focus-within:shadow-[0_0_20px_rgba(0,255,148,0.05)] transition-all">
                  <input
                    className="w-full bg-surface-container text-on-surface placeholder:text-outline-variant py-4 px-5 focus:ring-1 focus:ring-primary-container focus:outline-none transition-all font-body text-sm"
                    id="password"
                    placeholder="••••••••••••"
                    type="password"
                    value={password}
                    onChange={(e) => onPasswordChange(e.target.value)}
                  />
                </div>
              </div>

              {/* Error message */}
              {error && (
                <p className="text-error text-xs font-body text-center">{error}</p>
              )}

              {/* Submit button */}
              <button
                className="group relative w-full bg-primary-container text-on-primary-container font-headline font-bold py-4 text-sm tracking-widest uppercase flex items-center justify-center transition-all duration-150 active:scale-95 overflow-hidden cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                type="submit"
                disabled={loading}
              >
                <span className="relative z-10">
                  {loading ? "LOADING..." : buttonLabel}
                </span>
                {/* Hover effect — white slide up */}
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </button>

            </form>

            {/* External Auth divider */}
            <div className="relative my-8 flex items-center">
              <div className="grow border-t border-outline-variant/30" />
              <span className="shrink mx-4 font-label text-[10px] uppercase tracking-[0.2em] text-outline-variant">
                External Auth
              </span>
              <div className="grow border-t border-outline-variant/30" />
            </div>

            {/* Google OAuth button */}
            <button
              className="w-full border border-outline-variant bg-transparent text-on-surface font-body font-semibold py-4 text-sm flex items-center justify-center gap-3 hover:bg-surface-container transition-all duration-300 group cursor-pointer"
              type="button"
              onClick={onGoogleLogin}
            >
              <svg className="w-5 h-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="currentColor" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="currentColor" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="currentColor" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="currentColor" />
              </svg>
              <span>Continue with Google</span>
            </button>

            {/* Footer link (login ↔ signup) */}
            <footer className="mt-10 text-center">
              <p className="font-body text-sm text-on-surface-variant">
                {footerText}{" "}
                <Link
                  className="text-primary-fixed-dim font-bold hover:text-primary-container transition-colors ml-1 underline decoration-primary-container/30 underline-offset-4"
                  to={footerLinkHref}
                >
                  {footerLinkLabel}
                </Link>
              </p>
            </footer>

          </div>

          {/* Decorative corners */}
          <div className="absolute -top-4 -right-4 w-24 h-24 border-t border-r border-primary-container/20 pointer-events-none" />
          <div className="absolute -bottom-4 -left-4 w-24 h-24 border-b border-l border-primary-container/20 pointer-events-none" />
        </div>

      </main>

      {/* Editorial footer */}
      <div className="w-full py-8 px-8 flex flex-col md:flex-row justify-between items-center text-outline-variant font-label text-[10px] uppercase tracking-[0.2em]">
        <div>© 2024 KINETIC NOIR DATA SYSTEMS</div>
        <div className="flex gap-8 mt-4 md:mt-0">
          <a className="hover:text-on-surface transition-colors" href="#">Privacy Protocol</a>
          <a className="hover:text-on-surface transition-colors" href="#">Terms of Engagement</a>
          <a className="hover:text-on-surface transition-colors" href="#">API v2.4.0</a>
        </div>
      </div>
    </>
  );
}
