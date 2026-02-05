import { useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import { useBookStore } from '@/store/bookStore';
import { Review } from '@/data/books';
import { Star, User } from 'lucide-react';
import toast from 'react-hot-toast';

interface CommentSectionProps {
  bookId: string;
  reviews: Review[];
}

export function CommentSection({ bookId, reviews }: CommentSectionProps) {
  const { user } = useAuthStore();
  const { addReview } = useBookStore();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error('برای ثبت نظر باید وارد حساب کاربری شوید');
      return;
    }
    if (!comment.trim()) {
      toast.error('لطفا متن نظر را وارد کنید');
      return;
    }

    const newReview: Review = {
      id: Math.random().toString(36).substr(2, 9),
      userId: user.id,
      userName: user.name,
      rating,
      comment,
      date: new Date().toLocaleDateString('fa-IR'),
    };

    addReview(bookId, newReview);
    setComment('');
    setRating(5);
    toast.success('نظر شما با موفقیت ثبت شد');
  };

  return (
    <div className="space-y-8 mt-12 bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm">
      <h3 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">نظرات کاربران</h3>

      {/* Add Review Form */}
      <form onSubmit={handleSubmit} className="space-y-4 mb-8 bg-slate-50 dark:bg-slate-900 p-4 rounded-xl">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">امتیاز شما:</span>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className={`transition-colors ${star <= rating ? 'text-yellow-400' : 'text-slate-300 dark:text-slate-600'}`}
              >
                <Star size={20} fill="currentColor" />
              </button>
            ))}
          </div>
        </div>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="نظر خود را درباره این کتاب بنویسید..."
          className="w-full p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none min-h-[100px]"
        />
        <button
          type="submit"
          disabled={!user}
          className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {user ? 'ثبت نظر' : 'برای ثبت نظر وارد شوید'}
        </button>
      </form>

      {/* Reviews List */}
      <div className="space-y-6">
        {reviews.length === 0 ? (
          <p className="text-slate-500 text-center py-4">هنوز نظری برای این کتاب ثبت نشده است.</p>
        ) : (
          reviews.map((review) => (
            <div key={review.id} className="border-b border-slate-100 dark:border-slate-700 pb-6 last:border-0">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
                    <User size={20} />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white block">{review.userName}</span>
                    <span className="text-xs text-slate-500">{review.date}</span>
                  </div>
                </div>
                <div className="flex text-yellow-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={14} fill={i < review.rating ? "currentColor" : "none"} className={i >= review.rating ? "text-slate-300 dark:text-slate-600" : ""} />
                  ))}
                </div>
              </div>
              <p className="text-slate-700 dark:text-slate-300 mt-2 leading-relaxed">{review.comment}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
