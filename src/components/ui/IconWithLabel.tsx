import React from 'react';

type IconWithLabelProps = {
  icon: React.ReactElement<{ className?: string }>;
  color?: 'blue' | 'cyan' | 'orange';
  label: string;
};

const IconWithLabel: React.FC<IconWithLabelProps> = ({
  icon,
  color = 'blue',
  label,
}) => {
  const colorClasses: Record<
    string,
    { bg: string; text: string; shadow: string }
  > = {
    blue: {
      bg: 'bg-gradient-to-br from-blue-800 to-blue-600',
      text: 'text-blue-300',
      shadow:
        'shadow-[0_0_8px_2px_rgba(59,130,246,0.5)] hover:shadow-[0_0_12px_4px_rgba(59,130,246,0.7)]',
    },
    cyan: {
      bg: 'bg-gradient-to-br from-cyan-800 to-cyan-600',
      text: 'text-cyan-300',
      shadow:
        'shadow-[0_0_8px_2px_rgba(34,211,238,0.5)] hover:shadow-[0_0_12px_4px_rgba(34,211,238,0.7)]',
    },
    orange: {
      bg: 'bg-gradient-to-br from-orange-700 to-orange-500',
      text: 'text-orange-200',
      shadow:
        'shadow-[0_0_8px_2px_rgba(249,115,22,0.5)] hover:shadow-[0_0_12px_4px_rgba(249,115,22,0.7)]',
    },
  };

  const {
    bg: bgClass,
    text: textClass,
    shadow: shadowClass,
  } = colorClasses[color] || colorClasses['blue'];

  return (
    <div className='flex flex-col items-center p-1 sm:p-2 rounded-2xl w-fit hover:scale-105 transition-transform duration-300'>
      <div
        className={`w-10 h-10 sm:w-14 sm:h-14 flex items-center justify-center rounded-full ${bgClass} ${shadowClass} transition-shadow duration-300`}
      >
        {React.cloneElement(icon, {
          className: `w-6 h-6 sm:w-7 sm:h-7 ${textClass}`,
        })}
      </div>
      <p className='mt-2 text-xs sm:text-sm font-medium text-gray-200'>
        {label}
      </p>
    </div>
  );
};

export default IconWithLabel;
