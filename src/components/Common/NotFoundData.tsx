import notFoundImageUrl from '../../assets/notFound.svg'
import { Title, Text } from '../'

interface Props {
  title: string
  description?: string
}

const NotFoundData = ({ title, description }: Props) => {
  return (
    <div className="flex flex-col justify-center gap-3">
      <img
        src={notFoundImageUrl}
        alt="No hotels found"
        className="mx-auto w-full h-full max-w-[500px] max-h-[500px] mb-5"
      />
      <Title
        className="text-pretty"
        as="h3"
        align="center"
        weight="semibold"
        color="gray"
        size="md">
        {title}
      </Title>
      <Text className="mb-5" align="center" as="p" size="lg">
        {description}
      </Text>
    </div>
  )
}

export default NotFoundData
