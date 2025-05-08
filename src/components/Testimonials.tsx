import * as React from 'react';
import { useState } from 'react'; // Ensure this import is here
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import SectionNames from './ui/SectionNames';

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
  const [api, setApi] = useState<any>(null); // Adjust the type based on your carousel library
  const [activeIndex, setActiveIndex] = useState(0);

  // Update activeIndex when the carousel changes
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
      console.log('Ativo no slide:', index);
    }
  };

  return (
    <div className='w-full max-w-[1128px] mx-auto mt-20 p-4'>
      <section className='flex flex-col items-center justify-center text-center gap-1 mb-14'>
        <SectionNames sectionName='Testimonials' />
        <h2 className='font-bold text-3xl mb-3'>
          Trusted by logistics professionals
        </h2>
        <p className='w-full max-w-[550px] mx-auto text-[.95rem] text-[var(--text-muted-soft)] font-medium leading-[1.5]'>
          See what our customers are saying about Track Flow.
        </p>
      </section>

      <section className='w-full flex items-center justify-center'>
        <Carousel
          className='w-full max-w-[650px] rounded-lg shadow-md h-53'
          setApi={setApi}
        >
          <CarouselContent>
            {testimonials.map((t, index) => (
              <CarouselItem key={index} className=' border-none'>
                <Card className=' p-6 border-none bg-[#ffff/9]'>
                  <CardContent className='flex flex-col gap-4 items-start border-none'>
                    <p className='italic text-[1.05rem] text-slate-700 relative pl-4'>
                      <span className='text-cyan-300 text-5xl font-serif absolute left-[-10px] top-[-20px] leading-none'>
                        “
                      </span>
                      {t.quote}
                      <span className='text-cyan-300 text-5xl font-serif leading-none'>
                        ”
                      </span>
                    </p>

                    <div className='flex items-center gap-3 mt-2'>
                      <div className='w-full aspect-[1/1] rounded-full overflow-hidden max-w-[60px]'>
                        <img
                          className='w-full h-full object-cover object-center'
                          src={t.avatarUrl}
                          alt={t.name}
                        />
                      </div>
                      <div>
                        <p className='font-semibold text-[.95rem]'>{t.name}</p>
                        <p className='text-sm text-gray-500'>{t.role}</p>
                        <a
                          href={t.companyUrl}
                          className='text-sm text-cyan-500 font-medium hover:underline'
                        >
                          {t.company}
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Container for dots and navigation buttons */}
          <div className='relative flex justify-center items-center mt-5'>
            {/* Previous button */}
            <CarouselPrevious
              onClick={() =>
                goToSlide(
                  (activeIndex - 1 + testimonials.length) % testimonials.length
                )
              }
              className='absolute left-60 text-gray-600 hover:text-cyan-500'
            />

            {/* Dots */}
            <div className='flex gap-2'>
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`
                    h-2.5 rounded-full transition-all duration-300 ease-in-out
                    ${
                      index === activeIndex
                        ? 'bg-cyan-300 w-6'
                        : 'bg-gray-300 w-2.5'
                    }
                  `}
                />
              ))}
            </div>

            {/* Next button */}
            <CarouselNext
              onClick={() => goToSlide((activeIndex + 1) % testimonials.length)}
              className='absolute right-60 text-gray-600 hover:text-cyan-500'
            />
          </div>
        </Carousel>
      </section>
    </div>
  );
};
export default Testimonials;
