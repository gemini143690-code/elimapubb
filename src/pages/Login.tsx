import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

export function Login() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('لطفا ایمیل و رمز عبور را وارد کنید');
      return;
    }
    
    // Mock login logic
    const mockUser = {
      id: '1',
      name: 'کاربر آزمایشی',
      email: email,
      role: email.includes('admin') ? 'admin' as const : 'user' as const,
      likedBooks: [],
    };
    
    login(mockUser);
    toast.success('با موفقیت وارد شدید');
    navigate('/');
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md p-8 glass-card rounded-2xl shadow-2xl"
      >
        <h2 className="text-3xl font-bold text-center mb-8 text-slate-900 dark:text-white">ورود به حساب</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">ایمیل</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-purple-500 outline-none transition-all"
              placeholder="example@mail.com"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">رمز عبور</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-purple-500 outline-none transition-all"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-lg hover:opacity-90 transition-opacity shadow-lg shadow-purple-500/30"
          >
            ورود
          </button>
        </form>

        <p className="mt-6 text-center text-slate-600 dark:text-slate-400">
          حساب کاربری ندارید؟{' '}
          <Link to="/register" className="text-purple-600 dark:text-purple-400 hover:underline font-medium">
            ثبت‌نام کنید
          </Link>
        </p>
        
        <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg text-xs text-yellow-800 dark:text-yellow-200">
          <p>برای تست ادمین از ایمیل <b>admin@elima.com</b> استفاده کنید.</p>
        </div>
      </motion.div>
    </div>
  );
}
