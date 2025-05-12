import { ChartColumnIncreasing } from 'lucide-react';
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

gsap.registerPlugin(ScrollTrigger);

const Features = () => {
  const containerRef = useRef(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement | null>(null);

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

      // Title section animation
      tl.fromTo(
        titleRef.current?.children ? Array.from(titleRef.current.children) : [],
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'expo.inOut',
          stagger: 0.15,
        }
      );

      // Cards animation
      const cards = Array.from(cardsRef.current?.children || []);
      tl.fromTo(
        cards,
        { opacity: 0, y: 40, scale: 0.95, rotationX: 5 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotationX: 0,
          duration: 0.9,
          ease: 'power3.inOut',
          stagger: 0.1,
        },
        '-=0.4'
      );
    },
    { scope: containerRef }
  );

  // Add GSAP hover effect
  useEffect(() => {
    const cards = Array.from(cardsRef.current?.children || []);
    cards.forEach((card) => {
      // On hover, scale up slightly
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          scale: 1.05,
          duration: 0.3,
          ease: 'power2.out',
          overwrite: 'auto', // Prevent conflicts with scroll animation
        });
      });

      // On mouse leave, return to original scale
      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          scale: 1,
          duration: 0.3,
          ease: 'power2.out',
        });
      });
    });

    // Cleanup event listeners on component unmount
    return () => {
      cards.forEach((card) => {
        card.removeEventListener('mouseenter', () => {});
        card.removeEventListener('mouseleave', () => {});
      });
    };
  }, []);

  const steps = [
    {
      icon: <CloudCog className='w-8 h-8 text-blue-300' />,
      title: 'Access Your Dashboard',
      description:
        'Log in to your cloud-based platform and view the intelligent dashboard for a real-time overview.',
    },
    {
      icon: <Compass className='w-8 h-8 text-cyan-300' />,
      title: 'Plan Optimal Routes',
      description:
        'Use AI-powered route optimization to plan efficient delivery paths.',
    },
    {
      icon: <Users className='w-8 h-8 text-orange-300' />,
      title: 'Manage Your Team',
      description:
        'Assign tasks and coordinate your delivery team effectively.',
    },
    {
      icon: <Map className='w-8 h-8 text-blue-300' />,
      title: 'Monitor in Real-time',
      description:
        'Track vehicles, get notifications, and work offline when needed.',
    },
    {
      icon: <ClockArrowUp className='w-8 h-8 text-cyan-300' />,
      title: 'Analyze and Improve',
      description: 'Review route history to optimize future operations.',
    },
  ];

  return (
    <div className='w-full bg-gradient-to-b from-[#0d111c] via-blue-900/90 to-cyan-400/90 text-gray-100 py-16 sm:py-24 px-4 sm:px-8 backdrop-blur-sm bg-[rgba(59,130,246,0.1)] overflow-hidden'>
      <div
        ref={containerRef}
        id='features'
        className='max-w-[95%] sm:max-w-[80%] mx-auto mb-15'
      >
        <section
          ref={titleRef}
          className='flex flex-col items-center justify-center text-center gap-4 mb-12 sm:mb-16'
        >
          <SectionNames sectionName={'Features'} />
          <h2 className='text-3xl sm:text-4xl lg:text-5xl font-bold text-blue-200 text-center relative z-10'>
            <span className='bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent'>
              Master Logistics with Ease
            </span>
          </h2>
          <p className='w-full max-w-[600px] mx-auto text-sm sm:text-base lg:text-lg text-gray-300 font-medium leading-relaxed text-shadow-[0_1px_2px_rgba(0,0,0,0.2)]'>
            Track Flow empowers businesses with intuitive, powerful tools to
            streamline logistics seamlessly.
          </p>
        </section>

        <section
          ref={cardsRef}
          className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
        >
          <CardWithLabelIcon
            icon={<ChartColumnIncreasing />}
            color='blue'
            title='Intelligent Dashboard'
            description='Centralized overview of all logistics operations with customizable KPIs and real-time updates.'
          />
          <CardWithLabelIcon
            icon={<Bell />}
            color='cyan'
            title='Automatic Notifications'
            description='Stay informed with instant alerts for delays, completions, and other critical events.'
          />
          <CardWithLabelIcon
            icon={<CloudOff />}
            color='orange'
            title='Offline Mode'
            description='Delivery drivers can continue working without interruption even when connectivity is lost.'
          />
          <CardWithLabelIcon
            icon={<Code />}
            color='blue'
            title='API Integration'
            description='Seamlessly connect with your existing systems and third-party services.'
          />
          <CardWithLabelIcon
            icon={<ClockArrowUp />}
            color='cyan'
            title='Route History'
            description='Comprehensive records of all deliveries for auditing and performance analysis.'
          />
          <CardWithLabelIcon
            icon={<Map />}
            color='orange'
            title='Real-time Visualization'
            description='Interactive maps showing vehicle locations, delivery status, and traffic conditions.'
          />
          <CardWithLabelIcon
            icon={<Compass />}
            color='blue'
            title='AI Route Optimization'
            description='Smart algorithms that calculate the most efficient routes based on multiple factors.'
          />
          <CardWithLabelIcon
            icon={<CloudCog />}
            color='cyan'
            title='Cloud-based Platform'
            description='Access your logistics data from anywhere, with automatic backups and updates.'
          />
          <CardWithLabelIcon
            icon={<Users />}
            color='orange'
            title='Team Management'
            description='Assign tasks, monitor performance, and manage your entire delivery team.'
          />
        </section>
        <section ref={stepsRef} className='how-it-works py-16 sm:py-24'>
          <h2 className='text-3xl sm:text-5xl font-bold text-center text-blue-100 mb-12 sm:mb-20'>
            How It Works
          </h2>

          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 px-4 sm:px-6 lg:px-8 max-w-8xl mx-auto'>
            {steps.map((step, index) => (
              <div
                key={index}
                className='relative bg-gradient-to-br from-[#164e63]/50 via-[#1e3a8a]/50 to-[#064e3b]/50 p-4 sm:p-6 rounded-3xl shadow-lg border border-blue-500/20 hover:shadow-cyan-400/30 transition-shadow duration-300 group'
              >
                <div className='flex flex-col items-center text-center justify-between h-full'>
                  <div className='w-10 sm:w-12 h-10 sm:h-12 mb-3 sm:mb-4 flex items-center justify-center rounded-full bg-blue-500 text-white text-base sm:text-lg font-bold shadow-md'>
                    {index + 1}
                  </div>

                  <div className='text-lg sm:text-xl md:text-2xl font-semibold text-blue-200 mb-2'>
                    {step.title}
                  </div>

                  <p className='text-xs sm:text-sm md:text-base text-gray-200 mb-3 sm:mb-4 leading-relaxed line-clamp-3'>
                    {step.description}
                  </p>

                  <div className='text-xl sm:text-2xl md:text-3xl text-blue-400 transition-transform duration-300 group-hover:scale-110'>
                    {step.icon}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <svg
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 1440 120'
        className='absolute bottom-[-2px] left-0 w-full z-10'
      >
        <path
          fill='#ffffff'
          fillOpacity='1'
          d='M0,60 C240,30 480,90 720,60 C960,30 1200,90 1440,60 L1440,120 L0,120 Z'
        />
      </svg>
    </div>
  );
};

export default Features;
