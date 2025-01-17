import { PhotoProvider, PhotoView } from 'react-photo-view'

interface Props {
  images: string[]
}

const Gallery = ({ images }: Props) => {
  const numberRestImagesMobile = images.length - 6 // Number of hidden images for screens under `sm`
  const numberRestImagesDesktop = images.length - 9 // Number of hidden images for screens above `sm`

  return (
    <PhotoProvider>
      <div className="grid gap-2 sm:grid-cols-12 sm:grid-rows-5 sm:gap-4 grid-cols-10 grid-rows-5">
        {images.map((image, index) => (
          <div
            key={image}
            className={`group 
            ${index === 0 ? 'sm:col-span-8 sm:row-span-4 col-span-10 row-span-4' : ''} 
            ${
              index === 1 ? 'sm:col-span-4 sm:row-span-2 sm:col-start-9 col-span-2 row-start-5' : ''
            } 
            ${
              index === 2
                ? 'sm:col-span-4 sm:row-span-2 sm:col-start-9 sm:row-start-3 col-span-2 col-start-3 row-start-5'
                : ''
            } 
            ${index > 2 ? 'sm:col-span-2 sm:row-start-5 sm:col-start-auto col-span-2' : ''} 
            ${
              index > 5
                ? 'hidden sm:block sm:col-span-2 sm:row-start-5' /* Hide images after the 6th for screens under `sm` */
                : ''
            } 
            ${
              index > 8
                ? 'block sm:hidden sm:col-span-2 sm:row-start-5' /* Hide images after the 9th for screens above `sm` */
                : ''
            } 
          `}>
            {index === 5 && images.length > 6 ? (
              // Overlay for hidden images on screens under `sm`
              <PhotoView src={image}>
                <div className="relative w-full h-full rounded-md cursor-pointer">
                  <img
                    src={image}
                    alt={`Image ${index + 1}`}
                    className="rounded-md w-full h-full object-cover object-center opacity-50 sm:opacity-100 group-hover:animate-flash"
                  />
                  <div className="absolute inset-0 flex items-center justify-center rounded-md bg-black bg-opacity-50 sm:hidden">
                    <span className="text-white text-lg font-bold">+{numberRestImagesMobile}</span>
                  </div>
                </div>
              </PhotoView>
            ) : index === 8 && images.length > 9 ? (
              // Overlay for hidden images on screens above `sm`
              <PhotoView src={image}>
                <div className="relative w-full h-full rounded-md cursor-pointer">
                  <img
                    src={image}
                    alt={`Image ${index + 1}`}
                    className="rounded-md w-full h-full object-cover object-center opacity-50 group-hover:animate-flash"
                  />
                  <div className="absolute inset-0 items-center justify-center rounded-md bg-black bg-opacity-50 hidden sm:flex">
                    <span className="text-white text-lg font-bold">+{numberRestImagesDesktop}</span>
                  </div>
                </div>
              </PhotoView>
            ) : (
              <PhotoView src={image}>
                <img
                  src={image}
                  alt={`Image ${index + 1}`}
                  className="rounded-md w-full h-full object-cover object-center opacity-100 group-hover:opacity-100 group-hover:animate-flash cursor-pointer"
                />
              </PhotoView>
            )}
          </div>
        ))}
      </div>
    </PhotoProvider>
  )
}

export default Gallery
