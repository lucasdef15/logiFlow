import { useRef } from 'react';
import SectionNames from './ui/SectionNames';
import { useTheme } from '@/context/Theme-provider';
import {
  Settings2,
  ShieldCheck,
  BarChart3,
  LayoutTemplate,
  Zap,
} from 'lucide-react';

// Top Spikes SVG Component
const TopSpikes = ({ className }: { className?: string }) => (
  <svg
    width='100%'
    height='20'
    viewBox='0 0 100 20'
    preserveAspectRatio='none'
    className={className}
  >
    <path
      d='M0,0 L5,20 L10,0 L15,20 L20,0 L25,20 L30,0 L35,20 L40,0 L45,20 L50,0 L55,20 L60,0 L65,20 L70,0 L75,20 L80,0 L85,20 L90,0 L95,20 L100,0'
      fill='currentColor'
    />
  </svg>
);

// Bottom Spikes SVG Component
const BottomSpikes = ({ className }: { className?: string }) => (
  <svg
    width='100%'
    height='20'
    viewBox='0 0 100 20'
    preserveAspectRatio='none'
    className={className}
  >
    <path
      d='M0,20 L5,0 L10,20 L15,0 L20,20 L25,0 L30,20 L35,0 L40,20 L45,0 L50,20 L55,0 L60,20 L65,0 L70,20 L75,0 L80,20 L85,0 L90,20 L95,0 L100,20'
      fill='currentColor'
    />
  </svg>
);

const Advantages = () => {
  const titleRef = useRef(null);
  const { theme } = useTheme();

  const advantages = [
    {
      title: 'Customization',
      description: 'Tailor your workflows to fit your unique needs with ease.',
      icon: <Settings2 className='w-8 h-8 text-indigo-500' />,
    },
    {
      title: 'Security',
      description: 'Keep your data safe with top-notch security features.',
      icon: <ShieldCheck className='w-8 h-8 text-indigo-500' />,
    },
    {
      title: 'Analytics',
      description: 'Gain insights with detailed performance metrics.',
      icon: <BarChart3 className='w-8 h-8 text-indigo-500' />,
    },
    {
      title: 'Templates',
      description: 'Start quickly with pre-built workflow templates.',
      icon: <LayoutTemplate className='w-8 h-8 text-indigo-500' />,
    },
    {
      title: 'Speed',
      description: 'Boost efficiency with lightning-fast processing.',
      icon: <Zap className='w-8 h-8 text-indigo-500' />,
    },
  ];

  const badges = [
    { title: 'Fast', dot: 'w-2 h-2 bg-teal-500 rounded-full' },
    { title: 'Secure', dot: 'w-2 h-2 bg-indigo-500 rounded-full' },
    { title: 'Scalable', dot: 'w-2 h-2 bg-cyan-500 rounded-full' },
    { title: 'User-Friendly', dot: 'w-2 h-2 bg-purple-500 rounded-full' },
  ];

  return (
    <div>
      {/* Top SVG Spikes */}
      <TopSpikes className='text-[#0EA5E9] dark:text-[#101828]' />

      {/* Main Content */}
      <div className='max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 bg-white dark:bg-[#0A0A0A] py-12'>
        <section
          ref={titleRef}
          className='flex flex-col items-center justify-center text-center gap-4 mb-8 sm:mb-12 md:mb-16'
        >
          {theme === 'dark' ? (
            <SectionNames sectionName='Advantages' />
          ) : (
            <span className='text-cyan-700 px-4 py-1.5 rounded-full text-sm font-medium shadow-sm bg-gray-100'>
              Advantages
            </span>
          )}
          <h1 className='text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-indigo-600 to-cyan-500 dark:from-indigo-400 dark:to-cyan-300 bg-clip-text text-transparent'>
            Why Choose Us?
          </h1>
          <p className='max-w-xl text-base sm:text-lg text-gray-600 dark:text-gray-400'>
            Discover the benefits of using our platform to streamline your
            workflow.
          </p>
        </section>

        <div className='py-12'>
          <div className='flex flex-col items-center gap-6 max-w-lg mx-auto'>
            {advantages.map((item, index) => (
              <div
                key={index}
                className='relative flex items-center gap-4 bg-gray-50 dark:bg-gray-900/50 backdrop-blur-md p-5 rounded-lg border border-gray-200 dark:border-gray-700 w-full hover:border-teal-500 dark:hover:border-teal-400 transition-all duration-300'
              >
                <div className='flex-shrink-0'>{item.icon}</div>
                <div>
                  <h3 className='text-lg font-semibold text-gray-900 dark:text-white'>
                    {item.title}
                  </h3>
                  <p className='text-sm text-gray-600 dark:text-gray-400'>
                    {item.description}
                  </p>
                </div>
                {index < advantages.length - 1 && (
                  <div className='absolute left-6 bottom-[-20px] w-0.5 h-5 bg-indigo-400/50'></div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className='py-12'>
          <h2 className='text-3xl sm:text-4xl font-bold text-center bg-gradient-to-r from-indigo-600 to-cyan-500 dark:from-indigo-400 dark:to-cyan-300 bg-clip-text text-transparent mb-10'>
            Why Choose FastFlow?
          </h2>
          <div className='flex flex-row flex-wrap items-center justify-center gap-6'>
            {badges.map((badge, index) => (
              <div
                key={index}
                className='flex justify-center items-center gap-2 w-fit whitespace-nowrap bg-gray-100 dark:bg-gray-800 shadow-md px-3 py-1 rounded-2xl'
              >
                <div className={badge.dot} />
                <h4 className='text-md font-medium text-gray-800 dark:text-gray-200'>
                  {badge.title}
                </h4>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom SVG Spikes */}
      <BottomSpikes className='text-[#F9FAFB] dark:text-[#1D2838]' />
    </div>
  );
};

export default Advantages;
