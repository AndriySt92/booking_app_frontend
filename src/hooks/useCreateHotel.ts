import { useMutation, useQueryClient } from "react-query"
import { useAppContext } from "../contexts/AppContext"
import { addMyHotel } from "../services/my-hotelApi"

const useCreateHotel = () => {
    const queryClient = useQueryClient()
    const { showToast } = useAppContext()

    return useMutation(addMyHotel, {
      onSuccess: () => {
        showToast({ message: 'Hotel saved!', type: 'SUCCESS' })

        queryClient.invalidateQueries('fetchMyHotels')  
        queryClient.invalidateQueries('fetchHotels')    
      },
      onError: (error: Error) => {
        const message = error.message || 'Error saving hotel'
        showToast({ message, type: 'ERROR' })
      },
    })
}

export default useCreateHotel