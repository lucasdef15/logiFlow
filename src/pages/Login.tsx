import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Login = () => {
  const titleRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Title animation
    if (titleRef.current?.children) {
      gsap.fromTo(
        titleRef.current.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          stagger: 0.2,
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 85%',
            end: 'bottom 20%',
          },
        }
      );
    }

    // Form fields animation
    if (formRef.current?.children) {
      gsap.fromTo(
        formRef.current.children,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power2.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 85%',
            end: 'bottom 20%',
          },
        }
      );
    }

    // Footer animation
    if (footerRef.current?.children) {
      gsap.fromTo(
        footerRef.current.children,
        { opacity: 0, x: 30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power2.out',
          stagger: 0.15,
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 85%',
            end: 'bottom 20%',
          },
        }
      );
    }

    // Background fade-in
    if (backgroundRef.current) {
      gsap.fromTo(
        backgroundRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: backgroundRef.current,
            start: 'top 100%',
            end: 'bottom 20%',
          },
        }
      );
    }
  }, []);

  return (
    <div className='relative w-full min-h-screen bg-[#0d111c] text-white py-20 px-4 overflow-hidden'>
      {/* Background Effect */}
      <div
        ref={backgroundRef}
        className='absolute inset-0 w-full h-full z-0 opacity-50 bg-gradient-to-r from-[#00b7eb]/20 to-transparent'
      />

      {/* Gradient Transition */}
      <div className='absolute bottom-0 left-0 w-full h-32 bg-gradient-to-b from-transparent to-[#0d111c] z-10 pointer-events-none' />

      {/* Main Content */}
      <div className='relative max-w-7xl mx-auto z-10'>
        <section ref={titleRef} className='text-center mb-12'>
          <h2 className='text-3xl sm:text-5xl lg:text-6xl font-bold text-[#00b7eb]'>
            LogFlow
          </h2>
          <p className='text-white/80 text-base sm:text-lg font-medium mt-4 max-w-md mx-auto'>
            Sistema inteligente de gestão de entregas
          </p>
        </section>

        <div className='flex justify-center'>
          <form
            ref={formRef}
            className='w-full max-w-md bg-[#1a1f2b]/80 p-8 rounded-xl shadow-lg transition-all duration-300 hover:shadow-cyan-500/50'
          >
            <h3 className='text-2xl font-semibold text-white mb-6'>Entrar</h3>

            {/* Email */}
            <div className='mb-5'>
              <label
                htmlFor='email'
                className='block text-sm font-medium text-white/80 mb-1'
              >
                Email
              </label>
              <input
                id='email'
                name='email'
                type='email'
                className='w-full bg-[#2a2f3b] border border-[#00b7eb]/30 rounded-lg px-4 py-2 text-sm text-white focus:ring-2 focus:ring-[#00b7eb] focus:border-[#00b7eb] transition-colors'
                placeholder='seu@email.com'
                required
              />
            </div>

            {/* Password */}
            <div className='mb-5'>
              <label
                htmlFor='password'
                className='block text-sm font-medium text-white/80 mb-1'
              >
                Senha
              </label>
              <input
                id='password'
                name='password'
                type='password'
                className='w-full bg-[#2a2f3b] border border-[#00b7eb]/30 rounded-lg px-4 py-2 text-sm text-white focus:ring-2 focus:ring-[#00b7eb] focus:border-[#00b7eb] transition-colors'
                placeholder='Sua senha'
                required
              />
            </div>

            {/* Remember Me & Forgot Password */}
            <div className='flex items-center justify-between mb-6'>
              <label
                htmlFor='remember-me'
                className='flex items-center text-sm text-white/80'
              >
                <input
                  type='checkbox'
                  id='remember-me'
                  name='remember-me'
                  className='mr-2'
                />
                Lembrar-me
              </label>
              <Link
                to='/forgot-password'
                className='text-sm text-[#00b7eb] hover:underline'
              >
                Esqueceu a senha?
              </Link>
            </div>

            {/* Submit Button */}
            <Button
              type='submit'
              className='w-full bg-[#00b7eb] hover:bg-[#0084ff] cursor-pointer text-white font-semibold py-3 rounded-lg transition-all duration-300'
              aria-label='Entrar no sistema'
            >
              Entrar
            </Button>

            {/* Footer */}
            <div
              ref={footerRef}
              className='mt-6 text-center text-sm text-white/80'
            >
              <p>
                Não tem uma conta?{' '}
                <Link to='/register' className='text-[#00b7eb] hover:underline'>
                  Registre-se
                </Link>
              </p>
              <p className='mt-2'>
                <Link to='/terms' className='text-[#00b7eb] hover:underline'>
                  Termos e Condições
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
