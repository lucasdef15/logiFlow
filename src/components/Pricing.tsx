import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useRef, useMemo, useEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTheme } from '@/context/Theme-provider';
import SectionNames from './ui/SectionNames';

gsap.registerPlugin(ScrollTrigger);

const Pricing = () => {
  const containerRef = useRef(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<(HTMLDivElement | null)[]>([]);
  const { theme } = useTheme();

  // Memoize theme-dependent styles
  const themeStyles = useMemo(
    () => ({
      card: {
        blue: {
          bg: theme === 'dark' ? '#1e3a8a' : '#eff6ff',
          hoverBg:
            theme === 'dark'
              ? 'linear-gradient(135deg, #1e3a8a, #3b82f6)'
              : 'linear-gradient(135deg, #e0f7fa, #b3e5fc)',
        },
        teal: {
          bg:
            theme === 'dark'
              ? 'rgba(17, 94, 89, 0.6)'
              : 'rgba(204, 251, 241, 0.6)',
          hoverBg:
            theme === 'dark'
              ? 'linear-gradient(135deg, #115e59, #2dd4bf)'
              : 'linear-gradient(135deg, #ccfbf1, #99f6e4)',
        },
        orange: {
          bg:
            theme === 'dark'
              ? 'rgba(154, 52, 18, 0.6)'
              : 'rgba(255, 237, 213, 0.6)',
          hoverBg:
            theme === 'dark'
              ? 'linear-gradient(135deg, #9a3412, #f59e0b)'
              : 'linear-gradient(135deg, #ffedd5, #fed7aa)',
        },
      },
      button: {
        sky: {
          bg: theme === 'dark' ? '#0ea5e9' : '#0ea5e9',
          hoverBg: theme === 'dark' ? '#0e7490' : '#0284c7',
        },
        cyan: {
          border: theme === 'dark' ? '#06b6d4' : '#22d3ee',
          hoverBorder: theme === 'dark' ? '#22d3ee' : '#06b6d4',
        },
        orange: {
          border: theme === 'dark' ? '#f97316' : '#fb923c',
          hoverBorder: theme === 'dark' ? '#fb923c' : '#f97316',
        },
      },
    }),
    [theme]
  );

  // Update card backgrounds when theme changes
  useEffect(() => {
    cardRef.current.forEach((card, idx) => {
      if (!card) return;
      const planType = idx === 0 ? 'blue' : idx === 1 ? 'teal' : 'orange';
      gsap.set(card, {
        background: themeStyles.card[planType].bg,
      });
    });
  }, [theme, themeStyles]);

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

      // Title animation
      tl.fromTo(
        Array.from(titleRef.current?.children ?? []),
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
          stagger: 0.1,
        },
        0
      );

      // Card animation
      tl.fromTo(
        cardRef.current,
        {
          opacity: 0,
          y: 30,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: (i) => (i === 1 ? -10 : 0),
          scale: (i) => (i === 1 ? 1.05 : 0.98),
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.1,
        },
        0.2
      );

      // Checkmark animation
      tl.fromTo(
        cardRef.current.flatMap((card) =>
          Array.from(card?.querySelectorAll('svg path') || [])
        ),
        { strokeDasharray: 100, strokeDashoffset: 100 },
        {
          strokeDashoffset: 0,
          duration: 0.5,
          stagger: 0.05,
          ease: 'power2.out',
        },
        0.4
      );

      // Hover effects for buttons (cards use CSS for hover)
      const ctx = gsap.context(() => {
        cardRef.current.forEach((card, idx) => {
          if (!card) return;
          const button = card.querySelector('button');
          const buttonType = idx === 0 ? 'cyan' : idx === 1 ? 'sky' : 'orange';

          if (button) {
            button.addEventListener('mouseenter', () => {
              gsap.to(button, {
                scale: 1.05,
                backgroundColor:
                  buttonType === 'sky'
                    ? themeStyles.button.sky.hoverBg
                    : undefined,
                borderColor:
                  buttonType === 'cyan'
                    ? themeStyles.button.cyan.hoverBorder
                    : buttonType === 'orange'
                    ? themeStyles.button.orange.hoverBorder
                    : undefined,
                duration: 0.2,
                ease: 'power2.out',
              });
            });
            button.addEventListener('mouseleave', () => {
              gsap.to(button, {
                scale: 1,
                backgroundColor:
                  buttonType === 'sky' ? themeStyles.button.sky.bg : undefined,
                borderColor:
                  buttonType === 'cyan'
                    ? themeStyles.button.cyan.border
                    : buttonType === 'orange'
                    ? themeStyles.button.orange.border
                    : undefined,
                duration: 0.2,
                ease: 'power2.out',
              });
            });
          }
        });
      }, containerRef);

      return () => ctx.revert();
    },
    { scope: containerRef, dependencies: [theme] }
  );

  return (
    <div
      ref={containerRef}
      id='pricing'
      className='w-full min-h-[calc(100vh+10rem)] pt-10 text-gray-900 dark:text-gray-100 relative overflow-hidden bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900'
      data-theme={theme}
    >
      <style>
        {`
          [data-theme='dark'] [data-plan='blue'] {
            background: ${themeStyles.card.blue.bg};
            transition: background 0.3s ease, transform 0.3s ease;
          }
          [data-theme='dark'] [data-plan='blue']:hover {
            background: ${themeStyles.card.blue.hoverBg};
            transform: scale(0.98) translateY(-5px);
          }
          [data-theme='light'] [data-plan='blue'] {
            background: ${themeStyles.card.blue.bg};
            transition: background 0.3s ease, transform 0.3s ease;
          }
          [data-theme='light'] [data-plan='blue']:hover {
            background: ${themeStyles.card.blue.hoverBg};
            transform: scale(0.98) translateY(-5px);
          }
          [data-theme='dark'] [data-plan='teal'] {
            background: ${themeStyles.card.teal.bg};
            transition: background 0.3s ease, transform 0.3s ease;
          }
          [data-theme='dark'] [data-plan='teal']:hover {
            background: ${themeStyles.card.teal.hoverBg};
            transform: scale(1.05) translateY(-10px);
          }
          [data-theme='light'] [data-plan='teal'] {
            background: ${themeStyles.card.teal.bg};
            transition: background 0.3s ease, transform 0.3s ease;
          }
          [data-theme='light'] [data-plan='teal']:hover {
            background: ${themeStyles.card.teal.hoverBg};
            transform: scale(1.05) translateY(-10px);
          }
          [data-theme='dark'] [data-plan='orange'] {
            background: ${themeStyles.card.orange.bg};
            transition: background 0.3s ease, transform 0.3s ease;
          }
          [data-theme='dark'] [data-plan='orange']:hover {
            background: ${themeStyles.card.orange.hoverBg};
            transform: scale(0.98) translateY(-5px);
          }
          [data-theme='light'] [data-plan='orange'] {
            background: ${themeStyles.card.orange.bg};
            transition: background 0.3s ease, transform 0.3s ease;
          }
          [data-theme='light'] [data-plan='orange']:hover {
            background: ${themeStyles.card.orange.hoverBg};
            transform: scale(0.98) translateY(-5px);
          }
        `}
      </style>
      <div className='absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.08)_0%,transparent_70%)] dark:bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.15)_0%,transparent_70%)] z-[-1]' />
      <section
        ref={titleRef}
        className='flex flex-col items-center justify-center text-center gap-4 mb-8 sm:mb-12 md:mb-16'
      >
        {theme === 'dark' ? (
          <SectionNames sectionName='Testimonials' />
        ) : (
          <span className='text-cyan-700 px-4 py-1.5 rounded-full text-sm font-medium shadow-sm bg-gray-100'>
            Testimonials
          </span>
        )}
        <h2 className='text-3xl sm:text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-indigo-600 to-cyan-500 dark:from-indigo-400 dark:to-cyan-300 bg-clip-text text-transparent'>
          Escolha o Plano Ideal para Sua Empresa
        </h2>
        <p className='w-full max-w-md sm:max-w-lg mx-auto text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed'>
          Temos opções flexíveis para atender às necessidades do seu negócio,
          desde startups até empresas estabelecidas.
        </p>
      </section>

      <section className='flex flex-col lg:flex-row gap-6 w-full max-w-full sm:max-w-5xl mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-8 justify-center items-center lg:items-end'>
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
            bg: 'bg-blue-50 dark:bg-blue-950/60',
            iconBg: 'bg-orange-300/80 dark:bg-orange-500/70',
            button: {
              text: 'Começar Agora',
              variant: 'outline',
              className:
                'text-cyan-500 dark:text-cyan-300 border-cyan-300 dark:border-cyan-400 cursor-pointer hover:bg-cyan-50 dark:hover:bg-cyan-900/50',
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
            bg: 'bg-teal-50/60 dark:bg-teal-950/60',
            iconBg: 'bg-sky-400/90 dark:bg-sky-500/70',
            button: {
              text: 'Escolher Plano',
              variant: 'solid',
              className:
                'bg-sky-500 dark:bg-sky-600 text-white dark:text-gray-100 cursor-pointer hover:bg-sky-600 dark:hover:bg-sky-700',
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
            bg: 'bg-orange-50/60 dark:bg-orange-950/60',
            iconBg: 'bg-orange-400/80 dark:bg-orange-600/70',
            button: {
              text: 'Escolher Plano',
              variant: 'outline',
              className:
                'text-orange-500 dark:text-orange-300 border-orange-400 dark:border-orange-400 cursor-pointer hover:bg-orange-100 dark:hover:bg-orange-900/50',
            },
          },
        ].map((plan, idx) => (
          <div
            key={idx}
            ref={(el) => {
              cardRef.current[idx] = el;
            }}
            className={`${plan.bg} border border-gray-200/50 dark:border-gray-700/50 rounded-3xl shadow-[4px_4px_20px_rgba(0,0,0,0.2)] dark:shadow-[4px_4px_20px_rgba(0,0,0,0.3)] p-6 sm:p-8 flex flex-col justify-between w-full max-w-[360px] sm:max-w-md transition-all duration-200 backdrop-blur-sm`}
            data-plan={idx === 0 ? 'blue' : idx === 1 ? 'teal' : 'orange'}
          >
            <div>
              <h4 className='text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2'>
                {plan.title}
              </h4>
              <div className='flex items-baseline mb-4'>
                <span className='text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-gray-100'>
                  {plan.price}
                </span>
                <span className='ml-2 text-sm sm:text-base text-gray-500 dark:text-gray-400'>
                  /mês
                </span>
              </div>
              <p className='text-sm text-gray-600 dark:text-gray-300 mb-6'>
                {plan.desc}
              </p>

              <ul className='space-y-3 sm:space-y-4 mb-6 sm:mb-8'>
                {plan.features.map((feature, i) => (
                  <li
                    key={i}
                    className='flex items-center gap-3 text-sm text-gray-700 dark:text-gray-200'
                  >
                    <span
                      className={`w-6 h-6 flex items-center justify-center ${plan.iconBg} rounded-full`}
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-4 w-4 text-white dark:text-gray-100'
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
              className={`w-full px-6 py-3 rounded-xl font-semibold border-2 ${plan.button.className} transition-all duration-200`}
              aria-label={`Select ${plan.title}`}
              data-button={idx === 0 ? 'cyan' : idx === 1 ? 'sky' : 'orange'}
            >
              {plan.button.text}
            </button>
          </div>
        ))}
      </section>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 1440 60'
        className='absolute bottom-[-1px] left-0 z-10 text-[#101828] dark:text-[#111111]'
      >
        <path
          d='M0,60 L90,50 L180,60 L270,50 L360,60 L450,50 L540,60 L630,50 L720,60 L810,50 L900,60 L990,50 L1080,60 L1170,50 L1260,60 L1350,50 L1440,60 L1440,60 L0,60 Z'
          fill='currentColor'
          fillOpacity='1'
        />
      </svg>
    </div>
  );
};

export default Pricing;
