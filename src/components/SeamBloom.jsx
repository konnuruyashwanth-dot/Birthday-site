import pink1 from '../assets/pink1.png'
import pink2 from '../assets/pink2.png'
import pink3 from '../assets/pink3.png'
import pink4 from '../assets/pink4.png'

// a garland of flowers that sits ON the seam between two sections,
// overlapping both so they read as one continuous page
const garland = [
  { s: pink2, l: '4%',  w: '9%',  t: '-66px', r: 8 },
  { s: pink4, l: '13%', w: '11%', t: '-52px', r: -6 },
  { s: pink1, l: '22%', w: '8%',  t: '-92px', r: 10 },
  { s: pink3, l: '31%', w: '11%', t: '-58px', r: -9 },
  { s: pink2, l: '40%', w: '12%', t: '-72px', r: 6 },
  { s: pink4, l: '50%', w: '11%', t: '-50px', r: -4 },
  { s: pink1, l: '60%', w: '8%',  t: '-94px', r: 12 },
  { s: pink3, l: '69%', w: '11%', t: '-60px', r: -10 },
  { s: pink2, l: '78%', w: '12%', t: '-72px', r: 7 },
  { s: pink4, l: '87%', w: '11%', t: '-52px', r: -6 },
  { s: pink1, l: '96%', w: '8%',  t: '-88px', r: 9 },
]

const MAP = { p1: pink1, p2: pink2, p3: pink3, p4: pink4 }

export default function SeamBloom({ only, dense = false }) {
  const forced = only ? MAP[only] : null
  const count = 26
  const items = dense
    ? Array.from({ length: count }, (_, i) => ({
        l: `${-3 + i * (106 / (count - 1))}%`,
        w: `${9 + (i % 3) * 2}%`,
        t: `${-48 - (i % 4) * 12}px`,
        r: (i % 2 ? 1 : -1) * (3 + (i % 5) * 2),
        s: pink4,
      }))
    : garland
  return (
    <div className="relative z-40 h-0 w-full overflow-visible" aria-hidden>
      {/* soft glow to melt the color line between the two sections */}
      <div
        className="pointer-events-none absolute left-0 w-full -translate-y-1/2"
        style={{ top: 0, height: '150px', background: 'radial-gradient(60% 100% at 50% 50%, rgba(255,229,238,0.65) 0%, transparent 70%)', filter: 'blur(6px)' }}
      />
      {/* the flowers straddling the seam */}
      {items.map((f, i) => (
        <img
          key={i}
          src={forced || f.s}
          alt=""
          loading="lazy"
          className="pointer-events-none absolute h-auto object-contain drop-shadow-[0_10px_18px_rgba(122,47,80,0.28)]"
          style={{ left: f.l, width: f.w, top: f.t, transform: `translateX(-50%) rotate(${f.r}deg)` }}
        />
      ))}
    </div>
  )
}
