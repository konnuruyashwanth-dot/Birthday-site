import { motion, AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'
import { SectionHead } from './partials'
import { HER_NAME, AGE } from '../config'

const CANDLE_N = 6
const candleColors = ['#f6a6c1']

function Burst() {
  return (
    <div className="pointer-events-none absolute inset-0 z-30" aria-hidden>
      {Array.from({ length: 26 }).map((_, i) => {
        const a = (i / 26) * Math.PI * 2, r = 90 + (i % 5) * 26
        return (
          <motion.span key={i} className="absolute left-1/2 top-1/2 text-lg"
            initial={{ opacity: 0, x: 0, y: 0, scale: 0 }}
            animate={{ opacity: [0, 1, 0], x: Math.cos(a) * r, y: Math.sin(a) * r, scale: [0, 1, 0.5] }}
            transition={{ duration: 1.5, delay: (i % 6) * 0.05, ease: 'easeOut' }}>
            {['💗', '🎉', '✨', '🩷'][i % 4]}
          </motion.span>
        )
      })}
    </div>
  )
}

export default function MakeWish() {
  const [lit, setLit] = useState(Array(CANDLE_N).fill(true))
  const [wished, setWished] = useState(false)
  const [listening, setListening] = useState(false)
  const [hint, setHint] = useState('')
  const [blows, setBlows] = useState(0)
  const [finished, setFinished] = useState(false)
  const [target, setTarget] = useState(5)

  const micRef = useRef(null)
  const countRef = useRef(0)
  const targetRef = useRef(5)
  const armedRef = useRef(true)
  const doneRef = useRef(false)
  const relightRef = useRef(null)

  const allOut = wished

  const teases = [
    'ha! they flickered back keep blowing…',
    'nope, still lit! these are magic candles ',
    'so close… blow harder! ',
    'they’re being stubborn today ',
    'almost! one more big puff ',
  ]

  const stopMic = () => {
    if (micRef.current) { micRef.current.stop(); micRef.current = null }
    setListening(false)
  }

  const registerPuff = () => {
    if (doneRef.current) return
    countRef.current += 1
    const c = countRef.current
    setBlows(c)
    setLit(Array(CANDLE_N).fill(false)) // puff them out
    if (c >= targetRef.current) {
      doneRef.current = true
      setFinished(true)
      if (relightRef.current) { clearTimeout(relightRef.current); relightRef.current = null }
      setHint('')
      stopMic()
      setLit(Array(CANDLE_N).fill(false))
      setTimeout(() => setWished(true), 500)
    } else {
      setHint(teases[(c - 1) % teases.length])
      if (relightRef.current) clearTimeout(relightRef.current)
      relightRef.current = setTimeout(() => { if (!doneRef.current) setLit(Array(CANDLE_N).fill(true)) }, 750) // relight!
    }
  }

  const startMic = async () => {
    if (listening) return
    doneRef.current = false
    countRef.current = 0
    armedRef.current = true
    targetRef.current = 5 + Math.round(Math.random()) // 5 or 6
    setTarget(targetRef.current)
    setBlows(0)
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const AC = window.AudioContext || window.webkitAudioContext
      const actx = new AC()
      const src = actx.createMediaStreamSource(stream)
      const analyser = actx.createAnalyser(); analyser.fftSize = 512
      src.connect(analyser)
      const data = new Uint8Array(analyser.fftSize)
      setListening(true); setHint('listening… now give it a big puff! 💨')
      micRef.current = { stop: () => { stream.getTracks().forEach((t) => t.stop()); actx.close?.() } }
      const loop = () => {
        if (!micRef.current) return
        analyser.getByteTimeDomainData(data)
        let sum = 0
        for (let i = 0; i < data.length; i++) { const v = (data[i] - 128) / 128; sum += v * v }
        const rms = Math.sqrt(sum / data.length)
        if (rms > 0.15 && armedRef.current) { armedRef.current = false; registerPuff() }
        else if (rms < 0.07) { armedRef.current = true }
        if (micRef.current) requestAnimationFrame(loop)
      }
      loop()
      setTimeout(() => { if (micRef.current && !doneRef.current) { stopMic(); setHint('mic timed out — tap 🎤 to try again 💨') } }, 30000)
    } catch {
      setHint('please allow mic access, then tap 🎤 again 💨')
    }
  }

  const relight = () => {
    doneRef.current = false; countRef.current = 0; setBlows(0)
    if (relightRef.current) { clearTimeout(relightRef.current); relightRef.current = null }
    setWished(false); setFinished(false); setLit(Array(CANDLE_N).fill(true)); setHint('')
  }

  return (
    <section id="wish" className="relative w-full overflow-hidden py-24 md:py-28 px-6 md:px-12 font-sans"
      style={{ background: 'linear-gradient(#fff5f8, #ffe4ee)' }}>
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-20 bg-gradient-to-b from-[#fdf1f4] to-transparent" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-24 bg-gradient-to-t from-[#fdf1f4] to-transparent" />
      <div className="max-w-3xl mx-auto relative z-10 flex flex-col items-center text-center">
        <SectionHead kicker="before you go…" title="Make a" accent="Wish"
          sub={`Blow out the candles, ${HER_NAME} — fair warning, these ones are a little magic. 🔥`} />

        <div className="relative mt-2">
          <AnimatePresence>{wished && <Burst />}</AnimatePresence>

          {/* candles */}
          <div className="absolute -top-16 left-1/2 z-20 flex -translate-x-1/2 gap-3">
            {lit.map((on, i) => (
              <span key={i} className="flex flex-col items-center">
                <span className="relative mb-0.5 flex h-5 w-3 items-end justify-center">
                  {on && !finished ? (
                    <motion.span className="h-4 w-2.5 rounded-full"
                      initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 300, damping: 12 }}
                      style={{ background: 'radial-gradient(circle at 50% 30%, #fff3b0, #ff9d3c 60%, #ff5e3a)', boxShadow: '0 0 12px 4px rgba(255,157,60,0.7)', animation: 'flameFlicker 0.5s ease-in-out infinite' }} />
                  ) : (
                    <span className="h-3 w-1 rounded-full bg-gray-400/50" style={{ animation: 'smokeRise 1.2s ease-out forwards' }} />
                  )}
                </span>
                <span className="h-1 w-1 rounded-full bg-[#3a2718]" />
                <span className="h-9 w-2 rounded-[2px]" style={{ background: candleColors[i % candleColors.length] }} />
              </span>
            ))}
          </div>

          <div className="relative w-[300px] sm:w-[360px]">
            <div className="relative mx-auto h-11 w-[88%] rounded-t-[18px]" style={{ background: '#fff2f7' }}>
              <div className="absolute -bottom-2 left-0 right-0 flex justify-around">
                {Array.from({ length: 7 }).map((_, k) => (<span key={k} className="h-4 w-5 rounded-b-full" style={{ background: '#fff2f7' }} />))}
              </div>
            </div>
            <div className="relative -mt-1 h-28 w-full overflow-hidden rounded-b-[12px]" style={{ background: 'linear-gradient(#f9c6d8, #f2a8c0)' }}>
              {Array.from({ length: 14 }).map((_, k) => (
                <span key={k} className="absolute h-1.5 w-3 rounded-full"
                  style={{ left: `${8 + (k * 37) % 84}%`, top: `${30 + (k * 53) % 55}%`, background: candleColors[k % candleColors.length], transform: `rotate(${(k * 47) % 180}deg)` }} />
              ))}
              <div className="absolute left-1/2 top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/85 font-display text-2xl text-brand-deep shadow">{AGE}</div>
            </div>
            <div className="mx-auto mt-1 h-3 w-[112%] -translate-x-[6%] rounded-full bg-[#ecdccb] shadow-[0_10px_20px_-8px_rgba(61,31,45,0.4)]" />
          </div>
        </div>

        {!finished ? (
          <div className="mt-10 flex flex-col items-center gap-3">
            <button onClick={startMic} disabled={listening}
              className="rounded-full bg-brand-dark px-8 py-3 font-script text-2xl text-white shadow-lg transition hover:bg-brand-accent disabled:opacity-70">
              {listening ? `blow! 💨  (${blows}/${target})` : 'blow out the candles 🎤'}
            </button>
            {hint && <p className="font-script text-lg text-brand-medium/70">{hint}</p>}
          </div>
        ) : (
          <AnimatePresence>
            {wished && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-10">
                <p className="font-love text-4xl text-brand-deep md:text-5xl">Happy Birthday, {HER_NAME}!</p>
                <p className="mx-auto mt-3 max-w-md font-script text-2xl leading-snug text-brand-dark">
                  You did it! Your wish is safe with me — I hope it comes true, and I’ll help however I can. 💗
                </p>
                <button onClick={relight} className="mt-5 font-script text-xl text-brand-accent transition hover:text-brand-deep">light them again 🔥</button>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    </section>
  )
}
