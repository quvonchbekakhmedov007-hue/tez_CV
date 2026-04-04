// Live CV Preview - renders all 3 template styles in real-time

function SkillBar({ level }) {
  return (
    <div className="flex gap-1">
      {[1,2,3,4,5].map(i => (
        <div key={i} className={`h-2 flex-1 rounded ${i <= level ? 'bg-blue-500' : 'bg-gray-200'}`} />
      ))}
    </div>
  )
}

function SkillDots({ level, color = '#7c3aed' }) {
  return (
    <div className="flex gap-1">
      {[1,2,3,4,5].map(i => (
        <div key={i} style={{ width: 10, height: 10, borderRadius: '50%', background: i <= level ? color : '#e9d5ff' }} />
      ))}
    </div>
  )
}

const SKILL_LABELS = { 1: 'Boshlang\'ich', 2: 'O\'rta-past', 3: 'O\'rta', 4: 'Yuqori', 5: 'Ekspert' }

// Modern Template
function ModernPreview({ cv }) {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', fontSize: 12, color: '#333', background: '#fff', minHeight: '100%' }}>
      {/* Header */}
      <div style={{ background: '#2563eb', color: 'white', padding: '24px 28px' }}>
        <div style={{ fontSize: 22, fontWeight: 'bold' }}>
          {cv.first_name || 'Ism'} {cv.last_name || 'Familiya'}
        </div>
        {cv.profession && <div style={{ fontSize: 13, opacity: 0.9, marginTop: 3 }}>{cv.profession}</div>}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 10, fontSize: 11, opacity: 0.85 }}>
          {cv.email && <span>✉ {cv.email}</span>}
          {cv.phone && <span>☎ {cv.phone}</span>}
          {cv.address && <span>⌂ {cv.address}</span>}
          {cv.linkedin && <span>in {cv.linkedin}</span>}
          {cv.github && <span>⌥ {cv.github}</span>}
        </div>
      </div>

      <div style={{ display: 'flex' }}>
        {/* Sidebar */}
        <div style={{ width: 200, background: '#f1f5f9', padding: '20px 16px', flexShrink: 0 }}>
          {cv.skills?.length > 0 && (
            <div style={{ marginBottom: 18 }}>
              <div style={{ fontSize: 11, fontWeight: 'bold', color: '#1e40af', textTransform: 'uppercase', letterSpacing: 1, borderBottom: '2px solid #1e40af', paddingBottom: 4, marginBottom: 10 }}>Ko'nikmalar</div>
              {cv.skills.map((s, i) => (
                <div key={i} style={{ marginBottom: 8 }}>
                  <div style={{ fontSize: 11, marginBottom: 3 }}>{s.name}</div>
                  <SkillBar level={s.level || 3} />
                </div>
              ))}
            </div>
          )}

          {cv.languages?.length > 0 && (
            <div style={{ marginBottom: 18 }}>
              <div style={{ fontSize: 11, fontWeight: 'bold', color: '#1e40af', textTransform: 'uppercase', letterSpacing: 1, borderBottom: '2px solid #1e40af', paddingBottom: 4, marginBottom: 10 }}>Tillar</div>
              {cv.languages.map((l, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginBottom: 5 }}>
                  <span>{l.name}</span>
                  <span style={{ color: '#2563eb', fontWeight: 'bold' }}>{l.level}</span>
                </div>
              ))}
            </div>
          )}

          {cv.certificates?.length > 0 && (
            <div>
              <div style={{ fontSize: 11, fontWeight: 'bold', color: '#1e40af', textTransform: 'uppercase', letterSpacing: 1, borderBottom: '2px solid #1e40af', paddingBottom: 4, marginBottom: 10 }}>Sertifikatlar</div>
              {cv.certificates.map((c, i) => (
                <div key={i} style={{ marginBottom: 7 }}>
                  <div style={{ fontSize: 11, fontWeight: 'bold' }}>{c.name}</div>
                  {c.issuer && <div style={{ fontSize: 10, color: '#64748b' }}>{c.issuer}{c.date ? ` · ${c.date}` : ''}</div>}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Main */}
        <div style={{ flex: 1, padding: '20px 20px' }}>
          {cv.summary && (
            <div style={{ marginBottom: 18 }}>
              <div style={{ fontSize: 11, fontWeight: 'bold', color: '#2563eb', textTransform: 'uppercase', letterSpacing: 1, borderBottom: '2px solid #2563eb', paddingBottom: 4, marginBottom: 10 }}>Qisqacha Ma'lumot</div>
              <p style={{ fontSize: 11, color: '#475569', lineHeight: 1.6 }}>{cv.summary}</p>
            </div>
          )}

          {cv.experiences?.length > 0 && (
            <div style={{ marginBottom: 18 }}>
              <div style={{ fontSize: 11, fontWeight: 'bold', color: '#2563eb', textTransform: 'uppercase', letterSpacing: 1, borderBottom: '2px solid #2563eb', paddingBottom: 4, marginBottom: 10 }}>Ish Tajribasi</div>
              {cv.experiences.map((exp, i) => (
                <div key={i} style={{ marginBottom: 12 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ fontWeight: 'bold', fontSize: 12 }}>{exp.position}</div>
                      <div style={{ fontSize: 11, color: '#2563eb', marginTop: 1 }}>{exp.company}{exp.location ? ` · ${exp.location}` : ''}</div>
                    </div>
                    <div style={{ fontSize: 10, color: '#64748b', whiteSpace: 'nowrap' }}>
                      {exp.start_date} – {exp.is_current ? 'Hozir' : exp.end_date}
                    </div>
                  </div>
                  {exp.description && <p style={{ fontSize: 11, color: '#475569', marginTop: 4, lineHeight: 1.5 }}>{exp.description}</p>}
                </div>
              ))}
            </div>
          )}

          {cv.educations?.length > 0 && (
            <div>
              <div style={{ fontSize: 11, fontWeight: 'bold', color: '#2563eb', textTransform: 'uppercase', letterSpacing: 1, borderBottom: '2px solid #2563eb', paddingBottom: 4, marginBottom: 10 }}>Ta'lim</div>
              {cv.educations.map((edu, i) => (
                <div key={i} style={{ marginBottom: 10 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ fontWeight: 'bold', fontSize: 12 }}>{edu.degree}{edu.field ? ` — ${edu.field}` : ''}</div>
                      <div style={{ fontSize: 11, color: '#2563eb', marginTop: 1 }}>{edu.institution}{edu.gpa ? ` · GPA: ${edu.gpa}` : ''}</div>
                    </div>
                    <div style={{ fontSize: 10, color: '#64748b', whiteSpace: 'nowrap' }}>
                      {edu.start_date} – {edu.is_current ? 'Hozir' : edu.end_date}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Classic Template
function ClassicPreview({ cv }) {
  return (
    <div style={{ fontFamily: '"Times New Roman", Times, serif', fontSize: 12, color: '#1a1a1a', background: '#fff', padding: '32px 36px' }}>
      <div style={{ fontSize: 22, fontWeight: 'bold', textAlign: 'center', textTransform: 'uppercase', letterSpacing: 3 }}>
        {cv.first_name || 'Ism'} {cv.last_name || 'Familiya'}
      </div>
      {cv.profession && <div style={{ textAlign: 'center', fontSize: 13, color: '#555', marginTop: 3, fontStyle: 'italic' }}>{cv.profession}</div>}
      <div style={{ textAlign: 'center', margin: '8px 0', fontSize: 11, color: '#444' }}>
        {[cv.email, cv.phone, cv.address, cv.linkedin, cv.github].filter(Boolean).join('  ·  ')}
      </div>
      <hr style={{ border: 'none', borderTop: '2px solid #1a1a1a', margin: '10px 0' }} />

      {cv.summary && (
        <>
          <div style={{ fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 2, fontSize: 12, marginBottom: 6 }}>Qisqacha Ma'lumot</div>
          <hr style={{ border: 'none', borderTop: '1px solid #999', marginBottom: 8 }} />
          <p style={{ fontSize: 11, lineHeight: 1.7, fontStyle: 'italic', marginBottom: 14 }}>{cv.summary}</p>
        </>
      )}

      {cv.experiences?.length > 0 && (
        <div style={{ marginBottom: 14 }}>
          <div style={{ fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 2, fontSize: 12, marginBottom: 6 }}>Ish Tajribasi</div>
          <hr style={{ border: 'none', borderTop: '1px solid #999', marginBottom: 8 }} />
          {cv.experiences.map((exp, i) => (
            <div key={i} style={{ marginBottom: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontWeight: 'bold', fontSize: 12 }}>{exp.position}</div>
                  <div style={{ fontStyle: 'italic', fontSize: 11, color: '#444' }}>{exp.company}{exp.location ? `, ${exp.location}` : ''}</div>
                </div>
                <div style={{ fontSize: 11, color: '#555' }}>{exp.start_date} – {exp.is_current ? 'Hozir' : exp.end_date}</div>
              </div>
              {exp.description && <p style={{ fontSize: 11, color: '#333', marginTop: 3, lineHeight: 1.5 }}>{exp.description}</p>}
            </div>
          ))}
        </div>
      )}

      {cv.educations?.length > 0 && (
        <div style={{ marginBottom: 14 }}>
          <div style={{ fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 2, fontSize: 12, marginBottom: 6 }}>Ta'lim</div>
          <hr style={{ border: 'none', borderTop: '1px solid #999', marginBottom: 8 }} />
          {cv.educations.map((edu, i) => (
            <div key={i} style={{ marginBottom: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontWeight: 'bold', fontSize: 12 }}>{edu.degree}{edu.field ? ` – ${edu.field}` : ''}</div>
                  <div style={{ fontStyle: 'italic', fontSize: 11, color: '#444' }}>{edu.institution}</div>
                </div>
                <div style={{ fontSize: 11, color: '#555' }}>{edu.start_date} – {edu.is_current ? 'Hozir' : edu.end_date}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {cv.skills?.length > 0 && (
        <div style={{ marginBottom: 14 }}>
          <div style={{ fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 2, fontSize: 12, marginBottom: 6 }}>Ko'nikmalar</div>
          <hr style={{ border: 'none', borderTop: '1px solid #999', marginBottom: 8 }} />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
            {cv.skills.map((s, i) => (
              <span key={i} style={{ fontSize: 11, padding: '2px 8px', border: '1px solid #333' }}>{s.name}</span>
            ))}
          </div>
        </div>
      )}

      {cv.languages?.length > 0 && (
        <div style={{ marginBottom: 14 }}>
          <div style={{ fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 2, fontSize: 12, marginBottom: 6 }}>Tillar</div>
          <hr style={{ border: 'none', borderTop: '1px solid #999', marginBottom: 8 }} />
          <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
            {cv.languages.map((l, i) => (
              <span key={i} style={{ fontSize: 11 }}>{l.name} – <span style={{ color: '#555' }}>{l.level}</span></span>
            ))}
          </div>
        </div>
      )}

      {cv.certificates?.length > 0 && (
        <div>
          <div style={{ fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 2, fontSize: 12, marginBottom: 6 }}>Sertifikatlar</div>
          <hr style={{ border: 'none', borderTop: '1px solid #999', marginBottom: 8 }} />
          {cv.certificates.map((c, i) => (
            <div key={i} style={{ fontSize: 11, marginBottom: 5 }}>
              <strong>{c.name}</strong>{c.issuer ? ` – ${c.issuer}` : ''}{c.date ? ` (${c.date})` : ''}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// Creative Template
function CreativePreview({ cv }) {
  const initials = `${cv.first_name?.[0] || ''}${cv.last_name?.[0] || ''}`
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', fontSize: 12, color: '#222', background: '#fff' }}>
      <div style={{ background: '#7c3aed', height: 7 }} />

      {/* Header */}
      <div style={{ padding: '24px 28px 18px', display: 'flex', alignItems: 'flex-start', gap: 18, borderBottom: '1px solid #e2e8f0' }}>
        <div style={{ width: 64, height: 64, background: '#7c3aed', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 22, fontWeight: 'bold', flexShrink: 0 }}>
          {initials || 'U'}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 22, fontWeight: 'bold', color: '#1e1b4b' }}>
            {cv.first_name || 'Ism'} {cv.last_name || 'Familiya'}
          </div>
          {cv.profession && <div style={{ color: '#7c3aed', fontSize: 13, marginTop: 2, fontWeight: 600 }}>{cv.profession}</div>}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 8 }}>
            {[cv.email && `✉ ${cv.email}`, cv.phone && `☎ ${cv.phone}`, cv.address && `⌂ ${cv.address}`].filter(Boolean).map((item, i) => (
              <span key={i} style={{ fontSize: 10, background: '#f5f3ff', color: '#5b21b6', padding: '2px 10px', borderRadius: 20 }}>{item}</span>
            ))}
          </div>
        </div>
      </div>

      <div style={{ display: 'flex' }}>
        {/* Main */}
        <div style={{ flex: 1, padding: '20px 24px' }}>
          {cv.summary && (
            <div style={{ marginBottom: 18 }}>
              <div style={{ fontSize: 11, fontWeight: 'bold', color: '#7c3aed', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 8, borderBottom: '1px solid #ddd8fe', paddingBottom: 4 }}>Qisqacha Ma'lumot</div>
              <p style={{ fontSize: 11, color: '#475569', lineHeight: 1.7 }}>{cv.summary}</p>
            </div>
          )}

          {cv.experiences?.length > 0 && (
            <div style={{ marginBottom: 18 }}>
              <div style={{ fontSize: 11, fontWeight: 'bold', color: '#7c3aed', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 8, borderBottom: '1px solid #ddd8fe', paddingBottom: 4 }}>Ish Tajribasi</div>
              {cv.experiences.map((exp, i) => (
                <div key={i} style={{ paddingLeft: 14, borderLeft: '2px solid #ddd8fe', marginBottom: 12, position: 'relative' }}>
                  <div style={{ position: 'absolute', left: -5, top: 4, width: 8, height: 8, background: '#7c3aed', borderRadius: '50%' }} />
                  <div style={{ fontWeight: 'bold', fontSize: 12, color: '#1e1b4b' }}>{exp.position}</div>
                  <div style={{ fontSize: 11, color: '#7c3aed' }}>{exp.company}{exp.location ? ` · ${exp.location}` : ''}</div>
                  <div style={{ fontSize: 10, color: '#94a3b8', marginTop: 2 }}>{exp.start_date} – {exp.is_current ? 'Hozir' : exp.end_date}</div>
                  {exp.description && <p style={{ fontSize: 11, color: '#475569', marginTop: 4, lineHeight: 1.5 }}>{exp.description}</p>}
                </div>
              ))}
            </div>
          )}

          {cv.educations?.length > 0 && (
            <div>
              <div style={{ fontSize: 11, fontWeight: 'bold', color: '#7c3aed', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 8, borderBottom: '1px solid #ddd8fe', paddingBottom: 4 }}>Ta'lim</div>
              {cv.educations.map((edu, i) => (
                <div key={i} style={{ paddingLeft: 14, borderLeft: '2px solid #ddd8fe', marginBottom: 10, position: 'relative' }}>
                  <div style={{ position: 'absolute', left: -5, top: 4, width: 8, height: 8, background: '#7c3aed', borderRadius: '50%' }} />
                  <div style={{ fontWeight: 'bold', fontSize: 12, color: '#1e1b4b' }}>{edu.degree}{edu.field ? ` · ${edu.field}` : ''}</div>
                  <div style={{ fontSize: 11, color: '#7c3aed' }}>{edu.institution}{edu.gpa ? ` · GPA: ${edu.gpa}` : ''}</div>
                  <div style={{ fontSize: 10, color: '#94a3b8', marginTop: 2 }}>{edu.start_date} – {edu.is_current ? 'Hozir' : edu.end_date}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div style={{ width: 190, background: '#faf5ff', padding: '20px 16px' }}>
          {cv.skills?.length > 0 && (
            <div style={{ marginBottom: 18 }}>
              <div style={{ fontSize: 11, fontWeight: 'bold', color: '#7c3aed', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 10, borderBottom: '1px solid #ddd8fe', paddingBottom: 4 }}>Ko'nikmalar</div>
              {cv.skills.map((s, i) => (
                <div key={i} style={{ marginBottom: 9 }}>
                  <div style={{ fontSize: 11, marginBottom: 4 }}>{s.name}</div>
                  <SkillDots level={s.level || 3} />
                </div>
              ))}
            </div>
          )}

          {cv.languages?.length > 0 && (
            <div style={{ marginBottom: 18 }}>
              <div style={{ fontSize: 11, fontWeight: 'bold', color: '#7c3aed', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 10, borderBottom: '1px solid #ddd8fe', paddingBottom: 4 }}>Tillar</div>
              {cv.languages.map((l, i) => (
                <div key={i} style={{ marginBottom: 8 }}>
                  <div style={{ fontWeight: 'bold', fontSize: 11 }}>{l.name}</div>
                  <div style={{ fontSize: 10, color: '#7c3aed' }}>{l.level}</div>
                </div>
              ))}
            </div>
          )}

          {cv.certificates?.length > 0 && (
            <div>
              <div style={{ fontSize: 11, fontWeight: 'bold', color: '#7c3aed', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 10, borderBottom: '1px solid #ddd8fe', paddingBottom: 4 }}>Sertifikatlar</div>
              {cv.certificates.map((c, i) => (
                <div key={i} style={{ marginBottom: 8 }}>
                  <div style={{ fontWeight: 'bold', fontSize: 11 }}>{c.name}</div>
                  {(c.issuer || c.date) && <div style={{ fontSize: 10, color: '#64748b' }}>{c.issuer}{c.date ? ` · ${c.date}` : ''}</div>}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function CVPreview({ cv }) {
  if (!cv) return null
  switch (cv.template) {
    case 'classic': return <ClassicPreview cv={cv} />
    case 'creative': return <CreativePreview cv={cv} />
    default: return <ModernPreview cv={cv} />
  }
}
