import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Truck, Globe, Users, Target } from 'lucide-react';
import About3d from '@/components/ModelsComponents/AboutModels/About3d';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRefs = [
    useRef<HTMLDivElement | null>(null),
    useRef<HTMLDivElement | null>(null),
    useRef<HTMLDivElement | null>(null),
    useRef<HTMLDivElement | null>(null),
  ];

  const applyGSAPAnimation = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (ref.current) {
      gsap.fromTo(
        ref.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power1.out',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    }
  };

  useGSAP(() => {
    sectionRefs.forEach((ref) => applyGSAPAnimation(ref));
  }, []);

  return (
    <div className='relative w-full min-h-screen bg-gray-100 dark:bg-[#0d111c] text-gray-900 dark:text-white py-20 px-4 overflow-hidden'>
      {/* WebGL Background Placeholder */}
      <div className='absolute inset-0 w-full h-full z-0 opacity-50 bg-gradient-to-r from-blue-100/20 dark:from-[#00b7eb]/20 to-transparent' />

      {/* Gradient Transition */}
      <div className='absolute bottom-0 left-0 w-full h-32 bg-gradient-to-b from-transparent to-gray-100 dark:to-[#0d111c] z-10 pointer-events-none' />

      {/* Main Content */}
      <div className='relative max-w-7xl mx-auto z-10'>
        {/* Introduction Section */}
        <section
          ref={sectionRefs[0]}
          className='bg-white/80 dark:bg-[#1a1f2b]/80 rounded-xl p-8 shadow-lg transition-all duration-300 hover:shadow-blue-300/50 dark:hover:shadow-cyan-500/50 mb-12'
        >
          <h1 className='text-4xl sm:text-5xl font-bold text-blue-600 dark:text-[#00b7eb] mb-4'>
            Sobre Nós
          </h1>
          <p className='text-gray-600 dark:text-white/80 text-lg leading-relaxed'>
            A TrackFlow é uma empresa inovadora especializada em soluções de
            logística e gerenciamento de entregas.
          </p>
          <p className='text-gray-600 dark:text-white/80 text-lg leading-relaxed mt-4'>
            Nosso objetivo é oferecer serviços de alta qualidade e eficiência
            para nossos clientes, utilizando tecnologia de ponta.
          </p>
        </section>

        {/* Mission and Vision */}
        <div
          ref={sectionRefs[1]}
          className='grid grid-cols-1 md:grid-cols-2 gap-8 mb-12'
        >
          <div className='bg-white/80 dark:bg-[#1a1f2b]/80 rounded-xl p-6 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-blue-300/50 dark:hover:shadow-cyan-500/50'>
            <div className='flex items-center gap-4 mb-4'>
              <Target className='text-blue-500 dark:text-[#00b7eb] w-8 h-8' />
              <h3 className='text-2xl font-semibold text-gray-900 dark:text-white'>
                Nossa Missão
              </h3>
            </div>
            <p className='text-gray-600 dark:text-white/70 leading-relaxed'>
              Simplificar o gerenciamento logístico para empresas de todos os
              tamanhos, com ferramentas intuitivas que otimizam operações e
              reduzem custos.
            </p>
          </div>
          <div className='bg-white/80 dark:bg-[#1a1f2b]/80 rounded-xl p-6 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-blue-300/50 dark:hover:shadow-cyan-500/50'>
            <div className='flex items-center gap-4 mb-4'>
              <Globe className='text-blue-500 dark:text-[#00b7eb] w-8 h-8' />
              <h3 className='text-2xl font-semibold text-gray-900 dark:text-white'>
                Nossa Visão
              </h3>
            </div>
            <p className='text-gray-600 dark:text-white/70 leading-relaxed'>
              Transformar a indústria logística, tornando-a mais eficiente e
              sustentável, por meio de tecnologia e inovação.
            </p>
          </div>
        </div>

        {/* History Section with Timeline */}
        <section
          ref={sectionRefs[2]}
          className='bg-white/80 dark:bg-[#1a1f2b]/80 rounded-xl p-8 shadow-lg transition-all duration-300 hover:shadow-blue-300/50 dark:hover:shadow-cyan-500/50 mb-12'
        >
          <h3 className='text-3xl font-semibold text-blue-600 dark:text-[#00b7eb] mb-6'>
            Nossa História
          </h3>
          <div className='relative'>
            {/* Timeline Line */}
            <div className='absolute left-4 top-0 h-full w-1 bg-blue-300/50 dark:bg-[#00b7eb]/50' />
            {/* Timeline Items */}
            <div className='space-y-8'>
              <div className='relative pl-12'>
                <div className='absolute left-0 top-0 w-8 h-8 bg-blue-500 dark:bg-[#00b7eb] rounded-full flex items-center justify-center'>
                  <Truck className='text-white dark:text-white w-5 h-5' />
                </div>
                <h4 className='text-xl font-semibold text-gray-900 dark:text-white'>
                  2018 - Fundada
                </h4>
                <p className='text-gray-600 dark:text-white/70 leading-relaxed'>
                  A TrackFlow surgiu da necessidade de superar as limitações dos
                  sistemas logísticos tradicionais.
                </p>
              </div>
              <div className='relative pl-12'>
                <div className='absolute left-0 top-0 w-8 h-8 bg-blue-500 dark:bg-[#00b7eb] rounded-full flex items-center justify-center'>
                  <Users className='text-white dark:text-white w-5 h-5' />
                </div>
                <h4 className='text-xl font-semibold text-gray-900 dark:text-white'>
                  2020 - Expansão Global
                </h4>
                <p className='text-gray-600 dark:text-white/70 leading-relaxed'>
                  Atendemos clientes em diversos setores e continentes,
                  expandindo nossa presença global.
                </p>
              </div>
              <div className='relative pl-12'>
                <div className='absolute left-0 top-0 w-8 h-8 bg-blue-500 dark:bg-[#00b7eb] rounded-full flex items-center justify-center'>
                  <Target className='text-white dark:text-white w-5 h-5' />
                </div>
                <h4 className='text-xl font-semibold text-gray-900 dark:text-white'>
                  Hoje - Líderes em Inovação
                </h4>
                <p className='text-gray-600 dark:text-white/70 leading-relaxed'>
                  Comprometidos com a inovação, oferecemos soluções
                  personalizadas para resultados excepcionais.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 3D Element Placeholder */}
        <section
          ref={sectionRefs[3]}
          className='relative flex justify-center items-center h-96 bg-white/80 dark:bg-[#1a1f2b]/80 rounded-xl shadow-lg transition-all duration-300 hover:shadow-blue-300/50 dark:hover:shadow-cyan-500/50'
        >
          <div className='text-center w-full h-full'>
            <div className='w-full h-[83vh] relative top-[-200px] mx-auto rounded-full flex items-center justify-center'>
              <About3d />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
