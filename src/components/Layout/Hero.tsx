import { memo, useMemo } from 'react'
import cn from 'classnames'

const ANIMATION_CONFIG = {
  elementCount: 10,
  animationDelay: 0.2,
  elementColor: 'bg-white/10',
  sizeVariants: [
    'w-8 h-8',
    'w-12 h-12',
    'w-8 h-8 lg:w-16 lg:h-16',
    'w-12 h-12 lg:w-20 lg:h-20',
    'w-16 h-16 lg:w-24 lg:h-24',
  ],
}

const Hero = memo(() => {
  const { elementCount, animationDelay, elementColor, sizeVariants } = ANIMATION_CONFIG

  const elements = useMemo(
    () =>
      Array.from({ length: elementCount }).map((_, i) => ({
        size: sizeVariants[Math.floor(Math.random() * sizeVariants.length)],
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: i * animationDelay,
      })),
    [],
  )

  return (
    <div className="relative z-10 bg-gradient-to-br from-blue-800 to-blue-600 pb-28 pt-16 md:pb-32 md:pt-24 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {elements.map((el, i) => (
          <div
            key={i}
            className={cn('absolute', 'rounded-full', 'animate-float', el.size, elementColor)}
            style={{
              left: `${el.left}%`,
              top: `${el.top}%`,
              animationDelay: `${el.delay}s`,
              willChange: 'transform, opacity',
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl text-center mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-100 mb-1 lg:mb-6 animate-slide-up">
            Find Your Next Adventure
          </h1>

          <p className="text-xl md:text-2xl text-blue-100 mb-8 animate-fade-in delay-100">
            Discover perfect stays at unbeatable prices
          </p>
        </div>
      </div>
    </div>
  )
})

export default Hero
