export interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
  cover: string;
  category: string;
  description: string;
  rating: number;
  reviews: Review[];
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export const books: Book[] = [
  {
    id: '1',
    title: 'بوف کور',
    author: 'صادق هدایت',
    price: 150000,
    cover: 'https://images.unsplash.com/photo-1629196911514-cfd8d628b485?q=80&w=600&auto=format&fit=crop',
    category: 'ادبیات کلاسیک',
    description: 'شاهکار ادبیات سورئالیستی مدرن ایران که به بررسی درونی‌ترین افکار یک انسان منزوی می‌پردازد.',
    rating: 4.8,
    reviews: []
  },
  {
    id: '2',
    title: 'شازده کوچولو',
    author: 'آنتوان دو سنت اگزوپری',
    price: 120000,
    cover: 'https://images.unsplash.com/photo-1633477189729-9290b3261d0a?q=80&w=600&auto=format&fit=crop',
    category: 'داستان',
    description: 'داستانی فلسفی و جذاب درباره کودکی که از سیارکی دوردست می‌آید و با مفاهیم عشق و هستی آشنا می‌شود.',
    rating: 4.9,
    reviews: []
  },
  {
    id: '3',
    title: 'جنایت و مکافات',
    author: 'فئودور داستایوفسکی',
    price: 350000,
    cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=600&auto=format&fit=crop',
    category: 'رمان',
    description: 'رمانی روانشناختی درباره جوانی دانشجو که مرتکب قتل می‌شود و با عذاب وجدان دست و پنجه نرم می‌کند.',
    rating: 4.7,
    reviews: []
  },
  {
    id: '4',
    title: 'صد سال تنهایی',
    author: 'گابریل گارسیا مارکز',
    price: 280000,
    cover: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=600&auto=format&fit=crop',
    category: 'رئالیسم جادویی',
    description: 'حماسه‌ای از زندگی خانواده بوئندیا در دهکده خیالی ماکوندو که با جادو و واقعیت آمیخته شده است.',
    rating: 4.8,
    reviews: []
  },
  {
    id: '5',
    title: '۱۹۸۴',
    author: 'جورج اورول',
    price: 210000,
    cover: 'https://images.unsplash.com/photo-1535905557558-afc4877a26fc?q=80&w=600&auto=format&fit=crop',
    category: 'علمی تخیلی',
    description: 'رمانی پادآرمان‌شهری که جامعه‌ای تحت نظارت شدید و حکومت توتالیتر را به تصویر می‌کشد.',
    rating: 4.6,
    reviews: []
  },
  {
    id: '6',
    title: 'کیمیاگر',
    author: 'پائولو کوئیلو',
    price: 180000,
    cover: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=600&auto=format&fit=crop',
    category: 'داستان',
    description: 'داستان چوپانی اسپانیایی که در جستجوی گنجی مدفون در اهرام مصر سفر می‌کند.',
    rating: 4.5,
    reviews: []
  },
  {
    id: '7',
    title: 'دنیای سوفی',
    author: 'یوستین گردر',
    price: 240000,
    cover: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?q=80&w=600&auto=format&fit=crop',
    category: 'فلسفه',
    description: 'رمانی که تاریخ فلسفه را در قالب داستانی جذاب و معمایی روایت می‌کند.',
    rating: 4.7,
    reviews: []
  },
  {
    id: '8',
    title: 'قلعه حیوانات',
    author: 'جورج اورول',
    price: 130000,
    cover: 'https://images.unsplash.com/photo-1610415617267-33f7d1f5c646?q=80&w=600&auto=format&fit=crop',
    category: 'تمثیلی',
    description: 'داستانی انتقادی درباره انقلاب حیوانات مزرعه که به دیکتاتوری خوک‌ها ختم می‌شود.',
    rating: 4.8,
    reviews: []
  },
  {
    id: '9',
    title: 'ملت عشق',
    author: 'الیف شافاک',
    price: 260000,
    cover: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=600&auto=format&fit=crop',
    category: 'عرفانی',
    description: 'دو روایت موازی از زندگی شمس تبریزی و مولانا و زنی امروزی که تحت تاثیر این داستان قرار می‌گیرد.',
    rating: 4.4,
    reviews: []
  },
  {
    id: '10',
    title: 'جای خالی سلوچ',
    author: 'محمود دولت‌آبادی',
    price: 290000,
    cover: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=600&auto=format&fit=crop',
    category: 'رمان ایرانی',
    description: 'روایتی رئالیستی و دردناک از زندگی زنی روستایی که همسرش ناگهان ناپدید می‌شود.',
    rating: 4.9,
    reviews: []
  },
  {
    id: '11',
    title: 'سمفونی مردگان',
    author: 'عباس معروفی',
    price: 230000,
    cover: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=600&auto=format&fit=crop',
    category: 'رمان ایرانی',
    description: 'داستانی تراژیک و چندلایه درباره زوال خانواده‌ای در اردبیل و تقابل سنت و مدرنیته.',
    rating: 4.7,
    reviews: []
  },
  {
    id: '12',
    title: 'کلیدر (جلد اول)',
    author: 'محمود دولت‌آبادی',
    price: 450000,
    cover: 'https://images.unsplash.com/photo-1476275466078-4007374efbbe?q=80&w=600&auto=format&fit=crop',
    category: 'حماسی',
    description: 'بلندترین رمان فارسی که زندگی و مبارزات گل‌محمد و خانواده‌اش را در خراسان روایت می‌کند.',
    rating: 4.8,
    reviews: []
  },
  {
    id: '13',
    title: 'چشم‌هایش',
    author: 'بزرگ علوی',
    price: 160000,
    cover: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=600&auto=format&fit=crop',
    category: 'عاشقانه',
    description: 'داستانی معمایی و عاشقانه درباره زندگی و آثار یک نقاش مبارز سیاسی.',
    rating: 4.6,
    reviews: []
  },
  {
    id: '14',
    title: 'سووشون',
    author: 'سیمین دانشور',
    price: 200000,
    cover: 'https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?q=80&w=600&auto=format&fit=crop',
    category: 'تاریخی',
    description: 'اولین رمان نویسنده زن ایرانی که وقایع اشغال ایران در جنگ جهانی دوم را در شیراز روایت می‌کند.',
    rating: 4.7,
    reviews: []
  },
  {
    id: '15',
    title: 'پیرمرد و دریا',
    author: 'ارنست همینگوی',
    price: 140000,
    cover: 'https://images.unsplash.com/photo-1518373714866-3f1478910cc0?q=80&w=600&auto=format&fit=crop',
    category: 'داستان',
    description: 'مبارزه حماسی یک ماهیگیر پیر با یک ماهی بزرگ در دریا که نماد استقامت انسان است.',
    rating: 4.5,
    reviews: []
  },
  {
    id: '16',
    title: 'عقاید یک دلقک',
    author: 'هاینریش بل',
    price: 190000,
    cover: 'https://images.unsplash.com/photo-1531591022136-eb8b0da1e6d0?q=80&w=600&auto=format&fit=crop',
    category: 'اجتماعی',
    description: 'تک‌گویی‌های انتقادی دلقکی که جامعه ریاکار و مذهبی زمان خود را به چالش می‌کشد.',
    rating: 4.6,
    reviews: []
  },
  {
    id: '17',
    title: 'انسان در جستجوی معنا',
    author: 'ویکتور فرانکل',
    price: 170000,
    cover: 'https://images.unsplash.com/photo-1555116505-a1d6ca9e1317?q=80&w=600&auto=format&fit=crop',
    category: 'روانشناسی',
    description: 'خاطرات نویسنده از اردوگاه‌های کار اجباری و معرفی مکتب معنادرمانی.',
    rating: 4.9,
    reviews: []
  },
  {
    id: '18',
    title: 'مردی به نام اوه',
    author: 'فردریک بکمن',
    price: 220000,
    cover: 'https://images.unsplash.com/photo-1512045491028-a30f677f65d1?q=80&w=600&auto=format&fit=crop',
    category: 'طنز تلخ',
    description: 'داستان پیرمردی بداخلاق و منزوی که با ورود همسایه‌های جدید زندگی‌اش تغییر می‌کند.',
    rating: 4.7,
    reviews: []
  },
  {
    id: '19',
    title: 'تخت خوابت را مرتب کن',
    author: 'ویلیام مک‌ریون',
    price: 110000,
    cover: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=600&auto=format&fit=crop',
    category: 'انگیزشی',
    description: 'درس‌های ساده اما کاربردی یک دریاسالار برای تغییر زندگی و جهان.',
    rating: 4.3,
    reviews: []
  },
  {
    id: '20',
    title: 'قدرت عادت',
    author: 'چارلز داهیگ',
    price: 200000,
    cover: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=600&auto=format&fit=crop',
    category: 'روانشناسی',
    description: 'بررسی علمی چگونگی شکل‌گیری عادت‌ها و نحوه تغییر آن‌ها برای موفقیت.',
    rating: 4.5,
    reviews: []
  }
];
