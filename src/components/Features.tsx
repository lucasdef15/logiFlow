import {
  ChartColumnIncreasing,
  Rocket,
  Bell,
  CloudOff,
  Code,
  ClockArrowUp,
  Map,
  Compass,
  CloudCog,
  Users,
} from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useRef } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Features = () => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

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
        titleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }
      );

      const cards = Array.from(cardsRef.current?.children || []);
      tl.fromTo(
        cards,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', stagger: 0.1 },
        '-=0.3'
      );

      const steps = Array.from(stepsRef.current?.children || []);
      tl.fromTo(
        steps,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out', stagger: 0.1 },
        '-=0.2'
      );
    },
    { scope: containerRef }
  );

  const features = [
    {
      icon: <ChartColumnIncreasing className='w-6 h-6 text-indigo-400' />,
      title: 'Smart Dashboard',
      description: 'Real-time insights with tailored KPIs.',
    },
    {
      icon: <Bell className='w-6 h-6 text-teal-400' />,
      title: 'Instant Alerts',
      description: 'Stay updated with critical notifications.',
    },
    {
      icon: <CloudOff className='w-6 h-6 text-amber-400' />,
      title: 'Offline Access',
      description: 'Work seamlessly without internet.',
    },
    {
      icon: <Code className='w-6 h-6 text-indigo-400' />,
      title: 'API Connectivity',
      description: 'Integrate with your existing tools.',
    },
    {
      icon: <ClockArrowUp className='w-6 h-6 text-teal-400' />,
      title: 'Delivery History',
      description: 'Analyze past routes for optimization.',
    },
    {
      icon: <Map className='w-6 h-6 text-amber-400' />,
      title: 'Live Tracking',
      description: 'Monitor routes and traffic in real-time.',
    },
    {
      icon: <Compass className='w-6 h-6 text-indigo-400' />,
      title: 'AI Routes',
      description: 'Optimize paths with smart algorithms.',
    },
    {
      icon: <CloudCog className='w-6 h-6 text-teal-400' />,
      title: 'Cloud Access',
      description: 'Secure access from anywhere.',
    },
    {
      icon: <Users className='w-6 h-6 text-amber-400' />,
      title: 'Team Coordination',
      description: 'Assign and manage tasks easily.',
    },
  ];

  const steps = [
    {
      icon: <CloudCog className='w-8 h-8 text-indigo-400' />,
      title: 'Access Dashboard',
      description: 'View real-time logistics data.',
    },
    {
      icon: <Compass className='w-8 h-8 text-teal-400' />,
      title: 'Optimize Routes',
      description: 'Plan efficient delivery paths.',
    },
    {
      icon: <Users className='w-8 h-8 text-amber-400' />,
      title: 'Manage Teams',
      description: 'Coordinate tasks effortlessly.',
    },
    {
      icon: <Map className='w-8 h-8 text-indigo-400' />,
      title: 'Track Live',
      description: 'Monitor vehicles in real-time.',
    },
    {
      icon: <ClockArrowUp className='w-8 h-8 text-teal-400' />,
      title: 'Improve Operations',
      description: 'Leverage data for efficiency.',
    },
  ];

  const handleGetStarted = () => {
    // Handle the "Get Started" button click
    window.location.href = '#free-trial';
  };

  return (
    <div
      id='features'
      ref={containerRef}
      className='relative w-full bg-gradient-to-b from-gray-900 to-indigo-900 text-white py-12 px-4 sm:px-6 lg:px-8 overflow-hidden'
    >
      <div className='max-w-7xl mx-auto mb-10'>
        {/* Title Section */}
        <div ref={titleRef} className='text-center mb-12'>
          <h2 className='text-3xl sm:text-4xl font-bold bg-gradient-to-r from-indigo-300 to-teal-300 bg-clip-text text-transparent'>
            Simplify Logistics with Powerful Tools
          </h2>
          <p className='mt-4 text-base sm:text-lg text-gray-300 max-w-2xl mx-auto'>
            Streamline operations with intuitive features designed for modern
            logistics management.
          </p>
        </div>

        {/* Features Cards */}
        <div
          ref={cardsRef}
          className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16'
        >
          {features.map((feature, index) => (
            <div
              key={index}
              className='group bg-gray-800/50 backdrop-blur-md p-6 rounded-lg border border-gray-700 hover:border-indigo-500 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/20'
            >
              <div className='flex items-center gap-3 mb-3'>
                {feature.icon}
                <h3 className='text-lg font-semibold text-white'>
                  {feature.title}
                </h3>
              </div>
              <p className='text-sm text-gray-400'>{feature.description}</p>
            </div>
          ))}
        </div>

        {/* How It Works Section */}
        <div className='py-12'>
          <h2 className='text-3xl sm:text-4xl font-bold text-center bg-gradient-to-r from-indigo-300 to-teal-300 bg-clip-text text-transparent mb-10'>
            How It Works
          </h2>
          <div
            ref={stepsRef}
            className='flex flex-col items-center gap-6 max-w-lg mx-auto'
          >
            {steps.map((step, index) => (
              <div
                key={index}
                className='relative flex items-center gap-4 bg-gray-800/50 backdrop-blur-md p-5 rounded-lg border border-gray-700 w-full hover:border-teal-500 transition-all duration-300'
              >
                <div className='flex-shrink-0'>{step.icon}</div>
                <div>
                  <h3 className='text-lg font-semibold text-white'>
                    {step.title}
                  </h3>
                  <p className='text-sm text-gray-400'>{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className='absolute left-6 bottom-[-20px] w-0.5 h-5 bg-indigo-400/50'></div>
                )}
              </div>
            ))}
          </div>
          <div className='flex justify-center mt-10'>
            <button
              onClick={handleGetStarted}
              className='group flex items-center cursor-pointer gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-teal-500 text-white rounded-lg font-medium hover:scale-105 transition-all duration-300'
            >
              <Rocket className='w-5 h-5 group-hover:translate-x-1 transition-transform' />
              Get Started
            </button>
          </div>
        </div>
      </div>

      {/* SVG Wave */}
      <svg
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 1440 120'
        className='absolute bottom-[-10px] left-0 w-full text-white dark:text-[#101828]'
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
