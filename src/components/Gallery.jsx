import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { SectionHead } from './partials'
import g1 from '../assets/gallery/g1.jpg'
import g2 from '../assets/gallery/g2.jpg'
import g3 from '../assets/gallery/g3.jpg'
import g4 from '../assets/gallery/g4.jpg'
import g5 from '../assets/gallery/g5.jpg'
import g6 from '../assets/gallery/g6.jpg'
import g7 from '../assets/gallery/g7.jpg'
import g8 from '../assets/gallery/g8.jpg'
import g9 from '../assets/gallery/g9.jpg'
import g10 from '../assets/gallery/g10.jpg'

// 👉 tweak the captions to whatever fits each photo
const shots = [
  { src: g1, cap: 'us 🤍', rot: '-3deg' },
  { src: g2, cap: 'my favourite', rot: '2deg' },
  { src: g3, cap: 'this smile', rot: '-2deg' },
  { src: g4, cap: 'look at us', rot: '3deg' },
  { src: g5, cap: 'my person', rot: '-2deg' },
  { src: g6, cap: 'together', rot: '2.5deg' },
  { src: g7, cap: 'my whole world', rot: '-2.5deg' },
  { src: g8, cap: 'you & me', rot: '2deg' },
  { src: g9, cap: 'always', rot: '-3deg' },
  { src: g10, cap: 'that laugh 🤍', rot: '2deg' },
]

export default function Gallery() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-120px' })
  return (
    <section id="gallery" ref={ref} className="relative w-full bg-gradient-to-b from-brand-light via-white to-[#fdf1f4] py-24 md:py-28 px-6 md:px-12 overflow-hidden font-sans">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-20 bg-gradient-to-t from-[#fdf1f4] to-transparent" />
      <div className="max-w-6xl mx-auto relative z-10">
        <SectionHead kicker="a wall of us" title="Our" accent="Gallery"
          sub="Little windows into moments I keep folded in my chest. Scroll through them →" />

        <div className="flex gap-5 md:gap-7 overflow-x-auto pb-5 pt-2 px-1 snap-x scroll-smooth">
          {shots.map((p, i) => (
            <motion.figure key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 + (i % 6) * 0.08 }}
              style={{ transform: `rotate(${p.rot})` }}
              className="shrink-0 snap-center bg-white p-2.5 pb-8 rounded-[4px] shadow-[0_18px_45px_rgba(61,31,45,0.25)] hover:rotate-0 hover:scale-[1.05] transition-transform duration-300 w-[200px] sm:w-[220px]">
              <img src={p.src} alt={p.cap} loading="lazy" className="w-full h-56 sm:h-64 object-cover rounded-[2px]" />
              <figcaption className="font-script text-xl text-brand-medium text-center mt-1.5 leading-none">{p.cap}</figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  )
}
