import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useState, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const titleRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const emailErrorRef = useRef<HTMLSpanElement>(null);
  const passwordErrorRef = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
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

  const animateError = (ref: React.RefObject<HTMLSpanElement | null>) => {
    if (ref.current) {
      gsap.fromTo(
        ref.current,
        { opacity: 0, y: 5 },
        { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }
      );
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: '',
    });
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Explicitly define the type for newErrors
    const newErrors: { email: string; password: string } = {
      email:
        formData.email.trim() === ''
          ? 'E-mail é obrigatório'
          : !validateEmail(formData.email)
          ? 'Digite um e-mail válido'
          : '',
      password:
        formData.password.trim() === ''
          ? 'Senha é obrigatória'
          : formData.password.length < 6
          ? 'A senha deve ter pelo menos 6 caracteres'
          : '',
    };

    setErrors(newErrors);

    // Trigger animation if there are errors
    if (newErrors.email) animateError(emailErrorRef);
    if (newErrors.password) animateError(passwordErrorRef);

    const hasErrors = Object.values(newErrors).some((error) => error !== '');
    if (!hasErrors) {
      console.log('Dados de login:', formData);
      // Aqui você pode adicionar a lógica para enviar os dados ao backend
    }
  };

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
            onSubmit={handleSubmit}
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
                value={formData.email}
                onChange={handleChange}
                className='w-full bg-[#2a2f3b] border border-[#00b7eb]/30 rounded-lg px-4 py-2 text-sm text-white focus:ring-2 focus:ring-[#00b7eb] focus:border-[#00b7eb] transition-colors'
                placeholder='seu@email.com'
                aria-describedby='email-error'
              />
              {errors.email && (
                <span
                  ref={emailErrorRef}
                  id='email-error'
                  className='text-red-500 text-xs mt-1'
                >
                  {errors.email}
                </span>
              )}
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
                value={formData.password}
                onChange={handleChange}
                className='w-full bg-[#2a2f3b] border border-[#00b7eb]/30 rounded-lg px-4 py-2 text-sm text-white focus:ring-2 focus:ring-[#00b7eb] focus:border-[#00b7eb] transition-colors'
                placeholder='Sua senha'
                aria-describedby='password-error'
              />
              {errors.password && (
                <span
                  ref={passwordErrorRef}
                  id='password-error'
                  className='text-red-500 text-xs mt-1'
                >
                  {errors.password}
                </span>
              )}
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
