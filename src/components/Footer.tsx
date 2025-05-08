import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className='bg-[#1A1F2C]/95 text-[var(--muted)] px-6 py-10'>
      <div className='w-full max-w-[1128px] mx-auto'>
        <section className='flex flex-col sm:flex-row justify-between gap-10 max-w-7xl mx-auto'>
          <div className='flex-1 flex flex-col gap-5 max-w-md'>
            <div className='flex items-center gap-2'>
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
            <div className='flex gap-3'>
              <Facebook className='hover:text-blue-500 transition' />
              <Instagram className='hover:text-pink-500 transition' />
              <Linkedin className='hover:text-blue-400 transition' />
              <Twitter className='hover:text-cyan-400 transition' />
            </div>
          </div>

          <div className='flex-1'>
            <h4 className='text-lg font-semibold mb-4'>Links Rápidos</h4>
            <nav className='flex flex-col gap-2 text-sm'>
              <Link to='/' className='text-opacity-70 hover:text-opacity-100'>
                Início
              </Link>
              <Link
                to='/funcionalidades'
                className='text-opacity-70 hover:text-opacity-100'
              >
                Funcionalidades
              </Link>
              <Link
                to='/precos'
                className='text-opacity-70 hover:text-opacity-100'
              >
                Preços
              </Link>
              <Link
                to='/sobre'
                className='text-opacity-70 hover:text-opacity-100'
              >
                Sobre
              </Link>
              <Link
                to='/contato'
                className='text-opacity-70 hover:text-opacity-100'
              >
                Contato
              </Link>
            </nav>
          </div>

          <div className='flex-1 flex flex-col gap-8'>
            <div>
              <h4 className='text-lg font-semibold mb-2'>Contato</h4>
              <p className='text-sm text-opacity-70'>contato@fastflow.com</p>
              <p className='text-sm text-opacity-70'>+55 (11) 999-9999</p>
              <p className='text-sm text-opacity-70'>
                Av. Paulista, 1000 - Bela Vista, São Paulo - SP, 01310-100
              </p>
            </div>

            <div>
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

        <div className='flex flex-col sm:flex-row px-2 justify-between text-xs mt-5 text-[var(--muted)/60]'>
          <span>
            © {new Date().getFullYear()} FastFlow. Todos os direitos reservados.
          </span>
          <div className='flex gap-3 sm:gap-6 mt-2 sm:mt-0'>
            <span>Termos de uso</span>
            <span>Politica de Privacidade</span>
            <span>Cookies</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
