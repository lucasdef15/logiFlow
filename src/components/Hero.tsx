import { Button } from './ui/button';
import {
  ChevronRight,
  ArrowRight,
  Truck,
  Package,
  Clock,
  Check,
} from 'lucide-react';
import IconWithLabel from './ui/IconWithLabel';

const Hero = () => {
  return (
    <div className='w-full max-w-[1128px] mx-auto px-4 py-10 flex flex-col lg:flex-row mt-10 gap-10'>
      {/* Left section */}
      <section className='w-full lg:w-[55%] flex flex-col gap-3'>
        <span className='bg-[var(--secondary)] text-[var(--primary-foreground)] p-1 rounded-2xl px-2 text-sm font-medium w-fit'>
          Introduction Track Flow
        </span>

        <div className='flex flex-col gap-1'>
          <span className='text-4xl sm:text-5xl font-bold flex gap-2 flex-wrap'>
            <span className='text-[var(--primary)]'>Smart logistics</span>
            <span className='text-[var(--primary-foreground)]'>for</span>
          </span>
          <span className='text-4xl sm:text-5xl font-bold text-[var(--primary-foreground)]'>
            everyone
          </span>
        </div>

        <p className='text-[var(--text-muted-soft)] font-medium mt-2 text-sm sm:text-base'>
          Optimize deliveries, reduce costs, and make better decisions with our
          AI-powered logistics platform. Real-time tracking, intelligent route
          planning, and powerful analytics in one place.
        </p>

        {/* Buttons + features */}
        <section className='mt-4'>
          <div className='flex flex-col sm:flex-row gap-3'>
            <Button className='text-[var(--card)] w-full sm:w-[200px]'>
              Get Started Free <ArrowRight />
            </Button>
            <Button
              variant='outline'
              className='w-full sm:w-[180px] border-[var(--primary-foreground)] text-[var(--primary-foreground)]'
            >
              Book a Demo <ChevronRight />
            </Button>
          </div>

          <div className='flex flex-wrap gap-6 sm:gap-10 mt-6'>
            <IconWithLabel
              icon={<Truck className='w-5 h-5' />}
              color='blue'
              label='Real-time Tracking'
            />
            <IconWithLabel
              icon={<Package className='w-5 h-5' />}
              color='cyan'
              label='Smart Delivery'
            />
            <IconWithLabel
              icon={<Clock className='w-5 h-5' />}
              color='orange'
              label='Time Savings'
            />
          </div>
        </section>
      </section>

      {/* Right section - image */}
      <section className='w-full lg:w-[45%] flex justify-center items-center relative'>
        <img
          className='rounded-lg w-full max-w-[500px]'
          src='/assets/images/image.jpg'
          alt='Logistics'
        />

        <div className='h-fit sm:w-[300px] absolute bottom-[-30px] sm:top-[300px] right-0 sm:right-[-20px] shadow-lg bg-[var(--card)] px-4 py-6 rounded-md flex items-center gap-3'>
          <div className='bg-green-400 rounded-full p-1'>
            <Check className='w-4 h-4 stroke-2 text-[var(--accent)]' />
          </div>
          <div>
            <h4 className='font-medium text-sm'>Route optimized!</h4>
            <p className='text-[var(--text-muted-faint)] text-xs'>
              AI saved 28 minutes on today's deliveries
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
