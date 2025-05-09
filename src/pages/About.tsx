import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRefs: React.RefObject<HTMLDivElement | null>[] = [
    useRef<HTMLDivElement | null>(null),
    useRef<HTMLDivElement | null>(null),
    useRef<HTMLDivElement | null>(null),
  ];

  const applyGSAPAnimation = (
    ref: React.RefObject<HTMLDivElement | null>,
    xOffset: number = 0
  ) => {
    if (ref.current) {
      gsap.fromTo(
        ref.current.children,
        { opacity: 0, y: 50, x: xOffset },
        {
          opacity: 1,
          y: 0,
          x: 0,
          duration: 1,
          ease: 'power2.out',
          stagger: 0.25,
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 90%',
            end: 'bottom 20%',
            toggleActions: 'play none none none',
          },
        }
      );
    }
  };

  useEffect(() => {
    sectionRefs.forEach((ref, index) => {
      applyGSAPAnimation(ref, index === 1 ? 30 : index === 2 ? -30 : 0);
    });
  }, []);

  return (
    <div className='flex flex-col w-full max-w-6xl mx-auto px-4 py-12 gap-10 bg-white'>
      <section
        ref={sectionRefs[0]}
        className='bg-gray-50 rounded-xl p-6 shadow-sm transition-shadow duration-300 hover:shadow-md'
      >
        <h1 className='text-3xl font-bold text-gray-800 mb-3'>Sobre Nós</h1>
        <p className='text-gray-600 leading-relaxed'>
          A TrackFlow é uma empresa inovadora especializada em soluções de
          logística e gerenciamento de entregas.
        </p>
        <p className='text-gray-600 leading-relaxed mt-3'>
          Nosso objetivo é oferecer serviços de alta qualidade e eficiência para
          nossos clientes, utilizando tecnologia de ponta.
        </p>
      </section>

      <div ref={sectionRefs[1]} className='flex flex-col md:flex-row gap-6'>
        <section className='flex-1 bg-gray-50 rounded-xl p-6 shadow-sm transition-shadow duration-300 hover:shadow-md'>
          <h3 className='text-xl font-semibold text-gray-800 mb-2'>
            Nossa Missão
          </h3>
          <p className='text-gray-600 leading-relaxed'>
            Simplificar o gerenciamento logístico para empresas de todos os
            tamanhos, com ferramentas intuitivas que otimizam operações e
            reduzem custos.
          </p>
        </section>
        <section className='flex-1 bg-gray-50 rounded-xl p-6 shadow-sm transition-shadow duration-300 hover:shadow-md'>
          <h3 className='text-xl font-semibold text-gray-800 mb-2'>
            Nossa Visão
          </h3>
          <p className='text-gray-600 leading-relaxed'>
            Transformar a indústria logística, tornando-a mais eficiente e
            sustentável, por meio de tecnologia e inovação.
          </p>
        </section>
      </div>

      <section
        ref={sectionRefs[2]}
        className='bg-gray-50 rounded-xl p-6 shadow-sm transition-shadow duration-300 hover:shadow-md'
      >
        <h3 className='text-xl font-semibold text-gray-800 mb-2'>
          Nossa História
        </h3>
        <p className='text-gray-600 leading-relaxed mb-3'>
          Fundada em 2018, a TrackFlow surgiu da necessidade de superar as
          limitações dos sistemas logísticos tradicionais. Nossos fundadores,
          especialistas em transporte e tecnologia, criaram uma solução
          integrada para a logística moderna.
        </p>
        <p className='text-gray-600 leading-relaxed mb-3'>
          Hoje, atendemos clientes em diversos setores e continentes, mantendo
          nosso compromisso com a inovação e a satisfação do cliente.
        </p>
        <p className='text-gray-600 leading-relaxed'>
          Nossa equipe trabalha para oferecer soluções personalizadas,
          garantindo eficiência e resultados excepcionais para cada cliente.
        </p>
      </section>
    </div>
  );
};

export default About;
