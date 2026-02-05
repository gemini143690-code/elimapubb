import { useAuthStore } from '@/store/authStore';
import { useBookStore } from '@/store/bookStore';
import { BookCard } from '@/components/BookCard';
import { User, Heart, Clock } from 'lucide-react';
import { Navigate } from 'react-router-dom';

export function Profile() {
  const { user } = useAuthStore();
  const { books } = useBookStore();

  if (!user) {
    return <Navigate to="/login" />;
  }

  const likedBooksList = books.filter((book) => user.likedBooks.includes(book.id));

  return (
    <div className="space-y-12">
      <div className="flex items-center gap-6 p-8 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-3xl text-white shadow-2xl">
        <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md">
          <User size={48} />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-2">{user.name}</h1>
          <p className="opacity-80">{user.email}</p>
          <div className="mt-4 inline-flex items-center px-3 py-1 rounded-full bg-white/20 text-sm">
             نقش: {user.role === 'admin' ? 'مدیر سیستم' : 'کاربر عادی'}
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center gap-3 text-2xl font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-700 pb-4">
          <Heart className="text-pink-500" fill="currentColor" />
          <h2>کتاب‌های مورد علاقه</h2>
        </div>

        {likedBooksList.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {likedBooksList.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-slate-500 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
            <p>شما هنوز هیچ کتابی را به علاقه‌مندی‌ها اضافه نکرده‌اید.</p>
          </div>
        )}
      </div>

       <div className="space-y-6">
        <div className="flex items-center gap-3 text-2xl font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-700 pb-4">
          <Clock className="text-blue-500" />
          <h2>تاریخچه خرید</h2>
        </div>
        <div className="text-center py-12 text-slate-500 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
            <p>تاریخچه خریدی وجود ندارد.</p>
        </div>
      </div>
    </div>
  );
}
