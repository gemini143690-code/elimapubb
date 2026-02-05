import { useCartStore } from '@/store/cartStore';
import { useAuthStore } from '@/store/authStore';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export function Cart() {
  const { items, removeFromCart, updateQuantity, total, clearCart } = useCartStore();
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!user) {
      toast.error('لطفا برای تکمیل خرید وارد حساب کاربری شوید');
      navigate('/login');
      return;
    }
    toast.success('خرید شما با موفقیت انجام شد! (نسخه آزمایشی)');
    clearCart();
    navigate('/profile');
  };

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
        <ShoppingBag size={64} className="text-slate-300 dark:text-slate-600" />
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">سبد خرید شما خالی است</h2>
        <Link to="/" className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
          مشاهده کتاب‌ها
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-slate-900 dark:text-white">سبد خرید</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex gap-4 p-4 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700">
              <img src={item.cover} alt={item.title} className="w-24 h-32 object-cover rounded-md" />
              
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">{item.title}</h3>
                  <p className="text-sm text-slate-500">{item.author}</p>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 bg-slate-100 dark:bg-slate-700 rounded-lg p-1">
                    <button 
                      onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                      className="p-1 hover:text-purple-600 transition-colors"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="font-bold w-6 text-center">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1 hover:text-purple-600 transition-colors"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <span className="font-bold text-slate-900 dark:text-white">
                      {new Intl.NumberFormat('fa-IR').format(item.price * item.quantity)} تومان
                    </span>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:bg-red-50 p-2 rounded-full transition-colors"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 sticky top-24">
            <h3 className="text-lg font-bold mb-4 text-slate-900 dark:text-white">خلاصه سفارش</h3>
            
            <div className="space-y-2 mb-6 text-slate-600 dark:text-slate-300">
              <div className="flex justify-between">
                <span>تعداد اقلام:</span>
                <span>{items.reduce((acc, i) => acc + i.quantity, 0)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg text-slate-900 dark:text-white pt-4 border-t border-slate-200 dark:border-slate-700">
                <span>مبلغ قابل پرداخت:</span>
                <span>{new Intl.NumberFormat('fa-IR').format(total())} تومان</span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full py-3 bg-purple-600 text-white rounded-lg font-bold hover:bg-purple-700 shadow-lg shadow-purple-500/30 transition-all hover:scale-105"
            >
              تکمیل خرید
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
