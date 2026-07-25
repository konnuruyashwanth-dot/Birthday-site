import { motion } from 'framer-motion'
import { fadeUp } from './partials'
import MusicToggle from './MusicToggle'
import { HER_NAME, AGE } from '../config'
import heroBg from '../assets/hero-bg.jpg'

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-brand-light px-6 py-24 font-sans text-center md:px-12 md:py-28"
      style={{
        backgroundImage: `linear-gradient(rgba(253, 241, 244, 0.42), rgba(253, 241, 244, 0.42)), url(${heroBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <MusicToggle />
      {/* soft bottom fade — blends the hero into the next section */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-40 md:h-56 bg-gradient-to-b from-transparent to-brand-light" />

      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center">
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0} className="mb-6 flex items-center justify-center gap-3">
          <span className="h-px w-8 bg-brand-accent" />
          <span className="text-xs uppercase tracking-[0.3em] text-brand-medium font-semibold">
            For {HER_NAME} · Happy {AGE}
          </span>
        </motion.div>

        <motion.h1 variants={fadeUp} initial="hidden" animate="visible" custom={0.1}
          className="mb-8 font-display text-brand-dark font-light tracking-tight leading-[1.0] text-5xl sm:text-6xl lg:text-7xl">
          Happy Birthday,
          <br />
          <span className="relative inline-block italic text-brand-dark">
            {HER_NAME}
            <svg className="absolute -bottom-2 left-0 w-full" height="14" viewBox="0 0 160 14" fill="none" preserveAspectRatio="none">
              <path d="M2 9C35 4 110 3 158 7" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
            </svg>
          </span>
        </motion.h1>

        <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={0.2}
          className="mb-10 max-w-xl font-script text-2xl leading-snug text-brand-medium md:text-3xl">
          I made this little site for you, to celebrate your birthday and all the reasons I adore you. I hope it makes you smile, and that you know how much you mean to me. 💗
        </motion.p>

        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.4} className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <span className="-translate-y-10  text-[11px] uppercase tracking-[0.25em] text-brand-medium/60 font-semibold">With all my heart</span>
          <span className="-translate-y-10  h-4 w-px bg-brand-dark/15" />
          <span className="-translate-y-10  font-script text-2xl text-brand-accent leading-none">forever yours 💗</span>
        </motion.div>
      </div>
    </section>
  )
}
