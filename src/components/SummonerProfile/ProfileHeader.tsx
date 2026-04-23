export default function ProfileHeader({
  name,
  region,}:{
    name: string;
    region: string;
  }) {
  return (
    <section className="mb-16">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-12">

            <div className="flex items-center gap-6">
              <div className="relative">
                <img
                  alt="Summoner Avatar"
                  className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-2 border-surface-container-low shadow-avatar"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBH1S5tqSSiLoCzlc7HHoYYMlysaHHVcch41Qh-IiwDwA_UiiAu2LbfBTeZf9lkXZxqluJpgh2dYui-Y9L6er-LxfDSSj8Vmv2TSuc32JBE87IlbTzuxdtGok9JneHtyou7PvdP4OpDrx9iknW4n8Zn8vzta57r293PJu8mUNVBj_4M9RUtLFeggjEodbmPgSLKTCBK3GwgDei1Nw_O1XYm3X755B4l8yFUSTJQnACQQqj9b2H9HPF7PcfcD06DSY1q4DDf44BEWbo_"
                />
                <div className="absolute -bottom-2 -right-2 bg-surface-container-highest text-on-surface font-headline font-bold text-sm px-3 py-1 rounded-full border border-surface-container-lowest">
                  892
                </div>
              </div>
              <div>
                <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-2">{name}</h1>
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 bg-surface-container text-on-surface-variant font-label text-sm rounded-lg uppercase tracking-widest">{region}</span>
                  <span className="text-surface-container-highest">•</span>
                  <span className="text-primary-fixed-dim font-label text-sm flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>fiber_manual_record</span>
                    Online
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-end sm:items-center gap-16 pl-[25%]">
              <div className="bg-surface-container-low p-6 rounded-xl flex items-center gap-6 w-full sm:w-auto shadow-rank"
              >
                <div className="w-16 h-16 md:w-20 md:h-20 bg-surface-container-highest rounded-xl" />
                <div>
                  <div className="font-headline text-2xl md:text-3xl font-bold text-white leading-none mb-1">Challenger</div>
                  <div className="font-headline text-xl text-primary-fixed-dim font-semibold">1,240 LP</div>
                </div>
              </div>
              <div className="glass-glow text-right w-full sm:w-auto">
                <div className="font-headline text-[3.5rem] leading-none font-extrabold text-primary">64.2%</div>
                <div className="font-label text-sm text-on-surface-variant uppercase tracking-widest mt-1">Win Rate (S14)</div>
              </div>
            </div>
          </div>
        </section>
  )
  }