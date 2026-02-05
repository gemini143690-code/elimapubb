import { useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import { useBookStore } from '@/store/bookStore';
import { Book } from '@/data/books';
import { Plus, Edit2, Trash2, X, Save } from 'lucide-react';
import { Navigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export function Admin() {
  const { user } = useAuthStore();
  const { books, addBook, updateBook, deleteBook } = useBookStore();
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  if (!user || user.role !== 'admin') {
    return <Navigate to="/" />;
  }

  const initialBookState: Omit<Book, 'id' | 'rating' | 'reviews'> = {
    title: '',
    author: '',
    price: 0,
    category: '',
    description: '',
    cover: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=600&auto=format&fit=crop', // Default placeholder
  };

  const [formData, setFormData] = useState(initialBookState);

  const handleEditClick = (book: Book) => {
    setEditingBook(book);
    setFormData({
      title: book.title,
      author: book.author,
      price: book.price,
      category: book.category,
      description: book.description,
      cover: book.cover,
    });
    setIsAdding(false);
  };

  const handleAddClick = () => {
    setEditingBook(null);
    setFormData(initialBookState);
    setIsAdding(true);
  };

  const handleCancel = () => {
    setEditingBook(null);
    setIsAdding(false);
    setFormData(initialBookState);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isAdding) {
      const newBook: Book = {
        ...formData,
        id: Math.random().toString(36).substr(2, 9),
        rating: 0,
        reviews: [],
      };
      addBook(newBook);
      toast.success('کتاب جدید اضافه شد');
    } else if (editingBook) {
      updateBook(editingBook.id, formData);
      toast.success('تغییرات ذخیره شد');
    }
    
    handleCancel();
  };

  const handleDelete = (id: string) => {
    if (window.confirm('آیا از حذف این کتاب اطمینان دارید؟')) {
      deleteBook(id);
      toast.success('کتاب حذف شد');
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">پنل مدیریت</h1>
        <button
          onClick={handleAddClick}
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          <Plus size={20} />
          افزودن کتاب جدید
        </button>
      </div>

      {(isAdding || editingBook) && (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg border border-purple-200 dark:border-purple-900">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              {isAdding ? 'افزودن کتاب جدید' : 'ویرایش کتاب'}
            </h2>
            <button onClick={handleCancel} className="text-slate-500 hover:text-red-500">
              <X size={24} />
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">عنوان کتاب</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full p-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">نویسنده</label>
              <input
                type="text"
                required
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                className="w-full p-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">دسته‌بندی</label>
              <input
                type="text"
                required
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full p-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">قیمت (تومان)</label>
              <input
                type="number"
                required
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                className="w-full p-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium">آدرس تصویر جلد</label>
              <input
                type="text"
                required
                value={formData.cover}
                onChange={(e) => setFormData({ ...formData, cover: e.target.value })}
                className="w-full p-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 ltr text-left"
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium">توضیحات</label>
              <textarea
                required
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full p-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
              />
            </div>
            
            <div className="md:col-span-2 flex justify-end gap-4">
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg"
              >
                انصراف
              </button>
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                <Save size={20} />
                ذخیره
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead className="bg-slate-50 dark:bg-slate-700 text-slate-600 dark:text-slate-200">
              <tr>
                <th className="p-4">تصویر</th>
                <th className="p-4">عنوان</th>
                <th className="p-4">نویسنده</th>
                <th className="p-4">قیمت</th>
                <th className="p-4">دسته‌بندی</th>
                <th className="p-4">عملیات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
              {books.map((book) => (
                <tr key={book.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                  <td className="p-4">
                    <img src={book.cover} alt={book.title} className="w-12 h-16 object-cover rounded" />
                  </td>
                  <td className="p-4 font-medium text-slate-900 dark:text-white">{book.title}</td>
                  <td className="p-4 text-slate-500 dark:text-slate-400">{book.author}</td>
                  <td className="p-4 text-slate-900 dark:text-white">{new Intl.NumberFormat('fa-IR').format(book.price)}</td>
                  <td className="p-4">
                    <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300 rounded text-xs">
                      {book.category}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditClick(book)}
                        className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                        title="ویرایش"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(book.id)}
                        className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                        title="حذف"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
