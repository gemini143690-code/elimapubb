import { useParams, useNavigate } from 'react-router-dom';
import { useBookStore } from '@/store/bookStore';
import { useCartStore } from '@/store/cartStore';
import { CommentSection } from '@/components/CommentSection';
import { ShoppingCart, Star, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';

export function BookDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const book = useBookStore((state) => state.books.find((b) => b.id === id));
  const addToCart = useCartStore((state) => state.addToCart);

  if (!book) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">کتاب مورد نظر یافت نشد</h2>
        <button onClick={() => navigate('/')} className="mt-4 text-purple-600 hover:underline">بازگشت به صفحه اصلی</button>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(book);
    toast.success('به سبد خرید اضافه شد');
  };

  return (
    <div className="animate-fade-in">
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center gap-2 text-slate-500 hover:text-purple-600 mb-6 transition-colors"
      >
        <ArrowRight size={20} />
        بازگشت
      </button>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {/* Book Cover */}
        <div className="md:col-span-1">
          <div className="sticky top-24 rounded-2xl overflow-hidden shadow-2xl glass-card">
            <img src={book.cover} alt={book.title} className="w-full h-auto object-cover" />
          </div>
        </div>

        {/* Book Info */}
        <div className="md:col-span-2 space-y-6">
          <div>
            <div className="flex items-center gap-4 mb-2">
               <span className="text-sm px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300 rounded-full font-medium">
                {book.category}
              </span>
              <div className="flex items-center gap-1 text-yellow-500">
                <Star size={18} fill="currentColor" />
                <span className="font-bold text-lg">{book.rating}</span>
                <span className="text-slate-400 text-sm">({book.reviews.length} نظر)</span>
              </div>
            </div>
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">{book.title}</h1>
            <p className="text-xl text-slate-500 dark:text-slate-400">اثر {book.author}</p>
          </div>

          <div className="prose dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 leading-loose">
            <h3 className="text-xl font-bold mb-2">درباره کتاب</h3>
            <p>{book.description}</p>
          </div>

          <div className="flex items-center justify-between p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
            <div>
              <p className="text-sm text-slate-500 mb-1">قیمت:</p>
              <p className="text-3xl font-bold text-slate-900 dark:text-white">
                {new Intl.NumberFormat('fa-IR').format(book.price)} <span className="text-base font-normal text-slate-500">تومان</span>
              </p>
            </div>
            <button
              onClick={handleAddToCart}
              className="flex items-center gap-2 px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-bold text-lg shadow-lg shadow-purple-500/30 transition-all hover:scale-105"
            >
              <ShoppingCart size={24} />
              افزودن به سبد
            </button>
          </div>
        </div>
      </div>

      <CommentSection bookId={book.id} reviews={book.reviews} />
    </div>
  );
}
