import { useRef } from 'react'
import { Footer, Header, Hero, SearchBar } from '../'

interface Props {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  const contentRef = useRef<HTMLDivElement>(null)
  console.log('Layout')
  return (
    <div className="flex flex-col min-h-screen">
      <Header scrollToContent={contentRef} />
      <Hero />
      <div className="container mx-auto relative z-20">
        <SearchBar />
      </div>

      <div
        ref={contentRef}
        className="container mx-auto py-10 sm:py-14 flex-1 h-full scroll-mt-[240px] md:scroll-mt-[50px]">
        <div className="w-full">{children}</div>
      </div>
      <Footer />
    </div>
  )
}

export default Layout
