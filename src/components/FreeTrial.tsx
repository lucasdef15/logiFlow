import React from 'react';
import { Button } from './ui/button';

const FreeTrial = () => {
  return (
    <div className='bg-[#0EA5E9] relative my-25 min-h-[80vh]'>
      <div className='w-full  max-w-[1128px] mx-auto pt-10 p-4'>
        <svg
          className='absolute top-[20px] right-10 z-[1]'
          width='250'
          height='300'
          viewBox='0 0 200 250'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            fill='#27AEEB'
            d='M50,20 C80,-10 150,10 170,80 C190,150 130,170 90,190 C50,210 20,180 10,120 C0,60 20,40 50,20 Z'
          />
        </svg>

        <div className='w-full z-[9999] relative p-5 flex items-start gap-4'>
          <section className='w-[55%] max-w-[600px] flex flex-col gap-5 justify-center'>
            <h2 className='text-[var(--muted)] text-3xl font-bold'>
              Try FastFlow for Free
            </h2>
            <p className='text-[var(--muted)] opacity'>
              Testing FastFlow is easy and commitment-free. Get started now and
              see the difference in your company's logistics.
            </p>

            <ul className='text-white space-y-3'>
              {[
                '14-day free trial period',
                'Access to all features of the basic plan',
                'No credit card required',
                'Support throughout the entire trial period',
              ].map((text, index) => (
                <li key={index} className='flex items-center gap-2'>
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

          <section className='w-[40%] py-16 px-4 bg-[#ffffff]/10 rounded-2xl shadow-xl mx-auto backdrop-blur-md'>
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
                type='submit'
                className='w-full mt-6 bg-sky-500 cursor-pointer hover:bg-sky-600 text-white font-bold py-3 rounded-xl transition duration-300'
              >
                Start Free Trial
              </button>
            </form>
          </section>
        </div>

        <svg
          className='absolute bottom-[20px] left-10 z-[1]'
          width='250'
          height='250'
          viewBox='0 0 200 200'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            fill='#27AEEB'
            d='M60,20 C100,-10 160,30 170,90 C180,150 130,170 80,170 C30,170 10,120 20,70 C30,40 40,30 60,20 Z'
          />
        </svg>
      </div>
    </div>
  );
};

export default FreeTrial;
