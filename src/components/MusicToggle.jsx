import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import song from '../assets/our-song.mp3'

// Our-song player — only ever starts when she presses the button.
export default function MusicToggle() {
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)

  useEffect(() => { if (audioRef.current) audioRef.current.volume = 0.55 }, [])

  const toggle = () => {
    const a = audioRef.current
    if (!a) return
    if (a.paused) a.play().then(() => setPlaying(true)).catch(() => {})
    else { a.pause(); setPlaying(false) }
  }

  return (
    <>
      <audio ref={audioRef} src={song} loop preload="auto" />
      <div className="fixed bottom-5 right-5 z-[60] flex items-center gap-2">

        <div className="relative">
          {/* attention pulse */}
          {!playing && (
            <motion.span aria-hidden className="pointer-events-none absolute inset-0 rounded-full bg-brand-rose/40"
              animate={{ scale: [1, 1.5], opacity: [0.5, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeOut' }} />
          )}
          {/* love raining onto the button */}
          {!playing && [0, 1, 2, 3].map((i) => (
            <motion.span key={i} aria-hidden className="pointer-events-none absolute z-10 leading-none text-brand-rose"
              style={{ left: `${12 + i * 24}%`, top: -26, fontSize: 13 }}
              initial={{ y: -8, opacity: 0 }}
              animate={{ y: [-8, 34], opacity: [0, 1, 1, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.4, ease: 'easeIn' }}>
              ♥
            </motion.span>
          ))}

          <motion.button
            onClick={toggle}
            initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2, duration: 0.6 }}
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            aria-label={playing ? 'pause our song' : 'play our song'}
            className="relative flex items-center gap-2 rounded-full bg-brand-dark/90 px-4 py-2.5 text-white shadow-[0_12px_26px_-8px_rgba(61,31,45,0.6)] backdrop-blur">
            {playing ? (
              <span className="flex h-4 items-end gap-[3px]">
                {[0, 1, 2].map((i) => (
                  <motion.span key={i} className="w-1 rounded-full bg-brand-rose"
                    animate={{ height: ['30%', '100%', '45%', '85%', '30%'] }}
                    transition={{ duration: 1 + i * 0.25, repeat: Infinity, ease: 'easeInOut' }}
                    style={{ height: '30%' }} />
                ))}
              </span>
            ) : (
              <span className="text-lg leading-none text-brand-rose">♫</span>
            )}
            <span className="font-script text-lg leading-none">{playing ? 'our song' : 'play our song'}</span>
          </motion.button>
        </div>
      </div>
    </>
  )
}
