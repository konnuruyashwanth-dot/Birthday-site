import sectionBg from '../assets/letter-paper.jpg'

const paragraphs = [
  'Finally, the day you’ve been waiting for is here — your 21st birthday. ❤️ Happiest birthday, babyyyy!',
  'I’ve been waiting for this day too, because I know how much birthdays mean to you… and you mean so much to me.',
  'It’s crazy how different this birthday feels. Last year we celebrated together, and I still smile whenever I think about those moments — we laughed, clicked so many pictures, and made memories I’ll always hold close.',
  'Thank you for coming into my life and making it brighter. Thank you for being my safe place, my biggest comfort, and the person who makes even the simplest moments feel beautiful.',
  'I hope 21 treats you kindly — happiness that lasts, peace when you need it, and success in everything you work so hard for. Keep smiling the way you always do.',
  'Never forget how strong, kind, and capable you are. I’ll always be rooting for you, through every high and every low.',
  'So today, Enjoy the day of yours, click some aesthetic picsss, and make the most of it. I love you babyyyyy! ',
  'Happy 21st birthday once again, my love. I can’t wait to make so many more memories with you.',
]

export default function Letter() {
  return (
    <section id="letter" className="relative w-full overflow-hidden" style={{ backgroundColor: '#efe4cf' }}>
      {/* full-bleed image — covers the whole section edge to edge, no side space */}
      <div
        className="relative w-full [container-type:inline-size]"
        style={{
          aspectRatio: '2048 / 1366',
          backgroundImage: `url(${sectionBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* letter written into the open cream space (center-left) */}
        <div
          className="absolute flex flex-col justify-center overflow-hidden text-left"
          style={{ left: '13.5%', top: '24%', width: '49%', height: '60%', color: '#3a2718' }}
        >
          <p className="font-love leading-none mb-[1.1cqw] text-[2.7cqw]" style={{ color: '#6b2f2a' }}>My love,</p>
          <div className="space-y-[0.75cqw] font-script text-[1.32cqw] leading-[1.16]">
            {paragraphs.map((p, i) => <p key={i}>{p}</p>)}
            <p style={{ color: '#6b2f2a' }}>I love you endlessly. ❤️</p>
          </div>
          <p className="mt-[0.9cqw] text-right font-love text-[2cqw]" style={{ color: '#7a3b2a' }}>forever yours 💗</p>
        </div>
      </div>
    </section>
  )
}
