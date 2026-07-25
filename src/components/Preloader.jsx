import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import bg from '../assets/preloader-bg.jpg'

function Butterfly({ size = 40, hue = '#ef6f9a', deep = '#c94b7d', flap = 0.28 }) {
  const wingL = { transformBox: 'fill-box', transformOrigin: '100% 50%', animation: `bflap ${flap}s ease-in-out infinite` }
  const wingR = { transformBox: 'fill-box', transformOrigin: '0% 50%', animation: `bflap ${flap}s ease-in-out infinite` }
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" style={{ filter: 'drop-shadow(0 5px 4px rgba(60,10,35,0.35))' }}>
      <g style={wingL}>
        <ellipse cx="30" cy="34" rx="23" ry="17" transform="rotate(-18 30 34)" fill={hue} stroke="#6e2440" strokeWidth="1.4" />
        <ellipse cx="33" cy="63" rx="17" ry="13" transform="rotate(15 33 63)" fill={deep} stroke="#6e2440" strokeWidth="1.4" />
        <circle cx="21" cy="30" r="3.6" fill="#fff" opacity="0.85" /><circle cx="27" cy="65" r="2.6" fill="#fff" opacity="0.7" />
      </g>
      <g style={wingR}>
        <ellipse cx="70" cy="34" rx="23" ry="17" transform="rotate(18 70 34)" fill={hue} stroke="#6e2440" strokeWidth="1.4" />
        <ellipse cx="67" cy="63" rx="17" ry="13" transform="rotate(-15 67 63)" fill={deep} stroke="#6e2440" strokeWidth="1.4" />
        <circle cx="79" cy="30" r="3.6" fill="#fff" opacity="0.85" /><circle cx="73" cy="65" r="2.6" fill="#fff" opacity="0.7" />
      </g>
      <ellipse cx="50" cy="50" rx="3" ry="19" fill="#37202f" /><circle cx="50" cy="31" r="4" fill="#37202f" />
      <path d="M50 30 C 46 20 42 16 39 12" stroke="#37202f" strokeWidth="1.4" fill="none" />
      <path d="M50 30 C 54 20 58 16 61 12" stroke="#37202f" strokeWidth="1.4" fill="none" />
      <circle cx="39" cy="12" r="1.7" fill="#37202f" /><circle cx="61" cy="12" r="1.7" fill="#37202f" />
    </svg>
  )
}

const PALETTE = [
  ['#ef6f9a', '#c94b7d'], ['#ff8a7a', '#ef5f6b'], ['#b388e6', '#8a5cd1'], ['#c9a7f0', '#a97fe0'],
  ['#7fb5f0', '#5a8fd6'], ['#6fd6c4', '#46b3a0'], ['#ffd76a', '#f0b83c'], ['#ffab5e', '#f0873c'],
  ['#f06a6a', '#d14b4b'], ['#f57ad6', '#d15ab8'], ['#9fe0a8', '#6fc47f'], ['#8ec5ff', '#5f9be6'],
]
const rand = (a, b) => a + Math.random() * (b - a)

// 21 butterflies streaming left → right
const bfs = Array.from({ length: 21 }, () => {
  const [hue, deep] = PALETTE[Math.floor(Math.random() * PALETTE.length)]
  const y = rand(8, 84)
  return { y, r0: rand(82, 98), r1: rand(82, 98), dur: rand(2.8, 4.4), delay: rand(0, 1.9), size: rand(26, 44), hue, deep, flap: rand(0.22, 0.34) }
})

export default function Preloader() {
  const [loading, setLoading] = useState(true)
  const [showText, setShowText] = useState(false)
  useEffect(() => {
    const t1 = setTimeout(() => setShowText(true), 1700)
    const t2 = setTimeout(() => setLoading(false), 4000)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  return (
    <AnimatePresence>
      {loading && (
        <motion.div key="pre" className="fixed inset-0 z-[100000] overflow-hidden bg-cover bg-center"
          style={{ backgroundImage: `url(${bg})` }}
          initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.6, ease: 'easeInOut' }}>

          {/* handwritten note — appears while the butterflies pass */}
          <motion.div className="absolute inset-0 z-[100003] flex items-center justify-center px-6"
            initial={{ opacity: 0, y: 14 }} animate={showText ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}>
            <div className="relative text-center">
              <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 h-48 w-[640px] max-w-[92vw] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl" style={{ background: 'rgba(45,12,28,0.42)' }} />
              <p className="relative font-script text-3xl leading-tight text-white sm:text-4xl md:text-5xl" style={{ textShadow: '0 2px 16px rgba(50,10,30,0.7)' }}>
                to the most beautiful girl<br />in the whole universe.
              </p>
              <p className="relative mt-3 font-love text-3xl text-white/95 sm:text-4xl" style={{ textShadow: '0 2px 12px rgba(50,10,30,0.7)' }}>
                — My cat
              </p>
            </div>
          </motion.div>

          {/* butterflies flying left → right */}
          {bfs.map((b, i) => (
            <motion.div key={i} className="absolute left-0 top-0"
              initial={{ x: '-15vw', y: `${b.y}vh`, rotate: b.r0, opacity: 0 }}
              animate={{
                x: '118vw',
                y: [`${b.y}vh`, `${b.y - 5}vh`, `${b.y + 4}vh`, `${b.y - 2}vh`],
                rotate: [b.r0, b.r1, b.r0],
                opacity: [0, 1, 1, 1],
              }}
              transition={{ duration: b.dur, delay: b.delay, ease: 'linear' }}>
              <Butterfly size={b.size} hue={b.hue} deep={b.deep} flap={b.flap} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
