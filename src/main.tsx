import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import 'react-datepicker/dist/react-datepicker.css'
import 'react-photo-view/dist/react-photo-view.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { AppContextProvider } from './contexts/AppContext.tsx'
import { SearchContextProvider } from './contexts/SearchContext.tsx'
import { BookingContextProvider } from './contexts/BookingContext.tsx'
import { FavoritesContextProvider } from './contexts/FavoritesContext.tsx';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
    },
  },
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <AppContextProvider>
      <SearchContextProvider>
        <BookingContextProvider>
        <FavoritesContextProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </FavoritesContextProvider>
        </BookingContextProvider>
      </SearchContextProvider>
    </AppContextProvider>
  </QueryClientProvider>,
)
