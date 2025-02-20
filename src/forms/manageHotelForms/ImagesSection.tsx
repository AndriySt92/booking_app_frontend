import { useFormContext } from 'react-hook-form'
import { IHotelFormData } from '../../types/hotelTypes'
import { Error, Input } from '../../components'

const ImagesSection = () => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext<IHotelFormData>()

  const existingImageUrls = watch('imageUrls')

  const handleDelete = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    imageUrl: string,
  ) => {
    event.preventDefault()
    setValue(
      'imageUrls',
      existingImageUrls.filter((url) => url !== imageUrl),
    )
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Images</h2>
      <div className="border rounded p-4 flex flex-col gap-4">
        {existingImageUrls && (
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-1 sm:gap-3">
            {existingImageUrls.map((url) => (
              <div className="relative group" key={url}>
                <img src={url} className="min-h-full object-cover" />
                <button
                  onClick={(event) => handleDelete(event, url)}
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 text-white">
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}

        <Input
          register={register}
          name="imageFiles"
          multiple
          accept="image/*"
          type="file"
          validation={{
            validate: (imageFiles) => {
              const totalLength = imageFiles.length + (existingImageUrls?.length || 0)

              if (totalLength < 5) {
                return 'At least five images should be added'
              }

              if (totalLength > 20) {
                return 'Total number of images cannot be more than 20'
              }

              return true
            },
          }}
          inputClassNames="!border-none"
        />
      </div>
      {errors.imageFiles && <Error message={errors.imageFiles.message as string} size="small" />}
    </div>
  )
}

export default ImagesSection
