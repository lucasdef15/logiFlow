import { Button } from './ui/button';
import {
  ChevronRight,
  ArrowRight,
  Truck,
  Package,
  Clock,
  Check,
} from 'lucide-react';
import IconWithLabel from './ui/IconWithLabel';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const iconsRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.inOut' } });

      tl.fromTo(
        badgeRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.6 }
      );

      tl.fromTo(
        titleRef.current?.children ? Array.from(titleRef.current.children) : [],
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15 },
        '-=0.3'
      );

      tl.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7 },
        '-=0.5'
      );

      tl.fromTo(
        buttonsRef.current?.children
          ? Array.from(buttonsRef.current.children)
          : [],
        { opacity: 0, y: 20, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.2 },
        '-=0.4'
      );

      tl.fromTo(
        iconsRef.current?.children ? Array.from(iconsRef.current.children) : [],
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'back.out(1.2)',
        },
        '-=0.5'
      );

      tl.fromTo(
        imageRef.current,
        { opacity: 0, scale: 0.98 },
        { opacity: 1, scale: 1, duration: 1 },
        '-=0.6'
      );

      tl.fromTo(
        tooltipRef.current,
        { opacity: 0, x: 20 },
        { opacity: 1, x: 0, duration: 0.7 },
        '-=0.4'
      );

      const ctx = gsap.context(() => {
        gsap.utils.toArray<HTMLButtonElement>('.hero-btn').forEach((btn) => {
          btn.addEventListener('mouseenter', () => {
            gsap.to(btn, {
              scale: 1.05,
              boxShadow: '0px 10px 20px rgba(0, 132, 255, 0.2)',
              backgroundColor: btn.classList.contains('outline')
                ? 'transparent'
                : '#1e3a8a',
              borderColor: btn.classList.contains('outline')
                ? '#1e3a8a'
                : undefined,
              duration: 0.3,
              ease: 'power2.out',
            });
          });

          btn.addEventListener('mouseleave', () => {
            gsap.to(btn, {
              scale: 1,
              boxShadow: '0px 0px 0px rgba(0,0,0,0)',
              backgroundColor: '',
              borderColor: '',
              duration: 0.3,
              ease: 'power2.out',
            });
          });
        });
      }, buttonsRef);

      return () => ctx.revert();
    },
    { scope: containerRef }
  );

  const handleStartFreeClick = () => {
    navigate('/free-trial');
  };

  return (
    <div
      ref={containerRef}
      id='top'
      className='w-full max-w-[1128px] mx-auto px-5 py-10 min-h-[70vh] flex flex-col lg:flex-row justify-center items-center mt-5 gap-10 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500 bg-[length:400%_400%] animate-gradient rounded-xl text-white'
    >
      {/* Left section */}
      <section className='w-full lg:w-[60%] md:w-[55%] flex flex-col justify-center items-center lg:items-start gap-5'>
        <span
          ref={badgeRef}
          className='bg-white text-blue-700 px-3 py-1 rounded-full text-sm font-semibold shadow'
        >
          Introduction Track Flow
        </span>

        <div
          ref={titleRef}
          className='flex flex-col gap-1 text-center lg:text-left'
        >
          <span className='text-5xl sm:text-6xl font-bold flex gap-2 flex-wrap'>
            <span className='text-yellow-300'>Smart logistics</span>
            <span className='text-white'>for</span>
          </span>
          <span className='text-5xl sm:text-6xl font-bold text-white'>
            everyone
          </span>
        </div>

        <p
          ref={subtitleRef}
          className='text-white/80 text-lg font-medium mt-2 text-center lg:text-left'
        >
          Optimize deliveries, reduce costs, and make better decisions with our
          AI-powered logistics platform. Real-time tracking, intelligent route
          planning, and powerful analytics in one place.
        </p>

        {/* Buttons + features */}
        <section className='mt-6'>
          <div ref={buttonsRef} className='flex flex-col sm:flex-row gap-4'>
            <Button
              onClick={handleStartFreeClick}
              className='hero-btn text-white font-semibold py-3 text-base w-full sm:w-[220px]'
            >
              Get Started Free <ArrowRight />
            </Button>
            <Button
              onClick={handleStartFreeClick}
              variant='outline'
              className='hero-btn border-white text-white font-semibold py-3 text-base w-full sm:w-[200px]'
            >
              Book a Demo <ChevronRight />
            </Button>
          </div>

          <div ref={iconsRef} className='flex flex-wrap gap-4 mt-8'>
            <IconWithLabel
              icon={<Truck className='w-6 h-6' />}
              color='blue'
              label='Real-time Tracking'
            />
            <IconWithLabel
              icon={<Package className='w-6 h-6' />}
              color='cyan'
              label='Smart Delivery'
            />
            <IconWithLabel
              icon={<Clock className='w-6 h-6' />}
              color='orange'
              label='Time Savings'
            />
          </div>
        </section>
      </section>

      {/* Right section - image */}
      <section
        ref={imageRef}
        className='w-full max-w-[500px] flex justify-center items-center relative'
      >
        <img
          className='rounded-xl w-full max-w-[550px]'
          src='/assets/images/image.jpg'
          alt='Logistics'
        />

        <div
          ref={tooltipRef}
          className='h-fit sm:w-[300px] absolute bottom-[-30px] sm:top-[280px] right-0 sm:right-[-15px] shadow-xl bg-white text-black px-5 py-6 rounded-md flex items-center gap-3'
        >
          <div className='bg-green-400 rounded-full p-1'>
            <Check className='w-4 h-4 text-white' />
          </div>
          <div>
            <h4 className='font-semibold text-sm'>Route optimized!</h4>
            <p className='text-gray-500 text-xs'>
              AI saved 28 minutes on today's deliveries
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
