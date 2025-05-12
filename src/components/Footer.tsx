import { Facebook, Instagram, Linkedin, Truck, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className='bg-gray-900 text-gray-300 px-6 py-12'>
      <div className='w-full max-w-7xl mx-auto'>
        <section className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          {/* Logo and Description */}
          <div className='flex flex-col gap-4'>
            <div className='flex items-center gap-2'>
              <div className='rounded-full bg-gray-800 p-1 sm:p-1.5'>
                <Truck className=' text-white max-w-[20px] sm:max-w-[24px]' />
              </div>
              <h2 className='text-2xl font-bold tracking-wide'>
                <span className='text-blue-200 font-semibold'>Log</span>
                <span className='text-[#00b7eb] font-semibold'>Flow</span>
              </h2>
            </div>
            <p className='text-sm font-medium text-gray-400 leading-relaxed'>
              Simplifique a logística da sua empresa com soluções modernas de
              gerenciamento de entregas e equipes.
            </p>
            <div className='flex gap-4'>
              <Facebook className='w-6 h-6 text-gray-400 hover:text-gray-200 cursor-pointer' />
              <Instagram className='w-6 h-6 text-gray-400 hover:text-gray-200 cursor-pointer' />
              <Linkedin className='w-6 h-6 text-gray-400 hover:text-gray-200 cursor-pointer' />
              <Twitter className='w-6 h-6 text-gray-400 hover:text-gray-200 cursor-pointer' />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className='text-lg font-semibold text-gray-100 mb-4'>
              Links Rápidos
            </h4>
            <nav className='flex flex-col gap-3 text-sm font-medium'>
              <Link to='/' className='text-gray-300 hover:text-gray-100'>
                Início
              </Link>
              <Link
                to='/funcionalidades'
                className='text-gray-300 hover:text-gray-100'
              >
                Funcionalidades
              </Link>
              <Link to='/precos' className='text-gray-300 hover:text-gray-100'>
                Preços
              </Link>
              <Link to='/sobre' className='text-gray-300 hover:text-gray-100'>
                Sobre
              </Link>
              <Link to='/contato' className='text-gray-300 hover:text-gray-100'>
                Contato
              </Link>
            </nav>
          </div>

          {/* Contact and Newsletter */}
          <div className='flex flex-col gap-8'>
            <div>
              <h4 className='text-lg font-semibold text-gray-100 mb-4'>
                Contato
              </h4>
              <p className='text-sm font-medium text-gray-400'>
                contato@fastflow.com
              </p>
              <p className='text-sm font-medium text-gray-400'>
                +55 (11) 9999-9999
              </p>
              <p className='text-sm font-medium text-gray-400'>
                Av. Paulista, 1000 - Bela Vista, São Paulo - SP, 01310-100
              </p>
            </div>

            <div>
              <h4 className='text-lg font-semibold text-gray-100 mb-4'>
                Newsletter
              </h4>
              <p className='text-sm font-medium text-gray-400 mb-3'>
                Receba novidades e atualizações sobre o FastFlow
              </p>
              <form className='flex flex-row gap-2'>
                <input
                  type='email'
                  placeholder='Seu e-mail'
                  className='px-4 py-2 bg-gray-800 text-gray-100 border border-gray-600 rounded-md text-sm w-full focus:outline-none focus:border-indigo-500'
                />
                <button
                  type='submit'
                  className='bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500'
                >
                  Assinar
                </button>
              </form>
            </div>
          </div>
        </section>

        <div className='border-t border-gray-700 mt-10' />

        <div className='flex flex-col sm:flex-row justify-between items-center text-xs text-gray-500 mt-6'>
          <span>
            © {new Date().getFullYear()} FastFlow. Todos os direitos reservados.
          </span>
          <div className='flex gap-4 mt-4 sm:mt-0'>
            <span className='cursor-pointer hover:text-gray-300'>
              Termos de uso
            </span>
            <span className='cursor-pointer hover:text-gray-300'>
              Política de Privacidade
            </span>
            <span className='cursor-pointer hover:text-gray-300'>Cookies</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
