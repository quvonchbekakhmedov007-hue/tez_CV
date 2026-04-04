import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { cvAPI } from '../services/api'
import toast from 'react-hot-toast'
import { useAuth } from '../context/AuthContext'

const templateColors = {
  modern: 'bg-blue-100 text-blue-700 border-blue-200',
  classic: 'bg-gray-100 text-gray-700 border-gray-200',
  creative: 'bg-purple-100 text-purple-700 border-purple-200',
}
const templateNames = { modern: 'Modern', classic: 'Classic', creative: 'Creative' }

function CVCard({ cv, onDelete, onDuplicate, onDownload }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()

  return (
    <div className="card hover:shadow-md transition-all group relative">
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 truncate text-lg">{cv.title}</h3>
          <p className="text-gray-500 text-sm">{cv.first_name} {cv.last_name}</p>
          {cv.profession && <p className="text-blue-600 text-xs mt-0.5">{cv.profession}</p>}
        </div>
        <div className="relative ml-2">
          <button
            onClick={() => setMenuOpen(p => !p)}
            className="p-2 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600"
          >
            ⋯
          </button>
          {menuOpen && (
            <div className="absolute right-0 mt-1 w-44 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-10">
              <button onClick={() => { navigate(`/cv/${cv.id}/edit`); setMenuOpen(false) }}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                ✏️ Tahrirlash
              </button>
              <button onClick={() => { onDuplicate(cv.id); setMenuOpen(false) }}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                📋 Nusxa olish
              </button>
              <button onClick={() => { onDownload(cv.id, cv.first_name, cv.last_name); setMenuOpen(false) }}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                📥 PDF yuklab olish
              </button>
              <hr className="my-1" />
              <button onClick={() => { onDelete(cv.id); setMenuOpen(false) }}
                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                🗑 O'chirish
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between mt-4">
        <span className={`text-xs px-2 py-1 rounded-full border font-medium ${templateColors[cv.template] || templateColors.modern}`}>
          {templateNames[cv.template] || cv.template}
        </span>
        <span className="text-xs text-gray-400">
          {new Date(cv.updated_at).toLocaleDateString('uz-UZ')}
        </span>
      </div>

      <div className="flex gap-2 mt-4">
        <Link to={`/cv/${cv.id}/edit`}
          className="btn-primary flex-1 text-sm text-center py-2">
          Tahrirlash
        </Link>
        <button
          onClick={() => onDownload(cv.id, cv.first_name, cv.last_name)}
          className="btn-secondary text-sm px-3 py-2"
          title="PDF yuklab olish"
        >
          📥
        </button>
      </div>
    </div>
  )
}

export default function DashboardPage() {
  const { user } = useAuth()
  const [cvs, setCvs] = useState([])
  const [loading, setLoading] = useState(true)

  const loadCVs = async () => {
    try {
      const res = await cvAPI.list()
      setCvs(res.data)
    } catch {
      toast.error("CV'lar yuklanmadi")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { loadCVs() }, [])

  const handleDelete = async (id) => {
    if (!window.confirm("CV'ni o'chirishni tasdiqlaysizmi?")) return
    try {
      await cvAPI.delete(id)
      setCvs(p => p.filter(cv => cv.id !== id))
      toast.success("CV o'chirildi")
    } catch {
      toast.error("O'chirishda xatolik")
    }
  }

  const handleDuplicate = async (id) => {
    try {
      const res = await cvAPI.duplicate(id)
      toast.success('CV nusxasi yaratildi!')
      await loadCVs()
    } catch {
      toast.error('Nusxa olishda xatolik')
    }
  }

  const handleDownload = async (id, firstName, lastName) => {
    const toastId = toast.loading('PDF tayyorlanmoqda...')
    try {
      const res = await cvAPI.downloadPDF(id)
      const blob = new Blob([res.data], { type: res.headers['content-type'] || 'application/pdf' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${firstName}_${lastName}_CV.pdf`
      a.click()
      URL.revokeObjectURL(url)
      toast.success('PDF muvaffaqiyatli yuklandi!', { id: toastId })
    } catch {
      toast.error('PDF yuklab olishda xatolik', { id: toastId })
    }
  }

  if (loading) return (
    <div className="flex items-center justify-center py-32">
      <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-600 border-t-transparent"></div>
    </div>
  )

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Xush kelibsiz, {user?.first_name || 'Foydalanuvchi'}! 👋
          </h1>
          <p className="text-gray-500 text-sm mt-1">Sizning CV'laringiz</p>
        </div>
        <Link to="/cv/new" className="btn-primary">
          + Yangi CV
        </Link>
      </div>

      {cvs.length === 0 ? (
        <div className="text-center py-24">
          <div className="text-6xl mb-4">📄</div>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Hali CV yaratilmagan</h2>
          <p className="text-gray-400 mb-6">Birinchi professional CV'ingizni yarating</p>
          <Link to="/cv/new" className="btn-primary">
            🚀 Birinchi CV yaratish
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {/* New CV card */}
          <Link to="/cv/new"
            className="border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-all flex flex-col items-center justify-center py-12 text-gray-400 hover:text-blue-600 group">
            <div className="text-4xl mb-2 group-hover:scale-110 transition-transform">+</div>
            <span className="text-sm font-medium">Yangi CV</span>
          </Link>

          {cvs.map(cv => (
            <CVCard
              key={cv.id}
              cv={cv}
              onDelete={handleDelete}
              onDuplicate={handleDuplicate}
              onDownload={handleDownload}
            />
          ))}
        </div>
      )}

      {/* Stats */}
      {cvs.length > 0 && (
        <div className="mt-10 grid grid-cols-3 gap-4">
          <div className="card text-center">
            <div className="text-3xl font-bold text-blue-600">{cvs.length}</div>
            <div className="text-sm text-gray-500 mt-1">Jami CV</div>
          </div>
          <div className="card text-center">
            <div className="text-3xl font-bold text-green-600">
              {cvs.filter(c => c.template === 'modern').length}
            </div>
            <div className="text-sm text-gray-500 mt-1">Modern</div>
          </div>
          <div className="card text-center">
            <div className="text-3xl font-bold text-purple-600">
              {cvs.filter(c => c.template === 'creative').length}
            </div>
            <div className="text-sm text-gray-500 mt-1">Creative</div>
          </div>
        </div>
      )}
    </div>
  )
}
