import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import archiveData from '../assets/datenbank-onepage-gallery.json';
import './SingleView.css'; 

function SingleView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const item = archiveData.find(g => g.id === id);

  // --- HIER DIE TESTDATEN DEFINIEREN ---
  const testDaten = {
    "001": {
      anzahl: 1,
      thumbs: ["/images/001-Store-Kopie/thumbs/a_001.jpg"]
    },
    "010": {
      anzahl: 2,
      thumbs: [
        "/images/010_Store-Kopie/thumbs/a.010.1_ 1-1-Store-Kopie - Kopie.jpg",
        "/images/010_Store-Kopie/thumbs/b.130_ a_1-1-Store-Kopie.jpg"
      ]
    }
  };

  if (!item) return <div style={{ padding: '50px' }}>Galerie nicht gefunden!</div>;

  const sortedImages = [...item.images].sort((a, b) => a.localeCompare(b));
  const mainImage = sortedImages[0];

  return (
    <div className="single-view-container">
      <h1>Bild {item.id}</h1>

      <div className="single-view-main-container">
        <img 
          src={`/assets/galerie/${item.folder}/${mainImage}`} 
          alt="Hauptansicht" 
        />
      </div>

      <div className="single-view-lower-section">
        {/* Die ursprüngliche Thumb-Zeile (jetzt mit CamelCase borderRadius) */}
        <div className="thumb-wrapper-mobile">
          {sortedImages.map((imgName, idx) => (
            <Link key={idx} to={`/store/${item.id}/${idx}`} className="thumb-link"> 
              <img 
                src={`/assets/galerie/${item.folder}/${imgName}`} 
                alt={`Thumb ${idx}`} 
                style={{ 
                  width: '80px', 
                  height: '80px', 
                  objectFit: 'cover', 
                  borderRadius: '4px', 
                  border: '1px solid #ddd'
                }} 
              />
            </Link>
          ))}
        </div>

        {/* --- PUNKT 4.c & 4.d LOGIK START --- */}
        {testDaten[id] && (
          <div style={{ textAlign: 'center', marginTop: '20px', padding: '0 15px' }}>
            <p style={{ color: '#cccccc', fontSize: '0.9em', lineHeight: '1.4' }}>
              {testDaten[id].anzahl === 1 
                ? "Auf diesem Foto siehst du ein gemaltes Bild, das auch im STORE enthalten ist. Dort gibt es auch Infos zu diesen Bildern. Klick dafür auf einen der folgenden Button."
                : "Auf diesem Foto siehst du mehrere gemalte Bilder, die auch im STORE enthalten sind. Dort gibt es auch Infos zu diesen Bildern. Klick dafür auf einen der folgenden Buttons."
              }
            </p>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '15px', marginTop: '15px' }}>
              {testDaten[id].thumbs.map((thumbUrl, idx) => (
                <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <img src={thumbUrl} style={{ width: '80px', height: '80px', objectFit: 'cover' }} alt="Thumb" />
                  <button 
                    onClick={() => navigate(`/store/${id}/${idx}`)}
                    style={{ background: 'transparent', color: '#cccccc', border: '1px solid #cccccc', marginTop: '8px', padding: '5px 10px', fontSize: '0.7em', cursor: 'pointer' }}
                  >
                    Info zum Bild
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
        {/* --- PUNKT 4.c & 4.d LOGIK ENDE --- */}
        
        <div className="single-view-navigation">
          <p>Klick hier das Bild im Store!</p>
          <button onClick={() => navigate(-1)}>
            Zurück
          </button>
        </div>
      </div>
    </div>
  );
}

export default SingleView;