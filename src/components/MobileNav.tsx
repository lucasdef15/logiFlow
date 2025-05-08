import { useState, useEffect } from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { LogIn, Menu } from 'lucide-react';
import { Button } from './ui/button';
import { Bell } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { formatDistanceToNow } from 'date-fns';

type Notification = {
  id: number;
  title: string;
  message: string;
  type?: string;
  read?: boolean;
  timestamp?: string;
};

interface MobileNavProps {
  hasNotifications: boolean;
  notifications: Notification[];
}

const MobileNav = ({ hasNotifications, notifications }: MobileNavProps) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <div className='relative flex gap-5 sm:hidden'>
      {/* Notification Popover */}
      <Popover>
        <PopoverTrigger
          className={`cursor-pointer flex justify-center items-center relative ${
            hasNotifications ? 'noti_dot' : ''
          }`}
        >
          <Bell />
        </PopoverTrigger>

        <PopoverContent className='w-full ] max-h-[350px] overflow-y-auto'>
          {hasNotifications ? (
            <>
              <section className='mb-4 pb-4 border-b border-[var(--sidebar-border)]'>
                <h3 className='font-medium'>Notifications</h3>
                <p className='text-[var(--text-muted)]'>
                  You have {notifications.length} unread notification
                  {notifications.length > 1 ? 's' : ''}
                </p>
              </section>

              <ul>
                {notifications.map((n: Notification) => (
                  <li
                    key={n.id}
                    className='text-[var(--text-muted)] cursor-pointer p-2 rounded-[5px] flex flex-col gap-.5 mb-[.2rem] hover:bg-blue-400 hover:text-white transition-all duration-300 ease-in-out'
                  >
                    <strong className='font-medium transition-colors duration-300 ease-in-out hover:text-white'>
                      {n.title}
                    </strong>
                    <span className='text-[var(--text-muted)] text-[.9rem]'>
                      {n.message}
                    </span>
                    <span className='text-[var(--text-muted)] text-[.8rem]'>
                      {formatDistanceToNow(n.timestamp as string, {
                        addSuffix: true,
                      })}
                    </span>
                  </li>
                ))}
              </ul>

              <a href='#' className='text-sm text-[var(--text-muted)] ml-2'>
                View all notifications
              </a>
            </>
          ) : (
            <section className='flex flex-col items-center justify-center py-6 text-[var(--text-muted)] text-sm'>
              <Bell className='w-6 h-6 mb-2 opacity-40' />
              <p>No new notifications</p>
            </section>
          )}
        </PopoverContent>
      </Popover>

      {/* Mobile Nav Sheet */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger
          onClick={handleOpen}
          className='cursor-pointer bg-blue-50 p-2 rounded-full md:hidden'
        >
          <Menu size={24} />
        </SheetTrigger>

        <SheetContent className='sm:max-w-xs '>
          <SheetHeader>
            <div className='flex justify-start gap-4 items-center'>
              <SheetTitle className='text-lg font-semibold'>Menu</SheetTitle>
              <Button
                className='p-2 rounded-full cursor-pointer bg-blue-600 text-white hover:bg-blue-400 transition-colors duration-300 ease-in-out'
                onClick={handleClose}
              >
                <LogIn size={20} />
              </Button>
            </div>
          </SheetHeader>
          <SheetDescription>
            <nav>
              <ul className='flex flex-col justify-center items-center gap-6 text-lg text-[var(--muted-foreground)] font-medium'>
                <li
                  onClick={handleClose}
                  className='cursor-pointer hover:text-blue-600 transition'
                >
                  Home
                </li>
                <li
                  onClick={handleClose}
                  className='cursor-pointer hover:text-blue-600 transition'
                >
                  Features
                </li>
                <li
                  onClick={handleClose}
                  className='cursor-pointer hover:text-blue-600 transition'
                >
                  Pricing
                </li>
                <li
                  onClick={handleClose}
                  className='cursor-pointer hover:text-blue-600 transition'
                >
                  Contact
                </li>
                <li
                  onClick={handleClose}
                  className='cursor-pointer hover:text-blue-600 transition'
                >
                  Dashboard
                </li>
              </ul>
            </nav>
          </SheetDescription>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNav;
