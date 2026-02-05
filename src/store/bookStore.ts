import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Book, books as initialBooks, Review } from '@/data/books';

interface BookState {
  books: Book[];
  addBook: (book: Book) => void;
  updateBook: (id: string, updates: Partial<Book>) => void;
  deleteBook: (id: string) => void;
  addReview: (bookId: string, review: Review) => void;
  toggleLike: (bookId: string, userId: string) => void; // Actually liked books are stored in User profile usually, but let's see. 
  // It's better to store liked books in User object in AuthStore. 
  // But rating/comments modify the book object.
}

export const useBookStore = create<BookState>()(
  persist(
    (set) => ({
      books: initialBooks,
      addBook: (book) => set((state) => ({ books: [...state.books, book] })),
      updateBook: (id, updates) =>
        set((state) => ({
          books: state.books.map((b) => (b.id === id ? { ...b, ...updates } : b)),
        })),
      deleteBook: (id) =>
        set((state) => ({ books: state.books.filter((b) => b.id !== id) })),
      addReview: (bookId, review) =>
        set((state) => {
          const books = state.books.map((b) => {
            if (b.id === bookId) {
              const newReviews = [...b.reviews, review];
              // Recalculate average rating
              const totalRating = newReviews.reduce((sum, r) => sum + r.rating, 0);
              const averageRating = totalRating / newReviews.length;
              return { ...b, reviews: newReviews, rating: parseFloat(averageRating.toFixed(1)) };
            }
            return b;
          });
          return { books };
        }),
      toggleLike: () => {}, // Handled in AuthStore (user.likedBooks)
    }),
    {
      name: 'book-storage',
    }
  )
);
