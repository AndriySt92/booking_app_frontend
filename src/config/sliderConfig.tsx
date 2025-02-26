import { CustomNextArrow, CustomPrevArrow } from '../components/Home/SliderArrows'

export const sliderSettings = {
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 3,
  autoplay: true,
  autoplaySpeed: 3000,
  responsive: [
    {
      breakpoint: 1279,
      settings: { slidesToShow: 2, slidesToScroll: 2 },
    },
    {
      breakpoint: 1023,
      settings: { slidesToShow: 1, slidesToScroll: 1 },
    },
  ],
  prevArrow: <CustomPrevArrow />,
  nextArrow: <CustomNextArrow />,
}
