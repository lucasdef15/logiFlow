import { SidebarTrigger } from '@/components/ui/sidebar';
import { Menu } from 'lucide-react';

const DashboardHome = () => {
  return (
    <div className='flex flex-row items-center justify-center'>
      {/* Botão de toggle movido para o header, sem posição fixa */}
      <SidebarTrigger>
        <Menu className='w-6 h-6 text-muted-foreground' />
      </SidebarTrigger>
      <h1>DashboardHome</h1>
    </div>
  );
};

export default DashboardHome;
