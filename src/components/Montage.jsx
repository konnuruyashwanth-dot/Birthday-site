import { motion } from 'framer-motion'

// video is /public/montage.mp4 (already added)
const VIDEO_SRC = '/montage.mp4'
const VIDEO_EMBED = ''

// a seamless tiled wall of little "I love you" paper slips
const SLIP_TILE = 'url("data:image/svg+xml,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20width%3D%27200%27%20height%3D%27140%27%3E%3Cg%20transform%3D%27rotate%28-5%2042%2026%29%27%3E%3Crect%20x%3D%2710%27%20y%3D%2716%27%20width%3D%2764%27%20height%3D%2720%27%20rx%3D%272%27%20fill%3D%27%23f5ead2%27%2F%3E%3Ctext%20x%3D%2717%27%20y%3D%2730%27%20font-family%3D%27cursive%27%20font-size%3D%2712%27%20fill%3D%27%23a23a2c%27%3EI%20love%20you%3C%2Ftext%3E%3C%2Fg%3E%3Cg%20transform%3D%27rotate%284%20144%2020%29%27%3E%3Crect%20x%3D%27112%27%20y%3D%2710%27%20width%3D%2764%27%20height%3D%2720%27%20rx%3D%272%27%20fill%3D%27%23f7dbe6%27%2F%3E%3Ctext%20x%3D%27119%27%20y%3D%2724%27%20font-family%3D%27cursive%27%20font-size%3D%2712%27%20fill%3D%27%23a23a2c%27%3EI%20love%20you%3C%2Ftext%3E%3C%2Fg%3E%3Cg%20transform%3D%27rotate%28-3%2088%2064%29%27%3E%3Crect%20x%3D%2756%27%20y%3D%2754%27%20width%3D%2764%27%20height%3D%2720%27%20rx%3D%272%27%20fill%3D%27%23ffe6d0%27%2F%3E%3Ctext%20x%3D%2763%27%20y%3D%2768%27%20font-family%3D%27cursive%27%20font-size%3D%2712%27%20fill%3D%27%23a23a2c%27%3EI%20love%20you%3C%2Ftext%3E%3C%2Fg%3E%3Cg%20transform%3D%27rotate%286%20182%2072%29%27%3E%3Crect%20x%3D%27150%27%20y%3D%2762%27%20width%3D%2764%27%20height%3D%2720%27%20rx%3D%272%27%20fill%3D%27%23f5ead2%27%2F%3E%3Ctext%20x%3D%27157%27%20y%3D%2776%27%20font-family%3D%27cursive%27%20font-size%3D%2712%27%20fill%3D%27%23a23a2c%27%3EI%20love%20you%3C%2Ftext%3E%3C%2Fg%3E%3Cg%20transform%3D%27rotate%283%2036%20106%29%27%3E%3Crect%20x%3D%274%27%20y%3D%2796%27%20width%3D%2764%27%20height%3D%2720%27%20rx%3D%272%27%20fill%3D%27%23f7dbe6%27%2F%3E%3Ctext%20x%3D%2711%27%20y%3D%27110%27%20font-family%3D%27cursive%27%20font-size%3D%2712%27%20fill%3D%27%23a23a2c%27%3EI%20love%20you%3C%2Ftext%3E%3C%2Fg%3E%3Cg%20transform%3D%27rotate%28-6%20136%20114%29%27%3E%3Crect%20x%3D%27104%27%20y%3D%27104%27%20width%3D%2764%27%20height%3D%2720%27%20rx%3D%272%27%20fill%3D%27%23ffe6d0%27%2F%3E%3Ctext%20x%3D%27111%27%20y%3D%27118%27%20font-family%3D%27cursive%27%20font-size%3D%2712%27%20fill%3D%27%23a23a2c%27%3EI%20love%20you%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fsvg%3E")'

function Screen() {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-[10px] bg-[#1a1013]">
      {VIDEO_EMBED ? (
        <iframe title="our memories" src={VIDEO_EMBED} className="absolute inset-0 h-full w-full"
          frameBorder="0" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" loading="lazy" />
      ) : VIDEO_SRC ? (
        <video src={VIDEO_SRC} className="absolute inset-0 h-full w-full object-cover" controls playsInline muted preload="metadata" />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center">
          <span className="grid h-16 w-16 place-items-center rounded-full border-2 border-white/70 text-2xl text-white/90">▶</span>
          <p className="font-script text-2xl text-white/85">our memories</p>
        </div>
      )}
      <div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: 'linear-gradient(rgba(90,55,20,0.12), rgba(40,20,30,0.28))' }} />
      <div aria-hidden className="pointer-events-none absolute inset-0" style={{ backgroundImage: 'repeating-linear-gradient(rgba(0,0,0,0.16) 0 1px, transparent 1px 3px)' }} />
      <div aria-hidden className="grain-overlay pointer-events-none absolute inset-0 opacity-[0.12]" />
      <div aria-hidden className="pointer-events-none absolute inset-0" style={{ boxShadow: 'inset 0 0 90px rgba(0,0,0,0.7)' }} />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-6 bg-gradient-to-b from-white/25 to-transparent" style={{ animation: 'scanMove 6s linear infinite' }} />
      <div className="pointer-events-none absolute left-3 top-3 flex items-center gap-1.5 font-mono text-[11px] text-white/85">
        <span className="h-2.5 w-2.5 rounded-full bg-red-500" style={{ animation: 'recBlink 1.2s infinite' }} />REC
      </div>
      <div className="pointer-events-none absolute bottom-3 right-3 font-mono text-[11px] text-white/70">’25 — ’26</div>
    </div>
  )
}

const shadow = { textShadow: '0 2px 10px rgba(18,7,12,0.9)' }

export default function Montage() {
  return (
    <section id="montage" className="relative z-30 w-full py-24 md:py-28 px-6 md:px-12 font-sans" style={{ backgroundColor: '#2a1620' }}>
      {/* tiled slip wall — covers everything, spills over the seams */}
      <div aria-hidden className="pointer-events-none absolute -top-16 -bottom-16 -left-6 -right-6"
        style={{ backgroundColor: '#2a1620', backgroundImage: SLIP_TILE, backgroundRepeat: 'repeat', backgroundSize: '200px 140px' }} />
      {/* gentle edge vignette for depth */}
      <div aria-hidden className="pointer-events-none absolute -top-16 -bottom-16 -left-6 -right-6"
        style={{ background: 'radial-gradient(120% 100% at 50% 42%, transparent 42%, rgba(18,8,12,0.55) 100%)' }} />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="relative mx-auto mb-12 max-w-lg rotate-[-1.2deg] overflow-hidden rounded-[5px] px-8 py-9 shadow-[0_22px_46px_-18px_rgba(61,31,45,0.6)] md:mb-14"
          style={{ backgroundColor: '#ffeef4', backgroundImage: 'repeating-linear-gradient(to bottom, transparent 0 31px, #f3aecb 31px 32px)' }}>
          <span aria-hidden className="absolute -top-3 left-1/2 h-6 w-28 -translate-x-1/2 rotate-2 bg-brand-rose/45 shadow-sm backdrop-blur-sm" />
          <div className="text-center">
            <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.32em] text-[#b0577c]">press play, my love</span>
            <h2 className="mt-1 font-display text-4xl font-light leading-tight tracking-tight text-[#5a2540] md:text-5xl">
              Our <span className="italic text-[#c05a86]">Memories</span>
            </h2>
            <p className="mx-auto mt-2 max-w-md font-script text-xl leading-snug text-[#7a3b58]">
              A little montage of us — every clip a moment I never want to forget. 🎞️
            </p>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="relative w-full rounded-[22px] p-5 sm:p-8"
          style={{ background: 'linear-gradient(150deg, #ecd8bd, #d4b892)', boxShadow: '0 32px 64px -26px rgba(0,0,0,0.75), inset 0 2px 0 rgba(255,255,255,0.55), inset 0 -3px 6px rgba(120,80,40,0.35)' }}>
          {/* note taped on top of the video */}
          <div className="absolute -top-6 left-1/2 z-30 w-[260px] -translate-x-1/2 rotate-[3deg] rounded-[3px] bg-[#ffd9e6] px-4 py-2.5 text-center shadow-[0_12px_22px_-8px_rgba(61,31,45,0.55)]">
            <span aria-hidden className="absolute -top-2 left-1/2 h-4 w-16 -translate-x-1/2 -rotate-3 bg-white/60 shadow-sm" />
            <p className="font-script text-lg leading-tight text-brand-deep">grab a tissue — this one’s my favourite 💗</p>
          </div>
          <div className="absolute left-2 top-8 bottom-8 flex w-2.5 flex-col justify-between">
            {Array.from({ length: 15 }).map((_, k) => <span key={k} className="h-2.5 w-2.5 rounded-[3px] bg-[#4a3620]/30" />)}
          </div>
          <div className="absolute right-2 top-8 bottom-8 flex w-2.5 flex-col justify-between">
            {Array.from({ length: 15 }).map((_, k) => <span key={k} className="h-2.5 w-2.5 rounded-[3px] bg-[#4a3620]/30" />)}
          </div>
          <div className="mx-3 sm:mx-4 overflow-hidden rounded-[14px] ring-1 ring-black/30" style={{ aspectRatio: '4 / 3' }}>
            <Screen />
          </div>
          <div className="mx-3 sm:mx-4 mt-4 flex items-center justify-between">
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#6b4a2a]">★ home video ★</span>
            <span className="font-script text-xl text-[#6b4a2a]">us, always</span>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
