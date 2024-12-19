export const sliderSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1279,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 1023,
        settings: { slidesToShow: 1 },
      },
    ],
  }