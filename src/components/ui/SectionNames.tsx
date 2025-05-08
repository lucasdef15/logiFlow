import React from 'react';

type SectionNamesProps = {
  sectionName: string;
};

const SectionNames: React.FC<SectionNamesProps> = ({ sectionName }) => {
  return (
    <span className='text-cyan-500 font-medium mb-2 bg-cyan-100 p-1 px-4 rounded-full'>
      {sectionName}
    </span>
  );
};

export default SectionNames;
