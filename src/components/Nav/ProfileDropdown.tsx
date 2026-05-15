import { Link } from "react-router-dom";
import type { User } from "@supabase/supabase-js";

interface ProfileDropdownProps {
  user: User | null;
  avatarUrl: string;
  signOut: () => Promise<void>;
}

export default function ProfileDropdown({ user, avatarUrl, signOut }: Readonly<ProfileDropdownProps>) {
  return (
    <div className="absolute right-0 mt-3 w-64 bg-[#131318] border border-[#00FF94]/30 rounded-lg shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[100] origin-top-right translate-y-2 group-hover:translate-y-0">
      <div className="p-5 border-b border-[#1b1b20]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden border border-[#00FF94]/20">
            <img alt="Avatar" className="w-full h-full object-cover" src={avatarUrl} />
          </div>
          <div className="flex flex-col">
            <span className="text-white font-headline text-sm font-bold tracking-tight">
              {user?.user_metadata?.full_name ?? "Guest"}
            </span>
            <span className="text-[#b9cbbb] text-[10px] font-label uppercase tracking-widest opacity-70">
              {user?.email ?? "Not signed in"}
            </span>
          </div>
        </div>
      </div>
      <div className="p-2">
        <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded text-sm font-label text-[#b9cbbb] hover:bg-[#1b1b20] hover:text-[#00FF94] transition-all">
          <span className="material-symbols-outlined text-lg">link</span>
          <span>Link my account</span>
        </a>
        {user ? (
          <button onClick={signOut} className="w-full flex items-center gap-3 px-3 py-2.5 rounded text-sm font-label text-red-400 hover:bg-red-500/10 transition-all text-left mt-1 cursor-pointer">
            <span className="material-symbols-outlined text-lg">logout</span>
            <span>Logout</span>
          </button>
        ) : (
          <Link to="/login" className="flex items-center gap-3 px-3 py-2.5 rounded text-sm font-label text-on-surface-variant hover:bg-surface-container-low hover:text-[#00FF94] transition-all mt-1">
            <span className="material-symbols-outlined text-lg">login</span>
            <span>Login</span>
          </Link>
        )}
      </div>
    </div>
  );
}
