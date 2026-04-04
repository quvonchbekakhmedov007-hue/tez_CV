import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const features = [
  { icon: '⚡', title: 'Tez yarating', desc: '3-5 daqiqada professional CV tayyor' },
  { icon: '🎨', title: '3 ta shablon', desc: 'Modern, Classic, Creative dizaynlar' },
  { icon: '👁', title: 'Live preview', desc: "Real vaqtda o'zgarishlarni koring" },
  { icon: '📄', title: 'PDF yuklab oling', desc: 'Professional formatlashda PDF' },
  { icon: '💾', title: 'Saqlash', desc: "CV'laringizni saqlang va tahrirlang" },
  { icon: '🔐', title: 'Xavfsiz', desc: 'JWT autentifikatsiya bilan himoyalangan' },
]

const templates = [
  {
    id: 'modern',
    name: 'Modern',
    desc: 'Zamonaviy ko\'k dizayn — IT va texnologiya sohalari uchun ideal',
    color: 'from-blue-500 to-blue-700',
    accent: 'bg-blue-600',
  },
  {
    id: 'classic',
    name: 'Classic',
    desc: 'Klassik oq-qora dizayn — barcha sohalar uchun universal',
    color: 'from-gray-700 to-gray-900',
    accent: 'bg-gray-800',
  },
  {
    id: 'creative',
    name: 'Creative',
    desc: 'Ijodiy binafsha dizayn — dizayn va ijodiy sohalar uchun',
    color: 'from-purple-500 to-purple-700',
    accent: 'bg-purple-600',
  },
]

export default function HomePage() {
  const { user } = useAuth()

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="inline-flex items-center gap-2 bg-blue-500/30 text-blue-100 text-sm px-4 py-2 rounded-full mb-6">
            <span className="animate-pulse">●</span>
            <span>100% bepul — hoziroq boshlang</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
            Professional CV yarating<br />
            <span className="text-yellow-300">3 daqiqada</span>
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-10">
            TezCV.uz orqali zamonaviy, professional CV yarating va PDF formatda yuklab oling.
            Ish izlovchilar uchun eng qulay platforma.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to={user ? '/cv/new' : '/register'}
              className="bg-white text-blue-700 hover:bg-blue-50 font-bold px-8 py-4 rounded-xl text-lg transition-all hover:scale-105 shadow-lg"
            >
              🚀 CV yaratishni boshlash
            </Link>
            {!user && (
              <Link
                to="/login"
                className="border-2 border-white text-white hover:bg-white hover:text-blue-700 font-semibold px-8 py-4 rounded-xl text-lg transition-all"
              >
                Kirish
              </Link>
            )}
          </div>
          <p className="text-blue-200 text-sm mt-6">Ro'yxatdan o'tish bepul • Kredit karta shart emas</p>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-3">Nima uchun TezCV?</h2>
          <p className="text-center text-gray-500 mb-12">Barcha kerakli funksiyalar bir joyda</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div key={f.title} className="card hover:shadow-md transition-shadow">
                <div className="text-3xl mb-3">{f.icon}</div>
                <h3 className="font-semibold text-gray-900 text-lg mb-1">{f.title}</h3>
                <p className="text-gray-500 text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Templates preview */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-3">Shablonlar</h2>
          <p className="text-center text-gray-500 mb-12">3 xil professional dizayndan tanlang</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {templates.map((t) => (
              <div key={t.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-lg transition-all hover:-translate-y-1">
                {/* Template preview mockup */}
                <div className={`h-48 bg-gradient-to-br ${t.color} p-4 relative`}>
                  <div className="bg-white/20 rounded-lg p-3 h-full">
                    <div className="flex gap-2 mb-2">
                      <div className="w-8 h-8 bg-white/40 rounded-full"></div>
                      <div className="flex-1">
                        <div className="h-2 bg-white/60 rounded w-3/4 mb-1"></div>
                        <div className="h-1.5 bg-white/40 rounded w-1/2"></div>
                      </div>
                    </div>
                    <div className="space-y-1.5 mt-3">
                      <div className="h-1.5 bg-white/30 rounded"></div>
                      <div className="h-1.5 bg-white/30 rounded w-4/5"></div>
                      <div className="h-1.5 bg-white/30 rounded w-3/4"></div>
                      <div className="h-1.5 bg-white/20 rounded w-full mt-2"></div>
                      <div className="h-1.5 bg-white/20 rounded w-5/6"></div>
                    </div>
                  </div>
                  <div className={`absolute top-2 right-2 ${t.accent} text-white text-xs px-2 py-0.5 rounded-full font-medium`}>
                    {t.name}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-gray-900 text-lg mb-1">{t.name} Template</h3>
                  <p className="text-gray-500 text-sm mb-4">{t.desc}</p>
                  <Link
                    to={user ? '/cv/new' : '/register'}
                    className="btn-primary text-sm w-full block text-center"
                  >
                    Bu bilan boshlash
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-blue-600 text-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">Bugun professional CV yarating!</h2>
          <p className="text-blue-100 mb-8 text-lg">Minglab ish izlovchilar TezCV ishlatmoqda. Siz ham ularing qatoriga qo'shiling.</p>
          <Link
            to={user ? '/cv/new' : '/register'}
            className="bg-white text-blue-700 hover:bg-blue-50 font-bold px-10 py-4 rounded-xl text-lg inline-block transition-all hover:scale-105"
          >
            Bepul boshlash →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8 text-center text-sm">
        <p>© 2024 TezCV.uz — Barcha huquqlar himoyalangan</p>
      </footer>
    </div>
  )
}
