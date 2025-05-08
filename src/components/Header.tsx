import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Bell, LogIn } from 'lucide-react';
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

const Header = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    fetch('/data/notifications.json')
      .then((res) => res.json())
      .then((data) => setNotifications(data))
      .catch((error) => console.error('Error fetching notifications:', error));
  }, []);

  const hasNotifications = notifications.length > 0;

  return (
    <header className='bg-[var(--card)] w-full shadow-lg'>
      <nav className='bg-[var(--card)] w-full max-w-[1128px] mx-auto flex flex-row justify-between p-4'>
        <section className='flex items-center gap-2'>
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

        <nav className='flex flex-row'>
          <ul className='flex justify-center items-center flex-row gap-4 text-[.9rem] text-[var(--muted-foreground)] font-medium'>
            <li>Home</li>
            <li>Features</li>
            <li>Pricing</li>
            <li>Contact</li>
            <li>Dashboard</li>
          </ul>
        </nav>

        <section className='flex gap-2'>
          <Popover>
            <PopoverTrigger
              className={`mx-2 cursor-pointer flex shrink-0 justify-center items-center relative ${
                hasNotifications ? 'noti_dot' : ''
              }`}
            >
              <Bell />
            </PopoverTrigger>

            <PopoverContent className='w-full min-w-[250px]'>
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

          <Button className='cursor-pointer bg-blue-600 text-[var(--card)] hover:bg-blue-400 transition-colors duration-300 ease-in-out'>
            <LogIn /> Login
          </Button>
        </section>
      </nav>
    </header>
  );
};

export default Header;
