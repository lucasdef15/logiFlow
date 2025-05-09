import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useRef } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FreeTrial = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<(HTMLLIElement | null)[]>([]);
  const ulRef = useRef<HTMLUListElement>(null);
  const formRef = useRef<HTMLElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const svgTopRef = useRef<SVGSVGElement>(null);
  const svgBottomRef = useRef<SVGSVGElement>(null);

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

      // SVG animations (morphing and scaling)
      tl.fromTo(
        svgTopRef.current,
        { scale: 0.8, opacity: 0, rotation: 10 },
        {
          scale: 1,
          opacity: 1,
          rotation: 0,
          duration: 1.2,
          ease: 'expo.inOut',
        }
      )
        .fromTo(
          (svgTopRef.current?.querySelector('path') as SVGPathElement) ?? null,
          {
            attr: {
              d: 'M50,20 C80,-10 150,10 170,80 C190,150 130,170 90,190 C50,210 20,180 10,120 C0,60 20,40 50,20 Z',
            },
          },
          {
            attr: {
              d: 'M40,30 C90,0 160,20 180,90 C200,160 140,180 100,200 C60,220 20,170 10,110 C0,50 10,40 40,30 Z',
            },
            duration: 1.5,
            ease: 'power4.inOut',
          },
          0
        )
        .fromTo(
          svgBottomRef.current,
          { scale: 0.8, opacity: 0, rotation: -10 },
          {
            scale: 1,
            opacity: 1,
            rotation: 0,
            duration: 1.2,
            ease: 'expo.inOut',
          },
          0.2
        )
        .fromTo(
          svgBottomRef.current?.querySelector('path') as SVGPathElement,
          {
            attr: {
              d: 'M60,20 C100,-10 160,30 170,90 C180,150 130,170 80,170 C30,170 10,120 20,70 C30,40 40,30 60,20 Z',
            },
          },
          {
            attr: {
              d: 'M50,30 C110,0 170,40 180,100 C190,160 130,180 90,180 C50,180 10,130 20,80 C30,50 40,40 50,30 Z',
            },
            duration: 1.5,
            ease: 'power4.inOut',
          },
          0.2
        );

      // Title animation (slides in with slight rotation)
      tl.fromTo(
        titleRef.current,
        { opacity: 0, x: -100, rotationY: 10 },
        { opacity: 1, x: 0, rotationY: 0, duration: 0.8, ease: 'expo.inOut' },
        0.4
      );

      // Subtitle animation (fades in with slight lift)
      tl.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.inOut' },
        0.6
      );

      // List items animation (staggered bounce-in with checkmark draw)
      tl.fromTo(
        listRef.current,
        { opacity: 0, x: -50, scale: 0.95 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: 'back.out(1.4)',
        },
        0.8
      ).fromTo(
        listRef.current.map((el) => el?.querySelector('svg path')),
        { strokeDasharray: 100, strokeDashoffset: 100 },
        {
          strokeDashoffset: 0,
          duration: 0.6,
          stagger: 0.2,
          ease: 'power2.inOut',
        },
        0.8
      );

      // Form animation (scales in with shadow)
      tl.fromTo(
        formRef.current,
        { opacity: 0, scale: 0.9, y: 50 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.9,
          ease: 'expo.inOut',
        },
        1
      );

      // Button hover effect
      const ctx = gsap.context(() => {
        const button = buttonRef.current;
        if (button) {
          button.addEventListener('mouseenter', () => {
            gsap.to(button, {
              scale: 1.05,
              boxShadow: '0px 8px 24px rgba(14, 165, 233, 0.4)',
              backgroundColor: '#0284c7',
              duration: 0.3,
              ease: 'power2.out',
            });
          });
          button.addEventListener('mouseleave', () => {
            gsap.to(button, {
              scale: 1,
              boxShadow: '0px 0px 0px rgba(0, 0, 0, 0)',
              backgroundColor: '#0ea5e9',
              duration: 0.3,
              ease: 'power2.out',
            });
          });
        }
      }, formRef);

      return () => ctx.revert();
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className='bg-[#0EA5E9] relative my-25 min-h-[80vh]'
    >
      <div className='w-full max-w-[1128px] mx-auto pt-10 p-4'>
        <svg
          ref={svgTopRef}
          className='absolute top-[20px] right-10 z-[0]'
          width='250'
          height='300'
          viewBox='0 0 200 250'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            fill='#27AEEB'
            d='M40,30 C90,0 160,20 180,90 C200,160 140,180 100,200 C60,220 20,170 10,110 C0,50 10,40 40,30 Z'
          />
        </svg>

        <div className='w-full p-5 flex flex-col md:flex-row md:justify-center md:items-center items-start gap-10 md:gap-4'>
          <section className='w-[100%] md:w-[55%] md:text-left text-center max-w-[600px] flex flex-col gap-5 justify-center'>
            <h2
              ref={titleRef}
              className='text-[var(--muted)] text-3xl font-bold'
            >
              Try FastFlow for Free
            </h2>

            <p ref={subtitleRef} className='text-[var(--muted)] opacity-90'>
              Testing FastFlow is easy and commitment-free. Get started now and
              see the difference in your company's logistics.
            </p>

            <ul ref={ulRef} className='text-white space-y-3'>
              {[
                '14-day free trial period',
                'Access to all features of the basic plan',
                'No credit card required',
                'Support throughout the entire trial period',
              ].map((text, index) => (
                <li
                  key={index}
                  ref={(el) => {
                    listRef.current[index] = el;
                  }}
                  className='flex items-center gap-2'
                >
                  <span className='w-5 h-5 flex items-center justify-center bg-white/20 rounded-full'>
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
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </section>

          <section
            ref={formRef}
            className='w-[100%] md:w-[40%] py-16 px-4 bg-[#ffffff]/10 rounded-2xl shadow-xl mx-auto backdrop-blur-md'
          >
            <h3 className='text-white text-3xl font-bold mb-6 text-center'>
              Start Your Free Trial
            </h3>
            <form action='' className='space-y-4'>
              <div className='flex flex-col'>
                <label htmlFor='fullname' className='text-white text-sm mb-1'>
                  Full Name
                </label>
                <input
                  type='text'
                  id='fullname'
                  className='px-4 py-2 rounded-lg bg-white/80 text-black focus:outline-none focus:ring-2 focus:ring-sky-400'
                  placeholder='John Doe'
                />
              </div>

              <div className='flex flex-col'>
                <label htmlFor='email' className='text-white text-sm mb-1'>
                  Email
                </label>
                <input
                  type='email'
                  id='email'
                  className='px-4 py-2 rounded-lg bg-white/80 text-black focus:outline-none focus:ring-2 focus:ring-sky-400'
                  placeholder='your@email.com'
                />
              </div>

              <div className='flex flex-col'>
                <label htmlFor='phone' className='text-white text-sm mb-1'>
                  Phone
                </label>
                <input
                  type='tel'
                  id='phone'
                  className='px-4 py-2 rounded-lg bg-white/80 text-black focus:outline-none focus:ring-2 focus:ring-sky-400'
                  placeholder='+1 (555) 123-4567'
                />
              </div>

              <div className='flex flex-col'>
                <label htmlFor='company' className='text-white text-sm mb-1'>
                  Company
                </label>
                <input
                  type='text'
                  id='company'
                  className='px-4 py-2 rounded-lg bg-white/80 text-black focus:outline-none focus:ring-2 focus:ring-sky-400'
                  placeholder='Your Company Name'
                />
              </div>

              <button
                ref={buttonRef}
                type='submit'
                className='w-full mt-6 bg-sky-500 cursor-pointer hover:bg-sky-600 text-white font-bold py-3 rounded-xl transition duration-300'
              >
                Start Free Trial
              </button>
            </form>
          </section>
        </div>

        <svg
          ref={svgBottomRef}
          className='absolute bottom-[20px] left-10 z-[-1] sm:z-[-1] md:z-[1]'
          width='250'
          height='250'
          viewBox='0 0 200 200'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            fill='#27AEEB'
            d='M50,30 C110,0 170,40 180,100 C190,160 130,180 90,180 C50,180 10,130 20,80 C30,50 40,40 50,30 Z'
          />
        </svg>
      </div>
    </div>
  );
};

export default FreeTrial;
