import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { Book } from '@/data/books';
import { useCartStore } from '@/store/cartStore';
import { useAuthStore } from '@/store/authStore';
import toast from 'react-hot-toast';

interface BookCardProps {
  book: Book;
}

export function BookCard({ book }: BookCardProps) {
  const addToCart = useCartStore((state) => state.addToCart);
  const { user, updateUser } = useAuthStore();
  
  const isLiked = user?.likedBooks.includes(book.id);

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error('لطفا ابتدا وارد حساب کاربری خود شوید');
      return;
    }
    
    const newLikedBooks = isLiked
      ? user.likedBooks.filter((id) => id !== book.id)
      : [...user.likedBooks, book.id];
      
    updateUser({ likedBooks: newLikedBooks });
    toast.success(isLiked ? 'از علاقه‌مندی‌ها حذف شد' : 'به علاقه‌مندی‌ها اضافه شد');
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(book);
    toast.success('به سبد خرید اضافه شد');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -10 }}
      transition={{ duration: 0.3 }}
      className="group relative rounded-xl overflow-hidden glass-card h-[420px] flex flex-col"
    >
      <div className="relative h-64 overflow-hidden">
        <img
          src={book.cover}
          alt={book.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
          <button
            onClick={handleAddToCart}
            className="p-3 bg-white text-slate-900 rounded-full hover:bg-purple-500 hover:text-white transition-colors transform translate-y-4 group-hover:translate-y-0 duration-300"
            title="افزودن به سبد خرید"
          >
            <ShoppingCart size={20} />
          </button>
          <button
            onClick={handleLike}
            className={`p-3 bg-white rounded-full hover:bg-pink-500 hover:text-white transition-colors transform translate-y-4 group-hover:translate-y-0 duration-300 delay-75 ${
              isLiked ? 'text-pink-500' : 'text-slate-900'
            }`}
            title="افزودن به علاقه‌مندی‌ها"
          >
            <Heart size={20} fill={isLiked ? "currentColor" : "none"} />
          </button>
        </div>
      </div>

      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs font-medium px-2 py-1 rounded bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300">
              {book.category}
            </span>
            <div className="flex items-center gap-1 text-yellow-500">
              <Star size={14} fill="currentColor" />
              <span className="text-sm font-bold">{book.rating}</span>
            </div>
          </div>
          
          <Link to={`/book/${book.id}`}>
             <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-1 line-clamp-1 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
              {book.title}
            </h3>
          </Link>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">{book.author}</p>
        </div>

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-200 dark:border-slate-700/50">
          <span className="text-lg font-bold text-slate-900 dark:text-white">
            {new Intl.NumberFormat('fa-IR').format(book.price)} <span className="text-xs font-normal text-slate-500">تومان</span>
          </span>
          <Link
            to={`/book/${book.id}`}
            className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
          >
            مشاهده جزئیات
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
