import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Bell } from 'lucide-react';
interface Notification {
  id: React.Key | null | undefined;
  title: string;
  message: string;
  timestamp: Date;
}

interface PopOverCompProps {
  notifications: Notification[];
  isDialogOpen: boolean;
  setIsDialogOpen: (open: boolean) => void;
  hasNotifications: boolean;
  isPopoverOpen: boolean;
  setIsPopoverOpen: (open: boolean) => void;
  handleNotificationClick: (notification: Notification) => void;
}
const PopOverComp: React.FC<PopOverCompProps> = ({
  hasNotifications,
  isPopoverOpen,
  setIsPopoverOpen,
  handleNotificationClick,
  notifications,
}) => {
  return (
    <>
      <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
        <PopoverTrigger
          className={`cursor-pointer flex justify-center items-center relative ${
            hasNotifications ? 'noti_dot' : ''
          }`}
        >
          <Bell />
        </PopoverTrigger>

        <PopoverContent className='w-full max-h-[350px] overflow-y-auto'>
          <section className='mb-4 pb-4 border-b border-[var(--sidebar-border)]'>
            <h3 className='font-medium'>Notifications</h3>
            <p className='text-[var(--text-muted)]'>
              You have {notifications.length} unread notification
              {notifications.length > 1 ? 's' : ''}
            </p>
          </section>

          {notifications.map((n: Notification) => (
            <div
              key={n?.id}
              className='text-[var(--text-muted)] cursor-pointer p-2 rounded-[5px] flex flex-col gap-1 mb-[.2rem] hover:bg-blue-400 hover:text-white transition-all duration-300 ease-in-out'
              onClick={() => handleNotificationClick(n)}
            >
              <strong className='font-medium'>{n.title}</strong>
              <span className='text-[.9rem]'>{n.message}</span>
            </div>
          ))}

          <a href='#' className='text-sm text-[var(--text-muted)] ml-2'>
            View all notifications
          </a>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default PopOverComp;
