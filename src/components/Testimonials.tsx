import * as React from 'react';
import { useState, useRef } from 'react';
import { CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Testimo3d from './ModelsComponents/TestModels/Testimo3d';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote:
      "Track Flow has completely transformed our delivery operations. We've cut costs by 25% and improved our on-time delivery rate to 98%.",
    name: 'Maria Rodriguez',
    role: 'Operations Manager',
    company: 'Express Logistics',
    companyUrl: 'https://expresslogistics.example.com',
    avatarUrl: '/assets/avatars/maria.webp',
  },
  {
    quote:
      "The real-time tracking and route optimization features have saved us countless hours every week. It's an absolute game-changer.",
    name: 'David Chen',
    role: 'Logistics Director',
    company: 'Swift Freight Co.',
    companyUrl: 'https://swiftfreight.example.com',
    avatarUrl: '/assets/avatars/david.webp',
  },
  {
    quote:
      'We’ve seen a 40% drop in delivery delays since using Track Flow. The analytics dashboard is intuitive and incredibly insightful.',
    name: 'Lena Hart',
    role: 'Delivery Lead',
    company: 'Greenmile Couriers',
    companyUrl: 'https://greenmile.example.com',
    avatarUrl: '/assets/avatars/lena.webp',
  },
  {
    quote:
      'Setup was seamless and support has been excellent. It helped streamline our fleet management overnight.',
    name: 'James Parker',
    role: 'Fleet Manager',
    company: 'TransMove Solutions',
    companyUrl: 'https://transmove.example.com',
    avatarUrl: '/assets/avatars/james.webp',
  },
  {
    quote:
      'Track Flow lets us scale without the usual headaches. The mobile compatibility is perfect for our field teams.',
    name: 'Priya Nair',
    role: 'Chief Operations Officer',
    company: 'UrbanDrop',
    companyUrl: 'https://urbandrop.example.com',
    avatarUrl: '/assets/avatars/priya.webp',
  },
];

const Testimonials = () => {
  const [api, setApi] = useState<any>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const titleRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const floatingCardRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Title animation
    if (titleRef.current?.children) {
      gsap.fromTo(
        titleRef.current.children,
        { opacity: 0, y: 20, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.15,
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 90%',
            end: 'bottom 10%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }

    // Carousel animation
    if (carouselRef.current?.querySelectorAll('.carousel-item')) {
      gsap.fromTo(
        carouselRef.current.querySelectorAll('.carousel-item'),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: carouselRef.current,
            start: 'top 90%',
            end: 'bottom 10%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }

    // Floating card animation
    gsap.fromTo(
      floatingCardRef.current,
      { opacity: 0, y: 20, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: floatingCardRef.current,
          start: 'top 90%',
          end: 'bottom 10%',
          toggleActions: 'play none none reverse',
        },
      }
    );
    gsap.to(floatingCardRef.current, {
      y: -10,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });
  }, []);

  React.useEffect(() => {
    if (!api) return;
    const onSelect = () => {
      setActiveIndex(api.selectedScrollSnap());
    };
    api.on('select', onSelect);
    return () => api.off('select', onSelect);
  }, [api]);

  const goToSlide = (index: number) => {
    if (api) {
      api.scrollTo(index);
      setActiveIndex(index);
    }
  };

  return (
    <div className='relative w-full min-h-screen mt-50 md:mt-20 lg:mt-0 flex items-center justify-center bg-white dark:from-gray-800 dark:to-gray-900'>
      <div className='w-full max-w-8xl mx-auto p-8 sm:p-12 flex flex-col items-center justify-center h-full'>
        {/* Floating Card */}
        <div
          ref={floatingCardRef}
          className='absolute top-[-200px] md:top-[-120px] md:right-[80px] lg:top-[-100px] lg:right-[80px] xl:top-[-50px] xl:right-[80px] w-[300px] h-[300px] rounded-full z-[0]'
        >
          <div className='w-full h-full rounded-full bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 backdrop-blur-2xl  dark:border-gray-700 shadow-lg flex flex-col items-center justify-center p-6 transition-all duration-500 ease-out hover:-translate-y-[5px] hover:shadow-[0_12px_40px_rgba(59,130,246,0.2)] hover:transform hover:perspective-1000 hover:rotate-x-2 hover:rotate-y-2'>
            <Testimo3d />
          </div>
        </div>

        {/* Title Section */}
        <section
          ref={titleRef}
          className='flex flex-col items-center justify-center text-center gap-4 mb-16'
        >
          <span className=' text-cyan-700 dark:text-cyan-300 px-4 py-1.5 rounded-full text-sm font-medium shadow-sm'>
            Testimonials
          </span>
          <h2 className='text-3xl sm:text-4xl md:text-5xl font-extrabold text-cyan-500'>
            Trusted by Logistics Leaders
          </h2>
          <p className='w-full max-w-md sm:max-w-lg mx-auto text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed'>
            Discover why Track Flow is the preferred solution for logistics
            professionals worldwide.
          </p>
        </section>

        {/* Carousel Section */}
        <section ref={carouselRef} className='w-full max-w-3xl'>
          <Carousel
            className='w-full'
            setApi={setApi}
            opts={{ align: 'start', loop: true }}
          >
            <CarouselContent className='-ml-4'>
              {testimonials.map((t, index) => (
                <CarouselItem
                  key={index}
                  className='pl-4 basis-full lg:basis-1/2 h-[360px] carousel-item'
                >
                  <div className='p-4'>
                    <CardContent className='flex flex-col justify-between items-start p-6 gap-4 h-[260px] bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 transition-all hover:shadow-xl hover:-translate-y-1'>
                      <div className='flex items-center gap-2'>
                        <svg
                          className='w-6 h-6 text-yellow-400'
                          fill='currentColor'
                          viewBox='0 0 20 20'
                        >
                          <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                        </svg>
                        <span className='text-sm font-medium text-gray-600 dark:text-gray-300'>
                          5.0 Rating
                        </span>
                      </div>
                      <p className='text-base text-gray-700 dark:text-gray-200 leading-relaxed border-l-4 border-indigo-500 pl-4'>
                        {t.quote}
                      </p>
                      <div className='flex items-center gap-3'>
                        <div className='w-14 h-14 rounded-full overflow-hidden border-2 border-indigo-200 dark:border-indigo-600'>
                          <img
                            className='w-full h-full object-cover'
                            src={t.avatarUrl}
                            alt={t.name}
                            onError={(e) =>
                              (e.currentTarget.src =
                                'https://via.placeholder.com/150')
                            }
                          />
                        </div>
                        <div>
                          <p className='font-semibold text-gray-900 dark:text-gray-100 text-sm'>
                            {t.name}
                          </p>
                          <p className='text-xs text-gray-500 dark:text-gray-400'>
                            {t.role}
                          </p>
                          <a
                            href={t.companyUrl}
                            className='text-xs text-indigo-600 dark:text-indigo-400 font-medium hover:underline'
                          >
                            {t.company}
                          </a>
                        </div>
                      </div>
                    </CardContent>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <div className=' hidden md:flex justify-center items-center mt-8 gap-6'>
              <CarouselPrevious
                onClick={() =>
                  goToSlide(
                    (activeIndex - 1 + testimonials.length) %
                      testimonials.length
                  )
                }
                className='text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all hover:scale-110'
              />
              <div className='flex gap-2'>
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === activeIndex
                        ? 'bg-indigo-600 w-6'
                        : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                  />
                ))}
              </div>
              <CarouselNext
                onClick={() =>
                  goToSlide((activeIndex + 1) % testimonials.length)
                }
                className='text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all hover:scale-110'
              />
            </div>
          </Carousel>
        </section>
      </div>

      {/* SVG Wave Transition */}
      <svg
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 1440 120'
        className='absolute bottom-[-2px] left-0 w-full z-10'
      >
        <path
          fill='#0EA5E9'
          fillOpacity='1'
          d='M0,60 C240,30 480,90 720,60 C960,30 1200,90 1440,60 L1440,120 L0,120 Z'
        />
      </svg>
    </div>
  );
};

export default Testimonials;
