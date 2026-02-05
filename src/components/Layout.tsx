import { ReactNode } from 'react';
import { Navbar } from './Navbar';
import { useThemeStore } from '@/store/themeStore';
import { cn } from '@/utils/cn';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { theme } = useThemeStore();

  return (
    <div className={cn("min-h-screen transition-colors duration-300 rtl", theme)}>
       {/* Background Elements */}
       <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-purple-500/20 blur-[120px]" />
          <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-pink-500/20 blur-[120px]" />
       </div>

      <Navbar />
      <main className="pt-20 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-[calc(100vh-64px)]">
        {children}
      </main>
      
      <footer className="glass-nav py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-500 dark:text-slate-400">
          <p>© ۱۴۰۳ انتشارات الیما. تمامی حقوق محفوظ است.</p>
        </div>
      </footer>
    </div>
  );
}
