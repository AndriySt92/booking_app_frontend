export const hotelStars = ['5 Stars', '4 Stars', '3 Stars', '2 Starts', '1 Starts']

export const hotelTypes = [
  'Budget',
  'Boutique',
  'Luxury',
  'Ski Resort',
  'Business',
  'Family',
  'Romantic',
  'Hiking Resort',
  'Cabin',
  'Beach Resort',
  'Golf Resort',
  'Motel',
  'All Inclusive',
  'Pet Friendly',
  'Self Catering',
]

export const hotelFacilities = [
  'Free WiFi',
  'Parking',
  'Airport Shuttle',
  'Family Rooms',
  'Non-Smoking Rooms',
  'Outdoor Pool',
  'Spa',
  'Fitness Center',
]

export const hotelMaxPrice = [
  { label: '50', value: 50 },
  { label: '100', value: 100 },
  { label: '200', value: 200 },
  { label: '300', value: 300 },
  { label: '500', value: 500 },
]

export const initialFilterValue = {
  stars: [],
  facilities: [],
  types: [],
  maxPrice: null,
}

export const sortOptions = [
  { value: 'starRating', label: 'Star Rating' },
  { value: 'pricePerNightAsc', label: 'Price Per Night (low to high)' },
  { value: 'pricePerNightDesc', label: 'Price Per Night (high to low)' },
]
