import { useMutation } from "react-query"
import { useAppContext } from "../contexts/AppContext"
import { addMyHotel } from "../services/my-hotelApi"

const useCreateHotel = () => {
    const { showToast } = useAppContext()

    return useMutation(addMyHotel, {
      onSuccess: () => {
        showToast({ message: 'Hotel saved!', type: 'SUCCESS' })
      },
      onError: (error: Error) => {
        let message = error.message || 'Error saving hotel'
        showToast({ message, type: 'ERROR' })
      },
    })
}

export default useCreateHotel