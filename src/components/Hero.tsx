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

const Hero = () => {
  const titleRef1 = useRef<HTMLDivElement>(null);
  const titleRef2 = useRef<HTMLSpanElement>(null);
  const titleRef3 = useRef<HTMLParagraphElement>(null);
  const btnRefs1 = useRef<HTMLDivElement>(null);
  const iconRef1 = useRef<HTMLDivElement>(null);
  const imgRef1 = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (titleRef1.current?.children) {
      gsap.fromTo(
        titleRef1.current.children,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power1.out',
          stagger: 0.2,
        }
      );
    }
  }, []);

  useGSAP(() => {
    gsap.fromTo(
      titleRef2.current,
      { opacity: 0, y: 15 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power1.out',
      }
    );
    gsap.fromTo(
      titleRef3.current,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power1.out',
        delay: 0.2,
      }
    );
  }, []);

  useGSAP(() => {
    if (btnRefs1.current?.children) {
      gsap.fromTo(
        btnRefs1.current.children,
        { opacity: 0, y: 20, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: 'power2.out',
          stagger: 0.2,
        }
      );
    }
  }, []);

  // Hover effects nos botões
  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.hero-btn').forEach((btn) => {
        const el = btn as HTMLButtonElement;

        el.addEventListener('mouseenter', () => {
          gsap.to(el, {
            scale: 1.04,
            boxShadow: '0px 8px 20px rgba(0, 132, 255, 0.15)',
            duration: 0.3,
            ease: 'power2.out',
          });
        });

        el.addEventListener('mouseleave', () => {
          gsap.to(el, {
            scale: 1,
            boxShadow: '0px 0px 0px rgba(0,0,0,0)',
            duration: 0.3,
            ease: 'power2.out',
          });
        });
      });
    }, btnRefs1);

    return () => ctx.revert();
  }, []);

  useGSAP(() => {
    if (iconRef1.current?.children) {
      gsap.fromTo(
        iconRef1.current.children,
        { opacity: 0, y: -100 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power1.out',
          stagger: 0.2,
        }
      );
    }
  }, []);

  useGSAP(() => {
    gsap.fromTo(
      imgRef1.current,
      { opacity: 0, scale: 0.95 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.9,
        ease: 'power1.out',
      }
    );
  }, []);

  return (
    <div className='w-full max-w-[1128px] mx-auto px-5 py-10 flex flex-col lg:flex-row justify-center items-center mt-10 gap-10'>
      {/* Left section */}
      <section className='w-full lg:w-[60%] md:w-[55%] flex flex-col justify-center items-center lg:items-start gap-3'>
        <span
          ref={titleRef2}
          className='bg-[var(--secondary)] text-[var(--primary-foreground)] p-1 rounded-2xl px-2 text-sm font-medium w-fit'
        >
          Introduction Track Flow
        </span>

        <div
          ref={titleRef1}
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
          ref={titleRef3}
          className='text-[var(--text-muted-soft)] font-medium mt-2 text-sm text-center lg:text-left'
        >
          Optimize deliveries, reduce costs, and make better decisions with our
          AI-powered logistics platform. Real-time tracking, intelligent route
          planning, and powerful analytics in one place.
        </p>

        {/* Buttons + features */}
        <section className='mt-4'>
          <div ref={btnRefs1} className='flex flex-col sm:flex-row gap-3'>
            <Button className='hero-btn text-[var(--card)] w-full cursor-pointer sm:w-[200px]'>
              Get Started Free <ArrowRight />
            </Button>
            <Button
              variant='outline'
              className='hero-btn w-full sm:w-[180px] cursor-pointer  border-[var(--primary-foreground)] hover:text-cyan-400 text-[var(--primary-foreground)]'
            >
              Book a Demo <ChevronRight />
            </Button>
          </div>

          <div ref={iconRef1} className='flex flex-wrap gap-1 sm:gap-10 mt-8'>
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
        ref={imgRef1}
        className='w-full max-w-[450px] flex justify-center items-center relative'
      >
        <img
          className='rounded-lg w-full max-w-[500px]'
          src='/assets/images/image.jpg'
          alt='Logistics'
        />

        <div className='h-fit sm:w-[300px] absolute bottom-[-30px] sm:top-[280px] right-0 sm:right-[-15px] shadow-lg bg-[var(--card)] px-4 py-6 rounded-md flex items-center gap-3'>
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
