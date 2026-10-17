import { useState } from 'react'

const categories = [
  { value: 'cricketer', label: 'Cricketer', icon: '🏏' },
  { value: 'actor', label: 'Actor', icon: '🎬' },
  { value: 'actress', label: 'Actress', icon: '🎭' },
]

const starterProfiles = {
  cricketer: [
    {
      id: 'virat-kohli',
      name: 'Virat Kohli',
      initials: 'VK',
      color: 'violet',
      photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Virat_Kohli_during_the_India_vs_Aus_4th_Test_match_at_Narendra_Modi_Stadium_on_09_March_2023.jpg/330px-Virat_Kohli_during_the_India_vs_Aus_4th_Test_match_at_Narendra_Modi_Stadium_on_09_March_2023.jpg',
    },
    {
      id: 'ms-dhoni',
      name: 'MS Dhoni',
      initials: 'MD',
      color: 'blue',
      photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/MS_Dhoni_%28Prabhav_%2723_-_RiGI_2023%29.jpg/330px-MS_Dhoni_%28Prabhav_%2723_-_RiGI_2023%29.jpg',
    },
    {
      id: 'rohit-sharma',
      name: 'Rohit Sharma',
      initials: 'RS',
      color: 'orange',
      photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Prime_Minister_Of_Bharat_Shri_Narendra_Damodardas_Modi_with_Shri_Rohit_Gurunath_Sharma_%28Cropped%29.jpg/330px-Prime_Minister_Of_Bharat_Shri_Narendra_Damodardas_Modi_with_Shri_Rohit_Gurunath_Sharma_%28Cropped%29.jpg',
    },
  ],
  actor: [
    {
      id: 'shah-rukh-khan',
      name: 'Shah Rukh Khan',
      initials: 'SK',
      color: 'blue',
      photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Shah_Rukh_Khan_graces_the_launch_of_the_new_Santro.jpg/330px-Shah_Rukh_Khan_graces_the_launch_of_the_new_Santro.jpg',
    },
    {
      id: 'ranbir-kapoor',
      name: 'Ranbir Kapoor',
      initials: 'RK',
      color: 'orange',
      photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Ranbir_Kapoor_at_Ramayana_special_event_in_Sep_26_%28cropped%29.jpg/330px-Ranbir_Kapoor_at_Ramayana_special_event_in_Sep_26_%28cropped%29.jpg',
    },
    {
      id: 'allu-arjun',
      name: 'Allu Arjun',
      initials: 'AA',
      color: 'violet',
      photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Allu_Arjun_at_Pushpa_2_The_Rule_meet.jpg/330px-Allu_Arjun_at_Pushpa_2_The_Rule_meet.jpg',
    },
  ],
  actress: [
    {
      id: 'deepika-padukone',
      name: 'Deepika Padukone',
      initials: 'DP',
      color: 'orange',
      photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Deepika_Padukone_2025_%281%29.png/330px-Deepika_Padukone_2025_%281%29.png',
    },
    {
      id: 'alia-bhatt',
      name: 'Alia Bhatt',
      initials: 'AB',
      color: 'violet',
      photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Alia_Bhatt_attends_at_the_2026_Cannes_Film_Festival_%28cropped%29_%28cropped%29.jpg/330px-Alia_Bhatt_attends_at_the_2026_Cannes_Film_Festival_%28cropped%29_%28cropped%29.jpg',
    },
    {
      id: 'priyanka-chopra',
      name: 'Priyanka Chopra',
      initials: 'PC',
      color: 'blue',
      photo: 'https://upload.wikimedia.org/wikipedia/commons/4/45/Priyanka_Chopra_at_Bulgary_launch%2C_2024_%28cropped%29.jpg',
    },
  ],
}

function App() {
  const [category, setCategory] = useState('cricketer')
  const [customProfiles, setCustomProfiles] = useState([])
  const [removedProfiles, setRemovedProfiles] = useState([])
  const [isManualOpen, setIsManualOpen] = useState(false)
  const [name, setName] = useState('')
  const [photo, setPhoto] = useState('')
  const [error, setError] = useState('')
  const [failedPhotos, setFailedPhotos] = useState([])

  const selectedCategory = categories.find((item) => item.value === category)
  const profiles = [
    ...starterProfiles[category].filter((profile) => !removedProfiles.includes(profile.id)),
    ...customProfiles.filter((profile) => profile.category === category),
  ]

  const handlePhotoChange = (event) => {
    const file = event.target.files?.[0]
    if (!file) {
      setPhoto('')
      return
    }

    setPhoto(URL.createObjectURL(file))
  }

  const handleAddProfile = (event) => {
    event.preventDefault()
    if (!name.trim()) {
      setError('Please enter a name.')
      return
    }

    setCustomProfiles((current) => [
      ...current,
      {
        id: `custom-${Date.now()}`,
        name: name.trim(),
        initials: name.trim().split(/\s+/).map((part) => part[0]).join('').slice(0, 2).toUpperCase(),
        color: 'violet',
        category,
        photo,
      },
    ])
    setName('')
    setPhoto('')
    setError('')
    setIsManualOpen(false)
  }

  const handleCloseManual = () => {
    setIsManualOpen(false)
    setName('')
    setPhoto('')
    setError('')
  }

  const handleRemoveProfile = (profileId) => {
    setRemovedProfiles((current) => [...current, profileId])
    setCustomProfiles((current) => current.filter((profile) => profile.id !== profileId))
    setFailedPhotos((current) => current.filter((id) => id !== profileId))
  }

  return (
    <main className="app-container">
      <header className="page-header">
        <div>
          <p className="eyebrow">YOUR PERSONAL COLLECTION</p>
          <h1>My Favourite People</h1>
          <p className="welcome-text">Pick a category and explore your favourites.</p>
        </div>
        <button className="manual-button" type="button" onClick={() => setIsManualOpen(true)}>
          <span aria-hidden="true">＋</span> Manual
        </button>
      </header>

      <section className="category-section" aria-label="Favourite people">
        <div className="category-header">
          <span className="category-icon" aria-hidden="true">{selectedCategory.icon}</span>
          <div>
            <h2 className="category-title">Choose a category</h2>
            <p className="category-help">Select one to see three favourites.</p>
          </div>
        </div>

        <div className="category-tabs" role="tablist" aria-label="People categories">
          {categories.map((item) => (
            <button
              key={item.value}
              className={`category-tab${category === item.value ? ' active' : ''}`}
              type="button"
              role="tab"
              aria-selected={category === item.value}
              onClick={() => setCategory(item.value)}
            >
              <span aria-hidden="true">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </div>

        <div className="profiles-heading">
          <div>
            <h2>{selectedCategory.label} favourites</h2>
            <p>{profiles.length} people in this category</p>
          </div>
        </div>

        <div className="profile-grid">
          {profiles.map((profile) => (
            <article className="profile-card" key={profile.id}>
              {profile.photo && !failedPhotos.includes(profile.id) ? (
                <img
                  className="profile-photo"
                  src={profile.photo}
                  alt={profile.name}
                  onError={() => setFailedPhotos((current) => [...current, profile.id])}
                />
              ) : (
                <div className={`profile-avatar ${profile.color}`} aria-hidden="true">
                  {profile.initials}
                </div>
              )}
              <button
                className="delete-profile"
                type="button"
                aria-label={`Remove ${profile.name}`}
                title={`Remove ${profile.name}`}
                onClick={() => handleRemoveProfile(profile.id)}
              >
                Remove
              </button>
              <h3>{profile.name}</h3>
              <span className="profile-category">{selectedCategory.label}</span>
            </article>
          ))}
        </div>
      </section>

      {isManualOpen && (
        <div className="modal-backdrop" onMouseDown={(event) => {
          if (event.target === event.currentTarget) handleCloseManual()
        }}>
          <section className="manual-modal" role="dialog" aria-modal="true" aria-labelledby="manual-title">
            <div className="modal-heading">
              <div>
                <p className="eyebrow">GROW YOUR COLLECTION</p>
                <h2 id="manual-title">Add a favourite</h2>
              </div>
              <button className="close-button" type="button" aria-label="Close" onClick={handleCloseManual}>
                ×
              </button>
            </div>
            <form onSubmit={handleAddProfile}>
              <label className="form-field">
                <span>Category</span>
                <select value={category} onChange={(event) => setCategory(event.target.value)}>
                  {categories.map((item) => (
                    <option key={item.value} value={item.value}>{item.label}</option>
                  ))}
                </select>
              </label>
              <label className="form-field">
                <span>Name</span>
                <input
                  type="text"
                  placeholder="Enter a name"
                  value={name}
                  onChange={(event) => {
                    setName(event.target.value)
                    setError('')
                  }}
                  autoFocus
                />
              </label>
              <label className="form-field">
                <span>Photo <span className="optional-label">(optional)</span></span>
                <input type="file" accept="image/*" onChange={handlePhotoChange} />
              </label>
              {photo && <img className="photo-preview" src={photo} alt="Selected photo preview" />}
              {error && <p className="form-error" role="alert">{error}</p>}
              <div className="modal-actions">
                <button className="cancel-button" type="button" onClick={handleCloseManual}>Cancel</button>
                <button className="submit-button" type="submit">Add {selectedCategory.label}</button>
              </div>
            </form>
          </section>
        </div>
      )}
    </main>
  )
}

export default App
