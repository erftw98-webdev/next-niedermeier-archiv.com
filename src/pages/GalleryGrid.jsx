import React from 'react';
import { Link } from 'react-router-dom';
import archiveData from '../assets/datenbank-onepage-gallery.json';

function GalleryGrid() {
  return (
    <div className="gallery-container" style={{ 
      padding: '40px 20px', 
      backgroundColor: '#ffffff', // Sauberer weißer Hintergrund
      minHeight: '100vh'
    }}>
      <h1 style={{ 
        textAlign: 'center', 
        marginBottom: '60px', 
        fontFamily: 'serif', 
        fontSize: '2.5rem',
        fontWeight: 'normal' 
      }}>Niedermeier Archiv</h1>
      
      <div className="grid-layout" style={{
        display: 'grid',
        /* Hier ist der Sonntags-Trick: '280px' ist fest. 
           Die Bilder wachsen NICHT, stattdessen entstehen mehr Spalten oder Ränder */
        gridTemplateColumns: 'repeat(auto-fill, 280px)', 
        gap: '40px',
        maxWidth: '1400px',
        margin: '0 auto',
        justifyContent: 'center' // Zentriert das gesamte Grid, wenn Ränder wachsen
      }}>
        {archiveData.map((item) => {
          const previewImage = item.images && item.images.length > 0 ? item.images[0] : null;

          return (
            <div key={item.id} className="gallery-card" style={{ 
              width: '280px', // Absolute Festigkeit
              transition: 'transform 0.3s ease' 
            }}>
              <Link to={`/bild/${item.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div style={{ 
                  width: '280px', 
                  height: '280px', 
                  overflow: 'hidden', 
                  backgroundColor: '#f9f9f9',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {previewImage ? (
                    <img 
                      src={`/assets/galerie/${item.folder}/${previewImage}`} 
                      alt={`Bild ${item.id}`}
                      style={{ 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'cover' // Bild bleibt im Quadrat, wächst aber nicht über 280px
                      }}
                    />
                  ) : (
                    <div style={{ color: '#ccc' }}>Bild fehlt</div>
                  )}
                </div>
                <div style={{ padding: '15px 0', textAlign: 'left' }}>
                  <span style={{ 
                    fontSize: '0.9rem', 
                    letterSpacing: '1px', 
                    color: '#666',
                    textTransform: 'uppercase' 
                  }}>Bild {item.id}</span>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default GalleryGrid;