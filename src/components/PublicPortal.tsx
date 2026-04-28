import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Heart, MessageCircle, Share2, Award, Bookmark, 
  Search, Eye, Sun, Moon, ArrowLeft, Send
} from 'lucide-react';

export const PublicPortal: React.FC = () => {
  const { 
    branding, 
    currentTheme, 
    isDarkMode, setIsDarkMode,
    articles, setArticles,
    homepageBlocks,
    setUserRole,
    addAuditLog
  } = useApp();

  const [activeTab, setActiveTab] = useState<'home' | 'article' | 'category' | 'search'>('home');
  const [selectedArticle, setSelectedArticle] = useState<any>(null);
  const [activeCategory, setActiveCategory] = useState<string>('تكنولوجيا');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [newsletterEmail, setNewsletterEmail] = useState<string>('');
  const [newComment, setNewComment] = useState({ name: '', body: '' });

  const categories = ['سياسة', 'اقتصاد', 'رياضة', 'تكنولوجيا', 'ثقافة', 'علوم'];

  // Dynamic Styles from Theme settings
  const themeStyles = {
    fontFamily: currentTheme.fontFamily,
    backgroundColor: currentTheme.backgroundColor,
    color: currentTheme.textPrimary,
  };

  const breakingNews = articles.filter(a => a.priority === 'breaking');

  const handleOpenArticle = (article: any) => {
    // Increment views safely
    setArticles(prev => prev.map(a => a.id === article.id ? { ...a, views: a.views + 1 } : a));
    setSelectedArticle({ ...article, views: article.views + 1 });
    setActiveTab('article');
    window.scrollTo(0, 0);
  };

  const handleLike = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setArticles(prev => prev.map(a => a.id === id ? { ...a, likes: a.likes + 1 } : a));
    if (selectedArticle && selectedArticle.id === id) {
      setSelectedArticle((prev: any) => ({ ...prev, likes: prev.likes + 1 }));
    }
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.name || !newComment.body) return;

    const commentObj = {
      id: Math.random().toString(),
      authorName: newComment.name,
      body: newComment.body,
      date: new Date().toISOString(),
      status: 'approved' as const
    };

    setArticles(prev => prev.map(a => a.id === selectedArticle.id ? { ...a, comments: [...a.comments, commentObj] } : a));
    setSelectedArticle((prev: any) => ({ ...prev, comments: [...prev.comments, commentObj] }));
    setNewComment({ name: '', body: '' });
  };

  const filteredArticles = articles.filter(a => {
    if (activeTab === 'category') return a.category === activeCategory;
    if (activeTab === 'search') return a.title.includes(searchQuery) || a.body.includes(searchQuery);
    return true;
  });

  return (
    <div className="min-h-screen transition-all duration-300 flex flex-col" style={themeStyles} dir="rtl">
      {/* Dynamic CSS Variables Injection */}
      <style>{`
        body { font-family: ${currentTheme.fontFamily}; }
      `}</style>

      {/* WhatsApp float */}
      <a 
        href={`https://wa.me/${branding.whatsapp}`} 
        target="_blank" 
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-emerald-600 hover:bg-emerald-500 text-white p-4 rounded-full shadow-2xl transition-all hover:scale-110 flex items-center justify-center animate-bounce"
        title="تواصل معنا"
      >
        <Send size={24} className="rotate-45" />
      </a>

      {/* Header */}
      <header 
        className="sticky top-0 z-40 border-b shadow-sm transition-colors duration-300"
        style={{ backgroundColor: currentTheme.surfaceColor, borderColor: currentTheme.borderColor }}
      >
        <div className="container mx-auto px-4 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button 
              onClick={() => { setActiveTab('home'); setSelectedArticle(null); }}
              className="flex items-center gap-2 text-2xl font-bold"
              style={{ color: currentTheme.primaryColor }}
            >
              <span className="text-3xl">{branding.logo}</span>
              <span>{branding.siteName}</span>
            </button>

            <nav className="hidden lg:flex items-center gap-4 text-sm font-bold">
              {categories.map(cat => (
                <button 
                  key={cat} 
                  onClick={() => { setActiveCategory(cat); setActiveTab('category'); }}
                  className={`hover:opacity-80 px-2 py-1 transition-all ${activeTab === 'category' && activeCategory === cat ? 'border-b-2 font-black' : ''}`}
                  style={{ borderBottomColor: activeTab === 'category' && activeCategory === cat ? currentTheme.primaryColor : 'transparent' }}
                >
                  {cat}
                </button>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setActiveTab('search')} 
              className="hover:opacity-80"
              style={{ color: currentTheme.textSecondary }}
            >
              <Search size={20} />
            </button>

            <button 
              onClick={() => setIsDarkMode(!isDarkMode)} 
              className="p-2 rounded-lg transition-all hover:bg-slate-200 dark:hover:bg-slate-800"
            >
              {isDarkMode ? <Sun className="text-amber-400" size={20} /> : <Moon className="text-indigo-900" size={20} />}
            </button>

            <button 
              onClick={() => {
                // Secret Admin Door
                const pass = prompt('الرجاء إدخال كلمة مرور الحماية (SuperAdmin):');
                if (pass === 'admin@1234') {
                  addAuditLog('تسجيل دخول ناجح', 'SuperAdmin', 'تم الدخول إلى لوحة التحكم بنجاح.');
                  setUserRole('admin');
                } else if (pass !== null) {
                  alert('الرقم السري خاطئ! تم تسجيل محاولة الدخول لأسباب أمنية.');
                  addAuditLog('محاولة دخول فاشلة', 'Guest', 'تم رصد محاولة دخول خاطئة للمنصة.');
                }
              }}
              className="text-xs bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 px-3 py-1.5 rounded-lg font-bold"
            >
              التحكم
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 container mx-auto px-4 lg:px-8 py-6">
        
        {/* News Ticker */}
        {activeTab === 'home' && breakingNews.length > 0 && (
          <div 
            className="mb-6 rounded-xl border p-3 flex items-center overflow-hidden gap-4 shadow-sm"
            style={{ backgroundColor: currentTheme.surfaceColor, borderColor: currentTheme.borderColor }}
          >
            <span className="bg-rose-600 font-bold px-3 py-1 rounded text-white text-xs animate-pulse flex items-center gap-1 shrink-0">
              🚨 عاجل
            </span>
            <div className="flex-1 overflow-hidden relative h-6">
              <div className="absolute right-0 top-0 whitespace-nowrap animate-marquee flex items-center gap-8 font-bold text-sm">
                {breakingNews.map(a => (
                  <button key={a.id} onClick={() => handleOpenArticle(a)} className="hover:underline">
                    {a.title}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'home' && (
          <div className="space-y-12">
            {homepageBlocks.filter(b => b.enabled).sort((a, b) => a.order - b.order).map(block => {
              if (block.type === 'hero') {
                const featured = articles.find(a => a.priority === 'breaking' || a.priority === 'featured') || articles[0];
                if (!featured) return null;
                return (
                  <section 
                    key={block.id} 
                    onClick={() => handleOpenArticle(featured)}
                    className="relative rounded-3xl overflow-hidden cursor-pointer group shadow-xl h-[450px]"
                  >
                    <img 
                      src={featured.featuredImage || 'https://images.unsplash.com/photo-1585829365294-06d3b038e35d'} 
                      alt={featured.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700 brightness-[0.35]"
                    />
                    <div className="absolute inset-0 p-6 lg:p-12 flex flex-col justify-end text-white">
                      <span 
                        className="font-bold text-sm px-3 py-1 rounded-full w-max mb-4 shadow-sm"
                        style={{ backgroundColor: currentTheme.primaryColor }}
                      >
                        {featured.category}
                      </span>
                      <h2 className="text-3xl lg:text-5xl font-extrabold mb-4 leading-tight">{featured.title}</h2>
                      <p className="text-slate-300 text-base lg:text-lg max-w-3xl line-clamp-2">{featured.excerpt}</p>
                    </div>
                  </section>
                );
              }

              if (block.type === 'trending') {
                const trendingArticles = [...articles].sort((a, b) => b.views - a.views).slice(0, 3);
                return (
                  <section key={block.id} className="space-y-4">
                    <h3 className="text-xl font-bold flex items-center gap-2">
                      <span className="w-2 h-6 rounded" style={{ backgroundColor: currentTheme.primaryColor }}></span>
                      {block.title}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {trendingArticles.map((art, index) => (
                        <div 
                          key={art.id}
                          onClick={() => handleOpenArticle(art)}
                          className="p-6 rounded-2xl border hover:shadow-md transition-all cursor-pointer relative flex flex-col justify-between"
                          style={{ backgroundColor: currentTheme.surfaceColor, borderColor: currentTheme.borderColor }}
                        >
                          <span className="absolute -top-4 right-4 text-5xl font-black opacity-10" style={{ color: currentTheme.primaryColor }}>
                            {index + 1}
                          </span>
                          <div>
                            <span className="text-xs font-bold text-indigo-400 mb-2 block">{art.category}</span>
                            <h4 className="font-bold text-lg mb-2 line-clamp-2">{art.title}</h4>
                          </div>
                          <div className="flex items-center gap-3 mt-4 text-xs text-slate-400">
                            <span className="flex items-center gap-1"><Eye size={12} /> {art.views}</span>
                            <span className="flex items-center gap-1"><Heart size={12} /> {art.likes}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                );
              }

              if (block.type === 'latest') {
                return (
                  <section key={block.id} className="space-y-4">
                    <h3 className="text-xl font-bold flex items-center gap-2">
                      <span className="w-2 h-6 rounded" style={{ backgroundColor: currentTheme.primaryColor }}></span>
                      {block.title}
                    </h3>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {articles.map(art => (
                        <div 
                          key={art.id}
                          onClick={() => handleOpenArticle(art)}
                          className="flex flex-col md:flex-row gap-4 p-4 rounded-2xl border hover:shadow-md transition-all cursor-pointer items-center"
                          style={{ backgroundColor: currentTheme.surfaceColor, borderColor: currentTheme.borderColor }}
                        >
                          <img 
                            src={art.featuredImage || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c'} 
                            alt={art.title} 
                            className="w-full md:w-48 h-32 object-cover rounded-xl shrink-0"
                          />
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full" style={{ backgroundColor: currentTheme.primaryColor + '20', color: currentTheme.primaryColor }}>
                                {art.category}
                              </span>
                              {art.isPremium && <span className="bg-amber-500 text-black text-2xs font-bold px-2 py-0.5 rounded flex items-center gap-1"><Award size={10} /> خاص</span>}
                            </div>
                            <h4 className="font-bold text-lg leading-snug">{art.title}</h4>
                            <p className="text-xs text-slate-400 line-clamp-2 font-[Tajawal]">{art.excerpt}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                );
              }
              return null;
            })}
          </div>
        )}

        {/* Search View / Category View */}
        {(activeTab === 'category' || activeTab === 'search') && (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold flex items-center gap-2">
              <span className="w-2 h-6 rounded" style={{ backgroundColor: currentTheme.primaryColor }}></span>
              {activeTab === 'category' ? `تصنيف: ${activeCategory}` : `نتائج البحث عن: ${searchQuery}`}
            </h3>

            {activeTab === 'search' && (
              <input 
                type="text" 
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="ابحث بكلمة دلالية هنا..."
                className="w-full max-w-md bg-slate-100 dark:bg-slate-800 p-3 rounded-xl border border-slate-300 dark:border-slate-700 outline-none"
              />
            )}

            {filteredArticles.length === 0 ? (
              <p className="text-slate-400">لا توجد مقالات لعرضها هنا حالياً.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {filteredArticles.map(art => (
                  <div 
                    key={art.id}
                    onClick={() => handleOpenArticle(art)}
                    className="rounded-2xl border overflow-hidden hover:shadow-md transition-all cursor-pointer flex flex-col"
                    style={{ backgroundColor: currentTheme.surfaceColor, borderColor: currentTheme.borderColor }}
                  >
                    <img src={art.featuredImage} alt={art.title} className="w-full h-48 object-cover" />
                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <span className="text-xs font-bold text-indigo-400">{art.category}</span>
                        <h4 className="font-bold text-base mt-2 mb-2 line-clamp-2">{art.title}</h4>
                        <p className="text-slate-400 text-xs line-clamp-2 font-[Tajawal]">{art.excerpt}</p>
                      </div>
                      <div className="flex items-center justify-between text-xs text-slate-400 mt-4 border-t pt-2" style={{ borderColor: currentTheme.borderColor }}>
                        <span>بواسطة {art.author.name}</span>
                        <button onClick={(e) => handleLike(e, art.id)} className="flex items-center gap-1 hover:text-rose-400">
                          <Heart size={14} /> {art.likes}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Single Article Reader */}
        {activeTab === 'article' && selectedArticle && (
          <article className="max-w-4xl mx-auto space-y-6 animate-fade-in font-[Tajawal]">
            <button 
              onClick={() => setActiveTab('home')} 
              className="flex items-center gap-2 text-indigo-400 hover:underline mb-4 font-[Cairo] font-bold"
            >
              <ArrowLeft size={16} /> العودة للرئيسية
            </button>

            <span className="text-xs font-bold px-3 py-1 rounded-full text-white" style={{ backgroundColor: currentTheme.primaryColor }}>
              {selectedArticle.category}
            </span>
            <h1 className="text-2xl lg:text-4xl font-extrabold leading-tight" style={{ fontFamily: 'Cairo' }}>{selectedArticle.title}</h1>
            <h2 className="text-lg text-slate-400">{selectedArticle.subtitle}</h2>

            <div className="flex items-center justify-between text-sm py-4 border-y border-dashed" style={{ borderColor: currentTheme.borderColor }}>
              <div className="flex items-center gap-3">
                <span className="text-2xl">{selectedArticle.author.avatar}</span>
                <div>
                  <h4 className="font-bold">{selectedArticle.author.name}</h4>
                  <span className="text-xs text-slate-400">{selectedArticle.author.bio}</span>
                </div>
              </div>
              <div className="flex items-center gap-4 text-slate-400 text-xs">
                <span>تاريخ النشر: {new Date(selectedArticle.publishDate).toLocaleDateString('ar-EG')}</span>
                <span className="flex items-center gap-1"><Eye size={14} /> {selectedArticle.views}</span>
              </div>
            </div>

            <img 
              src={selectedArticle.featuredImage || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c'} 
              alt={selectedArticle.title} 
              className="w-full rounded-2xl max-h-[400px] object-cover shadow-md" 
            />

            <div className="text-lg leading-relaxed space-y-4 whitespace-pre-line text-slate-700 dark:text-slate-300">
              {selectedArticle.body}
            </div>

            {/* Engagement buttons */}
            <div className="flex items-center gap-4 py-4 border-y" style={{ borderColor: currentTheme.borderColor }}>
              <button 
                onClick={(e) => handleLike(e, selectedArticle.id)}
                className="flex items-center gap-2 px-4 py-2 bg-rose-50 dark:bg-rose-950/20 text-rose-500 rounded-xl hover:bg-rose-100 font-bold"
              >
                <Heart size={18} /> {selectedArticle.likes} إعجاب
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-400 rounded-xl hover:text-slate-200">
                <Bookmark size={18} /> حفظ
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-400 rounded-xl hover:text-slate-200">
                <Share2 size={18} /> مشاركة
              </button>
            </div>

            {/* Comments Section */}
            <div className="space-y-4 pt-6 font-[Cairo]">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <MessageCircle size={20} /> التعليقات ({selectedArticle.comments.length})
              </h3>

              <form onSubmit={handleAddComment} className="bg-slate-100 dark:bg-slate-800/50 border border-slate-300 dark:border-slate-700 p-4 rounded-2xl space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <input 
                    type="text" 
                    required
                    value={newComment.name}
                    onChange={e => setNewComment({...newComment, name: e.target.value})}
                    placeholder="الاسم المستعار"
                    className="p-2.5 rounded-lg bg-white dark:bg-slate-900 border outline-none"
                  />
                </div>
                <textarea 
                  rows={3}
                  required
                  value={newComment.body}
                  onChange={e => setNewComment({...newComment, body: e.target.value})}
                  placeholder="اكتب تعليقك هنا..."
                  className="w-full p-2.5 rounded-lg bg-white dark:bg-slate-900 border outline-none font-[Tajawal]"
                ></textarea>
                <button type="submit" className="px-4 py-2 text-white font-bold rounded-lg" style={{ backgroundColor: currentTheme.primaryColor }}>
                  نشر التعليق
                </button>
              </form>

              <div className="space-y-3">
                {selectedArticle.comments.map((comment: any) => (
                  <div key={comment.id} className="p-4 rounded-xl border" style={{ backgroundColor: currentTheme.surfaceColor, borderColor: currentTheme.borderColor }}>
                    <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                      <span className="font-bold text-indigo-400">{comment.authorName}</span>
                      <span>{new Date(comment.date).toLocaleDateString('ar-EG')}</span>
                    </div>
                    <p className="text-sm font-[Tajawal]">{comment.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </article>
        )}
      </main>

      {/* Footer */}
      <footer 
        className="mt-12 py-8 border-t transition-colors duration-300 font-[Cairo]"
        style={{ backgroundColor: currentTheme.surfaceColor, borderColor: currentTheme.borderColor }}
      >
        <div className="container mx-auto px-4 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h4 className="text-xl font-bold mb-2">{branding.siteName}</h4>
            <p className="text-sm text-slate-400">{branding.siteSubtitle}</p>
            <p className="text-xs text-slate-400 mt-4">{branding.copyrightText}</p>
          </div>

          <div>
            <h5 className="font-bold mb-4">اشترك في النشرة البريدية</h5>
            <form 
              onSubmit={(e) => { e.preventDefault(); alert('تم اشتراكك بنجاح!'); setNewsletterEmail(''); }}
              className="flex gap-2"
            >
              <input 
                type="email" 
                required
                value={newsletterEmail}
                onChange={e => setNewsletterEmail(e.target.value)}
                placeholder="بريدك الإلكتروني"
                className="w-full p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 border outline-none text-sm"
              />
              <button type="submit" className="px-4 text-white font-bold rounded-lg text-sm" style={{ backgroundColor: currentTheme.primaryColor }}>
                اشترك
              </button>
            </form>
          </div>

          <div className="flex flex-col md:items-end">
            <h5 className="font-bold mb-2">تواصل معنا</h5>
            <span className="text-sm text-slate-400">{branding.contactEmail}</span>
            <span className="text-sm text-slate-400 mt-1" dir="ltr">{branding.contactPhone}</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
