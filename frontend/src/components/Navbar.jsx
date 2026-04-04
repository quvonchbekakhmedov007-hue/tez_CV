import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'
import { useState } from 'react'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogout = async () => {
    await logout()
    toast.success("Muvaffaqiyatli chiqdingiz!")
    navigate('/')
  }

  const isActive = (path) => location.pathname === path

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">TC</span>
            </div>
            <span className="font-bold text-xl text-gray-900">TezCV<span className="text-blue-600">.uz</span></span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className={`text-sm font-medium transition-colors ${isActive('/dashboard') ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'}`}
                >
                  Dashboard
                </Link>
                <Link
                  to="/cv/new"
                  className="btn-primary text-sm"
                >
                  + Yangi CV
                </Link>
                <div className="relative">
                  <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900"
                  >
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-semibold text-xs">
                      {user.first_name?.[0] || user.email?.[0] || 'U'}
                    </div>
                    <span className="hidden lg:block max-w-24 truncate">{user.first_name || user.email}</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {menuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1">
                      <Link to="/profile" onClick={() => setMenuOpen(false)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                        Profil
                      </Link>
                      <hr className="my-1" />
                      <button onClick={() => { handleLogout(); setMenuOpen(false) }}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                        Chiqish
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link to="/login"
                  className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
                  Kirish
                </Link>
                <Link to="/register" className="btn-primary text-sm">
                  Ro'yxatdan o'tish
                </Link>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-gray-100 py-3 space-y-1">
            {user ? (
              <>
                <Link to="/dashboard" onClick={() => setMenuOpen(false)}
                  className="block px-3 py-2 text-sm text-gray-700 rounded-lg hover:bg-gray-50">Dashboard</Link>
                <Link to="/cv/new" onClick={() => setMenuOpen(false)}
                  className="block px-3 py-2 text-sm text-blue-600 font-medium rounded-lg hover:bg-blue-50">+ Yangi CV</Link>
                <Link to="/profile" onClick={() => setMenuOpen(false)}
                  className="block px-3 py-2 text-sm text-gray-700 rounded-lg hover:bg-gray-50">Profil</Link>
                <button onClick={() => { handleLogout(); setMenuOpen(false) }}
                  className="block w-full text-left px-3 py-2 text-sm text-red-600 rounded-lg hover:bg-red-50">Chiqish</button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setMenuOpen(false)}
                  className="block px-3 py-2 text-sm text-gray-700 rounded-lg hover:bg-gray-50">Kirish</Link>
                <Link to="/register" onClick={() => setMenuOpen(false)}
                  className="block px-3 py-2 text-sm text-blue-600 font-medium rounded-lg hover:bg-blue-50">Ro'yxatdan o'tish</Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}
