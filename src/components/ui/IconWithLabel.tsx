import React from 'react';

type IconWithLabelProps = {
  icon: React.ReactElement<{ className?: string }>;
  color?: 'blue' | 'red' | 'green' | 'amber' | 'gray' | 'cyan' | 'orange';
  label: string;
};

const IconWithLabel: React.FC<IconWithLabelProps> = ({
  icon,
  color = 'blue',
  label,
}) => {
  const colorClasses: Record<string, { bg: string; text: string }> = {
    blue: { bg: 'bg-blue-100', text: 'text-blue-600' },
    red: { bg: 'bg-red-100', text: 'text-red-600' },
    green: { bg: 'bg-green-100', text: 'text-green-600' },
    orange: { bg: 'bg-orange-100', text: 'text-orange-600' },
    amber: { bg: 'bg-amber-100', text: 'text-amber-600' },
    gray: { bg: 'bg-gray-100', text: 'text-gray-600' },
    cyan: { bg: 'bg-cyan-100', text: 'text-cyan-600' },
  };

  const { bg: bgClass, text: textClass } =
    colorClasses[color] || colorClasses['blue'];

  return (
    <div className='flex flex-col items-center p-2 rounded-xl w-fit'>
      <div
        className={`w-12 h-12 flex items-center justify-center rounded-full ${bgClass}`}
      >
        {React.cloneElement(icon, {
          className: `w-5 h-5 ${textClass}`,
        })}
      </div>
      <p className='mt-2 text-[.8rem] font-medium text-[var(--text-muted-soft)]'>
        {label}
      </p>
    </div>
  );
};

export default IconWithLabel;
