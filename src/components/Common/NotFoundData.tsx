import notFoundImageUrl from '../../assets/notFound.svg'

interface Props {
  title: string
  description?: string
}

const NotFoundData = ({ title, description }: Props) => {
  return (
    <div className="flex flex-col justify-center gap-2">
      <img
        src={notFoundImageUrl}
        alt="No hotels found"
        className="mx-auto w-full h-full max-w-[500px] max-h-[500px]"
      />
      <div className="text-bold text-2xl text-center">{title}</div>
      <div className="text-semibold text-xl text-center">{description}</div>
    </div>
  )
}

export default NotFoundData
