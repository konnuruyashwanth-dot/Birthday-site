import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { SectionHead } from './partials'
import { AGE } from '../config'

const heartPattern = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='46' height='46'%3E%3Cpath d='M23 33c-7.2-4.7-12-8.7-12-14a5.3 5.3 0 0 1 12-3.3A5.3 5.3 0 0 1 35 19c0 5.3-4.8 9.3-12 14z' fill='%23e0729a' fill-opacity='0.11'/%3E%3C/svg%3E")`

const raw = [
  'Open me when you doubt yourself: you are so much more than enough. You always were.',
  'Open me when you’re tired: rest. The world can wait. I’ve got you.',
  'Open me when you miss me: close your eyes. I’m already thinking of you.',
  'Open me when you’re happy: hold onto this. You deserve every bit of it.',
  'Open me when you’re sad: it won’t last forever, and you won’t face it alone.',
  'Open me when you can’t sleep: breathe. I’m your favourite lullaby, remember?',
  'Open me when you feel small: I have seen your courage. It is enormous.',
  'Open me when you’re anxious: one thing at a time, my love. I believe in you.',
  'Open me when you need a laugh: think of that ridiculous thing we still quote.',
  'Open me when it rains: dance in it. Then come home and I’ll dry your hair.',
  'Open me when you’re proud: I’m prouder. Always have been.',
  'Open me when you forget how loved you are: read every section again.',
  'Open me on a good morning: good morning, most beautiful person alive.',
  'Open me when you’re far away: distance is just a number I refuse to respect.',
  'Open me when you’re unsure of us: I’m not going anywhere. This is home.',
  'Open me when you feel ugly: you, entirely, exactly as you are — perfect.',
  'Open me when you’re overwhelmed: put it down. Come here. Just be.',
  'Open me when you need courage: you’ve survived every hard day so far. All of them.',
  'Open me on our anniversary: I’d choose you again. And again. And again.',
  'Open me when you’re old and grey: still you. Still mine. Still stunning.',
  'Open me any time at all: I love you. That’s the whole letter.',
]
const letters = raw.map((t) => {
  const [head, ...rest] = t.split(': ')
  return { prompt: head.replace(/^Open me /, ''), body: rest.join(': ') }
})

const FOIL = '#e7a8c0' // single scratch colour

function ScratchCard({ i, prompt, body }) {
  const wrapRef = useRef(null)
  const canvasRef = useRef(null)
  const scratching = useRef(false)
  const lastW = useRef(0)

  useEffect(() => {
    const wrap = wrapRef.current
    const canvas = canvasRef.current
    if (!wrap || !canvas) return
    const ctx = canvas.getContext('2d')
    const dpr = window.devicePixelRatio || 1
    let w = 0, h = 0, revealed = false

    const paintCover = () => {
      ctx.globalCompositeOperation = 'source-over'
      ctx.fillStyle = FOIL
      ctx.fillRect(0, 0, w, h)
      ctx.fillStyle = 'rgba(122,47,80,0.5)'
      ctx.font = '600 15px Caveat, ui-rounded, sans-serif'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText('scratch to reveal', w / 2, h / 2)
      ctx.globalCompositeOperation = 'destination-out'
    }

    const size = () => {
      const cw = wrap.clientWidth, ch = wrap.clientHeight
      if (!cw || !ch || Math.abs(cw - lastW.current) < 2) return
      lastW.current = cw
      w = cw; h = ch
      canvas.width = cw * dpr; canvas.height = ch * dpr
      canvas.style.width = cw + 'px'; canvas.style.height = ch + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      revealed = false
      paintCover()
    }

    const pos = (e) => {
      const r = canvas.getBoundingClientRect()
      return { x: e.clientX - r.left, y: e.clientY - r.top }
    }
    const scratch = (e) => {
      if (!scratching.current || revealed) return
      const { x, y } = pos(e)
      ctx.beginPath(); ctx.arc(x, y, 20, 0, Math.PI * 2); ctx.fill()
    }
    const down = (e) => { scratching.current = true; canvas.setPointerCapture?.(e.pointerId); scratch(e) }
    const up = () => {
      scratching.current = false
      if (revealed) return
      const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data
      let clear = 0
      for (let k = 3; k < data.length; k += 40) if (data[k] === 0) clear++
      if (clear / (data.length / 40) > 0.45) { revealed = true; ctx.clearRect(0, 0, w, h) }
    }

    size()
    canvas.addEventListener('pointerdown', down)
    canvas.addEventListener('pointermove', scratch)
    window.addEventListener('pointerup', up)
    const ro = new ResizeObserver(size)
    ro.observe(wrap)
    return () => {
      canvas.removeEventListener('pointerdown', down)
      canvas.removeEventListener('pointermove', scratch)
      window.removeEventListener('pointerup', up)
      ro.disconnect()
    }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, delay: (i % 6) * 0.05 }}
      className="flex h-full flex-col rounded-2xl bg-white p-5 shadow-[0_16px_34px_-16px_rgba(61,31,45,0.35)] ring-1 ring-brand-accent/15">
      <p className="mb-3 flex min-h-[3.25rem] items-center font-script text-2xl leading-tight text-brand-deep">
        Open {prompt}
      </p>
      <div ref={wrapRef} className="relative mt-auto h-28 overflow-hidden rounded-xl ring-1 ring-brand-accent/15">
        <div className="absolute inset-0 flex items-center justify-center bg-[#fff6fa] px-4 text-center">
          <p className="font-script text-xl leading-snug text-brand-dark">{body}</p>
        </div>
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full cursor-pointer touch-none" />
      </div>
    </motion.div>
  )
}

export default function TinyLetters() {
  return (
    <section id="tinyletters" className="relative w-full overflow-hidden py-24 md:py-28 px-6 md:px-12 font-sans"
      style={{ backgroundColor: '#fce3ee', backgroundImage: heartPattern, backgroundSize: '46px 46px' }}>
      <div aria-hidden className="grain-overlay pointer-events-none absolute inset-0 opacity-[0.05]" />
      <div aria-hidden className="pointer-events-none absolute -top-16 -left-10 h-72 w-72 rounded-full bg-[#ffd0e2]/55 blur-[90px]" />
      <div aria-hidden className="pointer-events-none absolute bottom-0 -right-10 h-72 w-72 rounded-full bg-[#ffe6b8]/40 blur-[90px]" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-20 bg-gradient-to-b from-[#fdf1f4] to-transparent" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-20 bg-gradient-to-t from-[#fdf1f4] to-transparent" />
      <div className="max-w-6xl mx-auto relative z-10">
        <SectionHead kicker="a little scratch of love" title={`${AGE} Tiny`} accent="Letters"
          sub="Find the feeling you’re having, then scratch the card to uncover the note hiding underneath." />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
          {letters.map((l, i) => (
            <ScratchCard key={i} i={i} prompt={l.prompt} body={l.body} />
          ))}
        </div>
      </div>
    </section>
  )
}
