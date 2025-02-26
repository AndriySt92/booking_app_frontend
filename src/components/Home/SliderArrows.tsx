interface Props {
  onClick?: () => void
}

export const CustomPrevArrow = ({ onClick }: Props) => (
  <div
    onClick={onClick}
    className="absolute left-[6px] top-1/2 -translate-y-1/2 z-10 bg-black bg-opacity-40 text-white w-10 h-10 flex items-center justify-center rounded-full cursor-pointer hover:bg-opacity-60 transition -scale-x-100">
    &#10140;
  </div>
)

export const CustomNextArrow = ({ onClick }: Props) => (
  <div
    onClick={onClick}
    className="absolute right-[6px] top-1/2 -translate-y-1/2 z-10 bg-black bg-opacity-40 text-white w-10 h-10 flex items-center justify-center rounded-full cursor-pointer hover:bg-opacity-60 transition">
    &#10140;
  </div>
)
