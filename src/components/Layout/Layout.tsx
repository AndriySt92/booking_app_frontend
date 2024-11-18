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
      <div className="container mx-auto py-10 flex-1 h-full flex flex-col justify-center items-center">{children}</div>
      <Footer />
    </div>
  )
}

export default Layout
