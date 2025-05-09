import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useRef } from 'react';

const Footer = () => {
  const containerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const newsletterRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const svgBgRef = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        defaults: { ease: 'expo.inOut' },
      });

      // Background SVG animation (morphing and scaling)
      tl.fromTo(
        svgBgRef.current,
        { scale: 0.8, opacity: 0, rotation: 10 },
        {
          scale: 1,
          opacity: 0.2,
          rotation: 0,
          duration: 1.5,
        }
      ).fromTo(
        svgBgRef.current?.querySelector('path') as SVGPathElement,
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

      // Logo and description animation (scale and fade)
      tl.fromTo(
        logoRef.current?.children ? Array.from(logoRef.current.children) : [],
        { opacity: 0, scale: 0.9, y: 20 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
        },
        0.4
      );

      // Social icons animation (bounce-in with rotation)
      tl.fromTo(
        socialRef.current?.children
          ? Array.from(socialRef.current.children)
          : [],
        { opacity: 0, scale: 0.8, rotation: 45 },
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: 'back.out(1.4)',
        },
        0.6
      );

      // Links animation (slide-in)
      tl.fromTo(
        linksRef.current?.children ? Array.from(linksRef.current.children) : [],
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.1,
        },
        0.8
      );

      // Contact info animation (fade and lift)
      tl.fromTo(
        contactRef.current?.children
          ? Array.from(contactRef.current.children)
          : [],
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
        },
        1
      );

      // Newsletter form animation (scale and lift)
      tl.fromTo(
        newsletterRef.current?.children
          ? Array.from(newsletterRef.current.children)
          : [],
        { opacity: 0, scale: 0.95, y: 30 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
        },
        1.2
      );

      // Bottom text animation (fade-in)
      tl.fromTo(
        bottomRef.current?.children
          ? Array.from(bottomRef.current.children)
          : [],
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
        },
        1.4
      );

      // Hover effects for social icons, links, and button
      const ctx = gsap.context(() => {
        // Social icons hover
        gsap.utils
          .toArray<HTMLElement>(socialRef.current?.children || [])
          .forEach((icon) => {
            icon.addEventListener('mouseenter', () => {
              gsap.to(icon, {
                scale: 1.2,
                rotation: 10,
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
                duration: 0.3,
                ease: 'power2.out',
              });
            });
            icon.addEventListener('mouseleave', () => {
              gsap.to(icon, {
                scale: 1,
                rotation: 0,
                boxShadow: '0px 0px 0px rgba(0, 0, 0, 0)',
                duration: 0.3,
                ease: 'power2.out',
              });
            });
          });

        // Links hover
        gsap.utils
          .toArray<HTMLElement>(linksRef.current?.children || [])
          .forEach((link) => {
            link.addEventListener('mouseenter', () => {
              gsap.to(link, {
                x: 5,
                color: '#93c5fd',
                duration: 0.3,
                ease: 'power2.out',
              });
            });
            link.addEventListener('mouseleave', () => {
              gsap.to(link, {
                x: 0,
                color: 'rgba(255, 255, 255, 0.7)',
                duration: 0.3,
                ease: 'power2.out',
              });
            });
          });

        // Newsletter button hover
        const button = newsletterRef.current?.querySelector('button');
        if (button) {
          button.addEventListener('mouseenter', () => {
            gsap.to(button, {
              scale: 1.05,
              boxShadow: '0px 8px 16px rgba(59, 130, 246, 0.3)',
              backgroundColor: '#2563eb',
              duration: 0.3,
              ease: 'power2.out',
            });
          });
          button.addEventListener('mouseleave', () => {
            gsap.to(button, {
              scale: 1,
              boxShadow: '0px 0px 0px rgba(0, 0, 0, 0)',
              backgroundColor: '#3b82f6',
              duration: 0.3,
              ease: 'power2.out',
            });
          });
        }
      }, containerRef);

      return () => ctx.revert();
    },
    { scope: containerRef }
  );

  return (
    <footer
      ref={containerRef}
      className='bg-[#1A1F2C]/95 text-[var(--muted)] px-6 py-10 relative overflow-hidden'
    >
      <svg
        ref={svgBgRef}
        className='absolute top-0 left-0 w-full h-full opacity-20 z-[-1]'
        viewBox='0 0 200 250'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          fill='#3b82f6'
          d='M40,30 C90,0 160,20 180,90 C200,160 140,180 100,200 C60,220 20,170 10,110 C0,50 10,40 40,30 Z'
        />
      </svg>

      <div className='w-full max-w-[1128px] mx-auto'>
        <section className='flex flex-col sm:flex-row justify-between gap-10 max-w-7xl mx-auto'>
          <div className='flex-1 flex flex-col gap-5 max-w-md'>
            <div ref={logoRef} className='flex items-center gap-2'>
              <img
                className='max-w-[30px]'
                src='/assets/images/logo.svg'
                alt='Logo'
              />
              <h2 className='text-xl font-bold tracking-wide'>
                <span className='text-blue-600'>Log</span>
                <span className='text-blue-300'>Flow</span>
              </h2>
            </div>
            <p className='text-sm leading-relaxed text-opacity-80'>
              Simplifique a logística da sua empresa com soluções modernas de
              gerenciamento de entregas e equipes.
            </p>
            <div ref={socialRef} className='flex gap-3'>
              <Facebook className='hover:text-blue-500 transition cursor-pointer' />
              <Instagram className='hover:text-pink-500 transition cursor-pointer' />
              <Linkedin className='hover:text-blue-400 transition cursor-pointer' />
              <Twitter className='hover:text-cyan-400 transition cursor-pointer' />
            </div>
          </div>

          <div className='flex-1'>
            <h4 className='text-lg font-semibold mb-4'>Links Rápidos</h4>
            <nav ref={linksRef} className='flex flex-col gap-2 text-sm'>
              <Link
                to='/'
                className='text-opacity-70 hover:text-opacity-100 transition'
              >
                Início
              </Link>
              <Link
                to='/funcionalidades'
                className='text-opacity-70 hover:text-opacity-100 transition'
              >
                Funcionalidades
              </Link>
              <Link
                to='/precos'
                className='text-opacity-70 hover:text-opacity-100 transition'
              >
                Preços
              </Link>
              <Link
                to='/sobre'
                className='text-opacity-70 hover:text-opacity-100 transition'
              >
                Sobre
              </Link>
              <Link
                to='/contato'
                className='text-opacity-70 hover:text-opacity-100 transition'
              >
                Contato
              </Link>
            </nav>
          </div>

          <div className='flex-1 flex flex-col gap-8'>
            <div ref={contactRef}>
              <h4 className='text-lg font-semibold mb-2'>Contato</h4>
              <p className='text-sm text-opacity-70'>contato@fastflow.com</p>
              <p className='text-sm text-opacity-70'>+55 (11) 9999-9999</p>
              <p className='text-sm text-opacity-70'>
                Av. Paulista, 1000 - Bela Vista, São Paulo - SP, 01310-100
              </p>
            </div>

            <div ref={newsletterRef}>
              <h4 className='text-lg font-semibold mb-2'>Newsletter</h4>
              <p className='text-sm mb-3 text-opacity-70'>
                Receba novidades e atualizações sobre o FastFlow
              </p>
              <form className='flex flex-col sm:flex-row'>
                <input
                  type='email'
                  placeholder='Seu e-mail'
                  className='px-3 py-2 bg-white text-black border border-gray-300 rounded-l-md text-sm w-full sm:w-auto focus:outline-none focus:border-blue-500'
                />
                <button
                  type='submit'
                  className='bg-blue-500 text-white px-4 py-2 border border-gray-300 rounded-r-md cursor-pointer text-sm hover:bg-blue-600 transition focus:outline-none focus:ring-2 focus:ring-blue-500'
                >
                  Assinar
                </button>
              </form>
            </div>
          </div>
        </section>

        <div className='border-t-[1px] border-t-[#ffff]/10 mt-7' />

        <div
          ref={bottomRef}
          className='flex flex-col sm:flex-row px-2 justify-between text-xs mt-5 text-[var(--muted)/60]'
        >
          <span>
            © {new Date().getFullYear()} FastFlow. Todos os direitos reservados.
          </span>
          <div className='flex gap-3 sm:gap-6 mt-2 sm:mt-0'>
            <span className='cursor-pointer hover:text-blue-300 transition'>
              Termos de uso
            </span>
            <span className='cursor-pointer hover:text-blue-300 transition'>
              Política de Privacidade
            </span>
            <span className='cursor-pointer hover:text-blue-300 transition'>
              Cookies
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
