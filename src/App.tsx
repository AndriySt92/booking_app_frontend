import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Layout, Loader, SkeletonHotelList, SkeletonMyHotels } from './components'
import { useAppContext } from './hooks'
import { HotelDetails, Home, Search, SignIn } from './pages'

// Lazy-loaded components
const AddHotel = lazy(() => import('./pages/AddHotel'))
const Booking = lazy(() => import('./pages/Booking'))
const EditHotel = lazy(() => import('./pages/EditHotel'))
const MyBookings = lazy(() => import('./pages/MyBookings'))
const MyHotels = lazy(() => import('./pages/MyHotels'))
const SignUp = lazy(() => import('./pages/SignUp'))
const Favorites = lazy(() => import('./pages/Favorites'))

function App() {
  const { isLoggedIn } = useAppContext()

  return (
    <Routes>
      {/* Public routes */}
      <Route
        path="/"
        element={
          <Layout>
            <Home />
          </Layout>
        }
      />
      <Route
        path="/search"
        element={
          <Layout>
            <Search />
          </Layout>
        }
      />
      <Route
        path="/detail/:hotelId"
        element={
          <Layout>
            <HotelDetails />
          </Layout>
        }
      />
      <Route
        path="/sign-in"
        element={
          <Layout>
            <SignIn />
          </Layout>
        }
      />
      <Route
        path="/sign-up"
        element={
          <Layout>
            <Suspense fallback={<Loader />}>
              <SignUp />
            </Suspense>
          </Layout>
        }
      />

      {/* Protected routes */}
      {isLoggedIn && (
        <>
          <Route
            path="/hotel/:hotelId/booking"
            element={
              <Layout>
                <Suspense fallback={<Loader />}>
                  <Booking />
                </Suspense>
              </Layout>
            }
          />
          <Route
            path="/add-hotel"
            element={
              <Layout>
                <Suspense fallback={<Loader />}>
                  <AddHotel />
                </Suspense>
              </Layout>
            }
          />
          <Route
            path="/edit-hotel/:hotelId"
            element={
              <Layout>
                <Suspense fallback={<Loader />}>
                  <EditHotel />
                </Suspense>
              </Layout>
            }
          />
          <Route
            path="/my-hotels"
            element={
              <Layout>
                <Suspense fallback={<SkeletonMyHotels />}>
                  <MyHotels />
                </Suspense>
              </Layout>
            }
          />
          <Route
            path="/my-bookings"
            element={
              <Layout>
                <Suspense fallback={<SkeletonHotelList />}>
                  <MyBookings />
                </Suspense>
              </Layout>
            }
          />
          <Route
            path="/favorites"
            element={
              <Layout>
                <Suspense fallback={<SkeletonHotelList />}>
                  <Favorites />
                </Suspense>
              </Layout>
            }
          />
        </>
      )}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}

export default App
