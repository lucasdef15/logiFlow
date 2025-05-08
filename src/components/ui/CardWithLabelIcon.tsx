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
  blue: 'bg-blue-100 text-blue-600',
  red: 'bg-red-100 text-red-600',
  green: 'bg-green-100 text-green-600',
  amber: 'bg-amber-100 text-amber-600',
  gray: 'bg-gray-100 text-gray-600',
  cyan: 'bg-cyan-100 text-cyan-600',
  orange: 'bg-orange-100 text-orange-600',
};

const CardWithLabelIcon: React.FC<CardWithLabelIconProps> = ({
  icon,
  color = 'blue',
  title,
  description,
}) => {
  const colorClasses = bgColors[color];
  const cardRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const el = cardRef.current;
    if (!el) return;

    const handleEnter = () => {
      gsap.to(el, {
        scale: 1.05,
        skewY: 2,
        skewX: 1,
        rotateZ: 1.5,
        boxShadow: '0 12px 24px rgba(0,0,0,0.12)',
        duration: 0.35,
        ease: 'power3.out',
      });
    };

    const handleLeave = () => {
      gsap.to(el, {
        scale: 1,
        skewY: 0,
        skewX: 0,
        rotateZ: 0,
        boxShadow: '4px 4px 8px -2px rgba(0,0,0,0.1)',
        duration: 0.4,
        ease: 'power2.inOut',
      });
    };

    el.addEventListener('mouseenter', handleEnter);
    el.addEventListener('mouseleave', handleLeave);

    return () => {
      el.removeEventListener('mouseenter', handleEnter);
      el.removeEventListener('mouseleave', handleLeave);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className='flex flex-col gap-2 bg-[#ffff/3] w-[325px] p-4 rounded-sm shadow-[4px_4px_8px_-2px_rgba(0,0,0,0.1)] transition-transform duration-200 ease-out will-change-transform'
    >
      <div
        className={`w-12 h-12 flex items-center justify-center rounded-full ${colorClasses}`}
      >
        {React.cloneElement(icon, { className: 'w-6 h-6' })}
      </div>
      <div>
        <h3 className='text-base font-semibold text-[var(--primary-foreground)]'>
          {title}
        </h3>
        <p className='text-sm text-[var(--text-muted-soft)]'>{description}</p>
      </div>
    </div>
  );
};

export default CardWithLabelIcon;
