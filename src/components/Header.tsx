import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import DesktopNav from './DesktopNav';
import MobileNav from './MobileNav';

interface Notification {
  id: number;
  title: string;
  message: string;
  timestamp: Date;
}

interface DesktopNavProps {
  hasNotifications: boolean;
  notifications: Notification[];
}

const Header = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const headerRef = useRef<HTMLElement>(null);
  const lastScroll = useRef(0);

  // Fetch notifications
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
        // Scroll down - hide header
        gsap.to(headerRef.current, {
          y: '-100%',
          duration: 0.4,
          ease: 'power2.out',
        });
      } else {
        // Scroll up - show header
        gsap.to(headerRef.current, {
          y: '0%',
          duration: 0.4,
          ease: 'power2.out',
        });
      }

      lastScroll.current = currentScroll;
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const hasNotifications = notifications.length > 0;

  return (
    <header
      ref={headerRef}
      className='bg-[var(--card)] w-full shadow-lg sticky top-0 z-10'
    >
      <nav className='bg-[var(--card)] w-full max-w-[1128px] mx-auto flex flex-row justify-between p-4 transition-all duration-300'>
        <section className='flex items-center justify-center gap-2'>
          <img
            className='max-w-[30px]'
            src='/assets/images/logo.svg'
            alt='logo svg'
          />
          <div className='font-sans tracking-wide'>
            <span className='text-blue-600 font-bold'>Log</span>
            <span className='text-blue-300 font-bold'>Flow</span>
          </div>
        </section>

        <DesktopNav
          hasNotifications={hasNotifications}
          notifications={notifications}
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
