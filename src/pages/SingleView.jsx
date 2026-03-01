import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import archiveData from '../assets/datenbank-onepage-gallery.json';

function SingleView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const item = archiveData.find(g => g.id === id);

  if (!item) return <div style={{padding: '50px'}}>Galerie nicht gefunden!</div>;

  // Deine Sortier-Logik
  const sortedImages = [...item.images].sort((a, b) => a.localeCompare(b));
  const mainImage = sortedImages[0];

  return (
    <div className="single-view-container" style={{ padding: '10px 20px', maxWidth: '1200px', margin: '0 auto' }}>
      
      <h1 style={{ fontSize: '1.5rem' }}>Bild {item.id}</h1>

      <div style={{ height: '60vh', display: 'flex', justifyContent: 'center', background: '#f8f8f8', borderRadius: '8px', overflow: 'hidden' }}>
        <img 
          src={`/assets/galerie/${item.folder}/${mainImage}`} 
          style={{ maxHeight: '100%', objectFit: 'contain' }} 
          alt="Hauptansicht" 
        />
      </div>

      <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
          
          {sortedImages.map((imgName, idx) => (
            /* WICHTIG: Hier muss className="thumb-link" (für den Hover-Effekt im CSS) stehen! */



            <Link key={idx} to={`/store/${item.id}/${idx}`} className="thumb-link"> 
              <img 
                src={`/assets/galerie/${item.folder}/${imgName}`} 
                style={{ 
                  width: '80px', 
                  height: '80px', 
                  objectFit: 'cover', 
                  borderRadius: '4px', 
                  border: '1px solid #ddd',
                  /* Wir nehmen das Inline-Transform hier weg, damit das CSS aus App.css wirken kann */
                }} 
                alt={`Thumb ${idx}`} 
              />
            </Link>
          ))}

        </div>
        
        <div style={{ marginTop: '15px', display: 'flex', gap: '20px', alignItems: 'center' }}>
          <p style={{ fontWeight: 'bold', fontSize: '14px', margin: 0 }}>Klick hier das Bild im Store!</p>
          <button 
            onClick={() => navigate(-1)} 
            style={{ padding: '8px 20px', cursor: 'pointer', background: '#333', color: '#fff', border: 'none', borderRadius: '4px' }}
          >
            Zurück
          </button>
        </div>
      </div>
    </div>
  );
}

export default SingleView;