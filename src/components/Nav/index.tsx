import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useProfile } from "../../hooks/useProfile";
import { useAvatarUpload } from "../../hooks/useAvatarUpload";
import ProfileDropdown from "./ProfileDropdown";
import AvatarPicker from "./AvatarPicker";

const NAV_LINKS = [
  { label: "Live Game", icon: "videogame_asset" },
  { label: "Champions", icon: "military_tech" },
  { label: "Leaderboards", icon: "leaderboard" },
  { label: "Pro View", icon: "workspace_premium" },
];

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [avatarPickerOpen, setAvatarPickerOpen] = useState(false);
  const location = useLocation();
  const { user, signOut } = useAuth();
  const { avatarUrl, setAvatarUrl } = useProfile(user);
  const isProfilePage = location.pathname.startsWith("/summoner/");
  const { fileInputRef, handleAvatarChange, handleResetAvatar, handleSelectPreset } = useAvatarUpload(
    user,
    () => setAvatarPickerOpen(false),
    setAvatarUrl
  );

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 border-b border-surface-container-low bg-background flex items-center justify-between px-8 h-16"
        role="navigation"
      >
        <span className="font-headline text-primary-container text-2xl font-black cursor-pointer" style={{ letterSpacing: "-0.04em" }}>
          <a href="/">RIFTLY</a>
        </span>

        <div className="hidden md:flex items-center h-full">
          {NAV_LINKS.map((link) => (
            <Link key={link.label} to="/coming-soon" className="font-label text-on-surface-variant text-[0.8rem] uppercase tracking-widest px-5 flex items-center h-full transition-colors duration-200 hover:text-white hover:bg-surface-container-low">
              {link.label}
            </Link>
          ))}
        </div>

        <button
          onClick={() => setMobileOpen(true)}
          className={`${isProfilePage ? "hidden" : "md:hidden"} absolute left-1/2 -translate-x-1/2 text-on-surface-variant hover:text-primary-container transition-colors`}
          aria-label="Menu"
        >
          <span className="material-symbols-outlined text-[24px]!">menu</span>
        </button>

        <div className="flex items-center gap-5">
          <button className="text-on-surface-variant border-none cursor-pointer transition-colors duration-200 p-0 hover:text-primary-container scale-90 md:scale-95" aria-label="Notifications">
            <span className="material-symbols-outlined text-[22px] block">notifications</span>
          </button>
          <button className="text-on-surface-variant border-none cursor-pointer transition-colors duration-200 p-0 hover:text-primary-container scale-90 md:scale-95" aria-label="Settings">
            <span className="material-symbols-outlined text-[22px] block">settings</span>
          </button>
          <div className="relative group">
            <input ref={fileInputRef} type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={handleAvatarChange} />
            <div
              className="w-7 h-7 md:w-8 md:h-8 rounded-full overflow-hidden border border-outline-variant cursor-pointer relative"
              onClick={() => user && setAvatarPickerOpen(prev => !prev)}
            >
              <img src={avatarUrl} alt="Summoner Profile Avatar" className="w-full h-full object-cover" />
              {user && (
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="material-symbols-outlined text-white text-xs">edit</span>
                </div>
              )}
            </div>
            {avatarPickerOpen && (
              <AvatarPicker
                onClose={() => setAvatarPickerOpen(false)}
                fileInputRef={fileInputRef}
                onReset={handleResetAvatar}
                onSelectPreset={handleSelectPreset}
              />
            )}
            <ProfileDropdown user={user} avatarUrl={avatarUrl} signOut={signOut} />
          </div>
        </div>
      </nav>

      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-60 bg-background/95 backdrop-blur-sm p-6 overflow-y-auto">
          <div className="flex justify-between items-center mb-8">
            <div className="font-headline text-2xl font-black text-primary-container" style={{ letterSpacing: "-0.04em" }}>Riftly</div>
            <button onClick={() => setMobileOpen(false)} className="text-on-surface-variant hover:text-on-surface transition-colors" aria-label="Close navigation">
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
          <div className="space-y-3">
            {NAV_LINKS.map((link) => (
              <Link key={link.label} to="/coming-soon" onClick={() => setMobileOpen(false)} className="flex items-center gap-5 px-5 py-4 rounded-xl text-on-surface-variant hover:bg-surface-container transition-all font-label text-lg">
                <span className="material-symbols-outlined text-2xl">{link.icon}</span>
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
