import { Link } from "react-router-dom";

export default function ComingSoon() {
  return (
    <main className="relative mt-16 h-[calc(100vh-64px)] w-full flex items-center justify-center overflow-hidden">
      {/* Ambient glow elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary-container/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-48 w-150 h-150 bg-primary-container/5 rounded-full blur-[160px]" />
      </div>

      {/* Main content container */}
      <div className="relative z-10 w-full max-w-3xl px-8 flex flex-col items-center text-center">
        {/* Content card */}
        <div className="bg-surface-container-low/40 backdrop-blur-xl border-l-4 border-primary-container p-8 md:p-16 rounded-xl shadow-[0_0_80px_-20px_rgba(0,255,148,0.15)] relative overflow-hidden group">
          {/* Kinetic gradient overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,255,148,0.05)_0%,rgba(0,255,148,0)_100%)] opacity-50" />

          <div className="relative z-10">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface-container-highest rounded-full mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-container animate-pulse" />
              <span className="text-[10px] font-bold tracking-[0.2em] text-on-surface-variant uppercase font-label">
                Development in Progress
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary tracking-tight leading-[1.1] mb-6">
              Feature coming <br />
              <span className="text-primary-container">soon.. :)</span>
            </h1>

            {/* Description */}
            <p className="font-body text-on-surface-variant text-base md:text-lg max-w-xl mx-auto leading-relaxed mb-8">
              We're currently refining this section to deliver an unparalleled
              analytical experience. Our engineers are fine-tuning the data
              streams for maximum precision.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              <button className="px-6 py-3 bg-primary-container text-on-primary-container font-label font-bold rounded-lg transition-transform active:scale-95 duration-150 flex items-center gap-2 group-hover:shadow-[0_0_20px_rgba(0,255,148,0.3)]">
                <span className="material-symbols-outlined">rocket_launch</span>
                Notify Me
              </button>
              <Link to="/" className="px-6 py-3 border border-outline-variant text-on-surface font-label font-bold rounded-lg hover:bg-surface-container-highest transition-all duration-300">
                Return to Home
              </Link>
            </div>
          </div>

          {/* Decorative icon */}
          <div className="absolute -right-16 -bottom-16 opacity-10">
            <span
              className="material-symbols-outlined text-[220px]"
              style={{ fontVariationSettings: "'FILL' 0" }}
            >
              sports_esports
            </span>
          </div>
        </div>

        {/* Trust badges */}
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-8 opacity-40">
          {[
            "Real-time Data",
            "Global Ranks",
            "Pro Insights",
            "Advanced API",
          ].map((label) => (
            <div key={label} className="flex flex-col items-center gap-2">
              <span className="text-xs font-bold tracking-widest text-on-surface-variant uppercase font-label">
                {label}
              </span>
              <div className="h-px w-8 bg-outline-variant" />
            </div>
          ))}
        </div>
      </div>

      {/* Background texture */}
      <div className="absolute inset-0 z-0 opacity-20 grayscale pointer-events-none">
        <img
          alt="Technical Background Grid"
          className="w-full h-full object-cover"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuB8Bijvyz2Hb-Y9dIqHlB45YA2bqMN6jcykghYSQEJAfYcceqxtSNzIcwq6wVmRo1iNynztyEyCqmpPSdhr2YLiAXsy8ElZwvo_BqP8N_-Vx9KXR5PhPNz6aMcMWLqD4YU7XUFBfacmVHDrrA6DPUhgbE6XMcpNE0WH1X-fb7AwW8V73OOtbhJhOqB9wnSe4RUIyqmL_RTrwjqh3tPavGWWbrZf0QdqloK_Ti0nkt8nwkMX3oG7ylmDCObhA7WB-KNoCvUZRjllarru"
        />
      </div>
    </main>
  );
}
