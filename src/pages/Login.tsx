import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useAuth } from '@/context/AuthContext.tsx';

gsap.registerPlugin(ScrollTrigger);

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    general: '',
  });

  const navigate = useNavigate();
  const { login } = useAuth();

  const titleRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const emailErrorRef = useRef<HTMLSpanElement>(null);
  const passwordErrorRef = useRef<HTMLSpanElement>(null);
  const generalErrorRef = useRef<HTMLSpanElement>(null);

  const friendlyMessage = (msg: string) => {
    if (msg === 'Internal server Error' || msg === 'Internal server error') {
      return 'Invalid credentials';
    }

    return msg || 'Falha no login.';
  };

  useGSAP(() => {
    const animations = [
      { ref: titleRef, y: 30 },
      { ref: formRef, x: -30 },
      { ref: footerRef, x: 30 },
    ];

    animations.forEach(({ ref, x, y }) => {
      if (ref.current?.children) {
        gsap.fromTo(
          ref.current.children,
          { opacity: 0, x, y },
          {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            stagger: 0.1,
            scrollTrigger: {
              trigger: ref.current,
              start: 'top 85%',
              end: 'bottom 20%',
            },
          }
        );
      }
    });

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

  useGSAP(() => {
    const animateError = (ref: React.RefObject<HTMLSpanElement | null>) => {
      if (ref.current) {
        gsap.fromTo(
          ref.current,
          { opacity: 0, y: 5 },
          { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }
        );
      }
    };

    if (errors.email) animateError(emailErrorRef);
    if (errors.password) animateError(passwordErrorRef);
    if (errors.general) animateError(generalErrorRef);
  }, [errors]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '', general: '' });
  };

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      email: !formData.email.trim()
        ? 'E-mail é obrigatório'
        : !validateEmail(formData.email)
        ? 'Digite um e-mail válido'
        : '',
      password: !formData.password.trim()
        ? 'Senha é obrigatória'
        : formData.password.length < 6
        ? 'A senha deve ter pelo menos 6 caracteres'
        : '',
      general: '',
    };
    setErrors(newErrors);

    if (Object.values(newErrors).some(Boolean)) return;

    try {
      const response = await fetch('http://www.logiflow.io/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        login(result.data);
        navigate(result.data.meta.redirectTo || '/dashboard');
      } else {
        const serverErrors = result.error || {};
        setErrors({
          email: serverErrors.email || '',
          password: serverErrors.password || '',
          general: friendlyMessage(result.message),
        });
      }
    } catch (error) {
      setErrors({
        ...errors,
        general: 'Erro de conexão. Tente novamente mais tarde.',
      });
      console.error('Erro na requisição:', error);
    }
  };

  return (
    <div className='relative w-full min-h-screen bg-white dark:bg-[#0d111c] text-[#0d111c] dark:text-white py-20 px-4 overflow-hidden'>
      <div
        ref={backgroundRef}
        className='absolute inset-0 w-full h-full z-0 opacity-50 bg-gradient-to-r from-[#00b7eb]/20 to-transparent'
      />
      <div className='absolute bottom-0 left-0 w-full h-32 bg-gradient-to-b from-transparent dark:to-[#0d111c] to-white z-10 pointer-events-none' />
      <div className='relative max-w-7xl mx-auto z-10'>
        <section ref={titleRef} className='text-center mb-12'>
          <h2 className='text-3xl sm:text-5xl lg:text-6xl font-bold text-[#00b7eb]'>
            LogFlow
          </h2>
          <p className='text-black/70 dark:text-white/80 text-base sm:text-lg font-medium mt-4 max-w-md mx-auto'>
            Sistema inteligente de gestão de entregas
          </p>
        </section>

        <div className='flex justify-center'>
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className='w-full max-w-md bg-[#f1f5f9] dark:bg-[#1a1f2b]/80 p-8 rounded-xl shadow-lg transition-all duration-300 hover:shadow-cyan-500/50'
          >
            <h3 className='text-2xl font-semibold dark:text-white text-[#0d111c] mb-6'>
              Entrar
            </h3>

            {errors.general && (
              <div className='mb-5'>
                <span
                  ref={generalErrorRef}
                  className='text-red-500 text-sm font-medium'
                >
                  {errors.general}
                </span>
              </div>
            )}

            <div className='mb-5'>
              <label
                htmlFor='email'
                className='block text-sm font-medium text-black/70 dark:text-white/80 mb-1'
              >
                Email
              </label>
              <input
                id='email'
                name='email'
                type='email'
                value={formData.email}
                onChange={handleChange}
                className='w-full bg-white dark:bg-[#2a2f3b] border border-[#00b7eb]/30 rounded-lg px-4 py-2 text-sm text-black dark:text-white focus:ring-2 focus:ring-[#00b7eb] focus:border-[#00b7eb] transition-colors'
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

            <div className='mb-5'>
              <label
                htmlFor='password'
                className='block text-sm font-medium text-black/70 dark:text-white/80 mb-1'
              >
                Senha
              </label>
              <input
                id='password'
                name='password'
                type='password'
                value={formData.password}
                onChange={handleChange}
                className='w-full bg-white dark:bg-[#2a2f3b] border border-[#00b7eb]/30 rounded-lg px-4 py-2 text-sm text-black dark:text-white focus:ring-2 focus:ring-[#00b7eb] focus:border-[#00b7eb] transition-colors'
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

            <div className='flex items-center justify-between mb-6'>
              <label
                htmlFor='remember-me'
                className='flex items-center text-sm text-black/70 dark:text-white/80'
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

            <Button
              type='submit'
              className='w-full bg-[#00b7eb] hover:bg-[#0084ff] cursor-pointer text-white font-semibold py-3 rounded-lg transition-all duration-300'
              aria-label='Entrar no sistema'
            >
              Entrar
            </Button>

            <div
              ref={footerRef}
              className='mt-6 text-center text-sm text-black/70 dark:text-white/80'
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
