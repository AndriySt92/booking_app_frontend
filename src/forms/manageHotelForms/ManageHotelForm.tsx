import { FormProvider, useForm } from 'react-hook-form'
import DetailsSection from './DetailsSection'
import { IHotel, IHotelFormData } from '../../types/hotelTypes'
import { useEffect } from 'react'
import { Button, LoadingButton } from '../../components'
import TypeSection from './TypeSection'
import FacilitiesSection from './FacilitiesSection'
import GuestsSection from './GuestsSection'
import ImagesSection from './ImagesSection'

interface Props {
  hotel?: IHotel
  onSave: (hotelFormData: FormData) => void
  isLoading: boolean
}

const ManageHotelForm = ({ onSave, isLoading, hotel }: Props) => {
  const formMethods = useForm<IHotelFormData>()
  const { handleSubmit, reset } = formMethods

  useEffect(() => {
    reset(hotel)
  }, [hotel, reset])

  const onSubmit = handleSubmit((formDataJson: IHotelFormData) => {
    const formData = new FormData()

    if (hotel) {
      formData.append('hotelId', hotel._id)
    }
    
    formData.append('name', formDataJson.name)
    formData.append('city', formDataJson.city)
    formData.append('country', formDataJson.country)
    formData.append('description', formDataJson.description)
    formData.append('type', formDataJson.type)
    formData.append('pricePerNight', formDataJson.pricePerNight.toString())
    formData.append('starRating', formDataJson.starRating.toString())
    formData.append('adultCount', formDataJson.adultCount.toString())
    formData.append('childCount', formDataJson.childCount.toString())

    formDataJson.facilities.forEach((facility, index) => {
      formData.append(`facilities[${index}]`, facility)
    })

    if (formDataJson.imageUrls) {
      formDataJson.imageUrls.forEach((url, index) => {
        formData.append(`imageUrls[${index}]`, url)
      })
    }

    Array.from(formDataJson.imageFiles).forEach((imageFile) => {
      formData.append(`imageFiles`, imageFile)
    })

    onSave(formData)
  })

  return (
    <FormProvider {...formMethods}>
      <form className="flex flex-col w-full gap-10" onSubmit={onSubmit}>
        <DetailsSection />
        <TypeSection />
        <FacilitiesSection />
        <GuestsSection />
        <ImagesSection />
        <span className="flex justify-end">
          {isLoading ? (
            <LoadingButton classes="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500">
              Saving...
            </LoadingButton>
          ) : (
            <Button
              btnType="submit"
              classes="bg-blue-600 text-white hover:bg-blue-500">
              Save
            </Button>
          )}
        </span>
      </form>
    </FormProvider>
  )
}

export default ManageHotelForm
