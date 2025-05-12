import { ChartColumnIncreasing, Rocket } from 'lucide-react';
import CardWithLabelIcon from './ui/CardWithLabelIcon';
import {
  Bell,
  CloudOff,
  Code,
  ClockArrowUp,
  Map,
  Compass,
  CloudCog,
  Users,
} from 'lucide-react';
import SectionNames from './ui/SectionNames';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useRef, useEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from './ui/button';

gsap.registerPlugin(ScrollTrigger);

const Features = () => {
  const containerRef = useRef(null);
  const titleRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const howItWorksTitleRef = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
      });

      tl.fromTo(
        titleRef.current?.children ? Array.from(titleRef.current.children) : [],
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'expo.inOut', stagger: 0.15 }
      );

      const cards = Array.from(
        cardsRef.current?.children || []
      ) as HTMLElement[];
      tl.fromTo(
        cards,
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          ease: 'power3.inOut',
          stagger: 0.1,
        },
        '-=0.4'
      );

      const steps = Array.from(stepsRef.current?.children || []);
      tl.fromTo(
        steps,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.7, ease: 'power2.out', stagger: 0.1 },
        '-=0.3'
      );
    },
    { scope: containerRef }
  );

  // Animation for How It Works title
  useGSAP(() => {
    gsap.fromTo(
      howItWorksTitleRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: howItWorksTitleRef.current,
          start: 'top 85%',
        },
      }
    );
  }, []);

  useEffect(() => {
    const cards = Array.from(cardsRef.current?.children || []);
    cards.forEach((card) => {
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          scale: 1.03,
          boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
          duration: 0.3,
          ease: 'power2.out',
        });
      });
      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          scale: 1,
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          duration: 0.3,
          ease: 'power2.out',
        });
      });
    });

    return () => {
      cards.forEach((card) => {
        card.removeEventListener('mouseenter', () => {});
        card.removeEventListener('mouseleave', () => {});
      });
    };
  }, []);

  const steps = [
    {
      icon: (
        <CloudCog
          className='w-10 h-10 text-blue-300'
          aria-label='Cloud Cog Icon'
        />
      ),
      title: 'Access Your Dashboard',
      description: 'Log in to view real-time logistics insights.',
    },
    {
      icon: (
        <Compass
          className='w-10 h-10 text-cyan-300'
          aria-label='Compass Icon'
        />
      ),
      title: 'Plan Optimal Routes',
      description: 'AI-driven route optimization for efficiency.',
    },
    {
      icon: (
        <Users className='w-10 h-10 text-orange-300' aria-label='Users Icon' />
      ),
      title: 'Manage Your Team',
      description: 'Coordinate tasks seamlessly.',
    },
    {
      icon: <Map className='w-10 h-10 text-blue-300' aria-label='Map Icon' />,
      title: 'Monitor in Real-time',
      description: 'Track vehicles and statuses live.',
    },
    {
      icon: (
        <ClockArrowUp
          className='w-10 h-10 text-cyan-300'
          aria-label='Clock Arrow Up Icon'
        />
      ),
      title: 'Analyze and Improve',
      description: 'Optimize with historical data.',
    },
  ];

  return (
    <div className='w-full bg-gradient-to-b from-[#0d111c] via-blue-900/90 to-cyan-400/90 text-gray-100 py-16 sm:py-24 px-4 sm:px-8 backdrop-blur-sm bg-[rgba(59,130,246,0.1)] overflow-hidden relative'>
      <div ref={containerRef} id='features' className='max-w-[90%] mx-auto'>
        {/* Title Section */}
        <section
          ref={titleRef}
          className='flex flex-col items-center text-center gap-6 mb-16'
        >
          <SectionNames sectionName={'Features'} />
          <h2 className='text-4xl sm:text-5xl font-bold text-blue-200'>
            <span className='bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent'>
              Master Logistics with Ease
            </span>
          </h2>
          <p className='max-w-[700px] text-base sm:text-lg text-gray-300 leading-relaxed'>
            Streamline your operations with powerful, intuitive tools designed
            for modern logistics.
          </p>
        </section>

        {/* Features Cards */}
        <section
          ref={cardsRef}
          className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-20'
        >
          <CardWithLabelIcon
            icon={<ChartColumnIncreasing className='w-8 h-8' />}
            color='blue'
            title='Intelligent Dashboard'
            description='Real-time insights with customizable KPIs.'
          />
          <CardWithLabelIcon
            icon={<Bell className='w-8 h-8' />}
            color='cyan'
            title='Automatic Notifications'
            description='Instant alerts for critical updates.'
          />
          <CardWithLabelIcon
            icon={<CloudOff className='w-8 h-8' />}
            color='orange'
            title='Offline Mode'
            description='Work seamlessly without connectivity.'
          />
          <CardWithLabelIcon
            icon={<Code className='w-8 h-8' />}
            color='blue'
            title='API Integration'
            description='Connect with existing systems.'
          />
          <CardWithLabelIcon
            icon={<ClockArrowUp className='w-8 h-8' />}
            color='cyan'
            title='Route History'
            description='Analyze past deliveries for improvement.'
          />
          <CardWithLabelIcon
            icon={<Map className='w-8 h-8' />}
            color='orange'
            title='Real-time Visualization'
            description='Live maps with traffic and status.'
          />
          <CardWithLabelIcon
            icon={<Compass className='w-8 h-8' />}
            color='blue'
            title='AI Route Optimization'
            description='Smart, efficient route planning.'
          />
          <CardWithLabelIcon
            icon={<CloudCog className='w-8 h-8' />}
            color='cyan'
            title='Cloud-based Platform'
            description='Access anywhere with backups.'
          />
          <CardWithLabelIcon
            icon={<Users className='w-8 h-8' />}
            color='orange'
            title='Team Management'
            description='Monitor and assign tasks easily.'
          />
        </section>

        {/* How It Works Section */}
        <section className='py-20'>
          <h2
            ref={howItWorksTitleRef}
            className='text-4xl sm:text-5xl font-bold text-center text-blue-100 mb-14'
          >
            <span className='bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent'>
              How It Works
            </span>
          </h2>
          <div
            ref={stepsRef}
            className='relative flex flex-col items-center gap-8'
          >
            {steps.map((step, index) => (
              <div
                key={index}
                className='relative bg-[#0d111c]/80 p-6 rounded-xl shadow-md border border-blue-500/20 w-full max-w-md flex items-center gap-4 hover:shadow-cyan-400/20 transition-all duration-300'
              >
                <div className='flex-shrink-0'>{step.icon}</div>
                <div>
                  <h3 className='text-xl font-semibold text-blue-200'>
                    {step.title}
                  </h3>
                  <p className='text-gray-300 text-sm'>{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className='absolute left-5 bottom-[-40px] w-0.5 h-10 bg-blue-400/50'></div>
                )}
              </div>
            ))}
          </div>
          <div className='flex justify-center mt-10'>
            <Button
              aria-label='Try Now'
              className='group inline-flex cursor-pointer items-center gap-2 px-6 py-3 bg-gradient-to-r from-white/80 via-white/60 to-white/80 text-blue-950 font-medium shadow-[inset_0_0_1px_rgba(255,255,255,0.3)] border border-white/30 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] backdrop-blur-md transition-all duration-300 hover:scale-[1.3]'
            >
              <Rocket className='w-4 h-4 text-cyan-500 group-hover:translate-x-1 transition-transform duration-300' />
              Try Now
            </Button>
          </div>
        </section>
      </div>

      {/* SVG Wave */}
      <svg
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 1440 120'
        className='absolute bottom-[-5px] left-0 w-full text-white'
        aria-hidden='true'
      >
        <path
          fill='currentColor'
          d='M0,60 C240,30 480,90 720,60 C960,30 1200,90 1440,60 L1440,120 L0,120 Z'
        />
      </svg>
    </div>
  );
};

export default Features;
