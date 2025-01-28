import { Footer, Header, Hero, SearchBar } from '../'

interface Props {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Hero />
      <div className="container mx-auto">
        <SearchBar />
      </div>

      <div className="container mx-auto py-10 sm:py-14 flex-1 h-full">
        <div className="w-full">{children}</div>
      </div>
      <Footer />
    </div>
  )
}

export default Layout
