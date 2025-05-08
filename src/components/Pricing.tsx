import SectionNames from './ui/SectionNames';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useRef } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Pricing = () => {
  const titleRef1 = useRef<HTMLDivElement>(null);
  const cardRef = useRef<(HTMLDivElement | null)[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (titleRef1.current?.children) {
      return gsap.fromTo(
        titleRef1.current.children,
        { opacity: 0, y: -500, scale: 0 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: 'power1.out',
          stagger: 0.2,
          scrollTrigger: {
            trigger: titleRef1?.current,
            start: 'top 80%',
            end: 'bottom 5%',
          },
        }
      );
    }
  }, []);

  useGSAP(() => {
    if (titleRef1.current?.children) {
      return gsap.fromTo(
        titleRef1.current.children,
        { opacity: 0, y: -500, scale: 0 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: 'power1.out',
          stagger: 0.2,
          scrollTrigger: {
            trigger: titleRef1?.current,
            start: 'top 80%',
            end: 'bottom 5%',
          },
        }
      );
    }
  }, []);

  useGSAP(() => {
    const elements = cardRef.current;

    if (!elements.length) return;

    gsap.fromTo(
      elements,
      { y: -50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.35,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'bottom 5%',
        },
      }
    );
  }, []);

  return (
    <div className='w-full mb-20'>
      <section
        ref={titleRef1}
        className='flex flex-col items-center justify-center text-center gap-1 mb-15'
      >
        <SectionNames sectionName='Pricing' />
        <h2 className='font-bold text-3xl mb-3'>
          Escolha o Plano Ideal para Sua Empresa
        </h2>
        <p className='w-full max-w-[550px] mx-auto text-[.9rem] text-[var(--text-muted-soft)] font-medium leading-[1.2]'>
          Temos opções Flexiceis para atender ás necessidades do seu negócio,
          desde startups até empressas estabelecidas.
        </p>
      </section>

      <section
        ref={sectionRef}
        className='flex flex-wrap gap-6 w-full p-8 justify-center items-stretch rounded-xl'
      >
        {[
          {
            title: 'Plano Gratuito',
            price: 'R$ 0',
            desc: 'Ideal para testar o sistema com rotas limitadas.',
            features: [
              '5 rotas por dia',
              '2 entregadores',
              'Monitoramento básico',
              'Suporte por email',
            ],
            bg: 'bg-blue-50',
            iconBg: 'bg-orange-300/80',
            button: {
              text: 'Começar Agora',
              variant: 'outline',
              className: 'text-cyan-500 border-cyan-300 hover:bg-cyan-50',
            },
          },
          {
            title: 'Plano Básico',
            price: 'R$ 99',
            desc: 'Para pequenas empresas que estão começando.',
            features: [
              '50 rotas por dia',
              '10 entregadores',
              'Monitoramento em tempo real',
              'Relatórios básicos',
              'Suporte por chat',
            ],
            bg: 'bg-teal-50/60',
            iconBg: 'bg-sky-400/90',
            button: {
              text: 'Escolher Plano',
              variant: 'solid',
              className: 'bg-sky-500 text-white hover:bg-sky-600',
            },
          },
          {
            title: 'Plano Avançado',
            price: 'R$ 249',
            desc: 'Para empresas que precisam de escalabilidade.',
            features: [
              'Rotas ilimitadas',
              'Entregadores ilimitados',
              'Monitoramento avançado',
              'Relatório completo',
              'Suporte 24/7',
              'API para integração',
            ],
            bg: 'bg-orange-50/60',
            iconBg: 'bg-orange-400/80',
            button: {
              text: 'Escolher Plano',
              variant: 'outline',
              className:
                'text-orange-500 border-orange-400 hover:bg-orange-100',
            },
          },
        ].map((plan, idx) => (
          <div
            key={idx}
            ref={(el) => {
              cardRef.current[idx] = el;
            }}
            className={`${plan.bg} border rounded-2xl shadow-md p-6 flex flex-col justify-between w-full max-w-sm transition-transform hover:-translate-y-1`}
          >
            <div>
              <h4 className='text-xl font-bold text-gray-800 mb-1'>
                {plan.title}
              </h4>
              <div className='flex items-baseline mb-2'>
                <span className='text-3xl font-extrabold text-gray-900'>
                  {plan.price}
                </span>
                <span className='ml-2 text-sm text-gray-500'>/mês</span>
              </div>
              <p className='text-sm text-gray-600 mb-6'>{plan.desc}</p>

              <ul className='space-y-3 mb-6'>
                {plan.features.map((feature, i) => (
                  <li
                    key={i}
                    className='flex items-center gap-2 text-sm text-gray-700'
                  >
                    <span
                      className={`w-5 h-5 flex items-center justify-center ${plan.iconBg} rounded-full`}
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-3.5 w-3.5 text-white'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                        strokeWidth={3}
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M5 13l4 4L19 7'
                        />
                      </svg>
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <button
              className={`w-full px-4 py-2 rounded-xl font-semibold border ${plan.button.className} transition`}
            >
              {plan.button.text}
            </button>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Pricing;
