import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'

export default function RegisterPage() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({
    first_name: '', last_name: '', username: '',
    email: '', phone: '+998', password: '', password2: ''
  })
  const [loading, setLoading] = useState(false)
  const [showPass, setShowPass] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name === 'phone') {
      // Auto-prefix +998 and allow only digits after
      let val = value
      if (!val.startsWith('+998')) {
        val = '+998' + val.replace(/\D/g, '').slice(3)
      }
      // Allow +998 followed by up to 9 digits
      const digits = val.slice(4).replace(/\D/g, '').slice(0, 9)
      setForm(p => ({ ...p, phone: '+998' + digits }))
      return
    }
    setForm(p => ({ ...p, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (form.password !== form.password2) {
      toast.error('Parollar mos kelmadi')
      return
    }
    if (form.password.length < 8) {
      toast.error("Parol kamida 8 ta belgidan iborat bo'lishi kerak")
      return
    }
    if (!form.username) {
      setForm(p => ({ ...p, username: form.email.split('@')[0] }))
    }
    setLoading(true)
    try {
      await register({ ...form, username: form.username || form.email.split('@')[0] })
      toast.success("Ro'yxatdan muvaffaqiyatli o'tdingiz!")
      navigate('/dashboard')
    } catch (err) {
      const errors = err.response?.data
      if (errors) {
        const msg = Object.values(errors).flat().join(', ')
        toast.error(msg)
      } else {
        toast.error("Xatolik yuz berdi")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="w-full max-w-lg">
        <div className="card shadow-lg">
          <div className="text-center mb-6">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold">TC</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Ro'yxatdan o'tish</h1>
            <p className="text-gray-500 text-sm mt-1">Bepul hisob oching</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="label">Ism <span className="text-red-500">*</span></label>
                <input name="first_name" value={form.first_name} onChange={handleChange}
                  className="input-field" placeholder="Ali" required />
              </div>
              <div>
                <label className="label">Familiya <span className="text-red-500">*</span></label>
                <input name="last_name" value={form.last_name} onChange={handleChange}
                  className="input-field" placeholder="Valiyev" required />
              </div>
            </div>

            <div>
              <label className="label">Email <span className="text-red-500">*</span></label>
              <input type="email" name="email" value={form.email} onChange={handleChange}
                className="input-field" placeholder="ali@example.com" required />
            </div>

            <div>
              <label className="label">Telefon raqam</label>
              <input type="tel" name="phone" value={form.phone} onChange={handleChange}
                className="input-field" placeholder="+998901234567"
                maxLength={13} />
              <p className="text-xs text-gray-400 mt-1">Format: +998XXXXXXXXX</p>
            </div>

            <div>
              <label className="label">Parol <span className="text-red-500">*</span></label>
              <div className="relative">
                <input type={showPass ? 'text' : 'password'} name="password"
                  value={form.password} onChange={handleChange}
                  className="input-field pr-10" placeholder="Kamida 8 ta belgi" required />
                <button type="button" onClick={() => setShowPass(p => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPass ? '🙈' : '👁'}
                </button>
              </div>
            </div>

            <div>
              <label className="label">Parolni tasdiqlang <span className="text-red-500">*</span></label>
              <input type="password" name="password2" value={form.password2} onChange={handleChange}
                className={`input-field ${form.password2 && form.password !== form.password2 ? 'border-red-400' : ''}`}
                placeholder="Parolni qayta kiriting" required />
              {form.password2 && form.password !== form.password2 && (
                <p className="text-xs text-red-500 mt-1">Parollar mos kelmadi</p>
              )}
            </div>

            <button type="submit" disabled={loading}
              className="btn-primary w-full py-3 text-base mt-2">
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                  </svg>
                  Ro'yxatdan o'tilmoqda...
                </span>
              ) : "Ro'yxatdan o'tish"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Hisobingiz bormi?{' '}
            <Link to="/login" className="text-blue-600 hover:underline font-medium">Kirish</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
