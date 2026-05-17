interface NotificationsDropdownProps {
  onClose: () => void;
}

export default function NotificationsDropdown({ onClose }: Readonly<NotificationsDropdownProps>) {
  return (
    <>
      <div className="fixed inset-0 z-[90]" onClick={onClose} />
      <div className="absolute right-0 mt-4 w-80 bg-[#1b1b20]/95 backdrop-blur-xl border border-[#00FF94]/20 rounded-xl shadow-2xl z-[100] origin-top-right">
        <div className="absolute -top-2 right-3 w-4 h-4 bg-[#1b1b20] border-t border-l border-[#00FF94]/20 rotate-45" />
        <div className="p-4 border-b border-white/5 flex items-center justify-between">
          <h3 className="font-headline font-bold text-sm tracking-tight text-white uppercase">Notifications</h3>
          <span className="text-[10px] font-label font-bold text-[#00FF94] bg-[#00FF94]/10 px-2 py-0.5 rounded-full">NEW</span>
        </div>
        <div className="p-12 flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-[#131318] border border-[#00FF94]/10 flex items-center justify-center mb-4">
            <span className="material-symbols-outlined text-[#00FF94]/40 text-3xl">notifications_off</span>
          </div>
          <h4 className="font-headline text-white font-medium mb-1">No new notifications</h4>
          <p className="font-label text-xs text-[#b9cbbb]/60">You're all caught up.</p>
        </div>
        <div className="p-3 bg-[#131318]/50 rounded-b-xl border-t border-white/5">
          <button className="w-full py-2 text-[10px] font-label font-bold text-[#b9cbbb] hover:text-[#00FF94] transition-colors uppercase tracking-widest">
            View Notification History
          </button>
        </div>
      </div>
    </>
  );
}
