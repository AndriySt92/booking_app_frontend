import notFoundImageUrl from '../../assets/notFound.svg'

interface Props {
  title: string
}

const NotFoundData = ({ title }: Props) => {
  return (
    <div className="mx-auto">
      <img
        src={notFoundImageUrl}
        alt="No hotels found"
        className="mx-auto w-full h-full max-w-[500px] max-h-[500px]"
      />
      <div className="text-semibold text-xl text-center">{title}</div>
    </div>
  )
}

export default NotFoundData
