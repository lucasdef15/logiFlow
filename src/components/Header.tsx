import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import DesktopNav from './DesktopNav';
import MobileNav from './MobileNav';
import { Truck } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Notification {
  id: number;
  title: string;
  message: string;
  timestamp: Date;
}

const Header = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const headerRef = useRef<HTMLElement>(null);
  const lastScroll = useRef(0);

  // Fade-in animation
  useEffect(() => {
    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
      );
    }
  }, []);

  // Load notifications
  useEffect(() => {
    fetch('/data/notifications.json')
      .then((res) => res.json())
      .then((data) =>
        setNotifications(
          data.map((notification: Notification) => ({
            ...notification,
            timestamp: notification.timestamp
              ? new Date(notification.timestamp as unknown as string)
              : undefined,
          }))
        )
      )
      .catch((error) => console.error('Error fetching notifications:', error));
  }, []);

  // Scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      if (!headerRef.current) return;

      if (currentScroll > lastScroll.current && currentScroll > 100) {
        gsap.to(headerRef.current, {
          y: -100,
          duration: 0.4,
          ease: 'power2.out',
        });
      } else {
        gsap.to(headerRef.current, {
          y: 0,
          duration: 0.4,
          ease: 'power2.out',
        });
      }

      lastScroll.current = currentScroll;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const hasNotifications = notifications.length > 0;

  return (
    <header
      ref={headerRef}
      className='w-full sticky top-0 z-50 bg-white/30 dark:bg-[#1F2937]/30 backdrop-blur-sm transition-colors duration-300'
    >
      <div className='absolute inset-0 bg-white/10 dark:bg-[#1F2937]/10 h-full backdrop-blur-md shadow-sm -z-10 transition-colors duration-300' />

      <nav className='max-w-[95%] mx-auto flex items-center justify-between px-4 sm:px-6 py-3'>
        {/* Logo */}
        <Link to='/'>
          <section className='flex items-center gap-2 sm:gap-3'>
            <div className='rounded-full bg-gray-200 dark:bg-gray-800 p-1.5 sm:p-2 shadow-md'>
              <Truck className='text-gray-900 dark:text-white w-5 h-5 sm:w-6 sm:h-6' />
            </div>
            <div className='flex flex-col leading-tight group cursor-pointer'>
              <div className='text-sm sm:text-base font-semibold tracking-wide text-gray-900 dark:text-white group-hover:opacity-90 transition-opacity'>
                <span className='text-blue-600 dark:text-blue-200'>Log</span>
                <span className='text-[#00b7eb]'>Flow</span>
              </div>
            </div>
          </section>
        </Link>

        {/* Navigation */}
        <DesktopNav
          hasNotifications={hasNotifications}
          notifications={notifications}
          className='hidden sm:flex text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-200 transition-colors duration-200'
        />
        <MobileNav
          hasNotifications={hasNotifications}
          notifications={notifications}
        />
      </nav>
    </header>
  );
};

export default Header;
