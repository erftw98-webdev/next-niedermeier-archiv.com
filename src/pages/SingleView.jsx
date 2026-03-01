import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import archiveData from '../assets/datenbank-onepage-gallery.json';
import './SingleView.css'; // Wichtig: Damit das neue CSS geladen wird

function SingleView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const item = archiveData.find(g => g.id === id);

  if (!item) return <div style={{ padding: '50px' }}>Galerie nicht gefunden!</div>;

  // Sortier-Logik
  const sortedImages = [...item.images].sort((a, b) => a.localeCompare(b));
  const mainImage = sortedImages[0];

  return (
    <div className="single-view-container">
      <h1>Bild {item.id}</h1>

      {/* Hier nutzen wir jetzt die CSS-Klasse statt der starren Inline-Styles */}
      <div className="single-view-main-container">
        <img 
          src={`/assets/galerie/${item.folder}/${mainImage}`} 
          alt="Hauptansicht" 
        />
      </div>

      <div className="single-view-lower-section">
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