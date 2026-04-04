import { useState, useEffect, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { cvAPI } from '../services/api'
import CVPreview from '../components/CVPreview'
import TemplateSelector from '../components/TemplateSelector'
import toast from 'react-hot-toast'

const SKILL_LEVELS = [
  { value: 1, label: "Boshlang'ich" },
  { value: 2, label: "O'rta-past" },
  { value: 3, label: "O'rta" },
  { value: 4, label: "Yuqori" },
  { value: 5, label: "Ekspert" },
]

const LANG_LEVELS = ['A1','A2','B1','B2','C1','C2','native']

function Section({ title, children, onAdd, addLabel }) {
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <div className="bg-gray-50 px-4 py-3 flex items-center justify-between border-b border-gray-200">
        <h3 className="font-semibold text-gray-800 text-sm">{title}</h3>
        {onAdd && (
          <button type="button" onClick={onAdd}
            className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
            + {addLabel || 'Qo\'shish'}
          </button>
        )}
      </div>
      <div className="p-4 space-y-3">{children}</div>
    </div>
  )
}

function ExperienceForm({ exp, index, onChange, onDelete }) {
  return (
    <div className="bg-gray-50 rounded-lg p-3 space-y-2 relative">
      <button type="button" onClick={() => onDelete(index)}
        className="absolute top-2 right-2 text-red-400 hover:text-red-600 text-xs px-2 py-1 rounded hover:bg-red-50">
        ✕
      </button>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="label text-xs">Lavozim *</label>
          <input value={exp.position || ''} onChange={e => onChange(index, 'position', e.target.value)}
            className="input-field text-xs py-1.5" placeholder="Frontend Developer" />
        </div>
        <div>
          <label className="label text-xs">Kompaniya *</label>
          <input value={exp.company || ''} onChange={e => onChange(index, 'company', e.target.value)}
            className="input-field text-xs py-1.5" placeholder="ABC Kompaniya" />
        </div>
      </div>
      <div>
        <label className="label text-xs">Joylashuv</label>
        <input value={exp.location || ''} onChange={e => onChange(index, 'location', e.target.value)}
          className="input-field text-xs py-1.5" placeholder="Toshkent, O'zbekiston" />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="label text-xs">Boshlanish</label>
          <input value={exp.start_date || ''} onChange={e => onChange(index, 'start_date', e.target.value)}
            className="input-field text-xs py-1.5" placeholder="2022-01" />
        </div>
        <div>
          <label className="label text-xs">Tugash</label>
          <input value={exp.end_date || ''} onChange={e => onChange(index, 'end_date', e.target.value)}
            className="input-field text-xs py-1.5" placeholder="2024-06" disabled={exp.is_current} />
        </div>
      </div>
      <label className="flex items-center gap-2 text-xs text-gray-600 cursor-pointer">
        <input type="checkbox" checked={exp.is_current || false}
          onChange={e => onChange(index, 'is_current', e.target.checked)}
          className="rounded" />
        Hozir ishlayapman
      </label>
      <div>
        <label className="label text-xs">Tavsif</label>
        <textarea value={exp.description || ''} onChange={e => onChange(index, 'description', e.target.value)}
          rows={2} className="input-field text-xs py-1.5 resize-none" placeholder="Asosiy vazifalar va yutuqlar..." />
      </div>
    </div>
  )
}

function EducationForm({ edu, index, onChange, onDelete }) {
  return (
    <div className="bg-gray-50 rounded-lg p-3 space-y-2 relative">
      <button type="button" onClick={() => onDelete(index)}
        className="absolute top-2 right-2 text-red-400 hover:text-red-600 text-xs px-2 py-1 rounded hover:bg-red-50">✕</button>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="label text-xs">Diplom/Daraja *</label>
          <input value={edu.degree || ''} onChange={e => onChange(index, 'degree', e.target.value)}
            className="input-field text-xs py-1.5" placeholder="Bakalavr" />
        </div>
        <div>
          <label className="label text-xs">O'quv muassasasi *</label>
          <input value={edu.institution || ''} onChange={e => onChange(index, 'institution', e.target.value)}
            className="input-field text-xs py-1.5" placeholder="Toshkent Davlat U." />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="label text-xs">Yo'nalish</label>
          <input value={edu.field || ''} onChange={e => onChange(index, 'field', e.target.value)}
            className="input-field text-xs py-1.5" placeholder="Informatika" />
        </div>
        <div>
          <label className="label text-xs">GPA</label>
          <input value={edu.gpa || ''} onChange={e => onChange(index, 'gpa', e.target.value)}
            className="input-field text-xs py-1.5" placeholder="3.8" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="label text-xs">Boshlanish</label>
          <input value={edu.start_date || ''} onChange={e => onChange(index, 'start_date', e.target.value)}
            className="input-field text-xs py-1.5" placeholder="2020-09" />
        </div>
        <div>
          <label className="label text-xs">Tugash</label>
          <input value={edu.end_date || ''} onChange={e => onChange(index, 'end_date', e.target.value)}
            className="input-field text-xs py-1.5" placeholder="2024-06" disabled={edu.is_current} />
        </div>
      </div>
      <label className="flex items-center gap-2 text-xs text-gray-600 cursor-pointer">
        <input type="checkbox" checked={edu.is_current || false}
          onChange={e => onChange(index, 'is_current', e.target.checked)} className="rounded" />
        Hozir o'qiyapman
      </label>
    </div>
  )
}

function SkillForm({ skill, index, onChange, onDelete }) {
  return (
    <div className="flex gap-2 items-center">
      <input value={skill.name || ''} onChange={e => onChange(index, 'name', e.target.value)}
        className="input-field text-xs py-1.5 flex-1" placeholder="JavaScript" />
      <select value={skill.level || 3} onChange={e => onChange(index, 'level', Number(e.target.value))}
        className="input-field text-xs py-1.5 w-28">
        {SKILL_LEVELS.map(l => <option key={l.value} value={l.value}>{l.label}</option>)}
      </select>
      <button type="button" onClick={() => onDelete(index)}
        className="text-red-400 hover:text-red-600 px-2 py-1 text-xs flex-shrink-0">✕</button>
    </div>
  )
}

function LanguageForm({ lang, index, onChange, onDelete }) {
  return (
    <div className="flex gap-2 items-center">
      <input value={lang.name || ''} onChange={e => onChange(index, 'name', e.target.value)}
        className="input-field text-xs py-1.5 flex-1" placeholder="O'zbek" />
      <select value={lang.level || 'B1'} onChange={e => onChange(index, 'level', e.target.value)}
        className="input-field text-xs py-1.5 w-24">
        {LANG_LEVELS.map(l => <option key={l} value={l}>{l === 'native' ? 'Ona tili' : l}</option>)}
      </select>
      <button type="button" onClick={() => onDelete(index)}
        className="text-red-400 hover:text-red-600 px-2 py-1 text-xs flex-shrink-0">✕</button>
    </div>
  )
}

function CertificateForm({ cert, index, onChange, onDelete }) {
  return (
    <div className="bg-gray-50 rounded-lg p-3 space-y-2 relative">
      <button type="button" onClick={() => onDelete(index)}
        className="absolute top-2 right-2 text-red-400 hover:text-red-600 text-xs px-2 py-1 rounded hover:bg-red-50">✕</button>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="label text-xs">Sertifikat nomi *</label>
          <input value={cert.name || ''} onChange={e => onChange(index, 'name', e.target.value)}
            className="input-field text-xs py-1.5" placeholder="AWS Solutions Architect" />
        </div>
        <div>
          <label className="label text-xs">Beruvchi tashkilot</label>
          <input value={cert.issuer || ''} onChange={e => onChange(index, 'issuer', e.target.value)}
            className="input-field text-xs py-1.5" placeholder="Amazon" />
        </div>
      </div>
      <div>
        <label className="label text-xs">Sana</label>
        <input value={cert.date || ''} onChange={e => onChange(index, 'date', e.target.value)}
          className="input-field text-xs py-1.5" placeholder="2024-03" />
      </div>
    </div>
  )
}

const emptyCV = {
  title: 'Mening CV',
  template: 'modern',
  first_name: '', last_name: '', profession: '',
  email: '', phone: '+998', address: '',
  website: '', linkedin: '', github: '',
  summary: '',
  experiences: [],
  educations: [],
  skills: [],
  languages: [],
  certificates: [],
}

export default function CVBuilderPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEdit = Boolean(id)

  const [cv, setCv] = useState({ ...emptyCV })
  const [loading, setLoading] = useState(isEdit)
  const [saving, setSaving] = useState(false)
  const [downloading, setDownloading] = useState(false)
  const [activeTab, setActiveTab] = useState('personal')
  const [previewVisible, setPreviewVisible] = useState(true)

  useEffect(() => {
    if (!isEdit) return
    cvAPI.get(id).then(res => {
      setCv(res.data)
      setLoading(false)
    }).catch(() => {
      toast.error("CV yuklanmadi")
      navigate('/dashboard')
    })
  }, [id])

  const updateField = useCallback((field, value) => {
    setCv(prev => ({ ...prev, [field]: value }))
  }, [])

  const handlePhoneChange = (value) => {
    if (!value.startsWith('+998')) {
      const digits = value.replace(/\D/g, '').slice(3)
      updateField('phone', '+998' + digits.slice(0, 9))
      return
    }
    const digits = value.slice(4).replace(/\D/g, '').slice(0, 9)
    updateField('phone', '+998' + digits)
  }

  // Generic list item handlers
  const addItem = (field, defaultItem) => setCv(p => ({ ...p, [field]: [...(p[field] || []), { ...defaultItem }] }))
  const deleteItem = (field, index) => setCv(p => ({ ...p, [field]: p[field].filter((_, i) => i !== index) }))
  const changeItem = (field, index, key, value) => setCv(p => ({
    ...p,
    [field]: p[field].map((item, i) => i === index ? { ...item, [key]: value } : item)
  }))

  const handleSave = async () => {
    if (!cv.first_name || !cv.last_name) {
      toast.error("Ism va familiya kiritilishi shart!")
      setActiveTab('personal')
      return
    }
    setSaving(true)
    try {
      let savedCv
      if (isEdit) {
        // Save main CV
        const { experiences, educations, skills, languages, certificates, ...cvData } = cv
        await cvAPI.update(id, cvData)

        // Sync experiences
        const existingExpRes = await cvAPI.getExperiences(id)
        await Promise.all(existingExpRes.data.map(e => cvAPI.deleteExperience(id, e.id)))
        await Promise.all(experiences.map(e => cvAPI.addExperience(id, e)))

        // Sync educations
        const existingEduRes = await cvAPI.getEducations(id)
        await Promise.all(existingEduRes.data.map(e => cvAPI.deleteEducation(id, e.id)))
        await Promise.all(educations.map(e => cvAPI.addEducation(id, e)))

        // Sync skills
        const existingSkillRes = await cvAPI.getSkills(id)
        await Promise.all(existingSkillRes.data.map(e => cvAPI.deleteSkill(id, e.id)))
        await Promise.all(skills.map(e => cvAPI.addSkill(id, e)))

        // Sync languages
        const existingLangRes = await cvAPI.getLanguages(id)
        await Promise.all(existingLangRes.data.map(e => cvAPI.deleteLanguage(id, e.id)))
        await Promise.all(languages.map(e => cvAPI.addLanguage(id, e)))

        // Sync certificates
        const existingCertRes = await cvAPI.getCertificates(id)
        await Promise.all(existingCertRes.data.map(e => cvAPI.deleteCertificate(id, e.id)))
        await Promise.all(certificates.map(e => cvAPI.addCertificate(id, e)))

        savedCv = await cvAPI.get(id)
        setCv(savedCv.data)
        toast.success("CV saqlandi!")
      } else {
        const res = await cvAPI.create(cv)
        toast.success("CV yaratildi!")
        navigate(`/cv/${res.data.id}/edit`, { replace: true })
      }
    } catch (err) {
      const msg = err.response?.data ? JSON.stringify(err.response.data) : "Saqlashda xatolik"
      toast.error(msg.slice(0, 100))
    } finally {
      setSaving(false)
    }
  }

  const handleDownload = async () => {
    if (!isEdit) {
      toast.error("Avval CV'ni saqlang!")
      return
    }
    setDownloading(true)
    const toastId = toast.loading('PDF tayyorlanmoqda...')
    try {
      const res = await cvAPI.downloadPDF(id)
      const blob = new Blob([res.data], { type: res.headers['content-type'] || 'application/pdf' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${cv.first_name}_${cv.last_name}_CV.pdf`
      a.click()
      URL.revokeObjectURL(url)
      toast.success('PDF yuklandi!', { id: toastId })
    } catch {
      toast.error('PDF yuklab olishda xatolik', { id: toastId })
    } finally {
      setDownloading(false)
    }
  }

  const tabs = [
    { id: 'personal', label: 'Shaxsiy', icon: '👤' },
    { id: 'experience', label: 'Tajriba', icon: '💼' },
    { id: 'education', label: "Ta'lim", icon: '🎓' },
    { id: 'skills', label: "Ko'nikmalar", icon: '⚡' },
    { id: 'extra', label: 'Boshqa', icon: '✨' },
  ]

  if (loading) return (
    <div className="flex items-center justify-center py-32">
      <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-600 border-t-transparent"></div>
    </div>
  )

  return (
    <div className="h-[calc(100vh-64px)] flex flex-col">
      {/* Toolbar */}
      <div className="bg-white border-b border-gray-200 px-4 py-2.5 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/dashboard')}
            className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1">
            ← Dashboard
          </button>
          <div className="h-4 w-px bg-gray-300" />
          <input
            value={cv.title}
            onChange={e => updateField('title', e.target.value)}
            className="font-semibold text-sm border-none outline-none bg-transparent text-gray-800 w-40"
            placeholder="CV nomi"
          />
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setPreviewVisible(p => !p)}
            className="btn-secondary text-xs py-1.5 px-3 hidden md:block"
          >
            {previewVisible ? '🙈 Preview yashirish' : '👁 Preview ko\'rsatish'}
          </button>
          <button
            onClick={handleDownload}
            disabled={downloading || !isEdit}
            className="btn-secondary text-xs py-1.5 px-3 flex items-center gap-1"
          >
            {downloading ? '⏳' : '📥'} PDF
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="btn-primary text-xs py-1.5 px-4 flex items-center gap-1"
          >
            {saving ? '⏳ Saqlanmoqda...' : isEdit ? '💾 Saqlash' : '✓ Yaratish'}
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Form panel */}
        <div className="w-full md:w-96 flex-shrink-0 flex flex-col overflow-hidden border-r border-gray-200 bg-white">
          {/* Template selector */}
          <div className="p-4 border-b border-gray-100">
            <TemplateSelector selected={cv.template} onChange={v => updateField('template', v)} />
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-100 overflow-x-auto flex-shrink-0">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 min-w-0 py-2.5 text-xs font-medium transition-colors whitespace-nowrap px-1 ${
                  activeTab === tab.id
                    ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/50'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <span className="hidden sm:inline">{tab.icon} </span>{tab.label}
              </button>
            ))}
          </div>

          {/* Form content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">

            {/* Personal Info */}
            {activeTab === 'personal' && (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="label">Ism *</label>
                    <input value={cv.first_name} onChange={e => updateField('first_name', e.target.value)}
                      className="input-field" placeholder="Ali" />
                  </div>
                  <div>
                    <label className="label">Familiya *</label>
                    <input value={cv.last_name} onChange={e => updateField('last_name', e.target.value)}
                      className="input-field" placeholder="Valiyev" />
                  </div>
                </div>

                <div>
                  <label className="label">Kasb/Mutaxassislik</label>
                  <input value={cv.profession} onChange={e => updateField('profession', e.target.value)}
                    className="input-field" placeholder="Frontend Developer" />
                </div>

                <div>
                  <label className="label">Email *</label>
                  <input type="email" value={cv.email} onChange={e => updateField('email', e.target.value)}
                    className="input-field" placeholder="ali@example.com" />
                </div>

                <div>
                  <label className="label">Telefon raqam</label>
                  <input
                    type="tel"
                    value={cv.phone}
                    onChange={e => handlePhoneChange(e.target.value)}
                    className="input-field"
                    placeholder="+998901234567"
                    maxLength={13}
                  />
                  <p className="text-xs text-gray-400 mt-1">Format: +998XXXXXXXXX (avtomatik qo'shiladi)</p>
                </div>

                <div>
                  <label className="label">Manzil</label>
                  <input value={cv.address} onChange={e => updateField('address', e.target.value)}
                    className="input-field" placeholder="Toshkent, O'zbekiston" />
                </div>

                <div>
                  <label className="label">LinkedIn</label>
                  <input value={cv.linkedin} onChange={e => updateField('linkedin', e.target.value)}
                    className="input-field" placeholder="linkedin.com/in/username" />
                </div>

                <div>
                  <label className="label">GitHub</label>
                  <input value={cv.github} onChange={e => updateField('github', e.target.value)}
                    className="input-field" placeholder="github.com/username" />
                </div>

                <div>
                  <label className="label">Veb-sayt</label>
                  <input value={cv.website} onChange={e => updateField('website', e.target.value)}
                    className="input-field" placeholder="portfolio.uz" />
                </div>

                <div>
                  <label className="label">Qisqacha ma'lumot</label>
                  <textarea value={cv.summary} onChange={e => updateField('summary', e.target.value)}
                    rows={4} className="input-field resize-none"
                    placeholder="O'zingiz haqida qisqacha yozing..." />
                </div>
              </>
            )}

            {/* Experience */}
            {activeTab === 'experience' && (
              <Section
                title="Ish tajribasi"
                onAdd={() => addItem('experiences', { position: '', company: '', location: '', start_date: '', end_date: '', is_current: false, description: '' })}
                addLabel="Tajriba qo'shish"
              >
                {cv.experiences?.length === 0 && (
                  <p className="text-gray-400 text-sm text-center py-4">Hali ish tajribasi qo'shilmagan</p>
                )}
                {cv.experiences?.map((exp, i) => (
                  <ExperienceForm key={i} exp={exp} index={i}
                    onChange={(idx, key, val) => changeItem('experiences', idx, key, val)}
                    onDelete={(idx) => deleteItem('experiences', idx)} />
                ))}
              </Section>
            )}

            {/* Education */}
            {activeTab === 'education' && (
              <Section
                title="Ta'lim"
                onAdd={() => addItem('educations', { institution: '', degree: '', field: '', start_date: '', end_date: '', is_current: false, gpa: '' })}
                addLabel="Ta'lim qo'shish"
              >
                {cv.educations?.length === 0 && (
                  <p className="text-gray-400 text-sm text-center py-4">Hali ta'lim qo'shilmagan</p>
                )}
                {cv.educations?.map((edu, i) => (
                  <EducationForm key={i} edu={edu} index={i}
                    onChange={(idx, key, val) => changeItem('educations', idx, key, val)}
                    onDelete={(idx) => deleteItem('educations', idx)} />
                ))}
              </Section>
            )}

            {/* Skills */}
            {activeTab === 'skills' && (
              <>
                <Section
                  title="Ko'nikmalar"
                  onAdd={() => addItem('skills', { name: '', level: 3 })}
                  addLabel="Ko'nikma qo'shish"
                >
                  {cv.skills?.length === 0 && (
                    <p className="text-gray-400 text-sm text-center py-4">Hali ko'nikma qo'shilmagan</p>
                  )}
                  {cv.skills?.map((skill, i) => (
                    <SkillForm key={i} skill={skill} index={i}
                      onChange={(idx, key, val) => changeItem('skills', idx, key, val)}
                      onDelete={(idx) => deleteItem('skills', idx)} />
                  ))}
                </Section>

                <Section
                  title="Tillar"
                  onAdd={() => addItem('languages', { name: '', level: 'B1' })}
                  addLabel="Til qo'shish"
                >
                  {cv.languages?.length === 0 && (
                    <p className="text-gray-400 text-sm text-center py-4">Hali til qo'shilmagan</p>
                  )}
                  {cv.languages?.map((lang, i) => (
                    <LanguageForm key={i} lang={lang} index={i}
                      onChange={(idx, key, val) => changeItem('languages', idx, key, val)}
                      onDelete={(idx) => deleteItem('languages', idx)} />
                  ))}
                </Section>
              </>
            )}

            {/* Extra: Certificates */}
            {activeTab === 'extra' && (
              <Section
                title="Sertifikatlar va mukofotlar"
                onAdd={() => addItem('certificates', { name: '', issuer: '', date: '', url: '' })}
                addLabel="Sertifikat qo'shish"
              >
                {cv.certificates?.length === 0 && (
                  <p className="text-gray-400 text-sm text-center py-4">Hali sertifikat qo'shilmagan</p>
                )}
                {cv.certificates?.map((cert, i) => (
                  <CertificateForm key={i} cert={cert} index={i}
                    onChange={(idx, key, val) => changeItem('certificates', idx, key, val)}
                    onDelete={(idx) => deleteItem('certificates', idx)} />
                ))}
              </Section>
            )}
          </div>
        </div>

        {/* Preview panel */}
        {previewVisible && (
          <div className="hidden md:flex flex-1 bg-gray-100 overflow-auto flex-col">
            <div className="flex-shrink-0 bg-gray-200 px-4 py-2 text-xs text-gray-600 font-medium flex items-center gap-2">
              <span>👁 Live Preview</span>
              <span className="text-gray-400">— o'zgarishlar real vaqtda aks etadi</span>
            </div>
            <div className="flex-1 overflow-auto p-6 flex justify-center">
              <div className="bg-white shadow-xl rounded-lg overflow-hidden" style={{ width: 680, minHeight: 960 }}>
                <CVPreview cv={cv} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
