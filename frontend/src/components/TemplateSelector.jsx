const templates = [
  {
    id: 'modern',
    name: 'Modern',
    desc: 'IT va texnologiya sohalari uchun',
    gradient: 'from-blue-400 to-blue-600',
    accent: '#2563eb',
  },
  {
    id: 'classic',
    name: 'Classic',
    desc: 'Barcha sohalar uchun universal',
    gradient: 'from-gray-600 to-gray-800',
    accent: '#374151',
  },
  {
    id: 'creative',
    name: 'Creative',
    desc: 'Ijodiy va dizayn sohalar uchun',
    gradient: 'from-purple-400 to-purple-600',
    accent: '#7c3aed',
  },
]

export default function TemplateSelector({ selected, onChange }) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-gray-700 mb-3">Shablon tanlang</h3>
      <div className="grid grid-cols-3 gap-3">
        {templates.map(t => (
          <button
            key={t.id}
            type="button"
            onClick={() => onChange(t.id)}
            className={`relative rounded-xl overflow-hidden border-2 transition-all ${
              selected === t.id
                ? 'border-blue-600 shadow-md scale-105'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            {/* Mini preview */}
            <div className={`h-20 bg-gradient-to-br ${t.gradient} p-2`}>
              <div className="bg-white/20 rounded h-full p-1.5">
                <div className="flex gap-1 mb-1">
                  <div className="w-5 h-5 bg-white/40 rounded-full flex-shrink-0" />
                  <div className="flex-1 space-y-0.5">
                    <div className="h-1 bg-white/60 rounded w-3/4" />
                    <div className="h-1 bg-white/40 rounded w-1/2" />
                  </div>
                </div>
                <div className="space-y-0.5">
                  <div className="h-1 bg-white/30 rounded" />
                  <div className="h-1 bg-white/30 rounded w-4/5" />
                  <div className="h-1 bg-white/20 rounded w-3/5" />
                </div>
              </div>
            </div>

            <div className="p-2 bg-white">
              <div className="text-xs font-semibold text-gray-800">{t.name}</div>
              <div className="text-xs text-gray-400 leading-tight">{t.desc}</div>
            </div>

            {selected === t.id && (
              <div className="absolute top-1.5 right-1.5 w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
