import SectionNames from './ui/SectionNames';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useRef } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Pricing = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<(HTMLDivElement | null)[]>([]);
  const svgBgRef = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
      });

      // Background SVG animation (morphing and scaling)
      tl.fromTo(
        svgBgRef.current,
        { scale: 0.8, opacity: 0, rotation: 15 },
        {
          scale: 1,
          opacity: 0.3,
          rotation: 0,
          duration: 1.5,
          ease: 'expo.inOut',
        }
      ).fromTo(
        svgBgRef.current?.querySelector('path')
          ? svgBgRef.current.querySelector('path')
          : null,
        {
          attr: {
            d: 'M50,20 C80,-10 150,10 170,80 C190,150 130,170 90,190 C50,210 20,180 10,120 C0,60 20,40 50,20 Z',
          },
        },
        {
          attr: {
            d: 'M40,30 C90,0 160,20 180,90 C200,160 140,180 100,200 C60,220 20,170 10,110 C0,50 10,40 40,30 Z',
          },
          duration: 2,
          ease: 'power4.inOut',
        },
        0
      );

      // Title section animation (staggered entrance with rotation)
      tl.fromTo(
        Array.from(titleRef.current?.children || []),
        { opacity: 0, y: 30, rotationY: 10 },
        {
          opacity: 1,
          y: 0,
          rotationY: 0,
          duration: 0.8,
          ease: 'expo.inOut',
          stagger: 0.15,
        },
        0.4
      );

      // Card animation (3D flip and lift)
      tl.fromTo(
        cardRef.current,
        { opacity: 0, y: 60, scale: 0.85, rotationX: 20 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotationX: 0,
          duration: 1,
          ease: 'power4.inOut',
          stagger: 0.2,
        },
        0.6
      );

      // Checkmark SVG animation (drawing effect)
      tl.fromTo(
        cardRef.current.flatMap((card) =>
          Array.from(card?.querySelectorAll('svg path') || [])
        ),
        { strokeDasharray: 100, strokeDashoffset: 100 },
        {
          strokeDashoffset: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power2.inOut',
        },
        0.8
      );

      // Card and button hover effects
      const ctx = gsap.context(() => {
        cardRef.current.forEach((card) => {
          if (!card) return;

          // Card hover
          card.addEventListener('mouseenter', () => {
            gsap.to(card, {
              scale: 1.05,
              y: -15,
              boxShadow: '0px 16px 32px rgba(0, 0, 0, 0.2)',
              background: card.classList.contains('bg-blue-50')
                ? 'linear-gradient(135deg, #e0f7fa, #b3e5fc)'
                : card.classList.contains('bg-teal-50/60')
                ? 'linear-gradient(135deg, #ccfbf1, #99f6e4)'
                : 'linear-gradient(135deg, #ffedd5, #fed7aa)',
              duration: 0.4,
              ease: 'power2.out',
            });
          });
          card.addEventListener('mouseleave', () => {
            gsap.to(card, {
              scale: 1,
              y: 0,
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
              background: card.classList.contains('bg-blue-50')
                ? '#eff6ff'
                : card.classList.contains('bg-teal-50/60')
                ? 'rgba(204, 251, 241, 0.6)'
                : 'rgba(255, 237, 213, 0.6)',
              duration: 0.4,
              ease: 'power2.out',
            });
          });

          // Button hover
          const button = card.querySelector('button');
          if (button) {
            button.addEventListener('mouseenter', () => {
              gsap.to(button, {
                scale: 1.1,
                boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
                backgroundColor: button.classList.contains('bg-sky-500')
                  ? '#0284c7'
                  : undefined,
                borderColor: button.classList.contains('text-cyan-500')
                  ? '#06b6d4'
                  : button.classList.contains('text-orange-500')
                  ? '#f97316'
                  : undefined,
                duration: 0.3,
                ease: 'power2.out',
              });
            });
            button.addEventListener('mouseleave', () => {
              gsap.to(button, {
                scale: 1,
                boxShadow: '0px 0px 0px rgba(0, 0, 0, 0)',
                backgroundColor: button.classList.contains('bg-sky-500')
                  ? '#0ea5e9'
                  : undefined,
                borderColor: button.classList.contains('text-cyan-500')
                  ? '#22d3ee'
                  : button.classList.contains('text-orange-500')
                  ? '#fb923c'
                  : undefined,
                duration: 0.3,
                ease: 'power2.out',
              });
            });
          }
        });
      }, containerRef);

      return () => ctx.revert();
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      id='pricing'
      className='w-full mb-20 relative overflow-hidden'
    >
      <svg
        ref={svgBgRef}
        className='absolute top-0 left-0 w-full h-full opacity-30 z-[-1]'
        viewBox='0 0 200 250'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          fill='#bae6fd'
          d='M40,30 C90,0 160,20 180,90 C200,160 140,180 100,200 C60,220 20,170 10,110 C0,50 10,40 40,30 Z'
        />
      </svg>

      <section
        ref={titleRef}
        className='flex flex-col items-center justify-center text-center gap-1 mb-15'
      >
        <SectionNames sectionName='Pricing' />
        <h2 className='font-bold text-3xl mb-3'>
          Escolha o Plano Ideal para Sua Empresa
        </h2>
        <p className='w-full max-w-[550px] mx-auto text-[.9rem] text-[var(--text-muted-soft)] font-medium leading-[1.2]'>
          Temos opções flexíveis para atender às necessidades do seu negócio,
          desde startups até empresas estabelecidas.
        </p>
      </section>

      <section className='flex flex-wrap gap-6 w-full p-8 justify-center items-stretch rounded-xl'>
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
            className={`${plan.bg} border rounded-2xl shadow-md p-6 flex flex-col justify-between w-full max-w-sm transition-transform`}
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
              className={`w-full px-4 py-2 rounded-xl cursor-pointer font-semibold border ${plan.button.className} transition`}
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
