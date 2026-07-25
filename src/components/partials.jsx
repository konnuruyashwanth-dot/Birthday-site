import { motion } from 'framer-motion'

/* portfolio's fadeUp variant, reused everywhere */
export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (d = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: d },
  }),
}

/* kicker: little line + uppercase tracked label (portfolio signature) */
export function Kicker({ children, className = '' }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <span className="h-px w-8 bg-brand-accent" />
      <span className="font-sans text-xs uppercase tracking-[0.32em] text-brand-accent font-medium">
        {children}
      </span>
    </div>
  )
}

/* the hand-drawn underline swoosh under a keyword */
export function Swoosh() {
  return (
    <svg className="absolute -bottom-2 left-0 w-full" height="14" viewBox="0 0 160 14"
         fill="none" preserveAspectRatio="none">
      <path d="M2 9C35 4 110 3 158 7" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
    </svg>
  )
}

/* section heading block: kicker + big display title with an italic accent word */
export function SectionHead({ kicker, title, accent, sub, center = true }) {
  return (
    <div className={`${center ? 'text-center flex flex-col items-center' : ''} mb-14`}>
      <motion.div variants={fadeUp} initial="hidden" whileInView="visible"
        viewport={{ once: true, amount: 0.5 }} custom={0}>
        <Kicker className={center ? 'justify-center' : ''}>{kicker}</Kicker>
      </motion.div>
      <motion.h2 variants={fadeUp} initial="hidden" whileInView="visible"
        viewport={{ once: true, amount: 0.5 }} custom={0.1}
        className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-brand-dark leading-[1.05] tracking-tight mt-5">
        {title}{' '}
        {accent && (
          <span className="relative inline-block italic text-brand-accent">
            {accent}
            <span className="text-brand-accent"><Swoosh /></span>
          </span>
        )}
      </motion.h2>
      {sub && (
        <motion.p variants={fadeUp} initial="hidden" whileInView="visible"
          viewport={{ once: true, amount: 0.5 }} custom={0.2}
          className="font-sans text-brand-medium text-base md:text-lg leading-relaxed max-w-xl mt-5">
          {sub}
        </motion.p>
      )}
    </div>
  )
}

/* a taped polaroid frame */
export function Polaroid({ src, caption, rotate = '-3deg', className = '' }) {
  return (
    <figure className={`relative bg-white p-3 pb-9 rounded-[4px] shadow-[0_18px_45px_rgba(61,31,45,0.22)] ${className}`}
      style={{ transform: `rotate(${rotate})` }}>
      <img src={src} alt={caption} loading="lazy"
        className="w-full h-full object-cover rounded-[2px]" />
      {caption && (
        <figcaption className="font-script text-2xl text-brand-medium text-center mt-2 leading-none">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
