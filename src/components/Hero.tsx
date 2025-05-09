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

      // Badge animation (fades in with slight scale)
      tl.fromTo(
        badgeRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.6 }
      );

      // Title animation (staggered children with slight vertical lift)
      tl.fromTo(
        titleRef.current?.children ? Array.from(titleRef.current.children) : [],
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15 },
        '-=0.3'
      );

      // Subtitle animation (fades in with slight delay)
      tl.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7 },
        '-=0.5'
      );

      // Buttons animation (staggered entrance with subtle scale)
      tl.fromTo(
        buttonsRef.current?.children
          ? Array.from(buttonsRef.current.children)
          : [],
        { opacity: 0, y: 20, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.2 },
        '-=0.4'
      );

      // Icons animation (staggered bounce-in effect)
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

      // Image animation (fades in with slight scale up)
      tl.fromTo(
        imageRef.current,
        { opacity: 0, scale: 0.98 },
        { opacity: 1, scale: 1, duration: 1 },
        '-=0.6'
      );

      // Tooltip animation (slides in from right)
      tl.fromTo(
        tooltipRef.current,
        { opacity: 0, x: 20 },
        { opacity: 1, x: 0, duration: 0.7 },
        '-=0.4'
      );

      // Button hover effects
      const ctx = gsap.context(() => {
        gsap.utils.toArray<HTMLButtonElement>('.hero-btn').forEach((btn) => {
          btn.addEventListener('mouseenter', () => {
            gsap.to(btn, {
              scale: 1.05,
              boxShadow: '0px 10px 20px rgba(0, 132, 255, 0.2)',
              backgroundColor:
                btn.classList.contains('hero-btn') &&
                !btn.classList.contains('outline')
                  ? '#1e3a8a'
                  : 'transparent',
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
              backgroundColor:
                btn.classList.contains('hero-btn') &&
                !btn.classList.contains('outline')
                  ? ''
                  : 'transparent',
              borderColor: btn.classList.contains('outline') ? '' : undefined,
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
      className='w-full max-w-[1128px] mx-auto px-5 py-10  min-h-[70vh] flex Roulette flex-col lg:flex-row justify-center items-center mt-5 gap-10'
    >
      {/* Left section */}
      <section className='w-full lg:w-[60%] md:w-[55%] flex flex-col justify-center items-center lg:items-start gap-3'>
        <span
          ref={badgeRef}
          className='bg-[var(--secondary)] text-[var(--primary-foreground)] p-1 rounded-2xl px-2 text-sm font-medium w-fit'
        >
          Introduction Track Flow
        </span>

        <div
          ref={titleRef}
          className='flex flex-col gap-1 text-center lg:text-left'
        >
          <span className='text-4xl sm:text-5xl font-bold flex gap-2 flex-wrap'>
            <span className='text-[var(--primary)]'>Smart logistics</span>
            <span className='text-[var(--primary-foreground)]'>for</span>
          </span>
          <span className='text-4xl sm:text-5xl font-bold text-[var(--primary-foreground)]'>
            everyone
          </span>
        </div>

        <p
          ref={subtitleRef}
          className='text-[var(--text-muted-soft)] font-medium mt-2 text-sm text-center lg:text-left'
        >
          Optimize deliveries, reduce costs, and make better decisions with our
          AI-powered logistics platform. Real-time tracking, intelligent route
          planning, and powerful analytics in one place.
        </p>

        {/* Buttons + features */}
        <section className='mt-4'>
          <div ref={buttonsRef} className='flex flex-col sm:flex-row gap-3'>
            <Button
              onClick={handleStartFreeClick}
              className='hero-btn text-[var(--card)] w-full cursor-pointer sm:w-[200px]'
            >
              Get Started Free <ArrowRight />
            </Button>
            <Button
              onClick={handleStartFreeClick}
              variant='outline'
              className='hero-btn w-full sm:w-[180px] cursor-pointer border-[var(--primary-foreground)] hover:text-cyan-400 text-[var(--primary-foreground)]'
            >
              Book a Demo <ChevronRight />
            </Button>
          </div>

          <div ref={iconsRef} className='flex flex-wrap gap-1 sm:gap-10 mt-8'>
            <IconWithLabel
              icon={<Truck className='w-5 h-5' />}
              color='blue'
              label='Real-time Tracking'
            />
            <IconWithLabel
              icon={<Package className='w-5 h-5' />}
              color='cyan'
              label='Smart Delivery'
            />
            <IconWithLabel
              icon={<Clock className='w-5 h-5' />}
              color='orange'
              label='Time Savings'
            />
          </div>
        </section>
      </section>

      {/* Right section - image */}
      <section
        ref={imageRef}
        className='w-full max-w-[450px] flex justify-center items-center relative'
      >
        <img
          className='rounded-lg w-full max-w-[500px]'
          src='/assets/images/image.jpg'
          alt='Logistics'
        />

        <div
          ref={tooltipRef}
          className='h-fit sm:w-[300px] absolute bottom-[-30px] sm:top-[280px] right-0 sm:right-[-15px] shadow-lg bg-[var(--card)] px-4 py-6 rounded-md flex items-center gap-3'
        >
          <div className='bg-green-400 rounded-full p-1'>
            <Check className='w-4 h-4 stroke-2 text-[var(--accent)]' />
          </div>
          <div>
            <h4 className='font-medium text-sm'>Route optimized!</h4>
            <p className='text-[var(--text-muted-faint)] text-xs'>
              AI saved 28 minutes on today's deliveries
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
