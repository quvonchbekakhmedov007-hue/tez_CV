import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { authAPI } from '../services/api'
import toast from 'react-hot-toast'

export default function ProfilePage() {
  const { user, updateUser } = useAuth()
  const [form, setForm] = useState({
    first_name: user?.first_name || '',
    last_name: user?.last_name || '',
    phone: user?.phone || '+998',
  })
  const [passForm, setPassForm] = useState({ old_password: '', new_password: '', confirm: '' })
  const [saving, setSaving] = useState(false)
  const [savingPass, setSavingPass] = useState(false)

  const handlePhoneChange = (value) => {
    if (!value.startsWith('+998')) {
      const digits = value.replace(/\D/g, '').slice(3)
      setForm(p => ({ ...p, phone: '+998' + digits.slice(0, 9) }))
      return
    }
    const digits = value.slice(4).replace(/\D/g, '').slice(0, 9)
    setForm(p => ({ ...p, phone: '+998' + digits }))
  }

  const handleSave = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      const res = await authAPI.updateProfile(form)
      updateUser(res.data)
      toast.success("Profil yangilandi!")
    } catch {
      toast.error("Saqlashda xatolik")
    } finally {
      setSaving(false)
    }
  }

  const handleChangePass = async (e) => {
    e.preventDefault()
    if (passForm.new_password !== passForm.confirm) {
      toast.error("Yangi parollar mos kelmadi")
      return
    }
    if (passForm.new_password.length < 8) {
      toast.error("Parol kamida 8 ta belgidan iborat bo'lishi kerak")
      return
    }
    setSavingPass(true)
    try {
      await authAPI.changePassword({ old_password: passForm.old_password, new_password: passForm.new_password })
      toast.success("Parol o'zgartirildi!")
      setPassForm({ old_password: '', new_password: '', confirm: '' })
    } catch (err) {
      toast.error(err.response?.data?.error || "Parol o'zgartirishda xatolik")
    } finally {
      setSavingPass(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Profil sozlamalari</h1>

      {/* User info card */}
      <div className="card mb-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
            {user?.first_name?.[0] || user?.email?.[0] || 'U'}
          </div>
          <div>
            <div className="font-semibold text-gray-900 text-lg">
              {user?.first_name} {user?.last_name}
            </div>
            <div className="text-gray-500 text-sm">{user?.email}</div>
            <div className="text-xs text-gray-400 mt-0.5">
              A'zo bo'lgan: {user?.created_at ? new Date(user.created_at).toLocaleDateString('uz-UZ') : '—'}
            </div>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Ism</label>
              <input value={form.first_name} onChange={e => setForm(p => ({ ...p, first_name: e.target.value }))}
                className="input-field" placeholder="Ali" />
            </div>
            <div>
              <label className="label">Familiya</label>
              <input value={form.last_name} onChange={e => setForm(p => ({ ...p, last_name: e.target.value }))}
                className="input-field" placeholder="Valiyev" />
            </div>
          </div>

          <div>
            <label className="label">Email</label>
            <input value={user?.email || ''} disabled className="input-field bg-gray-50 text-gray-500 cursor-not-allowed" />
            <p className="text-xs text-gray-400 mt-1">Email o'zgartirilmaydi</p>
          </div>

          <div>
            <label className="label">Telefon raqam</label>
            <input
              type="tel"
              value={form.phone}
              onChange={e => handlePhoneChange(e.target.value)}
              className="input-field"
              placeholder="+998901234567"
              maxLength={13}
            />
          </div>

          <button type="submit" disabled={saving} className="btn-primary">
            {saving ? 'Saqlanmoqda...' : 'Saqlash'}
          </button>
        </form>
      </div>

      {/* Change password */}
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Parolni o'zgartirish</h2>
        <form onSubmit={handleChangePass} className="space-y-4">
          <div>
            <label className="label">Eski parol</label>
            <input type="password" value={passForm.old_password}
              onChange={e => setPassForm(p => ({ ...p, old_password: e.target.value }))}
              className="input-field" placeholder="Joriy parol" />
          </div>
          <div>
            <label className="label">Yangi parol</label>
            <input type="password" value={passForm.new_password}
              onChange={e => setPassForm(p => ({ ...p, new_password: e.target.value }))}
              className="input-field" placeholder="Kamida 8 ta belgi" />
          </div>
          <div>
            <label className="label">Yangi parolni tasdiqlang</label>
            <input type="password" value={passForm.confirm}
              onChange={e => setPassForm(p => ({ ...p, confirm: e.target.value }))}
              className={`input-field ${passForm.confirm && passForm.new_password !== passForm.confirm ? 'border-red-400' : ''}`}
              placeholder="Parolni qayta kiriting" />
          </div>
          <button type="submit" disabled={savingPass} className="btn-primary">
            {savingPass ? "O'zgartirilmoqda..." : "Parolni o'zgartirish"}
          </button>
        </form>
      </div>
    </div>
  )
}
