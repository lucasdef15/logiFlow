import React from 'react';

type SectionNamesProps = {
  sectionName: string;
};

const SectionNames: React.FC<SectionNamesProps> = ({ sectionName }) => {
  return (
    <span className='bg-blue-900/50 border border-blue-400/50 text-blue-200 px-3 py-1 rounded-full text-sm font-medium shadow-[0_0_6px_rgba(59,130,246,0.3)]'>
      {sectionName}
    </span>
  );
};

export default SectionNames;
