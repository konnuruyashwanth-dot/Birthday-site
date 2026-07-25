import { motion } from 'framer-motion'
import { SectionHead } from './partials'
import { AGE } from '../config'
import label1 from '../assets/label.png'

const reasons = [
  'The way your whole face joins in when you smile.',
  'How you make ordinary days feel worth remembering.',
  'Your laugh — the real one, the one you try to hide.',
  'How you care about people, even when no one is watching.',
  'How safe the world feels when your hand is in mine.',
  'Your stubborn, beautiful heart that never gives up on the people it loves.',
  'The little whisper of yash you do haha.',
  'How you notice the small things nobody else does.',
  'The way you believe in me more than I believe in myself.',
  'Your kindness — quiet, constant, and never for show.',
  'How you turn my worst days into ones I can survive.',
  'The way you act weird on VC when you think I’m not looking.',
  'Your curiosity about everything and everyone.',
  'How you say my name like it means something.',
  'The comfort of your silence next to mine.',
  'Your courage, even on the days you feel small.',
  'The way you love — completely, without keeping score.',
  'How you make “home” a person instead of a place.',
  'Your forgiveness, gentle and free.',
  'The dreams you let me share.',
  'And most of all — that out of everyone, you chose to stay with me.',
]

// paper textures (pure CSS)
const papers = [
  { // ruled notebook
    ink: '#39506b', pl: 'pl-11',
    style: {
      backgroundColor: '#fffdf7',
      backgroundImage:
        'repeating-linear-gradient(to bottom, transparent 0 27px, #cfe0ef 27px 28px), linear-gradient(90deg, transparent 33px, #f3a9bb 33px 34px, transparent 34px)',
    },
  },
  { // sticky note
    ink: '#7a2f50', fold: '#f2b6cd',
    style: { backgroundColor: '#ffd7e6' },
  },
  { // kraft paper
    ink: '#5a3a21',
    style: {
      backgroundColor: '#e3c49b',
      backgroundImage:
        'radial-gradient(circle at 28% 20%, rgba(255,255,255,0.28), transparent 42%), radial-gradient(circle at 82% 72%, rgba(0,0,0,0.07), transparent 46%)',
    },
  },
  { // graph paper
    ink: '#3f5468',
    style: {
      backgroundColor: '#fdfdfb',
      backgroundImage:
        'linear-gradient(#e6eef7 1px, transparent 1px), linear-gradient(90deg, #e6eef7 1px, transparent 1px)',
      backgroundSize: '17px 17px',
    },
  },
  { // crumpled paper
    ink: '#4a3f33',
    style: {
      backgroundColor: '#f3ece1',
      backgroundImage:
        'radial-gradient(circle at 24% 18%, rgba(255,255,255,0.65), transparent 42%), radial-gradient(circle at 78% 28%, rgba(0,0,0,0.06), transparent 40%), radial-gradient(circle at 55% 72%, rgba(0,0,0,0.06), transparent 44%), radial-gradient(circle at 14% 82%, rgba(255,255,255,0.55), transparent 40%)',
      boxShadow: 'inset 0 0 40px rgba(0,0,0,0.05)',
    },
  },
  { // pastel sticky (mint)
    ink: '#3f6b52', fold: '#bfe3cd',
    style: { backgroundColor: '#d6f1e0' },
  },
]

const rot = ['-rotate-2', 'rotate-1', '-rotate-1', 'rotate-2', '-rotate-3', 'rotate-2', '-rotate-1', 'rotate-3']
const doodles = ['❤']

export default function Reasons() {
  return (
    <section
      id="reasons"
      className="relative w-full py-24 md:py-28 px-6 md:px-12 font-sans"
      style={{
        backgroundColor: '#f9e6ee',
        backgroundImage: 'radial-gradient(rgba(224,114,154,0.16) 1.6px, transparent 1.6px)',
        backgroundSize: '22px 22px',
      }}
    >
      {/* blend in from the gallery, and out to the next section */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 z-0 h-24 bg-gradient-to-b from-[#fdf1f4] to-transparent" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-24 bg-gradient-to-t from-brand-light to-transparent" />

      {/* note tucked into the left-side gap */}
      <div className="pointer-events-none absolute left-3 -top-[60px] z-40 hidden w-[260px] rotate-[-4deg] drop-shadow-[0_22px_40px_rgba(61,31,45,0.32)] [container-type:inline-size] md:block lg:left-8 lg:-top-[100px] lg:w-[360px] xl:left-10 xl:-top-[100px] xl:w-[400px]">
        <img src={label1} alt="" className="h-auto w-full" />
        <div className="absolute inset-0 flex items-center justify-center px-[16%] pb-[5%] text-center">
          <p className="font-script leading-tight text-brand-dark text-[7cqw]">next up…<br />21 reasons I adore you 💗</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <SectionHead kicker={`${AGE} whys`} title={`${AGE}`} accent="Reasons"
          sub="…why loving you was the easiest thing I’ve ever done. — pasted straight from my heart 🩷" />

        {/* scrapbook wall */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
          {reasons.map((r, i) => {
            const p = papers[i % papers.length]
            const isPin = i % 3 === 0
            return (
              <motion.div key={i}
                initial={{ opacity: 0, y: 26, rotate: 0 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.55, delay: (i % 6) * 0.05, ease: [0.22, 1, 0.36, 1] }}
                className={`${rot[i % rot.length]} transition-transform duration-300 hover:rotate-0 hover:scale-[1.03]`}
              >
                <div className={`relative rounded-[3px] px-5 pb-6 pt-7 shadow-[0_14px_30px_-10px_rgba(61,31,45,0.4)] ${p.pl || ''}`} style={p.style}>
                  {/* tape or pushpin */}
                  {isPin ? (
                    <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 h-5 w-5 rounded-full shadow-[0_3px_5px_rgba(0,0,0,0.3)]"
                      style={{ background: 'radial-gradient(circle at 35% 30%, #ff9ab5, #d63f6e 70%)' }} />
                  ) : (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 h-6 w-24 -rotate-3 shadow-sm"
                      style={{ background: 'repeating-linear-gradient(45deg, rgba(255,255,255,0.55) 0 6px, rgba(224,114,154,0.5) 6px 12px)' }} />
                  )}

                  <div className="flex items-baseline gap-2">
                    <span className="font-display text-3xl leading-none" style={{ color: p.ink }}>{String(i + 1).padStart(2, '0')}</span>
                    <span className="font-script text-lg opacity-60" style={{ color: p.ink }}>reason</span>
                  </div>
                  <p className="mt-1.5 font-script text-2xl leading-snug" style={{ color: p.ink }}>{r}</p>

                  {/* doodle */}
                  <span className="absolute bottom-1.5 right-3 text-lg opacity-70 rotate-6 select-none">{doodles[i % doodles.length]}</span>

                  {/* folded corner for sticky notes */}
                  {p.fold && (
                    <span className="absolute bottom-0 right-0 h-6 w-6" style={{ background: p.fold, clipPath: 'polygon(100% 0, 0 100%, 100% 100%)' }} />
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
