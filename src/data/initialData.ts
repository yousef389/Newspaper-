export interface ThemeConfig {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  surfaceColor: string;
  textPrimary: string;
  textSecondary: string;
  borderColor: string;
  fontFamily: string;
  borderRadius: string;
}

export interface BrandingConfig {
  siteName: string;
  siteSubtitle: string;
  logo: string;
  contactEmail: string;
  contactPhone: string;
  whatsapp: string;
  facebook: string;
  twitter: string;
  instagram: string;
  telegram: string;
  copyrightText: string;
}

export interface Article {
  id: string;
  title: string;
  subtitle: string;
  slug: string;
  body: string;
  excerpt: string;
  category: string;
  tags: string[];
  author: {
    name: string;
    avatar: string;
    bio: string;
  };
  featuredImage: string;
  publishDate: string;
  status: 'draft' | 'published' | 'review';
  priority: 'breaking' | 'featured' | 'normal';
  isPremium: boolean;
  views: number;
  likes: number;
  comments: Comment[];
}

export interface Comment {
  id: string;
  authorName: string;
  body: string;
  date: string;
  status: 'approved' | 'pending';
}

export interface HomepageBlock {
  id: string;
  type: 'hero' | 'ticker' | 'trending' | 'latest' | 'category' | 'ads';
  title: string;
  config: any;
  enabled: boolean;
  order: number;
}

export const THEME_PRESETS: Record<string, { light: ThemeConfig; dark: ThemeConfig }> = {
  classic: {
    light: {
      primaryColor: '#991b1b', // Red-800
      secondaryColor: '#1e293b',
      accentColor: '#b91c1c',
      backgroundColor: '#f8fafc',
      surfaceColor: '#ffffff',
      textPrimary: '#0f172a',
      textSecondary: '#64748b',
      borderColor: '#e2e8f0',
      fontFamily: 'Cairo, sans-serif',
      borderRadius: '0.375rem',
    },
    dark: {
      primaryColor: '#f87171',
      secondaryColor: '#94a3b8',
      accentColor: '#ef4444',
      backgroundColor: '#0f172a',
      surfaceColor: '#1e293b',
      textPrimary: '#f1f5f9',
      textSecondary: '#94a3b8',
      borderColor: '#334155',
      fontFamily: 'Cairo, sans-serif',
      borderRadius: '0.375rem',
    },
  },
  modern: {
    light: {
      primaryColor: '#0369a1', // Sky-700
      secondaryColor: '#0f172a',
      accentColor: '#0284c7',
      backgroundColor: '#f0fdf4',
      surfaceColor: '#ffffff',
      textPrimary: '#0f172a',
      textSecondary: '#475569',
      borderColor: '#cbd5e1',
      fontFamily: 'Tajawal, sans-serif',
      borderRadius: '0.5rem',
    },
    dark: {
      primaryColor: '#38bdf8',
      secondaryColor: '#cbd5e1',
      accentColor: '#0ea5e9',
      backgroundColor: '#050b14',
      surfaceColor: '#0c1524',
      textPrimary: '#f8fafc',
      textSecondary: '#cbd5e1',
      borderColor: '#1e293b',
      fontFamily: 'Tajawal, sans-serif',
      borderRadius: '0.5rem',
    },
  },
};

export const INITIAL_BRANDING: BrandingConfig = {
  siteName: 'صدى العروبة',
  siteSubtitle: 'منصة الأخبار العربية المستقلة على مدار الساعة',
  logo: '📰',
  contactEmail: 'contact@sada-oroba.com',
  contactPhone: '+96612345678',
  whatsapp: '+96612345678',
  facebook: 'https://facebook.com/sada',
  twitter: 'https://twitter.com/sada',
  instagram: 'https://instagram.com/sada',
  telegram: 'https://t.me/sada',
  copyrightText: 'جميع الحقوق محفوظة © صدى العروبة ٢٠٢٦',
};

export const INITIAL_ARTICLES: Article[] = [
  {
    id: '1',
    title: 'إنجاز تكنولوجي عربي: إطلاق أول نموذج ذكاء اصطناعي فائق يدعم كل اللهجات العربية',
    subtitle: 'النموذج الجديد يتفوق على أقرانه في فهم السياق الثقافي واللغوي العربي بنسبة ٩٤٪',
    slug: 'arab-ai-model-launch',
    body: 'في خطوة تاريخية للتقنية العربية، أعلن تحالف من كبار المطورين والمؤسسات الأكاديمية العربية اليوم عن إطلاق "الراوي"، وهو نموذج ذكاء اصطناعي توليدي ضخم تم تدريبه بالكامل على المحتوى العربي الأصيل وبما يشمل مختلف اللهجات المحلية الدارجة من المحيط إلى الخليج.\n\nويتميز النموذج الجديد، الذي استغرق تطويره أكثر من ثلاث سنوات، بالقدرة العالية على تحليل النصوص العربية وتفسير الأمثال والتعابير المجازية بكل دقة وسلاسة، متغلبًا على العقبات التي تواجهها النماذج العالمية في هذا الجانب.\n\nمن المتوقع أن يفتح هذا الإنجاز آفاقًا جديدة في صناعة النشر والإعلام والبرمجيات في الوطن العربي.',
    excerpt: 'إعلان تاريخي عن نموذج الذكاء الاصطناعي "الراوي" القادر على استيعاب وتوليد المحتوى بجميع اللهجات العربية.',
    category: 'تكنولوجيا',
    tags: ['ذكاء اصطناعي', 'تقنية', 'ابتكار عربي'],
    author: {
      name: 'أحمد النجار',
      avatar: '👨‍💻',
      bio: 'خبير في صحافة التقنية ومستشار في الذكاء الاصطناعي.',
    },
    featuredImage: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=1200&q=80',
    publishDate: '2026-03-05T12:00:00Z',
    status: 'published',
    priority: 'breaking',
    isPremium: false,
    views: 4500,
    likes: 380,
    comments: [
      { id: 'c1', authorName: 'سامي الخالد', body: 'فخر كبير لنا جميعاً، نتمنى سرعة توفير واجهات برمجة التطبيقات للمطورين.', date: '2026-03-05T14:20:00Z', status: 'approved' },
    ],
  },
  {
    id: '2',
    title: 'القمة الاقتصادية العربية تعتمد استراتيجية استثمارية موحدة للطاقة النظيفة',
    subtitle: 'اتفاق شامل لضخ ٥٠ مليار دولار في مشاريع الهيدروجين الأخضر والطاقة الشمسية',
    slug: 'arab-economic-summit-clean-energy',
    body: 'اختتمت القمة الاقتصادية العربية أعمالها في الرياض بتبني "رؤية الاستدامة ٢٠٣٥" والتي تهدف إلى تحويل المنطقة إلى مركز عالمي لإنتاج وتصدير الطاقة النظيفة.\n\nووقع القادة على وثيقة مشتركة تتعهد فيها الصناديق السيادية بتمويل مشروعات ضخمة للطاقة البديلة في الدول الأعضاء على مدى العقد القادم.',
    excerpt: 'القادة العرب يتفقون على حزمة استثنائية لدعم الاستدامة والتحول الطاقي.',
    category: 'اقتصاد',
    tags: ['طاقة نظيفة', 'استثمار', 'القمة الاقتصادية'],
    author: {
      name: 'سارة المنصور',
      avatar: '👩‍💼',
      bio: 'محللة اقتصادية وصحفية شؤون المال والأعمال.',
    },
    featuredImage: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1200&q=80',
    publishDate: '2026-03-04T08:30:00Z',
    status: 'published',
    priority: 'featured',
    isPremium: true,
    views: 2800,
    likes: 190,
    comments: [],
  },
  {
    id: '3',
    title: 'المنتخب العربي يتأهل لنهائي كأس العالم في مواجهة تاريخية مرتقبة',
    subtitle: 'أداء بطولي وعزيمة لا تلين تضع الكرة العربية في مصاف الكبار مجددًا',
    slug: 'world-cup-arab-team-final',
    body: 'عمّت الفرحة الشوارع والمدن العربية ليلة أمس عقب إطلاق صافرة نهاية المباراة التاريخية التي أهلت منتخبنا الوطني إلى المباراة النهائية لكأس العالم لأول مرة في التاريخ.',
    excerpt: 'تأهل بطولي مستحق في انتظار المباراة الحاسمة يوم الأحد القادم.',
    category: 'رياضة',
    tags: ['كأس العالم', 'كرة القدم', 'انتصار عربي'],
    author: {
      name: 'خالد الدوري',
      avatar: '⚽',
      bio: 'ناقد رياضي ومتابع للمنتخبات العربية.',
    },
    featuredImage: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80',
    publishDate: '2026-03-03T20:15:00Z',
    status: 'published',
    priority: 'normal',
    isPremium: false,
    views: 12000,
    likes: 2450,
    comments: [],
  },
];

export const INITIAL_BLOCKS: HomepageBlock[] = [
  { id: 'b1', type: 'ticker', title: 'الأخبار العاجلة', config: {}, enabled: true, order: 1 },
  { id: 'b2', type: 'hero', title: 'القصة الرئيسية', config: {}, enabled: true, order: 2 },
  { id: 'b3', type: 'trending', title: 'الأكثر قراءة الآن', config: {}, enabled: true, order: 3 },
  { id: 'b4', type: 'latest', title: 'آخر الأخبار', config: {}, enabled: true, order: 4 },
];

export const CATEGORIES = ['سياسة', 'اقتصاد', 'رياضة', 'تكنولوجيا', 'ثقافة', 'علوم'];
