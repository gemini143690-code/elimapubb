import { motion } from 'framer-motion';
import { useBookStore } from '@/store/bookStore';
import { BookCard } from '@/components/BookCard';
import { Search } from 'lucide-react';
import { useState } from 'react';

export function Home() {
  const { books } = useBookStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', ...Array.from(new Set(books.map((b) => b.category)))];

  const filteredBooks = books.filter((book) => {
    const matchesSearch = book.title.includes(searchTerm) || book.author.includes(searchTerm);
    const matchesCategory = selectedCategory === 'all' || book.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative rounded-3xl overflow-hidden min-h-[400px] flex items-center justify-center text-center p-8 bg-gradient-to-r from-purple-900/80 to-indigo-900/80">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=2000&auto=format&fit=crop" 
            alt="Library" 
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        
        <div className="relative z-10 max-w-2xl space-y-6">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold text-white mb-4 text-shadow"
          >
            دنیای بی‌نهایت کلمات
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-200 mb-8"
          >
            انتشارات الیما، مرجع تخصصی برترین آثار ادبی ایران و جهان.
            سفری به اعماق داستان‌ها و اندیشه‌ها.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="flex items-center max-w-md mx-auto bg-white/10 backdrop-blur-md rounded-full border border-white/20 p-2"
          >
            <input
              type="text"
              placeholder="جستجو در میان کتاب‌ها..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none text-white placeholder-slate-300 px-4"
            />
            <button className="p-2 bg-purple-600 rounded-full text-white hover:bg-purple-700 transition-colors">
              <Search size={20} />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="flex flex-wrap gap-2 justify-center">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedCategory === category
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/30'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
            }`}
          >
            {category === 'all' ? 'همه کتاب‌ها' : category}
          </button>
        ))}
      </section>

      {/* Book Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredBooks.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </section>

      {filteredBooks.length === 0 && (
        <div className="text-center py-12 text-slate-500 dark:text-slate-400">
          کتابی با این مشخصات یافت نشد.
        </div>
      )}
    </div>
  );
}
