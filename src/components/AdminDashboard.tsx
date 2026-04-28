import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { 
  LayoutDashboard, FileText, Settings, ShieldAlert, Palette, 
  Grid, LogOut, CheckCircle, AlertTriangle, Key
} from 'lucide-react';
import { CATEGORIES } from '../data/initialData';

export const AdminDashboard: React.FC = () => {
  const { 
    branding, setBranding,
    themePreset, setThemePreset,
    articles, setArticles,
    homepageBlocks, setHomepageBlocks,
    auditLogs, addAuditLog,
    setUserRole 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'stats' | 'cms' | 'theme' | 'blocks' | 'security'>('stats');
  const [editingArticle, setEditingArticle] = useState<any>(null);

  // Stats dummy data
  const trafficData = [
    { name: 'السبت', views: 2400 },
    { name: 'الأحد', views: 1398 },
    { name: 'الإثنين', views: 9800 },
    { name: 'الثلاثاء', views: 3908 },
    { name: 'الأربعاء', views: 4800 },
    { name: 'الخميس', views: 12000 },
    { name: 'الجمعة', views: 8000 },
  ];

  const handleSaveBranding = (e: React.FormEvent) => {
    e.preventDefault();
    addAuditLog('تحديث الهوية', 'SuperAdmin', 'تم تحديث الاسم والبيانات الأساسية للموقع.');
    alert('تم حفظ الإعدادات بنجاح!');
  };

  const handleUpdateBlockStatus = (id: string, status: boolean) => {
    setHomepageBlocks(prev => prev.map(b => b.id === id ? { ...b, enabled: status } : b));
    addAuditLog('تعديل الواجهة', 'SuperAdmin', `تم ${status ? 'تفعيل' : 'إلغاء'} كتلة الواجهة الرئيسية.`);
  };

  const handleMoveBlock = (index: number, direction: 'up' | 'down') => {
    const updated = [...homepageBlocks];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex >= 0 && targetIndex < updated.length) {
      const temp = updated[index];
      updated[index] = updated[targetIndex];
      updated[targetIndex] = temp;
      setHomepageBlocks(updated);
    }
  };

  const handleDeleteArticle = (id: string) => {
    if(confirm('هل أنت متأكد من حذف هذا المقال؟')) {
      setArticles(prev => prev.filter(a => a.id !== id));
      addAuditLog('حذف مقال', 'SuperAdmin', `تم إزالة المقال صاحب المعرف ${id}`);
    }
  };

  const handleSaveArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingArticle.id) {
      setArticles(prev => prev.map(a => a.id === editingArticle.id ? editingArticle : a));
      addAuditLog('تحديث مقال', 'SuperAdmin', `تعديل المقال: ${editingArticle.title}`);
    } else {
      const newArt = {
        ...editingArticle,
        id: Math.random().toString(),
        publishDate: new Date().toISOString(),
        views: 0,
        likes: 0,
        comments: []
      };
      setArticles(prev => [newArt, ...prev]);
      addAuditLog('إنشاء مقال جديد', 'SuperAdmin', `تم نشر المقال: ${newArt.title}`);
    }
    setEditingArticle(null);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex font-[Cairo]" dir="rtl">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-950 border-l border-slate-800 flex flex-col">
        <div className="p-6 border-b border-slate-800 flex items-center gap-3">
          <span className="text-3xl">{branding.logo}</span>
          <div>
            <h1 className="text-lg font-bold">{branding.siteName}</h1>
            <span className="text-xs text-emerald-400 flex items-center gap-1">
              <CheckCircle size={12} /> لوحة التحكم
            </span>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <button 
            onClick={() => setActiveTab('stats')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'stats' ? 'bg-indigo-600 text-white font-bold shadow-lg shadow-indigo-900/50' : 'hover:bg-slate-800 text-slate-400 hover:text-slate-100'}`}
          >
            <LayoutDashboard size={18} /> الإحصائيات العامة
          </button>
          
          <button 
            onClick={() => setActiveTab('cms')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'cms' ? 'bg-indigo-600 text-white font-bold shadow-lg shadow-indigo-900/50' : 'hover:bg-slate-800 text-slate-400 hover:text-slate-100'}`}
          >
            <FileText size={18} /> إدارة المقالات
          </button>

          <button 
            onClick={() => setActiveTab('blocks')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'blocks' ? 'bg-indigo-600 text-white font-bold shadow-lg shadow-indigo-900/50' : 'hover:bg-slate-800 text-slate-400 hover:text-slate-100'}`}
          >
            <Grid size={18} /> بناء الصفحة الرئيسية
          </button>

          <button 
            onClick={() => setActiveTab('theme')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'theme' ? 'bg-indigo-600 text-white font-bold shadow-lg shadow-indigo-900/50' : 'hover:bg-slate-800 text-slate-400 hover:text-slate-100'}`}
          >
            <Palette size={18} /> تخصيص المظهر والهوية
          </button>

          <button 
            onClick={() => setActiveTab('security')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'security' ? 'bg-indigo-600 text-white font-bold shadow-lg shadow-indigo-900/50' : 'hover:bg-slate-800 text-slate-400 hover:text-slate-100'}`}
          >
            <ShieldAlert size={18} /> سجل الأمان والمراقبة
          </button>
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button 
            onClick={() => {
              addAuditLog('تسجيل خروج', 'SuperAdmin', 'تم تسجيل الخروج من لوحة التحكم.');
              setUserRole('guest');
            }}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-rose-900 hover:text-rose-100 border border-slate-700 transition-colors"
          >
            <LogOut size={16} /> تسجيل الخروج
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-8 bg-slate-900">
        {activeTab === 'stats' && (
          <div className="space-y-8 animate-fade-in">
            <h2 className="text-2xl font-bold">ملخص الإحصائيات</h2>
            
            {/* Grid metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-2xl">
                <span className="text-slate-400 text-sm">إجمالي المشاهدات</span>
                <p className="text-3xl font-bold mt-2 text-indigo-400">١٩,٣٠٨</p>
              </div>
              <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-2xl">
                <span className="text-slate-400 text-sm">المقالات المنشورة</span>
                <p className="text-3xl font-bold mt-2 text-emerald-400">{articles.length}</p>
              </div>
              <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-2xl">
                <span className="text-slate-400 text-sm">المشتركون بالبريد</span>
                <p className="text-3xl font-bold mt-2 text-sky-400">١,٤٢٠</p>
              </div>
              <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-2xl flex items-center justify-between">
                <div>
                  <span className="text-slate-400 text-sm">حالة السيرفر</span>
                  <p className="text-lg font-bold mt-2 text-emerald-400 flex items-center gap-1">
                    <CheckCircle size={14} /> مستقر
                  </p>
                </div>
                <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></div>
              </div>
            </div>

            {/* Charts */}
            <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-2xl">
              <h3 className="text-lg font-bold mb-4">نشاط الموقع خلال الأسبوع الأخير</h3>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={trafficData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="name" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" />
                    <Tooltip cursor={{ fill: 'rgba(255,255,255,0.05)' }} />
                    <Bar dataKey="views" fill="#6366f1" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'cms' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">إدارة المحتوى</h2>
              <button 
                onClick={() => setEditingArticle({ title: '', subtitle: '', body: '', excerpt: '', category: 'تكنولوجيا', tags: [], priority: 'normal', isPremium: false, author: { name: 'المحرر', avatar: '✍️', bio: '' }, featuredImage: '', status: 'draft', slug: '' })}
                className="bg-emerald-600 hover:bg-emerald-500 font-bold px-4 py-2 rounded-xl text-white transition-colors flex items-center gap-2"
              >
                + إنشاء مقال جديد
              </button>
            </div>

            {/* Article editor modal placeholder */}
            {editingArticle && (
              <div className="bg-slate-800 border border-slate-700 p-6 rounded-2xl space-y-4">
                <h3 className="text-xl font-bold text-indigo-400">{editingArticle.id ? 'تعديل المقال' : 'مقال جديد'}</h3>
                <form onSubmit={handleSaveArticle} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-slate-400 mb-1">العنوان الرئيسي</label>
                    <input 
                      type="text" 
                      required
                      value={editingArticle.title}
                      onChange={e => setEditingArticle({...editingArticle, title: e.target.value})}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 focus:border-indigo-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-slate-400 mb-1">الرابط الدائم (Slug)</label>
                    <input 
                      type="text" 
                      required
                      value={editingArticle.slug}
                      onChange={e => setEditingArticle({...editingArticle, slug: e.target.value})}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 focus:border-indigo-500 outline-none"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm text-slate-400 mb-1">العنوان الفرعي</label>
                    <input 
                      type="text" 
                      value={editingArticle.subtitle}
                      onChange={e => setEditingArticle({...editingArticle, subtitle: e.target.value})}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 focus:border-indigo-500 outline-none"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm text-slate-400 mb-1">محتوى المقال</label>
                    <textarea 
                      rows={6}
                      required
                      value={editingArticle.body}
                      onChange={e => setEditingArticle({...editingArticle, body: e.target.value})}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 focus:border-indigo-500 outline-none font-[Tajawal]"
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-sm text-slate-400 mb-1">التصنيف</label>
                    <select 
                      value={editingArticle.category}
                      onChange={e => setEditingArticle({...editingArticle, category: e.target.value})}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 focus:border-indigo-500 outline-none"
                    >
                      {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-slate-400 mb-1">الأولوية</label>
                    <select 
                      value={editingArticle.priority}
                      onChange={e => setEditingArticle({...editingArticle, priority: e.target.value})}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 focus:border-indigo-500 outline-none"
                    >
                      <option value="normal">عادي</option>
                      <option value="breaking">عاجل 🚨</option>
                      <option value="featured">مميز ⭐</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-slate-400 mb-1">رابط الصورة المميزة</label>
                    <input 
                      type="text" 
                      value={editingArticle.featuredImage}
                      onChange={e => setEditingArticle({...editingArticle, featuredImage: e.target.value})}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 focus:border-indigo-500 outline-none"
                      placeholder="https://images.unsplash.com/..."
                    />
                  </div>
                  <div className="flex items-center gap-4 mt-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="checkbox"
                        checked={editingArticle.isPremium}
                        onChange={e => setEditingArticle({...editingArticle, isPremium: e.target.checked})}
                        className="rounded bg-slate-900 border-slate-700 text-indigo-600 focus:ring-indigo-500"
                      />
                      <span>محتوى مدفوع (Premium)</span>
                    </label>
                  </div>
                  <div className="md:col-span-2 flex gap-3">
                    <button type="submit" className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-6 py-2 rounded-xl">حفظ ونشر</button>
                    <button type="button" onClick={() => setEditingArticle(null)} className="bg-slate-700 hover:bg-slate-600 px-6 py-2 rounded-xl">إلغاء</button>
                  </div>
                </form>
              </div>
            )}

            {/* Articles Table */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-2xl overflow-hidden">
              <table className="w-full text-right border-collapse">
                <thead>
                  <tr className="bg-slate-800 text-slate-400 text-sm">
                    <th className="p-4">العنوان</th>
                    <th className="p-4">التصنيف</th>
                    <th className="p-4">المشاهدات</th>
                    <th className="p-4">الأولوية</th>
                    <th className="p-4">التحكم</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {articles.map(a => (
                    <tr key={a.id} className="hover:bg-slate-800/30">
                      <td className="p-4 font-bold">{a.title}</td>
                      <td className="p-4"><span className="bg-slate-700 px-2 py-1 rounded text-xs text-indigo-300">{a.category}</span></td>
                      <td className="p-4">{a.views}</td>
                      <td className="p-4">
                        {a.priority === 'breaking' && <span className="text-rose-400 font-bold text-xs flex items-center gap-1 animate-pulse">● عاجل</span>}
                        {a.priority === 'featured' && <span className="text-amber-400 font-bold text-xs flex items-center gap-1">★ مميز</span>}
                        {a.priority === 'normal' && <span className="text-slate-400 text-xs">عادي</span>}
                      </td>
                      <td className="p-4 flex gap-2">
                        <button onClick={() => setEditingArticle(a)} className="text-xs bg-indigo-900 text-indigo-200 hover:bg-indigo-800 px-3 py-1 rounded">تعديل</button>
                        <button onClick={() => handleDeleteArticle(a.id)} className="text-xs bg-rose-900 text-rose-200 hover:bg-rose-800 px-3 py-1 rounded">حذف</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'theme' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">تخصيص الهوية والمظهر</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Branding */}
              <form onSubmit={handleSaveBranding} className="bg-slate-800/50 border border-slate-700 p-6 rounded-2xl space-y-4">
                <h3 className="text-lg font-bold text-indigo-400 flex items-center gap-2"><Settings size={18} /> هوية المنصة</h3>
                <div>
                  <label className="block text-sm text-slate-400 mb-1">اسم الموقع</label>
                  <input 
                    type="text" 
                    value={branding.siteName}
                    onChange={e => setBranding({...branding, siteName: e.target.value})}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 focus:border-indigo-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-1">الشعار (أيقونة/Emoji)</label>
                  <input 
                    type="text" 
                    value={branding.logo}
                    onChange={e => setBranding({...branding, logo: e.target.value})}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 focus:border-indigo-500 outline-none text-xl"
                  />
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-1">البريد الإلكتروني للتواصل</label>
                  <input 
                    type="email" 
                    value={branding.contactEmail}
                    onChange={e => setBranding({...branding, contactEmail: e.target.value})}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 focus:border-indigo-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-1">رقم الواتساب</label>
                  <input 
                    type="text" 
                    value={branding.whatsapp}
                    onChange={e => setBranding({...branding, whatsapp: e.target.value})}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 focus:border-indigo-500 outline-none"
                  />
                </div>
                <button type="submit" className="bg-indigo-600 hover:bg-indigo-500 font-bold px-6 py-2 rounded-xl transition-colors">حفظ التغييرات</button>
              </form>

              {/* Theme presets */}
              <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-2xl space-y-4">
                <h3 className="text-lg font-bold text-indigo-400 flex items-center gap-2"><Palette size={18} /> قوالب الألوان</h3>
                <p className="text-sm text-slate-400">اختر من القوالب المصممة مسبقاً بما يلائم علامتك التجارية:</p>
                
                <div className="grid grid-cols-1 gap-3">
                  <button 
                    onClick={() => {
                      setThemePreset('classic');
                      addAuditLog('تغيير الثيم', 'SuperAdmin', 'التحويل إلى الثيم الكلاسيكي (الأحمر/الأسود)');
                    }}
                    className={`p-4 rounded-xl border flex items-center justify-between transition-all ${themePreset === 'classic' ? 'border-indigo-500 bg-indigo-950/20' : 'border-slate-700 bg-slate-900/50 hover:bg-slate-900'}`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-red-800"></span>
                      <span>الكلاسيكي (الصحف الإخبارية)</span>
                    </div>
                    {themePreset === 'classic' && <CheckCircle size={18} className="text-indigo-400" />}
                  </button>

                  <button 
                    onClick={() => {
                      setThemePreset('modern');
                      addAuditLog('تغيير الثيم', 'SuperAdmin', 'التحويل إلى الثيم المودرن (السماوي/الأزرق)');
                    }}
                    className={`p-4 rounded-xl border flex items-center justify-between transition-all ${themePreset === 'modern' ? 'border-indigo-500 bg-indigo-950/20' : 'border-slate-700 bg-slate-900/50 hover:bg-slate-900'}`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-sky-600"></span>
                      <span>العصري الحديث (أزرق خفيف)</span>
                    </div>
                    {themePreset === 'modern' && <CheckCircle size={18} className="text-indigo-400" />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'blocks' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">تنسيق الصفحة الرئيسية</h2>
            <p className="text-slate-400">تعديل ظهور وترتيب الكتل في الصفحة الرئيسية بطريقة السحب والإفلات الافتراضية:</p>

            <div className="space-y-3 max-w-xl">
              {homepageBlocks.map((block, index) => (
                <div key={block.id} className="bg-slate-800/80 border border-slate-700 p-4 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-slate-500 font-bold">#{index + 1}</span>
                    <span className="font-bold">{block.title}</span>
                    <span className="text-xs bg-slate-700 text-slate-400 px-2 py-0.5 rounded">{block.type}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      disabled={index === 0}
                      onClick={() => handleMoveBlock(index, 'up')}
                      className="p-1 rounded bg-slate-700 text-slate-200 hover:bg-indigo-600 disabled:opacity-30"
                    >
                      ▲
                    </button>
                    <button 
                      disabled={index === homepageBlocks.length - 1}
                      onClick={() => handleMoveBlock(index, 'down')}
                      className="p-1 rounded bg-slate-700 text-slate-200 hover:bg-indigo-600 disabled:opacity-30"
                    >
                      ▼
                    </button>
                    <button 
                      onClick={() => handleUpdateBlockStatus(block.id, !block.enabled)}
                      className={`px-3 py-1 rounded text-xs font-bold ${block.enabled ? 'bg-emerald-950 text-emerald-300 hover:bg-emerald-900' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}
                    >
                      {block.enabled ? 'مفعّل' : 'معطل'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'security' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold flex items-center gap-2"><ShieldAlert className="text-rose-500" /> لوحة الرقابة وسجلات الأمان</h2>
              <span className="text-xs bg-rose-950 border border-rose-800 text-rose-300 px-3 py-1 rounded-full flex items-center gap-1 animate-pulse">
                <AlertTriangle size={12} /> الحماية نشطة بنظام AES-256
              </span>
            </div>

            <div className="bg-slate-800/50 border border-slate-700 rounded-2xl overflow-hidden">
              <div className="p-4 bg-slate-800 font-bold border-b border-slate-700 flex items-center gap-2">
                <Key size={18} /> سجل الأحداث والعمليات الأخيرة
              </div>
              <div className="divide-y divide-slate-800 text-sm">
                {auditLogs.map(log => (
                  <div key={log.id} className="p-4 hover:bg-slate-800/20 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <div>
                      <span className="text-indigo-400 font-bold ml-2">[{log.action}]</span>
                      <span className="text-slate-100">{log.details}</span>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-slate-400">
                      <span>المسؤول: {log.user}</span>
                      <span>{new Date(log.timestamp).toLocaleTimeString('ar-EG')}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
