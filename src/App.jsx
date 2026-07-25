import Preloader from './components/Preloader'
import ScrollProgress from './components/ScrollProgress'
import Hero from './components/Hero'
import Letter from './components/Letter'
import SeamBloom from './components/SeamBloom'
import SectionReveal from './components/SectionReveal'
import Gallery from './components/Gallery'
import Reasons from './components/Reasons'
import TinyLetters from './components/TinyLetters'
import Montage from './components/Montage'
import MakeWish from './components/MakeWish'

export default function App() {
  return (
    <>
      <div aria-hidden className="grain-overlay pointer-events-none fixed inset-0 z-[45] opacity-[0.04]" />
      <Preloader />
      <ScrollProgress />

      <main className="relative w-full overflow-x-clip">
        <Hero />
        <SeamBloom />
        <Letter />
        <SeamBloom only="p4" dense />

        <SectionReveal><Gallery /></SectionReveal>
        <Reasons />
        <SectionReveal><TinyLetters /></SectionReveal>
        <Montage />
        <SectionReveal><MakeWish /></SectionReveal>
      </main>

      <footer className="bg-brand-plum text-brand-rose/80 py-14 px-6 text-center">
        <p className="font-love text-4xl text-brand-light mb-2">with my whole heart</p>
        <p className="font-script text-2xl">made just for you 🌸</p>
      </footer>
    </>
  )
}
