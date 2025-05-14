import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

type CardWithLabelIconProps = {
  icon: React.ReactElement<{ className?: string }>;
  color?: 'blue' | 'red' | 'green' | 'amber' | 'gray' | 'cyan' | 'orange';
  title: string;
  description: string;
};

const bgColors: Record<NonNullable<CardWithLabelIconProps['color']>, string> = {
  blue: 'dark:bg-blue-800/50 bg-blue-800/90 text-white border-blue-400/30',
  cyan: 'dark:bg-cyan-800/50 bg-cyan-800/90 text-white border-cyan-400/30',
  orange:
    'dark:bg-orange-800/50 bg-orange-800/90 text-white border-orange-400/30',
  red: 'dark:bg-red-800/50 bg-red-800/90 text-white border-red-400/30',
  green: 'dark:bg-green-800/50 bg-green-800/90 text-white border-green-400/30',
  amber: 'dark:bg-amber-800/50 bg-amber-800/90 text-white border-amber-400/30',
  gray: 'dark:bg-gray-800/50 bg-gray-800/90 text-white border-gray-400/30',
};

const CardWithLabelIcon: React.FC<CardWithLabelIconProps> = ({
  icon,
  color = 'blue',
  title,
  description,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const colorClasses = bgColors[color];

  useGSAP(() => {
    const el = cardRef.current;
    if (!el) return;

    const enter = () =>
      gsap.to(el, {
        y: -6,
        scale: 1.02,
        boxShadow: '0 12px 28px rgba(0,0,0,0.15)',
        duration: 0.35,
        ease: 'power3.out',
      });

    const leave = () =>
      gsap.to(el, {
        y: 0,
        scale: 1,
        boxShadow: '0 6px 16px rgba(0,0,0,0.08)',
        duration: 0.4,
        ease: 'power2.inOut',
      });

    el.addEventListener('mouseenter', enter);
    el.removeEventListener('mouseleave', leave);

    return () => {
      el.removeEventListener('mouseenter', enter);
      el.removeEventListener('mouseleave', leave);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className={`relative w-full p-4 sm:p-5 md:p-6 rounded-2xl border backdrop-blur-md transition duration-300 ease-out ${colorClasses}`}
    >
      <div
        className='w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm ring-1 ring-inset ring-white/10 shadow-inner'
        style={{
          backgroundImage:
            'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.15), transparent 60%)',
        }}
      >
        {React.cloneElement(icon, {
          className: 'w-5 h-5 sm:w-6 sm:h-6 text-white',
        })}
      </div>
      <div className='mt-4 space-y-1'>
        <h3 className='text-base sm:text-lg md:text-xl font-semibold text-white tracking-tight'>
          {title}
        </h3>
        <p className='text-sm sm:text-base md:text-lg text-white/80'>
          {description}
        </p>
      </div>
    </div>
  );
};

export default CardWithLabelIcon;
